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

        <el-header>
          <el-form :model="queryReceived">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="消息内容">
                  <el-input v-model.trim="queryReceived.spm_info"></el-input>
                </el-form-item></el-col>
              <el-col :span="6">
                <el-button type="primary" @click="searchB()">搜索</el-button>
                <el-button type="text" @click="resetQueryReceived">reset</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-header>
        <el-main>

          <el-table :data="tableData">
            <el-table-column prop="stallFix.teamFix.t_name" label="申请队伍名称" width="150"></el-table-column>
            <el-table-column prop="project.p_name" label="申请项目名称"></el-table-column>

            <el-table-column prop="spm_info" label="申请理由"></el-table-column>

            <el-table-column prop="spm_pass" label="处理结果">
              <template #default="{ row }">
                <el-tag v-if="row.spm_pass === 0">考虑</el-tag>
                <el-tag v-else-if="row.spm_pass === 1">同意</el-tag>
                <el-tag type="danger" v-else-if="row.spm_pass === 2">拒绝</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="230">
              <template #default="{ row }">
                <el-button size="default" @click="handleViewDetail(row)">查看队伍</el-button><br>
                <hr>
                <el-button size="default" @click="handleAccept(row)">同意</el-button>
                <el-button size="default" @click="handleReject(row)" type="danger">拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="编辑">

          </el-dialog>

          <el-dialog v-model="teamDetailDialog">


            <el-descriptions title="Team Info">
              <el-descriptions-item label="队伍名称">
                {{ teamData.t_name }}
              </el-descriptions-item>

              <el-descriptions-item label="队长姓名">
                {{ teamData.captain.u_name }}
              </el-descriptions-item>
              <el-descriptions-item label="队伍id">
                {{ teamData.t_id }}
              </el-descriptions-item>
              <el-descriptions-item label="队伍人数">
                {{ teamData.t_curnum }}
              </el-descriptions-item>
              <el-descriptions-item label="队伍描述">
                {{ teamData.t_info }}
              </el-descriptions-item>
              <el-descriptions-item label="最大人数">
                {{ teamData.t_maxnum }}
              </el-descriptions-item>

              <!-- <el-descriptions-item label="队伍状态">
                  {{ teamData.t_status }}
                </el-descriptions-item> -->
            </el-descriptions>

          </el-dialog>
        </el-main>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElTabs, ElTabPane, ElCard, ElButton } from 'element-plus';
import baseApi from "@/api/baseUrl.js"
import { getWorkInform, acceptWorkApplication, refuseWorkApplication } from '@/api/work.js';
import { useUserInfoStore } from '@/stores/userInfo.js';

// 个人信息
const userInfo = useUserInfoStore().info;
const userAcc = userInfo.u_acc;
const sentNotifications = ref([]);
const receivedNotifications = ref([]);
const activeTab = ref('sent');

// 状态控制
const teamDetailDialog = ref(false);

// 数据传递
const teamData = ref({});
let tableData = ref([]);
let queryReceived = ref({
  
  spm_dct: 1,
  spm_info: ''
});

let querySend = ref({
  spm_dct: 0,
  spm_info: ''
});


// 重置接受查询
function resetQueryReceived() {
  queryReceived.value = {
    spm_dct: 1
  };
  fetch(queryReceived.value, 1);
}


// 重置发送查询
function resetQuerySend() {
  querySend.value = {
    spm_dct: 0
  };
  fetch(querySend.value, 1);
}


// 搜索接受
function searchB() {
  fetch(queryReceived.value, 1);
}



// 请求数据
async function fetch(data, c_page) {

  console.log('请求数据');
  console.log(data);
  data.currentPage = c_page;

  try {
    const res = await baseApi.post('/admin/queryStallProjectMessage', {}, { params: data });
    vLoading.value = false;
    if (res.code === 200) {
      tableData.value = res.data.listPage;


      if (res.data.totalSize === 0) {
        ElMessage.warning('暂无数据');
      }
    }
  } catch (err) {
    console.log(err);
    ElMessage.error(err.message);
  }
}



// 初始化数据
fetch(queryReceived.value, 1);


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



const handleAccept = async (row) => {
  // 处理同意申请逻辑


  const data = dataRemove(row);
  data.spm_pass = 1;
  baseApi.post('/admin/RelationStallProjectUpdate', {}, { params: data }).then(res => {
    if (res.code === 200) {
      ElMessage.success('操作成功');
      fetch(queryReceived.value, 1);
    } else {
      ElMessage.error(res.message);
    }
  }).catch(err => {
    ElMessage.error(err.message);
  });
};

const handleReject = async (row) => {
  // 处理拒绝申请逻辑
  const data = dataRemove(row);
  data.spm_pass = 2;
  baseApi.post('/admin/RelationStallProjectUpdate', {}, { params: data }).then(res => {
    if (res.code === 200) {
      ElMessage.success('操作成功');
      fetch(queryReceived.value, 1);
    } else {
      ElMessage.error(res.message);
    }
  }).catch(err => {
    ElMessage.error(err.message);
  });
};

const handleViewDetail = (row) => {
  console.log("row", row.stallFix.teamFix);
  teamData.value = row.stallFix.teamFix;

  teamDetailDialog.value = true;
  console.log(teamDetailDialog.value);
};

</script>

<style scoped>
.notification-list {
  padding: 20px;
}
</style>
