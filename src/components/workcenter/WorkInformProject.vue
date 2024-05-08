<template>
  <div class="notification-list">
    <h2>工作通知</h2>
    <el-tabs v-model="activeTab">
      <el-header>
        <el-form :model="queryData">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="消息内容">
                <el-input v-model.trim="queryData.spm_info"></el-input>
              </el-form-item></el-col>
            <el-col :span="6">
              <el-button type="primary" @click="searchB(queryData)">搜索</el-button>
              <el-button type="text" @click="resetQuery">reset</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-tab-pane label="邀请队伍接手我的项目" name="sent">
        <el-main>
          <el-table :data="sendData">
            <el-table-column prop="stallFix.teamFix.t_name" label="邀请队伍" width="150"></el-table-column>
            <el-table-column prop="project.p_name" label="我的项目"></el-table-column>
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
      <el-tab-pane label="查看队伍申请我的队伍" name="receive">
        <el-main>
          <el-table :data="receiveData">
            <el-table-column prop="stallFix.teamFix.t_name" label="申请队伍名称" width="150"></el-table-column>
            <el-table-column prop="project.p_name" label="申请项目"></el-table-column>
            <el-table-column prop="spm_info" label="申请理由"></el-table-column>
            <el-table-column prop="spm_pass" label="我的处理">
              <template #default="{ row }">
                <el-tag v-if="row.spm_pass === 0">考虑</el-tag>
                <el-tag v-else-if="row.spm_pass === 1">同意</el-tag>
                <el-tag type="danger" v-else-if="row.spm_pass === 2">拒绝</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="230">
              <template #default="{ row }">
                <el-button size="default" @click="handleTeamDetail(row)">查看队伍</el-button><br>
                <hr>
                <el-button size="default" @click="handleApply(row, 1)" type="primary">同意</el-button>
                <el-button size="default" @click="handleApply(row, 2)" type="danger">拒绝</el-button>
                <!-- <el-button size="default" @click="handleApply(row,0)" >考虑</el-button> -->
              </template>
            </el-table-column>
          </el-table>


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
import { useUserInfoStore } from '@/stores/userInfo.js';


// 个人信息
const userInfo = useUserInfoStore().info;
const userAcc = userInfo.u_acc;
const activeTab = ref('sent');

// 状态控制
let teamDetailDialog = ref(false);


// 数据传递
let receiveData = ref([]);
let sendData = ref([]);
let queryData = ref({
  spm_info: '',
  u_acc: userAcc
});

let teamData = ref({});

// 搜索
function searchB(data) {
  fetch(data, 1);

}


// 重置搜索结果
function resetQuery() {
  queryData.value = {
    spm_info: '',
    u_acc: userAcc
  };
  fetch(queryData.value, 1);
}



// 请求用户相关项目消息
async function fetch(data, c_page) {

  console.log('请求参数', data);
  data.currentPage = c_page;

  try {
    const res = await baseApi.post('/user/ProjectStallMessage', {}, { params: data });
    // vLoading.value = false;
    if (res.code === 200) {
      if (res.data.totalSize === 0) {
        ElMessage.warning('暂无数据');
      } else {
        // 根据查询过滤
        res.data.listPage = res.data.listPage.filter(item => item.spm_info.includes(queryData.value.spm_info) || queryData.value.spm_info == '')

        // 筛选spm_dct: 0, 邀请数据
        sendData.value = res.data.listPage.filter(item => item.spm_dct === 0);

        // // 筛选spm_dct: 1, 接受数据
        receiveData.value = res.data.listPage.filter(item => item.spm_dct === 1);


        console.log('邀请数据');
        console.log(sendData.value);

        console.log("申请数据")
        console.log(receiveData.value)
      }
    }
  } catch (err) {
    console.log(err);
    ElMessage.error(err.message);
  }
}

// 初始化数据
fetch(queryData.value, 1);


// 处理申请
const handleApply = async (row, res) => {
  const data = dataRemove(row);
  data.spm_pass = res;
  console.log("update receive");
  console.log(data);
  baseApi.post('/admin/RelationStallProjectUpdate', {}, { params: data }).then(res => {
    if (res.code === 200) {
      ElMessage.success('操作成功');
      fetch(queryData.value, 1);
    } else {
      ElMessage.error(res.message);
    }
  }).catch(err => {
    if (err.data) {
      ElMessage.error(err.data);
    }

  });
};

// 查看队伍
const handleTeamDetail = (row) => {
  console.log("row", row.stallFix.teamFix);
  teamData.value = row.stallFix.teamFix;

  teamDetailDialog.value = true;
  console.log(teamDetailDialog.value);
};


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
