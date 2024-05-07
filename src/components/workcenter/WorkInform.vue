<template>
  <div class="notification-list">
    <h2>工作通知</h2>
    
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
              <el-button @click="handleAccept(notification)" type="primary">同意</el-button>
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

import { getWorkInform, acceptWorkApplication, refuseWorkApplication } from '@/api/work.js'; 
import { useUserInfoStore } from '@/stores/userInfo.js';

const userInfoStore = useUserInfoStore();

const sentNotifications = ref([]);
const receivedNotifications = ref([]);
const activeTab = ref('sent');

const loadNotifications = async () => {
  // 调用后端接口获取工作通知数据
  const notifications = await getWorkInform(userInfoStore.info);
};

const handleAccept = async (notification) => {
  // 处理同意申请逻辑
  await acceptWorkApplication(notification.id);
  loadNotifications();
};
  
const handleReject = async (notification) => {
  // 处理拒绝申请逻辑
  await refuseWorkApplication(notification.id);
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
.notification-list {
  padding: 20px;
}
</style>
