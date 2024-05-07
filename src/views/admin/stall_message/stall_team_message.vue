<template>
  <el-container>
    <el-header>
      <el-form :model="queryData">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="账号">
              <el-input v-model.trim="queryData.u_acc"></el-input>
            </el-form-item></el-col>
          <el-col :span="6">
            <el-form-item label="名称">
              <el-input v-model.trim="queryData.u_name"></el-input>
            </el-form-item></el-col>
          <el-col :span="6">
            <el-button type="primary" @click="fetch(queryData, 1)">搜索</el-button>
            <el-button type="text" @click="resetB">reset</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-header>


    <el-main>
      <el-table :data="tableData" stripe>
        <el-table-column prop="stm_id" label="消息id" width="150"></el-table-column>
        <el-table-column prop="stm_info" label="消息内容"></el-table-column>
        <el-table-column prop="st_name" label="房间"></el-table-column>
        <el-table-column prop="stm_dct" label="消息申请类型">
          <template #default="{ row }">
            <el-tag v-if="row.stm_dct === 0">< --</el-tag>
            <el-tag type="success" v-else>'-- >'</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="t_name" label="队伍"></el-table-column>
        <el-table-column prop="team_view" label="队伍可见状态">
          <template #default="{ row }">
            <el-tag v-if="row.team_view === 0">正常</el-tag>
            <el-tag type="danger" v-else-if="row.team_view === 1">删除</el-tag>
            <el-tag type="error" v-else>完全删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="stm_pass" label="消息申请状态">
          <template #default="{ row }">
            <el-tag type="warning" v-if="row.stm_pass === 0">考虑中</el-tag>
            <el-tag type="success" v-else-if="row.stm_pass === 1">同意</el-tag>
            <el-tag type="danger" v-else>拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="stm_status" label="消息状态">
          <template #default="{ row }">
            <el-tag v-if="row.stm_status === 0">正常</el-tag>
            <el-tag type="danger" v-else-if="row.stm_status === 1">删除</el-tag>
            <el-tag type="danger" v-else-if="row.stm_status === 2">封禁</el-tag>
            <el-tag type="warning" v-else-if="row.stm_status === 3">审核中</el-tag>
            <el-tag type="danger" v-else>屏蔽</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="join_status" label="加入状态">
          <template #default="{ row }">
            <el-tag v-if="row.join_status === 0">未加入</el-tag>
            <el-tag type="success" v-else>已加入</el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="stm_time" label="消息申请时间"></el-table-column>
        <el-table-column label="操作" width="230">
          <template #default="{ row }">
            <el-button size="default" @click="editB(row)">编辑</el-button>
            <el-button size="default" @click="deleteB(row)" type="danger">删除</el-button>
            <!-- <el-button size="default" @click="deleteB(row)" type="danger">管理</el-button> -->
          </template>
        </el-table-column>

      </el-table>

      
      <el-dialog title="编辑" v-model="showEditDialog">
        <el-form :model="currentData" label-width="100px">
          <el-form-item label="消息ID">
            <el-input v-model="currentData.stm_id" disabled></el-input>
          </el-form-item>
          <el-form-item label="消息信息">
            <el-input type="textarea" :rows="3" v-model="currentData.stm_info" disabled></el-input>
          </el-form-item>
          <el-form-item label="消息状态">
            <el-select v-model="currentData.stm_status">
              <el-option label="正常" value="0">正常</el-option>
              <el-option value="1">删除</el-option>
              <el-option value="2">封禁</el-option>
              <el-option value="3">审核中</el-option>
              <el-option value="4">屏蔽</el-option>
            </el-select>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button type="primary" @click="updateB">保存</el-button>
        </div>
      </el-dialog>


    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script setup>


import { ref } from 'vue'
import baseApi from "@/api/baseUrl.js"
import { ElMessage } from 'element-plus';

// 状态控制
let showEditDialog = ref(false);
let showAddDialog = ref(false);
let vLoading = ref(false);

// 数据传递
let tableData = ref([]);
let currentData = ref(null);
const originData = ref({});
let queryData = ref({});



// 重置搜索条件
function resetB() {
  queryData.value = {};
  fetch(queryData.value, 1);
}
// 请求数据
async function fetch(data, c_page) {
  vLoading.value = true;
  console.log('请求数据');
  console.log(data);
  data.currentPage = c_page;
  try {
    const res = await baseApi.post('/admin/queryStallTeamMessage', {}, { params: data });
    vLoading.value = false;
    if (res.code === 200) {
      tableData.value = res.data.listPage;
      //数据处理
      tableData.value.forEach((item) => {
        item.st_id = item.stallFix.st_id;
        item.st_name = item.stallFix.st_name;
        delete item.stallFix;

        item.t_id = item.team.t_id;
        item.t_name = item.team.t_name;
        delete item.team;





      });
      if (res.data.totalSize === 0) {
        ElMessage.warning('暂无数据');
      }
    }
  } catch (err) {
    console.log(err);
    ElMessage.error(err.message);
    vLoading.value = false; // 确保在错误时也更新加载状态  
  }
}


// 初始化数据
fetch(queryData.value, 1);






// 添加方法
function addB() {
  currentData.value = {};
  showAddDialog.value = true;
};

// 保存 
async function saveB() {

  // 关闭添加框，确保在请求完成后执行  
  showAddDialog.value = false;
  try {
    const res = await baseApi.post('/user/add', null, { params: currentData.value });
    console.log(res);
    if (res.code === 200) {
      console.log(res.message);
      ElMessage.success(res.message);
      // 刷新数据  
      fetch(queryData.value, 1);
    } else {
      ElMessage.error("网络速度慢，手动刷新");
    }

  } catch (err) {
    console.log(err);
    ElMessage.error(err.message || "网络速度慢，手动刷新"); // 如果 err.message 不存在，则显示默认消息  
  }
}





// 编辑方法
function editB(team) {
  currentData.value = { ...team };
  currentData.value.m_status = currentData.value.m_status === 1;
  originData.value = team;
  showEditDialog.value = true;
};

// 保存
async function updateB() {

  // 假设更新成功后，关闭编辑页面  
  showEditDialog.value = false;
  // 发送请求到后端更新队伍信息  
  console.log('更新');
  console.log("old");
  console.log(originData.value);
  console.log(currentData.value);

  try {
    const res = await baseApi.post('/admin/RelationStallTeamUpdate', null, { params: currentData.value });
    console.log(res);
    if (res.code === 200) {
      ElMessage.success(res.message);
      // 重新加载队伍列表  
      await fetch(queryData.value, 1); // 假设fetch返回Promise  
    }
  } catch (err) {
    console.log(err);
    ElMessage.error(err.message || '更新失败，请重试');
    if (err.data){
      ElMessage.error(err.data);
    }
  }
}

async function deleteB(oldData) {
  // 发送删除请求前，显示加载状态  
  vLoading.value = true;

  try {
    // 注意：如果 oldData 是请求参数，通常应该放在请求体中，而不是作为 params  
    // 但这取决于您的后端 API 设计  
    const res = await baseApi.post('/user/delete', null, { params: oldData }); // 假设 oldData 是请求体  

    // 请求完成后，隐藏加载状态  
    vLoading.value = false;

    console.log(res);
    if (res.code === 200) {
      ElMessage.success(res.message);
      // 删除成功后，重新加载数据  
      fetch(queryData.value, 1);
    }
  } catch (err) {
    // 请求发生错误时，隐藏加载状态（如果需要）  
    vLoading.value = false;
    console.log(err);
    ElMessage.error(err.message || '删除失败，请重试');
  }
}
</script>