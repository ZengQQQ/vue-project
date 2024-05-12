<template>
  <div class="notification-list">
    <h2>队伍and导师</h2>
    <el-tabs v-model="activeTab">
      <el-header>
        <el-form :model="queryData">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="消息内容">
                <el-input v-model.trim="queryData.smm_info"></el-input>
              </el-form-item></el-col>
            <el-col :span="6">
              <el-button type="primary" @click="searchB(queryData)">搜索</el-button>
              <el-button type="text" @click="resetQuery">reset</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-tab-pane label="邀请导师加入" name="sent">
        <el-main>
          <el-table :data="sendData">
            <el-table-column prop="stallFix.teamFix.t_name" label="我的队伍" width="150"></el-table-column>
            <el-table-column prop="mentor.u_name" label="导师"></el-table-column>
            <el-table-column prop="smm_info" label="我的理由"></el-table-column>
            <el-table-column prop="smm_pass" label="处理结果">
              <template #default="{ row }">
                <el-tag v-if="row.smm_pass === 0">考虑</el-tag>
                <el-tag v-else-if="row.smm_pass === 1">同意</el-tag>
                <el-tag type="danger" v-else-if="row.smm_pass === 2">拒绝</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-tab-pane>
      <el-tab-pane label="导师申请加入" name="receive">
        <el-main>
          <el-table :data="receiveData">
            <el-table-column prop="mentor.u_name" label="导师" width="150"></el-table-column>
            <el-table-column prop="stallFix.project.p_name" label="我的项目"></el-table-column>
            <el-table-column prop="smm_info" label="理由"></el-table-column>
            <el-table-column prop="smm_pass" label="我的处理">
              <template #default="{ row }">
                <el-tag v-if="row.smm_pass === 0">考虑</el-tag>
                <el-tag v-else-if="row.smm_pass === 1">同意</el-tag>
                <el-tag type="danger" v-else-if="row.smm_pass === 2">拒绝</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="230">
              <template #default="{ row }">
                <el-button size="default" @click="handleDetail(row)">查看导师</el-button><br>
                <hr>
                <el-button size="default" @click="handleApply(row, 1)" type="primary">同意</el-button>
                <el-button size="default" @click="handleApply(row, 2)" type="danger">拒绝</el-button>
                <!-- <el-button size="default" @click="handleApply(row, 0)">考虑</el-button> -->
              </template>
            </el-table-column>
          </el-table>


          <el-dialog v-model="detailDialog">
            <el-descriptions title="导师信息">
              <el-descriptions-item label="导师id">
                {{ teamData.m_id }}
              </el-descriptions-item>

              <el-descriptions-item label="导师名称">
                {{ teamData.u_name }}
              </el-descriptions-item>
              
              <el-descriptions-item label="导师信息">
                {{ teamData.u_info }}
              </el-descriptions-item>
              <!-- <el-descriptions-item label="队伍描述">
                {{ teamData.t_info }}
              </el-descriptions-item>
              <el-descriptions-item label="最大人数">
                {{ teamData.t_maxnum }}
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
import { useUserInfoStore } from '@/stores/userInfo.js';


// 个人信息
const userInfo = useUserInfoStore().info;
const userAcc = userInfo.u_acc;
const activeTab = ref('sent');

// 状态控制
let detailDialog = ref(false);


// 数据传递
let receiveData = ref([]);
let sendData = ref([]);
let queryData = ref({
  smm_info: '',
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
    smm_info: '',
    u_acc: userAcc
  };
  fetch(queryData.value, 1);
}



// 请求用户相关项目消息
async function fetch(data, c_page) {

  console.log('请求参数', data);
  data.currentPage = c_page;

  try {
    const res = await baseApi.post('/user/stallMentorMessage', {}, { params: data });
    // vLoading.value = false;
    if (res.code === 200) {
      if (res.data.totalSize === 0) {
        ElMessage.warning('暂无数据');
      } else {
        // 根据查询过滤
        res.data.listPage = res.data.listPage.filter(item => item.smm_info.includes(queryData.value.smm_info) || queryData.value.smm_info == '')

        // 筛选smm_dct: 0, 邀请数据
        sendData.value = res.data.listPage.filter(item => item.smm_dct === 0);

        // // 筛选smm_dct: 1, 接受数据
        receiveData.value = res.data.listPage.filter(item => item.smm_dct === 1);


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
  data.sm_pass = res;
  console.log("update receive");
  console.log(data);
  baseApi.post('/user/MentorTeamMessageApproval', {}, { params: data }).then(res => {
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

// 查看导师
const handleDetail = (row) => {
  console.log("row", row.stallFix.teamFix);
  
  teamData.value = row.mentor;
  detailDialog.value = true;
  console.log(teamDetailDialog.value);
};


//数据处理
function dataRemove(item) {
  item.sm_id = item.smm_id;

  item.m_acc = item.mentor.u_acc;
  delete item.mentor;
  
  item.t_id = item.stallFix.teamFix.t_id;
  // item.sm_pass = 
  
  delete item.stallFix;
  return item;

}


</script>

<style scoped>
.notification-list {
  padding: 20px;
}
</style>
