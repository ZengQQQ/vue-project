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

    <!-- 查看受邀者详情对话框 -->
    <el-dialog v-model="viewInviterDialog" title="受邀者详情" width="30%">
      <el-row>
        <el-col :span="6">账号：</el-col>
        <el-col :span="18">{{ userInfo.u_acc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">姓名：</el-col>
        <el-col :span="18">{{ userInfo.u_name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">专业：</el-col>
        <el-col :span="18">{{ userInfo.u_major }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">介绍：</el-col>
        <el-col :span="18">{{ userInfo.u_info }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">邮箱：</el-col>
        <el-col :span="18">{{ userInfo.u_mail }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">电话：</el-col>
        <el-col :span="18">{{ userInfo.u_tele }}</el-col>
      </el-row>
    </el-dialog>

    <!-- 查看申请人详情对话框 -->
    <el-dialog v-model="viewApplyerDialog" title="申请人详情" width="30%">
      <el-row>
        <el-col :span="6">账号：</el-col>
        <el-col :span="18">{{ userInfo.u_acc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">姓名：</el-col>
        <el-col :span="18">{{ userInfo.u_name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">专业：</el-col>
        <el-col :span="18">{{ userInfo.u_major }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">介绍：</el-col>
        <el-col :span="18">{{ userInfo.u_info }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">邮箱：</el-col>
        <el-col :span="18">{{ userInfo.u_mail }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">电话：</el-col>
        <el-col :span="18">{{ userInfo.u_tele }}</el-col>
      </el-row>
    </el-dialog>

    <!-- 查看队伍详情对话框 -->
    <el-dialog v-model="viewTeamDialog" title="队伍详情" width="30%">
      <el-row>
        <el-col :span="6">队伍名称：</el-col>
        <el-col :span="18">{{ teamInfo.t_name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">队伍信息：</el-col>
        <el-col :span="18">{{ teamInfo.t_info }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">队长：</el-col>
        <el-col :span="18">{{ teamInfo.captain.u_name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">队员：</el-col>
        <el-col :span="18">
          <template v-for="member in teamInfo.members" :key="member.u_id">
            {{ member.u_name }}{{ member.u_id === teamInfo.captain.u_id ? '(队长)' : '' }}{{ teamInfo.members.length > 1 && member !== teamInfo.members[teamInfo.members.length - 1] ? '，' : '' }}
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">人数：</el-col>
        <el-col :span="18">{{ teamInfo.t_curnum}}/{{ teamInfo.t_maxnum }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">队伍介绍：</el-col>
        <el-col :span="18"> {{ teamInfo.t_info }}</el-col>
      </el-row>
    </el-dialog>
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

      console.log('capData', capData);
      console.log('memData', memData);

      if (capData.code === 200) {
        // 根据不同的 tsm_dct 筛选队长发送的邀请和收到的申请
        captainSentInvitations.value = capData.data.listPage.filter(notification => notification.tsm_dct === 0);
        captainReceivedApplications.value = capData.data.listPage.filter(notification => notification.tsm_dct === 1);

        console.log('captainSentInvitations', capData.data.listPage);
        console.log('filter captainSentInvitations', captainSentInvitations.value);
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
  

  const viewInviterDialog = ref(false);
  const viewApplyerDialog = ref(false);
  const viewTeamDialog = ref(false);
  const userInfo = ref({
          "u_acc": '',
          "u_id": '',
          "u_identity": '',
          "u_info":'',
          "u_mail": '',
          "u_major": '',
          "u_name": '',
          "u_power": '',
          "u_pwd": '',
          "u_status":'',
          "u_tele":'',
  });
  const teamInfo = ref({
          "captain": {},
          "members": [],
          "t_curnum":'' ,
          "t_id": '',
          "t_info": '',
          "t_maxnum": '',
          "t_name": '',
          "t_status": '',
  });
  const handleInviteRceiver = (notification) => {
    // 处理查看受邀者详情逻辑
    console.log('查看受邀者详情', notification);
    userInfo.value = notification.user;
    viewInviterDialog.value = true;
  };
  
  const handleApplySenter = (notification) => {
    // 处理查看申请人信息详情逻辑
    console.log('查看申请人详情', notification);
    userInfo.value = notification.user;
    viewApplyerDialog.value = true;
  };

  const handTeamDetail = (notification) => {
    // 处理查看队伍详情逻辑
    console.log('查看队伍详情', notification);
    teamInfo.value = notification.teamFix;
    viewTeamDialog.value = true;
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