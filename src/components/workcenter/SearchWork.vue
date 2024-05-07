<script setup>
import { ref, defineEmits } from 'vue';
import { ElInput, ElSelect, ElOption, ElDatePicker, ElButton } from 'element-plus';
import {Search} from '@element-plus/icons-vue'

const p_level = ref(''); // 工作类型
const p_st = ref(''); // 开始时间
const p_ddl = ref(''); // 结束时间
const p_name = ref(''); // 关键词
const p_info = ref('');

// 定义一个发送事件的函数
const emit = defineEmits(['sendJobParams']);

// 定义搜索函数
const searchJobs = () => {
  // 构建搜索参数对象，仅包含用户已填写的条件
  const searchParams = {};
  if (p_level.value) searchParams.p_level = p_level.value;
  if (p_st.value) searchParams.p_st = p_st.value;
  if (p_ddl.value) searchParams.p_ddl = p_ddl.value;
  if  (p_name.value) searchParams.p_name = p_name.value;
  if(p_info.value) searchParams.p_info = p_name.value;
  // 发送事件，并将搜索参数传递给父组件
  console.log('searchParams:', searchParams);
  emit('sendJobParams', searchParams);
};

function resetJobs() {
  p_level.value = '';
  p_st.value = '';
  p_ddl.value = '';
 p_name.value = '';
};
    


</script>

<template>
  <!-- 搜索框 -->
  <el-input placeholder="要查找的项目" v-model="p_name" clearable>
  </el-input>

  <!-- 项目描述 -->
  <el-input placeholder="项目描述" v-model="p_info" clearable>
  </el-input>
  <!-- 工作类型选择 -->
  <el-select v-model="p_level" placeholder="选择工作类型">
    <el-option label="A类比赛" value="A"></el-option>
    <el-option label="B类比赛" value="B"></el-option>
    <el-option label="特定项目" value="C"></el-option>
    <el-option label="日常任务" value="D" ></el-option>
  </el-select>

  <!-- 开始日期选择 -->
  <el-date-picker v-model="p_st" type="date" placeholder="选择开始日期">
  </el-date-picker>

  <!-- 结束日期选择 -->
  <el-date-picker v-model="p_ddl" type="date" placeholder="选择结束日期">
  </el-date-picker>

  <!-- 提交 -->
  <el-button :icon="Search" @click="searchJobs" />
  <el-button @click="resetJobs">reset</el-button>
  <!-- 其他模板代码 -->
</template>
