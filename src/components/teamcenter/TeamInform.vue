<template>
    <div class="team-notification-list">
      <h2>组队管理通知</h2>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="我发送的" name="sent">
          <template v-for="notification in sentNotifications" :key="notification.tsm_id">
            <el-card>
              <p>队伍名称：{{ notification.teamFix.t_name }}</p>
              <p>申请人信息：{{ userInfoStore.info.u_name }}</p>
              <p>接受者：{{ notification.user.u_name }} </p>
              <p>申请时间：{{ notification.tsm_time }}</p>
              <p v-if="notification.tsm_pass === '0'">
                状态：待处理
              </p>
              <p v-else-if="notification.tsm_pass === '1'">
                状态：已同意
              </p>
              <p v-else-if="notification.tsm_pass === '2'">
                状态：已拒绝
              </p>
              <p>
                <el-button @click="handleViewDetail(notification)" link>查看详情</el-button>
              </p>
            </el-card>
          </template>
        </el-tab-pane>
        

        <el-tab-pane label="我接收的" name="received">
          <template v-for="notification in receivedNotifications" :key="notification.tsm_id">
            <el-card>
              <p>申请队伍信息：{{ notification.teamFix.t_name }}</p>
              <p>申请人信息：{{ notification.applicantInfo }}</p>
              <p>申请时间：{{ notification.applicationTime }}</p>
              <p>申请状态：{{ notification.applicationStatus }}</p>
              <p v-if="notification.applicationStatus === '待处理'">
                <el-button @click="handleApprove(notification)" type="primary">同意</el-button>
                <el-button @click="handleReject(notification)" type="danger">拒绝</el-button>
              </p>
              <p>
                <el-button @click="handleViewDetail(notification)" link>查看详情</el-button>
              </p>
            </el-card>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { ElTabs, ElTabPane, ElCard, ElButton } from 'element-plus';
  import {fetchTeamCaptainApplication,fetchTeamMemberApplication,agreeJoinTeam,refuseJoinTeam} from "@/api/team.js";
  import { useUserInfoStore } from '@/stores/userInfo.js';
  
  const userInfoStore = useUserInfoStore();
  
  const sentNotifications = ref([]);
  const receivedNotifications = ref([]);
  const activeTab = ref('sent');
  


  const loadNotifications = async () => {
    // 调用后端接口获取组队管理通知数据

    //作为队长发送的邀请，和接受的申请
     
    const capData = await fetchTeamCaptainApplication({
      u_acc: userInfoStore.info.u_acc,
    });
    const CaptainNotifications=capData.data.listPage;

    //作为成员发送的申请，和接受的邀请
    const memData = await fetchTeamMemberApplication({
      u_acc: userInfoStore.info.u_acc,
    
    });

    const MemberNotifications = memData.data.listPage;


    const CaptainSentNotifications = CaptainNotifications.value.filter(notification => notification.user === '1');
    const CaptainReceivedNotifications = CaptainNotifications.value.filter(notification => notification.tsm_dct === '0');

    const MemberSentNotifications = MemberNotifications.value.filter(notification => notification.user === '1');
    const MemberReceivedNotifications = MemberNotifications.value.filter(notification => notification.tsm_dct === '0');


    sentNotifications.value = CaptainSentNotifications.concat(MemberSentNotifications);
    receivedNotifications.value = CaptainReceivedNotifications.concat(MemberReceivedNotifications);
  };
  
  const handleApprove = async (notification) => {
    // 处理同意申请逻辑
    await agreeJoinTeam(notification.id);
    loadNotifications();
  };
    
  const handleReject = async (notification) => {
    // 处理拒绝申请逻辑
    await refuseJoinTeam(notification.id);
    loadNotifications();
  };
  
  const handleViewDetail = (notification) => {
    // 处理查看详情逻辑
    console.log('查看详情', notification);
  };
  
  onMounted(() => {
    loadNotifications();
  });
  </script>
  
  <style scoped>
  .team-notification-list {
    padding: 20px;
  }
  </style>
  