<template>
  <div class="notification-list">
    <h2>工作通知</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="我发送的" name="sent">
        <el-header>
          <el-form :model="querySend">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="消息内容">
                  <el-input v-model.trim="querySend.spm_info"></el-input>
                </el-form-item></el-col>
              <el-col :span="6">
                <el-button type="primary" @click="searchB(querySend)">搜索</el-button>
                <el-button type="text" @click="resetQuerySend">reset</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-header>
        <el-main>
          <el-table :data="sentData">
            <el-table-column prop="stallFix.teamFix.t_name" label="邀请队伍名称" width="150"></el-table-column>
            <el-table-column prop="project.p_name" label="邀请项目名称"></el-table-column>
            <el-table-column prop="spm_info" label="邀请理由"></el-table-column>
            <el-table-column prop="spm_pass" label="处理结果">
              <template #default="{ row }">
                <el-tag v-if="row.spm_pass === 0">考虑</el-tag>
                <el-tag v-else-if="row.spm_pass === 1">同意</el-tag>
                <el-tag type="danger" v-else-if="row.spm_pass === 2">拒绝</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="230">
              <template #default="{ row }">
                <!-- <el-button size="default" @click="handleProjectDetail(row)">查看项目</el-button><br> -->
                <hr>
                <!-- <el-button size="default" @click="handleAccept(row)">同意</el-button>
                <el-button size="default" @click="handleReject(row)" type="danger">拒绝</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElTabs, ElTabPane, ElCard, ElButton } from 'element-plus';
import baseApi from "@/api/baseUrl.js"
import { useUserInfoStore } from '@/stores/userInfo.js';

// 个人信息
const userInfo = useUserInfoStore().info;
const userAcc = userInfo.u_acc;
const activeTab = ref('sent');

// 状态控制


// 数据传递
let sentData = ref([]);
let querySend = ref({
  spm_dct: 0,
  spm_info: '',
  u_acc:userAcc
});


// 重置发送查询
function resetQuerySend() {
  querySend.value = {
    spm_dct: 0,
    spm_info: '',
  u_acc:userAcc
  };
  fetchSend(querySend.value, 1);
}


// 搜索接受
function searchB(data) {
  fetchSend(data.value, 1);
}



// 请求邀请数据
async function fetchSend(data, c_page) {

  console.log('请求数据');
  console.log(data);
  data.currentPage = c_page;

  try {
    const res = await baseApi.post('/user/ProjectStallMessage', {}, { params: data });
    vLoading.value = false;
    if (res.code === 200) {
      sentData.value = res.data.listPage;
      // 筛选spm_dct: 0,
      sentData.value = sentData.value.filter(item => item.spm_dct === 0);
      console.log('接受数据');
      console.log(sentData.value);
      if (res.data.totalSize === 0) {
        ElMessage.warning('暂无数据');
      }
    }
  } catch (err) {
    console.log(err);
    ElMessage.error(err.message);
  }
}


// ???
// 初始化数据
fetchSend(querySend.value, 1);



// 
//数据处理
function dataRemove(item) {
  item.p_id = item.project.p_id;
  item.p_name = item.project.p_name;
  delete item.project;
  item.st_id = item.stallFix.st_id;
  item.st_name = item.stallFix.st_name;
  item.t_id = item.stallFix.teamFix.t_id;
  item.t_name = item.stallFix.teamFix.t_name;
  delete item.stallFix;
  return item;
}


</script>

<style scoped>
.notification-list {
  padding: 20px;
}
</style>
