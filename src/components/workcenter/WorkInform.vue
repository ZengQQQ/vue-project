<template>
  <div class="notification-list">
    <h2>工作通知</h2>
    <el-tabs v-model="activeTab">
      <div>
        <router-link></router-link>
      </div>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElTabs, ElTabPane, ElCard, ElButton } from 'element-plus';
import baseApi from "@/api/baseUrl.js"
import { useUserInfoStore } from '@/stores/userInfo.js';
import { useRouter } from "vue-router";

</script>

<style scoped>
.notification-list {
  padding: 20px;
}
</style>
