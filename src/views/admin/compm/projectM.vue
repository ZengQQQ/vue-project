<template>

  <div class="add">
    <el-button type="primary" plain @click="addB">添加</el-button>

    <el-dialog title="ADD" v-model="showAddDialog">
      <el-form :model="currentData" label-width="100px">
        <el-form-item label="项目名称" prop="p_name">
          <el-input v-model="currentData.p_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="saveB">保存</el-button>
      </div>
    </el-dialog>


    <!-- <el-dialog title="添加比赛" v-model="showAddDialog">
      <el-form :model="currentData" label-width="100px">
        <el-form-item label="项目名称" prop="p_name">
          <el-input v-model="currentData.p_name"></el-input>
        </el-form-item>
        <el-form-item label="项目信息" prop="p_info">
          <el-input v-model="currentData.p_info"></el-input>
        </el-form-item>
        <el-form-item label="项目等级" prop="p_level">
          <el-select v-model="currentData.p_level" placeholder="请选择">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
            <el-option label="D" value="D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="p_st">
          <el-date-picker v-model="currentData.p_st" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期" prop="p_ddl">
          <el-date-picker v-model="currentData.p_ddl" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="URL" prop="p_url">
          <el-input v-model="currentData.p_url"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="p_img">
          <el-input v-model="currentData.p_img"></el-input>
        </el-form-item>
        <el-form-item label="完成条件" prop="p_cc">
          <el-input v-model="currentData.p_cc"></el-input>
        </el-form-item>
        <el-form-item label="发布者" prop="u_acc">
          <el-input v-model="currentData.u_acc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="saveB">保存</el-button>
      </div>
    </el-dialog> -->
  </div>

  <div class="table">
    <el-table :data="tableData" stripe>
      <el-table-column prop="u_acc" label="发布者"></el-table-column>
      <el-table-column prop="p_name" label="项目名称"></el-table-column>
      <el-table-column prop="p_info" label="项目信息"></el-table-column>
      <el-table-column prop="p_level" label="项目等级"></el-table-column>
      <el-table-column prop="p_st" label="开始日期"></el-table-column>
      <el-table-column prop="p_ddl" label="截止日期"></el-table-column>
      <el-table-column prop="p_url" label="URL"></el-table-column>
      <el-table-column prop="p_img" label="图片"></el-table-column>
      <el-table-column prop="p_cc" label="完成条件"></el-table-column>
      <el-table-column prop="p_status" label="状态"></el-table-column>
      <el-table-column prop="p_maxtime" label="无限次数"></el-table-column>
      <el-table-column prop="p_resagree" label="0无需同意"></el-table-column>
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
        <el-form-item label="项目名称" prop="p_name">
          <el-input v-model="currentData.p_name"></el-input>
        </el-form-item>
        <el-form-item label="项目信息" prop="p_info">
          <el-input v-model="currentData.p_info"></el-input>
        </el-form-item>
        <el-form-item label="项目等级" prop="p_level">
          <el-select v-model="currentData.p_level" placeholder="请选择">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
            <el-option label="D" value="D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="p_st">
          <el-date-picker v-model="currentData.p_st" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期" prop="p_ddl">
          <el-date-picker v-model="currentData.p_ddl" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="URL" prop="p_url">
          <el-input v-model="currentData.p_url"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="p_img">
          <el-input v-model="currentData.p_img"></el-input>
        </el-form-item>
        <el-form-item label="完成条件" prop="p_cc">
          <el-input v-model="currentData.p_cc"></el-input>
        </el-form-item>
        <el-form-item label="发布者" prop="u_acc">
          <el-input v-model="currentData.u_acc"></el-input>
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
let tableData = ref({});

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





fetch({}, 1);


// 状态控制
let showEditDialog = ref(false);
let showAddDialog = ref(false);

// 数据传递
let currentData = ref(null);
const originData = ref({});


// 添加按钮
function addB() {
  // currentData.value.p_status = currentData.value.p_status ? true : false;
  currentData.value = {};
  showAddDialog.value = true;
};

// 保存
function saveB() {
  currentData.value.p_status = currentData.value.p_status ? 1 : 0;
  baseApi.post('/project/add', null, { params: currentData.value }).then(res => {
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
  currentData.value.p_status = currentData.value.p_status === 1;
  originData.value = team;
  showEditDialog.value = true;
};

// 保存
function updateB() {
  // 将true设置为1，false设置为0
  currentData.value.p_status = currentData.value.p_status ? 1 : 0;

  // 发送请求到后端更新队伍信息
  console.log('更新');
  console.log("old");
  console.log(originData.value);
  console.log(currentData.value);
  baseApi.post('/project/update', null, { params: currentData.value }).then(res => {
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
    }
  }).catch(err => {
    console.log(err);
    ElMessage.error(err.message);
  })

  // 重新请求数据
  fetch({}, 1);
}




</script>