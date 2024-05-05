<template>
    <div class="memberSearch">
      <div class="tabs">
        <button :class="{ active: activeTab === 'mentors' }" @click="activeTab = 'mentors'">导师</button>
        <button :class="{ active: activeTab === 'students' }" @click="activeTab = 'students'">学生</button>
      </div>
  
      <div class="memberList" v-if="activeTab === 'mentors'">
        <div v-for="mentor in mentors" :key="mentor.id" class="member">
          <p>{{ mentor.name }}</p>
          <p>{{ mentor.researchArea }}</p>
          <p>{{ mentor.bio }}</p>
          <button @click="inviteMember(mentor.id, 'mentor')">邀请加入</button>
        </div>
      </div>
  
      <div class="memberList" v-if="activeTab === 'students'">
        <div v-for="student in students" :key="student.id" class="member">
          <p>{{ student.name }}</p>
          <p>{{ student.major }}</p>
          <p>{{ student.bio }}</p>
          <button @click="inviteMember(student.id, 'student')">邀请加入</button>
        </div>
      </div>
  
      <!-- 弹窗 -->
      <div class="modal" v-if="showModal">
        <div class="modalContent">
          <h2>选择要加入的队伍</h2>
          <select v-model="selectedTeam">
            <option v-for="team in userTeams" :value="team.id">{{ team.name }}</option>
          </select>
          <button @click="sendInvitation">发送邀请</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { getStudents, getTeachers } from '@/api/user.js';
  
  // 模拟从后端获取的数据
//const mentors = getTeachers();
//const students = getStudents();
  const mentors = ref([
    { id: 1, name: '导师1', researchArea: '研究方向1', bio: '导师1的简介' },
    { id: 2, name: '导师2', researchArea: '研究方向2', bio: '导师2的简介' },
  ]);
  
  const students = ref([
    { id: 1, name: '学生1', major: '专业1', bio: '学生1的简介' },
    { id: 2, name: '学生2', major: '专业2', bio: '学生2的简介' },
  ]);
  
  const activeTab = ref('mentors');
  const showModal = ref(false);
  const selectedMemberId = ref(null);
  const selectedMemberType = ref(null);
  const selectedTeam = ref(null);
  
  // 模拟从后端获取当前用户的队伍信息
  const userTeams = ref([
    { id: 1, name: '队伍1' },
    { id: 2, name: '队伍2' },
  ]);
  
  const inviteMember = (id, type) => {
    selectedMemberId.value = id;
    selectedMemberType.value = type;
    showModal.value = true;
  };
  
  const sendInvitation = () => {
    // 模拟发送邀请给后端处理
    console.log(`邀请成员 ${selectedMemberId.value} 加入队伍 ${selectedTeam.value}`);
    showModal.value = false;
  };
  </script>
  
  <style>
  .tabs {
    display: flex;
  }
  
  .tabs button {
    cursor: pointer;
    padding: 10px 20px;
    border: none;
    background-color: transparent;
    outline: none;
  }
  
  .tabs button.active {
    background-color: lightgray;
  }
  
  .memberList {
    display: flex;
    flex-wrap: wrap;
  }
  
  .member {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    width: 200px;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modalContent {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
  }
  
  .modalContent button {
    margin-top: 10px;
  }
  </style>
  