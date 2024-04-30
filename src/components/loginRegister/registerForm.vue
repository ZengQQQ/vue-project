<template>
  <div class="registerContainer">
    <div class="roleSwitch">
      <button class="backButton" @click="backToLogin">返回登录</button>
      <button @click="switchRole('student')" :class="{ active: role === 'student' }">学生注册</button>
      <button @click="switchRole('mentor')" :class="{ active: role === 'mentor' }">导师注册</button>
    </div>

    <transition :name="transitionName">
      <component :is="role === 'student' ? StudentRegisterForm : MentorRegisterForm" :key="role" />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import StudentRegisterForm from '@/components/loginRegister/studentRegisterForm.vue';
import MentorRegisterForm from '@/components/loginRegister/mentorRegisterForm.vue';

const router = useRouter(); // 获取路由实例

const role = ref('student');
const transitionName = ref('slide');

const switchRole = (newRole) => {
  transitionName.value = role.value === 'student' ? 'slide-left' : 'slide-right';
  role.value = newRole;
};

const backToLogin = () => {
  router.push('/login'); // 导航到登录页面
};
</script>

<style scoped>
.registerContainer {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.roleSwitch {
  text-align: center;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  background-color: #eee;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.active {
  background-color: #40a9ff;
  color: white;
}

.backButton {
  margin-bottom: 20px;
}

/* 过渡效果 */
.slide-left-enter-active, .slide-right-enter-active, .slide-left-leave-active, .slide-right-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-left-enter, .slide-right-leave-to {
  transform: translateX(100%);
}
.slide-left-leave-to, .slide-right-enter {
  transform: translateX(-100%);
}
.slide-left-enter-from, .slide-right-leave {
  transform: translateX(0);
}
</style>
