<template>
    <div class="team-notification-list">
      <h2>组队管理通知</h2>
      <el-tabs v-model="activeTab">
        <!-- 队长消息 -->
        <el-tab-pane label="队长消息" name="captain">
          <!-- 队长发送的邀请 -->
          <h3>发送的邀请</h3>
          <template v-for="notification in captainSentInvitations" :key="notification.tsm_id">
            <el-card>
              <!-- 邀请卡片内容 -->
              <el-row><p>
                队伍名称：{{ notification.teamFix.t_name }}
              </p></el-row>
                <el-row><p>
                    接受者：{{ notification.user.u_name }}
                </p></el-row>
                <el-row><p>
                    申请时间：{{ notification.tsm_time }}
                </p></el-row>
                <el-row>
                  <p>
                    邀请信息：{{ notification.tsm_info }}
                  </p>
                </el-row>

                <el-row><p v-if="notification.tsm_pass === '0'">
                    状态：待处理
                </p>
                <p v-else-if="notification.tsm_pass === '1'">
                    状态：已同意
                </p>
                <p v-else-if="notification.tsm_pass === '2'">
                    状态：已拒绝
                </p>
            </el-row>

            <el-row><p>
                <el-button @click="handleInviteRceiver(notification)" link>查看受邀者详情</el-button>
            </p></el-row>
            </el-card>

          </template>
          <!-- 队长收到的申请 -->
          <h3>收到的申请</h3>
          <template v-for="notification in captainReceivedApplications" :key="notification.tsm_id">
            <el-card>
              <!-- 申请卡片内容 -->
                <el-row><p>
                    队伍名称：{{ notification.teamFix.t_name }}
                </p></el-row>
                <el-row><p>
                    申请人信息：{{ notification.user.u_name }}
                </p></el-row>
                <el-row><p>
                    申请时间：{{ notification.tsm_time }}
                </p></el-row>
                <el-row>
                    <p>
                        申请信息：{{ notification.tsm_info }}
                    </p>
                </el-row>
                <el-row><p v-if="notification.tsm_pass === '0'">
                    状态：待处理
                </p><p v-else-if="notification.tsm_pass === '1'">
                    状态：已同意
                </p><p v-else-if="notification.tsm_pass === '2'">
                    状态：已拒绝
                </p></el-row>

                <el-row><p>
                    <el-button @click="handleApplySenter(notification)" link>查看申请人详情</el-button>
                </p>
                <p v-if="notification.tsm_pass === '0'">
                    <el-button @click="handleApprove(notification)" type="primary">同意</el-button>
                    <el-button @click="handleReject(notification)" type="danger">拒绝</el-button>
                </p>
            </el-row>    
            </el-card>

          </template>
        </el-tab-pane>
  
        <!-- 队员消息 -->
        <el-tab-pane label="队员消息" name="member">
          <!-- 队员发送的申请 -->
          <h3>发送的申请</h3>
          <template v-for="notification in memberSentApplications" :key="notification.tsm_id">
            <el-card>
              <!-- 申请卡片内容 -->
            <el-row>
                <p>
                    队伍名称：{{ notification.teamFix.t_name }}
                </p>
            </el-row>
            <el-row>
                <p>
                    申请时间：{{ notification.tsm_time }}
                </p>
            </el-row>
            <el-row>
              <p>
                申请信息：{{ notification.tsm_info }}
              </p>
            </el-row>
            <el-row>
                <p v-if="notification.tsm_pass === '0'">
                    状态：待处理
                </p>
                <p v-else-if="notification.tsm_pass === '1'">
                    状态：已同意
                </p>
                <p v-else-if="notification.tsm_pass === '2'">
                    状态：已拒绝
                </p>
            </el-row>
            <el-row>
                <p>
                    <el-button @click="handTeamDetail(notification)" link>查看队伍详情</el-button>
                </p>
            </el-row>
            </el-card>
          </template>
          <!-- 队员收到的邀请 -->
          <h3>收到的邀请</h3>
          <template v-for="notification in memberReceivedInvitations" :key="notification.tsm_id">
            <el-card>
              <!-- 邀请卡片内容 -->
            <el-row>
                <p>
                    队伍名称：{{ notification.teamFix.t_name }}
                </p>
            </el-row>
            <el-row>
                <p>
                    邀请人信息：{{ notification.teamFix.captain.u_name }}
                </p>
            </el-row>
            <el-row>
                <p>
                    邀请时间：{{ notification.tsm_time }}
                </p>
            </el-row>
            <el-row>
                <p>
                    邀请信息：{{ notification.tsm_info }}
                </p>
            </el-row>
            <el-row>
                <p v-if="notification.tsm_pass === '0'">
                    状态：待处理
                </p>
                <p v-else-if="notification.tsm_pass === '1'">
                    状态：已同意
                </p>
                <p v-else-if="notification.tsm_pass === '2'">
                    状态：已拒绝
                </p>
            </el-row>
            <el-row>
                <p>
                    <el-button @click="handleinviteSenter(notification)" link>查看邀请人详情</el-button>
                </p>
                <p>
                    <el-button @click="handleTeam(notification)" link>查看详情</el-button>
                </p>
                <p v-if="notification.tsm_pass === '0'">
                    <el-button @click="handleApprove(notification)" type="primary">同意</el-button>
                    <el-button @click="handleReject(notification)" type="danger">拒绝</el-button>
                </p>
            </el-row>
            </el-card>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { ElTabs, ElTabPane, ElCard, ElButton } from 'element-plus';
  import { fetchTeamCaptainApplication, fetchTeamMemberApplication, agreeJoinTeam, refuseJoinTeam } from "@/api/team.js";
  import { useUserInfoStore } from '@/stores/userInfo.js';
  
  const userInfoStore = useUserInfoStore();
  const activeTab = ref('captain');
  
  const captainSentInvitations = ref([]);
  const captainReceivedApplications = ref([]);
  const memberSentApplications = ref([]);
  const memberReceivedInvitations = ref([]);
  
  // ...省略其余代码
  
  // 修改后的 loadNotifications 方法
  const loadNotifications = async () => {
    try {
      // 获取队长通知
      const capData = await fetchTeamCaptainApplication({ u_acc: userInfoStore.info.u_acc });
      // 获取队员通知
      const memData = await fetchTeamMemberApplication({ u_acc: userInfoStore.info.u_acc });
      
      if (capData.code === 200) {
        // 根据不同的 tsm_dct 筛选队长发送的邀请和收到的申请
        captainSentInvitations.value = capData.data.listPage.filter(notification => notification.tsm_dct === '0');
        captainReceivedApplications.value = capData.data.listPage.filter(notification => notification.tsm_dct === '1');
      }
  
      if (memData.code === 200) {
        // 根据不同的 tsm_dct 筛选队员发送的申请和收到的邀请
        memberSentApplications.value = memData.data.listPage.filter(notification => notification.tsm_dct === '0');
        memberReceivedInvitations.value = memData.data.listPage.filter(notification => notification.tsm_dct === '1');
      }
    } catch (error) {
      console.error('Error fetching team notifications:', error);
    }
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