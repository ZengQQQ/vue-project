<template>

  <div class="table">
    <el-table :data="tableData" stripe>
      <el-table-column prop="u_id" label="ID"></el-table-column>
      <el-table-column prop="u_acc" label="Account"></el-table-column>
      <el-table-column prop="u_pwd" label="Password"></el-table-column>
      <el-table-column prop="u_name" label="Name"></el-table-column>
      <el-table-column prop="u_tele" label="Telephone"></el-table-column>
      <el-table-column prop="u_mail" label="Email"></el-table-column>
      <el-table-column prop="u_wechat" label="WeChat"></el-table-column>
      <el-table-column prop="u_qq" label="QQ"></el-table-column>
      <el-table-column prop="u_info" label="Info"></el-table-column>
      <el-table-column prop="u_status" label="Status"></el-table-column>
      <el-table-column prop="u_power" label="Power"></el-table-column>
      <el-table-column prop="u_identity" label="Identity"></el-table-column>
      <el-table-column label="操作" width="230">
        <template #default="{ row }">
          <el-button size="default" @click="editUser(row)">编辑</el-button>
          <el-button size="default" @click="deleteUser(row)" type="danger">删除</el-button>
          <el-button size="default" @click="resetPW(row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>



  <div class="dialog">
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
        <el-button type="primary" @click="updateUser">保存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { test,fetch,fetchAll } from './useM'
// 表格数据

const resp = fetchAll(1);


console.log("resp");
console.log(resp);

console.log("resp.data");
console.log(resp.code);

// 状态控制
let showEditDialog = ref(false);

// 数据传递
let currentData = ref(null);
const originData = ref({});


// 编辑方法
function editUser(team) {
  currentData.value = { ...team };
  originData.value = team;
  showEditDialog.value = true;
};

// 保存
function updateUser() {
  // 发送请求到后端更新队伍信息
  console.log('更新');
  console.log("old");
  console.log(originData.value);
  console.log(currentData.value);
  update(originData.value, currentData.value);
  // 假设更新成功后，关闭弹窗
  showEditDialog.value = false;
  // 重新加载队伍列表
  fetchTeams();
}
// 请求数据

// 更新数据
function update(oldData, newData) {
  const index = tableData.value.indexOf(oldData);
  tableData.value.splice(index, 1, newData);
}

// 删除数据
function deleteUser(oldData) {
  console.log('删除');
  console.log(oldData);

  // 发送删除

  // 判断成功

  // 重新请求数据


}




</script>