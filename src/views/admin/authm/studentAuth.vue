<template>

  <div class="table">
    <el-table :data="tableData" stripe>
      <el-table-column prop="s_name" label="名称"></el-table-column>
      <el-table-column prop="s_acc" label="账号"></el-table-column>
      <el-table-column prop="s_major" label="专业"></el-table-column>
      <el-table-column prop="s_status" label="状态"></el-table-column>
      <el-table-column label="操作" width="230">
        <template #default="{ row }">
          <el-button size="default" @click="editMentor(row)">编辑</el-button>
          <el-button size="default" @click="deleteMentor(row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>



  <div class="dialog">
    <el-dialog title="编辑" v-model="showEditDialog">
      <el-form :model="currentData" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model.trim="currentData.s_name"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model.trim="currentData.s_major"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="currentData.s_status" active-text="允许" inactive-text="禁止"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="updateMentor">保存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script setup>
import { ref } from 'vue'
// 表格数据
const tableData = ref([
  { s_acc: "admin", s_name: "孙志春", s_major: "计算机", s_status: 1 },
  { s_acc: "admin", s_name: "孙志春", s_major: "计算机", s_status: 1 },
  { s_acc: "admin", s_name: "孙志春", s_major: "计算机", s_status: 1 },
]);

// 状态控制
let showEditDialog = ref(false);

// 数据传递
let currentData = ref(null);
const newRow = ref({});
const originData = ref({});

// 编辑方法
function editMentor(team) {
  currentData.value = { ...team };
  currentData.value.s_status = currentData.value.s_status === 1;
  originData.value = team;
  showEditDialog.value = true;
};

// 保存
function updateMentor() {
  // 将true设置为1，false设置为0
  currentData.value.s_status = currentData.value.s_status ? 1 : 0;

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
function deleteMentor(oldData) {
  // 发送删除

  // 判断成功

  // 重新请求数据


}




</script>