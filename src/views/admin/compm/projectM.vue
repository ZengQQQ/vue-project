<template>
  <el-container>
    <el-header>
      <el-form :model="queryData">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="信息">
              <el-input v-model.trim="queryData.p_info"></el-input>
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

      <el-button type="primary" plain @click="addB" disabled>添加</el-button>
      <el-dialog title="添加比赛" v-model="showAddDialog">
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
            <el-input v-model="currentData.u_acc" disabled></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="saveB">保存</el-button>
        </div>
      </el-dialog>

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
          <!-- 状态，次数，同意 -->
          <el-form-item label="状态" prop="p_status">
            <el-select v-model="currentData.p_status" placeholder="请选择">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="无限次数" prop="p_maxtime">
            <el-input-number v-model="currentData.p_maxtime" :min="0" :max="10" @change="handleChange" />
          </el-form-item>

          <el-form-item label="无需同意" prop="p_resagree">
            <el-select v-model="currentData.p_resagree" placeholder="请选择">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
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

    </el-main>
    <el-footer></el-footer>
  </el-container>
  <div class="add">

  </div>
</template>

<script setup>


import { ref } from 'vue'
import baseApi from "@/api/baseUrl.js"
import { ElMessage } from 'element-plus';
import { useUserInfoStore } from "@/stores/userInfo.js";

const projectInfo = useUserInfoStore().info;



// 状态控制
let showEditDialog = ref(false);
let showAddDialog = ref(false);
// 数据传递
let tableData = ref([]);
let currentData = ref(null);
const originData = ref({});
let queryData = ref({});



// 重置搜索条件
function resetB() {
  queryData.value = {};
  // 刷新数据  
  fetch(queryData.value, 1);
}

// 请求数据
async function fetch(data, c_page) {
  vLoading.value = true;
  console.log('请求数据');
  console.log(data);
  data.currentPage = c_page;

  try {
    const res = await baseApi.post('/admin/queryProject', {}, { params: data });
    vLoading.value = false;
    if (res.code === 200) {
      tableData.value = res.data.listPage;
      // 处理数据
      // 处理数据,每一个
      tableData.value.forEach((item) => {
        item.u_acc = item.editor.u_acc;
        // 删除editor
        delete item.editor;
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

  // 获取当前登录用户的账号
  currentData.value.u_acc = projectInfo.u_acc;
};

// 保存 
async function saveB() {

  // 关闭添加框，确保在请求完成后执行  
  showAddDialog.value = false;


  currentData.value.m_status = currentData.value.m_status ? 1 : 0;
  try {
    const res = await baseApi.post('/project/add', null, { params: currentData.value });
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

  // 将true设置为1，false设置为0  
  currentData.value.m_status = currentData.value.status ? 1 : 0;

  // 发送请求到后端更新队伍信息  
  console.log('更新');
  console.log("old");
  console.log(originData.value);
  console.log(currentData.value);

  try {
    const res = await baseApi.post('/project/update', null, { params: currentData.value });
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
    const res = await baseApi.post('/project/delete', null, { params: oldData }); // 假设 oldData 是请求体  

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