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
    <el-table-column prop="st_name" label="学生姓名"></el-table-column>
    <el-table-column prop="st_info" label="学生信息"></el-table-column>
    <el-table-column prop="u_acc" label="房主账号"></el-table-column>
    <el-table-column prop="st_status" label="学生状态">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.st_status === 0">正常</el-tag>
        <el-tag type="danger" v-else-if="scope.row.st_status === 1">解散</el-tag>
        <el-tag type="warning" v-else-if="scope.row.st_status === 2">违规</el-tag>
        <el-tag type="error" v-else>管理删除</el-tag>
      </template>
    </el-table-column>
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
            <el-form-item label="学生状态">
        <el-select v-model="formData.st_status">
          <el-option value="0">正常</el-option>
          <el-option value="1">解散</el-option>
          <el-option value="2">违规</el-option>
          <el-option value="3">管理删除</el-option>
        </el-select>
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
    baseApi.post('/admin/queryStall', {}, { params: data })
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
    baseApi.post('/stall/add', null, { params: currentData.value }).then(res => {
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
    baseApi.post('/stall/update', null, { params: currentData.value }).then(res => {
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
    baseApi.post('/stall/delete', null, { params: oldData }).then(res => {
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