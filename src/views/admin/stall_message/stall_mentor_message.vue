<template>

    <div class="add">
      <el-button type="primary" plain @click="addB">添加</el-button>
      <el-dialog title="添加比赛" v-model="showAddDialog">
        <el-form :model="currentData" label-width="100px">
          <!-- items.. -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="saveB">保存</el-button>
        </div>
      </el-dialog>
    </div>
  
    <div class="table">
      <el-table :data="tableData" stripe>
        <el-table-column prop="smm_id" label="社团ID" width="120"></el-table-column>
    <el-table-column prop="st_id" label="学生ID" width="120"></el-table-column>
    <el-table-column prop="u_acc" label="用户账号"></el-table-column>
    <el-table-column prop="smm_info" label="社团信息"></el-table-column>
    <el-table-column prop="stall_view" label="摊位可见状态">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.stall_view === 0">正常</el-tag>
        <el-tag type="danger" v-else-if="scope.row.stall_view === 1">删除</el-tag>
        <el-tag type="error" v-else>完全删除</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="mentor_view" label="导师可见状态">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.mentor_view === 0">正常</el-tag>
        <el-tag type="danger" v-else-if="scope.row.mentor_view === 1">删除</el-tag>
        <el-tag type="error" v-else>完全删除</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="smm_pass" label="社团申请状态">
      <template slot-scope="scope">
        <el-tag type="warning" v-if="scope.row.smm_pass === 0">考虑中</el-tag>
        <el-tag type="success" v-else-if="scope.row.smm_pass === 1">同意</el-tag>
        <el-tag type="danger" v-else>拒绝</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="smm_status" label="社团状态">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.smm_status === 0">正常</el-tag>
        <el-tag type="danger" v-else-if="scope.row.smm_status === 1">封禁</el-tag>
        <el-tag type="warning" v-else>审核中</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="join_status" label="加入状态">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.join_status === 0">未加入</el-tag>
        <el-tag type="success" v-else>已加入</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="smm_dct" label="社团申请类型">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.smm_dct === 0">邀请</el-tag>
        <el-tag type="success" v-else>申请</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="smm_time" label="社团申请时间"></el-table-column>
        <el-table-column label="操作" width="230">
          <template #default="{ row }">
            <el-button size="default" @click="editB(row)">编辑</el-button>
            <el-button size="default" @click="deleteB(row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  
  
  
    <div class="edit">
      <el-dialog title="编辑" v-model="showEditDialog">
        <el-form :model="currentData" label-width="100px">
            <el-form-item label="社团ID">
        <el-input v-model="formData.smm_id" disabled></el-input>
      </el-form-item>
      <el-form-item label="学生ID">
        <el-input v-model="formData.st_id" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model="formData.u_acc" disabled></el-input>
      </el-form-item>
      <el-form-item label="社团信息">
        <el-input type="textarea" :rows="3" v-model="formData.smm_info"></el-input>
      </el-form-item>
      <el-form-item label="摊位可见状态">
        <el-select v-model="formData.stall_view">
          <el-option value="0">正常</el-option>
          <el-option value="1">删除</el-option>
          <el-option value="2">完全删除</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="导师可见状态">
        <el-select v-model="formData.mentor_view">
          <el-option value="0">正常</el-option>
          <el-option value="1">删除</el-option>
          <el-option value="2">完全删除</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="社团申请状态">
        <el-select v-model="formData.smm_pass">
          <el-option value="0">考虑中</el-option>
          <el-option value="1">同意</el-option>
          <el-option value="2">拒绝</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="社团状态">
        <el-select v-model="formData.smm_status">
          <el-option value="0">正常</el-option>
          <el-option value="1">封禁</el-option>
          <el-option value="2">审核中</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加入状态">
        <el-select v-model="formData.join_status">
          <el-option value="0">未加入</el-option>
          <el-option value="1">已加入</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="社团申请类型">
        <el-select v-model="formData.smm_dct">
          <el-option value="0">邀请</el-option>
          <el-option value="1">申请</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="社团申请时间">
        <el-date-picker v-model="formData.smm_time" type="datetime" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>
        </el-form>
  
        <div slot="footer" class="dialog-footer">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button type="primary" @click="updateB">保存</el-button>
        </div>
      </el-dialog>
    </div>
  
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import baseApi from "@/api/baseUrl.js"
  import { ElMessage } from 'element-plus';
  
  
  // 请求数据
  function fetch(data, page) {
    data.currentPage = page;
    baseApi.post('/admin/queryQuery', {}, { params: data })
      .then(res => {
        if (res.code === 200) {
          tableData.value = res.data.listPage;
        }
      })
      .catch(err => {
        console.log(err);
        ElMessage.error(err.message);
      })
  }
  
  
  
  
  let tableData = ref({});
  fetch({}, 1);
  
  
  // 状态控制
  let showEditDialog = ref(false);
  let showAddDialog = ref(false);
  
  // 数据传递
  let currentData = ref(null);
  const originData = ref({});
  
  
  // 添加按钮
  function addB() {
    currentData.value.p_status = currentData.value.p_status ? true : false;
    currentData.value = { ...newRow.value };
    showAddDialog.value = true;
  };
  
  // 保存
  function saveB() {
    currentData.value.p_status = currentData.value.p_status ? 1 : 0;
    baseApi.post('/mentor/add', null, { params: currentData.value }).then(res => {
      console.log(res);
      if (res.code === 200) {
        ElMessage.success(res.message);
        showAddDialog.value = false;
      }
    }).catch(err => {
      console.log(err);
      ElMessage.error(err.message);
    })
  }
  
  
  
  
  
  // 编辑方法
  function editB(team) {
    currentData.value = { ...team };
    currentData.value.status = currentData.value.status === 1;
    originData.value = team;
    showEditDialog.value = true;
  };
  
  // 保存
  function updateB() {
    // 将true设置为1，false设置为0
    currentData.value.status = currentData.value.status ? 1 : 0;
  
    // 发送请求到后端更新队伍信息
    console.log('更新');
    console.log("old");
    console.log(originData.value);
    console.log(currentData.value);
    baseApi.post('/mentor/update', null, { params: currentData.value }).then(res => {
      console.log(res);
      if (res.code === 200) {
        ElMessage.success(res.message);
        // 假设更新成功后，关闭添加页面
        showEditDialog.value = false;
      }
    }).catch(err => {
      console.log(err);
      ElMessage.error(err.message);
    })
  
    // 重新加载队伍列表
    fetch({}, 1);
  }
  
  
  // 删除数据
  function deleteB(oldData) {
    // 发送删除
    baseApi.post('/mentor/delete', null, { params: oldData }).then(res => {
      console.log(res);
      if (res.code === 200) {
        ElMessage.success(res.message);
        // 假设删除成功后，关闭添加页面
        showEditDialog.value = false;
      }
    }).catch(err => {
      console.log(err);
      ElMessage.error(err.message);
    })
  
    // 重新请求数据
    fetch({}, 1);
  
  
  }
  
  
  
  
  </script>