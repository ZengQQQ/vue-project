
import { ref } from 'vue'
import baseApi from "@/api/baseUrl.js"
import { ElMessage } from 'element-plus';
import { ElLoading } from 'element-plus'


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
  fetch(queryData.value, 1);
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


  currentData.value.m_status = currentData.value.m_status ? 1 : 0;
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