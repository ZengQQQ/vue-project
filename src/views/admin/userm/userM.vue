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
        <el-table-column prop="u_acc" label="Account"></el-table-column>
        <el-table-column prop="u_name" label="Name"></el-table-column>
        <el-table-column prop="u_tele" label="Telephone"></el-table-column>
        <el-table-column prop="u_mail" label="Email"></el-table-column>
        <el-table-column prop="u_wechat" label="WeChat"></el-table-column>
        <el-table-column prop="u_qq" label="QQ"></el-table-column>
        <el-table-column prop="u_info" label="Info"></el-table-column>
        <el-table-column prop="u_status" label="Status"></el-table-column>
        <el-table-column prop="u_power" label="Power"></el-table-column>
        <el-table-column prop="u_identity" label="Identity"></el-table-column>
        <el-table-column label="操作" width="400">
          <template #default="{ row }">
            <el-button size="default" @click="editB(row)">编辑</el-button>
            <el-button size="default" @click="deleteB(row)" type="danger">删除</el-button>
            <el-button size="default" @click="resetPW(row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="编辑" v-model="showEditDialog">
        <el-form :model="currentData" label-width="100px">
          <el-form-item label="用户名称">
            <el-input v-model.trim="currentData.u_name"></el-input>
          </el-form-item>
          <el-form-item label="用户状态">
            <el-select v-model="currentData.u_status">
              <el-option label="0" :value="0"></el-option>
              <el-option label="1" :value="1"></el-option>
              <el-option label="2" :value="2"></el-option>
              <el-option label="3" :value="3"></el-option>
              <el-option label="4" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户权限">
            <el-select v-model="currentData.u_power">
              <el-option label="0" :value="0"></el-option>
              <el-option label="1" :value="1"></el-option>
              <el-option label="2" :value="2"></el-option>
              <el-option label="3" :value="3"></el-option>
              <el-option label="4" :value="4"></el-option>
              <el-option label="5" :value="5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户身份">
            <el-select v-model="currentData.u_identity">
              <el-option label="学生" :value="0"></el-option>
              <el-option label="教师" :value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户电话">
            <el-input v-model.trim="currentData.u_tele"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱">
            <el-input v-model.trim="currentData.u_mail"></el-input>
          </el-form-item>
          <el-form-item label="用户微信">
            <el-input v-model.trim="currentData.u_wechat"></el-input>
          </el-form-item>
          <el-form-item label="用户QQ">
            <el-input v-model.trim="currentData.u_qq"></el-input>
          </el-form-item>
          <el-form-item label="用户信息">
            <el-input v-model.trim="currentData.u_info"></el-input>
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
// 数据传递
let tableData = ref([]);
let currentData = ref(null);
const originData = ref({});
let queryData = ref({});


// 重置密码
async function resetPW(row) {
  console.log('重置密码');
  console.log(row);
  row.u_pwd = row.u_acc;
  console.log(row.u_acc);
  try {
    const res = await baseApi.post('/user/update', null, { params: row });
    console.log(res);
    if (res.code === 200) {
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message);
    }
  } catch (err) {
    console.log(err);
    ElMessage.error(err.message);
  }
}



// 重置搜索条件
function resetB() {
  queryData.value = {};
}

// 请求数据
async function fetch(data, c_page) {
  vLoading.value = true;
  console.log('请求数据');
  console.log(data);
  data.currentPage = c_page;

  try {
    const res = await baseApi.post('/admin/queryUser', {}, { params: data });
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


  currentData.value.u_status = currentData.value.u_status ? 1 : 0;
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
  currentData.value.u_status = currentData.value.u_status === 1;
  originData.value = team;
  showEditDialog.value = true;
};

// 保存
async function updateB() { 

// 假设更新成功后，关闭编辑页面  
showEditDialog.value = false;  

  // 将true设置为1，false设置为0  
  currentData.value.u_status = currentData.value.status ? 1 : 0;  
  
  // 发送请求到后端更新队伍信息  
  console.log('更新');  
  console.log("old");  
  console.log(originData.value);  
  console.log(currentData.value);  
  
  try {  
    const res = await baseApi.post('/user/update',  null, { params: currentData.value });
    console.log(res);  
    if (res.code === 200) {  
      ElMessage.success(res.message);  
      // 重新加载队伍列表  
      await fetch(queryData.value, 1); // 假设fetch返回Promise  
    }  
  } catch (err) {  
    console.log(err);  
    ElMessage.error(err.message || '更新失败，请重试');  
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