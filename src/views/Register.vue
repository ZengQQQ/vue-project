<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // 引入 useRouter
import Particles from "@/components/particles/registerParticles.vue"; // 引入粒子效果组件
import registerForm from "@/components/loginRegister/registerForm.vue"; // 引入注册接口
</script>

<template>
  <Particles />
  <div class="mainContainer">
    <div class="registerForm">
      <registerForm />
    </div>
  </div>
</template>

<style>
.mainContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 50px;
  color: black;
  z-index: 1;
}
</style>
