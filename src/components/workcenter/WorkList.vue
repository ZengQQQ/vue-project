<script setup>
import { ref } from 'vue';
import {useUserInfoStore} from '@/stores/userInfo.js';
import { getWorkListByUser } from '@/api/work';

const myWorks = ref([]);

const userInfoStore = useUserInfoStore();



myWorks.value=[{
    name: '工作1',
    team: '团队1',
    class: '工作类型1',
    description: '目标1',
    startTime: '2021-10-01',
    endTime: '2021-10-31',
    status: '进行中'
},
{
    name: '工作2',
    team: '团队2',
    class: '工作类型2',
    description: '目标2',
    startTime: '2021-11-01',
    endTime: '2021-11-30',
    status: '进行中'
},
{
    name: '工作3',
    team: '团队3',
    class: '工作类型3',
    description: '目标3',
    startTime: '2021-12-01',
    endTime: '2021-12-31',
    status: '进行中'
},
{
    name: '工作4',
    team: '团队4',
    class: '工作类型4',
    description: '目标4',
    startTime: '2022-01-01',
    endTime: '2022-01-31',
    status: '进行中'
},
{
    name: '工作5',
    team: '团队5',
    class: '工作类型5',
    description: '目标5',
    startTime: '2022-02-01',
    endTime: '2022-02-28',
    status: '进行中'
},
{
    name: '工作6',
    team: '团队6',
    class: '工作类型6',
    description: '目标6',
    startTime: '2022-03-01',
    endTime: '2022-03-31',
    status: '进行中'
},
{
    name: '工作7',
    team: '团队7',
    class: '工作类型7',
    description: '目标7',
    startTime: '2022-04-01',
    endTime: '2022-04-30',
    status: '进行中'
},
{
    name: '工作8',
    team: '团队8',
    class: '工作类型8',
    description: '目标8',
    startTime: '2022-05-01',
    endTime: '2022-05-31',
    status: '进行中'
  },
]

function fetcPersonhWork(){
  myWorks.value = getWorkListByUser(userInfoStore.userInfo);
}


</script>


<template>
    <div v-for=" item in myWorks">
    <el-descriptions title="工作单" :column="3" border>
      <el-descriptions-item
        label="工作名称"
        label-align="right"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="150px"
      >
        {{ item.name }}
      </el-descriptions-item>
      
      <el-descriptions-item label="团队负责人" label-align="right" align="center" >
        {{ item.teamLeader }}
      </el-descriptions-item>
      <el-descriptions-item label="成员" label-align="right" align="center" >
        {{ item.teamMembers }}
      </el-descriptions-item>
      <el-descriptions-item label="工作类型" label-align="right" align="center">
        <el-tag size="small">{{ item.class }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="开始时间" label-align="right" align="center">
        {{ item.startTime }}
      </el-descriptions-item>
      <el-descriptions-item label="结束时间" label-align="right" align="center">
        {{ item.endTime }}
      </el-descriptions-item>
      <el-descriptions-item label="目标" label-align="right" align="center" >
        {{ item.description }}
      </el-descriptions-item>
      <el-descriptions-item label="工作状态" label-align="right" align="center">
        <el-tag size="small" type="success">进行中</el-tag>
      </el-descriptions-item>
    </el-descriptions>
</div>
  </template>
  
  
  <style scoped>
  :deep(.my-label) {
    background: var(--el-color-success-light-9) !important;
  }
  :deep(.my-content) {
    background: var(--el-color-danger-light-9);
  }
  </style>
  