<template>
    <div class="team-notification-list">
      <h2>组队管理通知</h2>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="我发送的" name="sent">
          <template v-for="notification in sentNotifications" :key="notification.id">
            <el-card>
              <p>申请队伍信息：{{ notification.teamInfo }}</p>
              <p>申请人信息：{{ notification.applicantInfo }}</p>
              <p>申请时间：{{ notification.applicationTime }}</p>
              <p>申请状态：{{ notification.applicationStatus }}</p>
              <p>
                <el-button @click="handleViewDetail(notification)" link>查看详情</el-button>
              </p>
            </el-card>
          </template>
        </el-tab-pane>
        <el-tab-pane label="我接收的" name="received">
          <template v-for="notification in receivedNotifications" :key="notification.id">
            <el-card>
              <p>申请队伍信息：{{ notification.teamInfo }}</p>
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
  import {fetchTeamReceiveApplication,fetchTeamSendApplication,agreeJoinTeam,refuseJoinTeam} from "@/api/team.js";
  import { useUserInfoStore } from '@/stores/userInfo.js';
  
  const userInfoStore = useUserInfoStore();
  
  const sentNotifications = ref([]);
  const receivedNotifications = ref([]);
  const activeTab = ref('sent');
  
  const loadNotifications = async () => {
    // 调用后端接口获取组队管理通知数据
    // const notifications = await getTeamNotifications(userInfoStore.info);
    //const sentNotifications = await fetchTeamSendApplication(userInfoStore.info);
    //const receivedNotifications = await fetchTeamReceiveApplication(userInfoStore.info);
    const notifications = ref([
      {
        id: 1,
        teamInfo: '队伍1',
        applicantInfo: '申请人1',
        applicationTime: '2021-10-01 12:00:00',
        applicationStatus: '待处理',
        applicationDirection: 'apply',
      },
      {
        id: 2,
        teamInfo: '队伍2',
        applicantInfo: '申请人2',
        applicationTime: '2021-10-02 12:00:00',
        applicationStatus: '已同意',
        applicationDirection: 'invite',
      },
    ]);
    sentNotifications.value = notifications.value.filter(notification => notification.applicationDirection === 'apply');
    receivedNotifications.value = notifications.value.filter(notification => notification.applicationDirection === 'invite');
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
  