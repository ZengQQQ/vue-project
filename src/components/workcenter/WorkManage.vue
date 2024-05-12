<template>
  <div class="project-list">
    <h2>我的项目管理</h2>
    <el-button
      type="primary"
      class="create-button"
      @click="showCreateProjectDialog"
      >创建项目</el-button
    >
    <el-table :data="projects" class="project-table" stripe border>
      <el-table-column prop="p_name" label="项目名称"></el-table-column>
      <el-table-column prop="p_info" label="项目介绍"></el-table-column>
      <el-table-column prop="p_level" label="项目级别"></el-table-column>
      <el-table-column prop="p_st" label="开始时间"></el-table-column>
      <el-table-column prop="p_ddl" label="截止时间"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button
            @click="showEditProjectDialog(row)"
            class="edit-button"
            link
            >编辑</el-button
          >
          <el-button @click="deleteProject(row)" class="delete-button" link
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 创建项目弹窗 -->
    <el-dialog title="创建项目" v-model="createDialogVisible" width="50%">
      <el-form :model="newProjectForm" label-width="100px">
        <el-form-item label="项目名称" required>
          <el-input
            v-model="newProjectForm.p_name"
            maxlength="50"
            placeholder="请输入项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目介绍">
          <el-input
            v-model="newProjectForm.p_info"
            type="textarea"
            maxlength="500"
            placeholder="请输入项目介绍"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目级别" required>
          <el-select
            v-model="newProjectForm.p_level"
            placeholder="请选择项目级别"
          >
            <el-option label="A (比赛)" value="A"></el-option>
            <el-option label="B (比赛)" value="B"></el-option>
            <el-option label="C (比赛)" value="C"></el-option>
            <el-option label="D (日常任务)" value="D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="newProjectForm.p_st"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker
            v-model="newProjectForm.p_ddl"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="比赛网址">
          <el-input
            v-model="newProjectForm.p_url"
            maxlength="50"
            placeholder="请输入网址"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="比赛图片">
          <el-upload
            action="上传图片的服务器地址"
            list-type="picture"
            v-model="newProjectForm.p_img"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item> -->
        <el-form-item label="完成条件" required>
          <el-input
            v-model="newProjectForm.p_cc"
            type="textarea"
            maxlength="300"
            placeholder="请输入完成条件"
          ></el-input>
        </el-form-item>
        <el-form-item label="最大申请数量" required>
          <el-input-number
            v-model="newProjectForm.p_maxtime"
            :min="0"
            label="最大申请数量 "
          ></el-input-number>
        </el-form-item>
        <el-form-item label="需要同意">
          <el-switch v-model="newProjectForm.p_resagree"></el-switch>
        </el-form-item>
        <el-form-item label="项目状态" required>
          <el-radio-group v-model="newProjectForm.p_status">
            <el-radio :value="0">正常</el-radio>
            <el-radio :value="1">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createProject" type="primary">创建</el-button>
      </div>
    </el-dialog>

    <!-- 编辑项目弹窗 -->
    <el-dialog title="编辑项目" v-model="editDialogVisible" width="50%">
      <el-form :model="editedProject" label-width="100px">
        <el-form-item label="项目名称" required>
          <el-input
            v-model="editedProject.p_name"
            maxlength="50"
            placeholder="请输入项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目介绍">
          <el-input
            v-model="editedProject.p_info"
            type="textarea"
            maxlength="500"
            placeholder="请输入项目介绍"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目级别" required>
          <el-select
            v-model="editedProject.p_level"
            placeholder="请选择项目级别"
          >
            <el-option label="A (比赛)" value="A"></el-option>
            <el-option label="B (比赛)" value="B"></el-option>
            <el-option label="C (比赛)" value="C"></el-option>
            <el-option label="D (日常任务)" value="D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="editedProject.p_st"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker
            v-model="editedProject.p_ddl"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="比赛网址">
          <el-input
            v-model="editedProject.p_url"
            maxlength="50"
            placeholder="请输入网址"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="比赛图片"> -->
          <!-- <el-upload
            action="上传图片的服务器地址"
            list-type="picture"
            v-model="editedProject.p_img"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload> -->
        <!-- </el-form-item> -->
        <el-form-item label="完成条件" required>
          <el-input
            v-model="editedProject.p_cc"
            type="textarea"
            maxlength="300"
            placeholder="请输入完成条件"
          ></el-input>
        </el-form-item>
        <el-form-item label="最大申请数" required>
          <el-input-number
            v-model="editedProject.p_maxtime"
            :min="0"
            label="最大申请数"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="需要同意">
          <el-switch v-model="editedProject.p_resagree"></el-switch>
        </el-form-item>
        <el-form-item label="项目状态" required>
          <el-radio-group v-model="editedProject.p_status">
            <el-radio :value="0">正常</el-radio>
            <el-radio :value="1">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateProject" type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>

  <!-- 在项目列表下方添加分页组件 -->
<el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-size="pageSize"
  layout="total, prev, pager, next, jumper"
  :total="totalSize"
></el-pagination>
</template>

<script setup>
import { ref } from "vue";
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElMessage,
  ElMessageBox,
} from "element-plus";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { createJob, updateJob, deleteJob,fetchMyJobs } from "@/api/work.js";

const userInfoStore = useUserInfoStore();
const projects = ref([]);
const createDialogVisible = ref(false);
const newProjectForm = ref({
  p_name: "",
  p_info: "",
  p_level: "A", // 默认值
  p_st: null,
  p_ddl: null,
  p_url: "#", // 默认值
  p_img: null,
  p_cc: "",
  p_maxtime: 0, // 默认值
  p_resagree: 0, // 默认值
  p_status: 0, // 默认值
});

const editDialogVisible = ref(false);
const editedProject = ref({
  p_name: "",
  p_info: "",
  p_level: "A", // 默认值
  p_st: null,
  p_ddl: null,
  p_url: "#", // 默认值
  p_img: null,
  p_cc: "",
  p_maxtime: 0, // 默认值
  p_resagree: 0, // 默认值
  p_status: 0, // 默认值
});

const currentProject = ref(null);

const showCreateProjectDialog = () => {
  createDialogVisible.value = true;
};

const showEditProjectDialog = (project) => {
  currentProject.value = { ...project };
  editedProject.value = { ...project };
  editDialogVisible.value = true;
};


// 在 script 标签中添加分页相关的数据
const currentPage = ref(1); // 当前页
const pageSize = ref(16); // 每页显示的数量
const totalSize = ref(0); // 总数量

// 分页大小改变时的处理函数
const handleSizeChange = (val) => {
  pageSize.value = val;
  fetchProjects();
};

// 当前页改变时的处理函数
const handleCurrentChange = (val) => {
  currentPage.value = val;
  fetchProjects();
};

const createProject = async() => {
  if (!checkDates(newProjectForm.value.p_st, newProjectForm.value.p_ddl)) {
    ElMessage.error('开始时间不能晚于截止时间');
    // createDialogVisible.value = true;
    return;
  }
  try {
    const data =  await createJob({
      p_name: newProjectForm.value.p_name,
      p_info: newProjectForm.value.p_info,
      p_level: newProjectForm.value.p_level,
      p_st: newProjectForm.value.p_st,
      p_ddl: newProjectForm.value.p_ddl,
      p_url: newProjectForm.value.p_url,
      p_cc: newProjectForm.value.p_cc,
      p_maxtime: newProjectForm.value.p_maxtime,
      p_resagree: newProjectForm.value.p_resagree,
      p_status: newProjectForm.value.p_status,
      u_acc: userInfoStore.info.u_acc,
    });

    if(data.code === 200) {
      // 创建项目成功后刷新项目列表
      fetchProjects();
      ElMessage.success(data.message ? data.message : '创建项目成功');
      createDialogVisible.value = false;
    } else {
      ElMessage.error(data.message ? data.message : '创建项目失败');
    }
  } catch (error) {
    console.error('Error while creating project:', error);
    ElMessage.error('创建项目失败，请稍后重试');
  }
};


const updateProject = async() => {
  if (!checkDates(newProjectForm.value.p_st, newProjectForm.value.p_ddl)) {
    ElMessage.error('开始时间不能晚于截止时间');
    return;
  }
  const data = await updateJob({
      p_id: editedProject.value.p_id,
      p_name: editedProject.value.p_name,
      p_info: editedProject.value.p_info,
      p_level: editedProject.value.p_level,
      p_st: editedProject.value.p_st,
      p_ddl: editedProject.value.p_ddl,
      p_url: editedProject.value.p_url,
      p_cc: editedProject.value.p_cc,
      p_maxtime: editedProject.value.p_maxtime,
      p_resagree: editedProject.value.p_resagree,
      p_status: editedProject.value.p_status,
      u_acc: userInfoStore.info.u_acc,
  });
    if(data.code === 200){
      // 更新项目成功后刷新项目列表
      fetchProjects();
      ElMessage.success(data.message?data.message:'更新项目成功');
      editDialogVisible.value = false;
    }else{
      ElMessage.error(data.message?data.message:'更新项目失败');
    }
};


const deleteProject = async(project) => {
  //添加确认框
  ElMessageBox.confirm('此操作将永久删除该项目, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 确认删除
    const data  = await deleteJob({
    p_id: project.p_id,
  });
    if(data.code === 200){
      // 删除项目成功后刷新项目列表
      ElMessage.success(data.message?data.message:'删除项目成功');
      fetchProjects();
    }else{
      ElMessage.error(data.message?data.message:'删除项目失败');
    }
  }).catch(() => {
    // 取消删除
    ElMessage.info('已取消删除');
  });

};

const fetchProjects = async() => {
  // 从后端获取项目列表
  const data = await fetchMyJobs(
    {u_acc:userInfoStore.info.u_acc,
      currentPage: currentPage.value,
      pageSize: pageSize.value,
    });
  if(data.code===200){
    projects.value = data.data.listPage;
    totalSize.value = data.data.totalSize;
    pageSize.value = data.data.pageSize;
    
    console.log("projects",projects.value)
  }else{
    ElMessage.error(data.message?data.message:'获取项目列表失败');
  }
  };

  const checkDates = (startDate, endDate) => {
  if (startDate && endDate) {
    return new Date(startDate).getTime() <= new Date(endDate).getTime();
  }
  // 如果其中一个日期是 null，则默认验证通过
  return true;
};

// 页面加载时获取项目列表
fetchProjects();
</script>

<style scoped>
.project-list {
  padding: 20px;
}

.create-button {
  margin-bottom: 20px;
}

.project-table {
  width: 100%;
}

.edit-button,
.delete-button {
  margin-right: 10px;
}
</style>
