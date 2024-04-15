<!-- <script setup>
import HomePage from "@/views/Home.vue";
</script>
<template>
  <HomePage />
</template>
<style scoped>
</style> -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 全局样式可以放这里 */
</style>