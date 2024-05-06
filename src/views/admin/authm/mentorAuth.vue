<template>
  <el-container>
    <el-header>
      <h3>导师查询</h3>
      <el-form :model="currentData">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="账号">
              <el-input v-model.trim="queryData.m_acc"></el-input>
            </el-form-item></el-col>
          <el-col :span="6">
            <el-form-item label="导师名称">
              <el-input v-model.trim="queryData.m_name"></el-input>
            </el-form-item></el-col>
          <el-col><el-button type="primary" @click="fetch(queryData, 1)">搜索</el-button></el-col>
        </el-row>
      </el-form>
    </el-header>
    <el-main></el-main>
    <el-footer></el-footer>
  </el-container>


  <!-- 信息添加 -->
  <div class="add">
    <el-button type="primary" plain @click="addB">添加</el-button>
    <el-dialog title="添加" v-model="showAddDialog">
      <el-form :model="currentData" label-width="100px">
        <el-form-item label="账号">
          <el-input v-model.trim="currentData.m_acc"></el-input>
        </el-form-item>

        <el-form-item label="导师名称">
          <el-input v-model.trim="currentData.m_name"></el-input>
        </el-form-item>

        <el-form-item label="允许注册">
          <el-switch v-model="currentData.m_status" active-text="允许" inactive-text="禁止"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="addApi">保存</el-button>
      </div>
    </el-dialog>
  </div>


  <!-- 信息展示 -->
  <div class="table" v-loading="tableData.length ? false : true">
    <el-table :data="tableData" stripe>
      <el-table-column prop="m_name" label="名称"></el-table-column>
      <el-table-column prop="m_acc" label="账号"></el-table-column>
      <el-table-column prop="m_status" label="状态"></el-table-column>
      <el-table-column label="操作" width="230">
        <template #default="{ row }">
          <el-button size="default" @click="editMentor(row)">编辑</el-button>
          <el-button size="default" @click="deleteMentor(row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


  <!-- 编辑框 -->
  <el-dialog title="编辑" v-model="showEditDialog">
    <div class="edit">
      <el-form :model="currentData" label-width="100px">
        <el-form-item label="导师名称">
          <el-input v-model.trim="currentData.m_name"></el-input>
        </el-form-item>
        <el-form-item label="导师状态">
          <el-switch v-model="currentData.m_status" active-text="允许" inactive-text="禁止"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="updateMentor">保存</el-button>
      </div>
    </div>
  </el-dialog>


</template>

<script setup>
import { ref } from 'vue'
import baseApi from "@/api/baseUrl.js"
import { ElMessage } from 'element-plus';


// 状态控制
let showEditDialog = ref(false);
let showAddDialog = ref(false);

// 数据传递
let tableData = ref({});
let currentData = ref(null);
const originData = ref({});
let queryData = ref({});


// 请求数据
function fetch(data, c_page) {
  data.currentPage = c_page;
  baseApi.post('/admin/queryMentor', {}, { params: data }).then(res => {
    if (res.code === 200) {
      tableData.value = res.data.listPage;
      if (res.data.totalSize === 0) {
        ElMessage.warning('暂无数据');
      }
    }
  }).catch(err => {
    console.log(err);
    ElMessage.error(err.message);
  })
}
// 初始化数据
fetch(queryData.value, 1);

// 添加方法
function addB() {
  // currentData.value.m_status = currentData.value.m_status ? true : false;
  currentData.value = { ...newRow.value };
  showAddDialog.value = true;
};

// 保存
function addApi() {
  currentData.value.m_status = currentData.value.m_status ? 1 : 0;
  baseApi.post('/mentor/add', null, { params: currentData.value }).then(res => {
    console.log(res);
    if (res.code === 200) {
      ElMessage.success(res.message);
      showAddDialog.value = false;
      // 刷新数据
      fetch(queryData, 1);
    }
  }).catch(err => {
    console.log(err);
    ElMessage.error(err.message);
  })
}

// 编辑方法
function editMentor(team) {
  currentData.value = { ...team };
  currentData.value.status = currentData.value.status === 1;
  originData.value = team;
  showEditDialog.value = true;
};

// 保存
function updateMentor() {
  // 将true设置为1，false设置为0
  currentData.value.m_status = currentData.value.status ? 1 : 0;

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
  baseApi.post('/admin/queryMentor', {}, { params: { currentPage: 1 } }).then(res => {
    if (res.code === 200) {
      tableData.value = res.data.listPage;
    }
  }).catch(err => {
    console.log(err);
    ElMessage.error(err.message);
  })
}


// 删除数据
function deleteMentor(oldData) {
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

  baseApi.post('/admin/queryMentor', {}, { params: { currentPage: 1 } }).then(res => {
    if (res.code === 200) {
      tableData.value = res.data.listPage;
    }
  }).catch(err => {
    console.log(err);
    ElMessage.error(err.message);
  })

}

</script>

<style></style>