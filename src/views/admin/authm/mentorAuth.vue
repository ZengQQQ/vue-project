<template>
  <el-container>
    <el-header>
      <el-form :model="queryData">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="账号">
              <el-input v-model.trim="queryData.m_acc"></el-input>
            </el-form-item></el-col>
          <el-col :span="6">
            <el-form-item label="导师名称">
              <el-input v-model.trim="queryData.m_name"></el-input>
            </el-form-item></el-col>
          <el-col :span="6"><el-button type="primary" @click="fetch(queryData, 1)">搜索</el-button></el-col>
        </el-row>
      </el-form>
    </el-header>

    <el-main>
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
      <!-- 数据表 -->
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

    </el-main>
    <el-footer></el-footer>
  </el-container>



</template>

<script setup>
import { ref, toRaw } from 'vue'
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


// 请求数据
async function fetch(data, c_page) {
  vLoading.value = true;
  console.log('请求数据');
  console.log(data);
  data.currentPage = c_page;

  try {
    const res = await baseApi.post('/admin/queryMentor', {}, { params: data });
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
async function addApi() {

  // 关闭添加框，确保在请求完成后执行  
  showAddDialog.value = false;


  currentData.value.m_status = currentData.value.m_status ? 1 : 0;
  let raw = toRaw(currentData.value);
  console.log(raw);

  try {
    const res = await baseApi.post('/mentor/add', null, { params: currentData.value });  
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
function editMentor(team) {
  currentData.value = { ...team };
  currentData.value.m_status = currentData.value.m_status === 1;
  originData.value = team;
  showEditDialog.value = true;
};

// 保存
async function updateMentor() { 

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
    const res = await baseApi.post('/mentor/update',  null, { params: currentData.value });
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


// 删除数据  

async function deleteMentor(oldData) {
  // 发送删除请求前，显示加载状态  
  vLoading.value = true;

  try {
    // 注意：如果 oldData 是请求参数，通常应该放在请求体中，而不是作为 params  
    // 但这取决于您的后端 API 设计  
    const res = await baseApi.post('/mentor/delete', null, { params: oldData }); // 假设 oldData 是请求体  

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

<style></style>