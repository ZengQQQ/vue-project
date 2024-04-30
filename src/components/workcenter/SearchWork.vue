<script setup>
import { ref, defineEmits } from 'vue';
import { ElInput, ElSelect, ElOption, ElDatePicker, ElButton } from 'element-plus';
import {Search} from '@element-plus/icons-vue'
const jobType = ref(''); // 工作类型
const startDate = ref(''); // 开始时间
const endDate = ref(''); // 结束时间
const keyword = ref(''); // 关键词

// 定义一个发送事件的函数
const emit = defineEmits(['sendJobParams']);

// 定义搜索函数
const searchJobs = () => {
  // 构建搜索参数对象，仅包含用户已填写的条件
  const searchParams = {};
  if (jobType.value) searchParams.jobType = jobType.value;
  if (startDate.value) searchParams.startDate = startDate.value;
  if (endDate.value) searchParams.endDate = endDate.value;
  if (keyword.value) searchParams.keyword = keyword.value;

  // 发送事件，并将搜索参数传递给父组件
  console.log('searchParams:', searchParams);
  emit('sendJobParams', searchParams);
};

function resetJobs() {
  jobType.value = '';
  startDate.value = '';
  endDate.value = '';
  keyword.value = '';
};
    


</script>

<template>
  <!-- 搜索框 -->
  <el-input placeholder="输入关键词" v-model="keyword" clearable>
  </el-input>

  <!-- 工作类型选择 -->
  <el-select v-model="jobType" placeholder="选择工作类型">
    <el-option label="任务" value="task"></el-option>
    <el-option label="比赛" value="competition"></el-option>
    <el-option label="项目" value="project"></el-option>
  </el-select>

  <!-- 开始日期选择 -->
  <el-date-picker v-model="startDate" type="date" placeholder="选择开始日期">
  </el-date-picker>

  <!-- 结束日期选择 -->
  <el-date-picker v-model="endDate" type="date" placeholder="选择结束日期">
  </el-date-picker>

  <!-- 提交 -->
  <el-button :icon="Search" @click="searchJobs" />
  <el-button @click="resetJobs">reset</el-button>
  <!-- 其他模板代码 -->
</template>
