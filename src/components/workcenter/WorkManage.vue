<template>
    <div class="task-list">
      <h2>我的项目管理</h2>
      <el-button type="primary" class="create-button" @click="showCreateTaskDialog">创建任务</el-button>
      <el-table :data="tasks" class="task-table" stripe border>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button
              @click="showEditTaskDialog(row)"
              :disabled="row.status === '进行中'"
              class="edit-button"
                link
              >
              编辑
            </el-button>
            <el-button  @click="deleteTask(row)" class="delete-button" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 创建任务弹窗 -->
      <el-dialog title="创建任务" v-model="createDialogVisible" width="30%">
        <el-form :model="newTaskForm" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="newTaskForm.title"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="newTaskForm.description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="发布">
            <el-switch v-model="newTaskForm.published"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createTask" type="primary">创建</el-button>
        </div>
      </el-dialog>
  
      <!-- 编辑任务弹窗 -->
      <el-dialog title="编辑任务" v-model="editDialogVisible" width="30%">
        <el-form :model="editedTask" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="editedTask.title"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="editedTask.description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="发布">
            <el-switch v-model="editedTask.published"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateTask" type="primary">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElButton, ElTable, ElTableColumn, ElDialog, ElForm, ElFormItem, ElInput, ElSwitch } from 'element-plus';
  
  const tasks = ref([
    { id: 1, title: '任务1', description: '任务1描述', status: '未完成', published: true },
    { id: 2, title: '任务2', description: '任务2描述', status: '进行中', published: false },
  ]);
  
  // 创建任务弹窗
import {useUserInfoStore} from '@/stores/userInfo.js';
import { createWork,updateWork,deleteWork } from '@/api/work.js';
const userInfoStore = useUserInfoStore();


  const createDialogVisible = ref(false);
  const newTaskForm = ref({
    title: '',
    description: '',
    published: false,
  });
  
  // 编辑任务弹窗
  const editDialogVisible = ref(false);
  const editedTask = ref({
    title: '',
    description: '',
    published: false,
  });
  const currentTask = ref(null);


  const showCreateTaskDialog = () => {
    console.log("createTask");
    createDialogVisible.value = true;
    console.log("createDialogVisible", createDialogVisible.value);
  };
  
  const showEditTaskDialog = (task) => {
    console.log("editTask");
    currentTask.value = { ...task };
    editDialogVisible.value = true;
  };
  

  const createTask = () => {
    // 创建任务逻辑
    console.log("createTask");
    createWork(userInfoStore.info, newTaskForm.value);
    createDialogVisible.value = false;
  };
  

  const updateTask = () => {
    // 更新任务逻辑
    updateWork(editedTask.value, currentTask.value);
    editDialogVisible.value = false;
  };
  


  const deleteTask = (task) => {
    // 删除任务
    deleteWork(task);
  };
  </script>
  
  <style scoped>
  .task-list {
    padding: 20px;
  }
  
  .create-button {
    margin-bottom: 20px;
  }
  
  .task-table {
    width: 100%;
  }
  
  .edit-button,
  .delete-button {
    margin-right: 10px;
  }
  </style>
  