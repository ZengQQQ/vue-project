<script setup>
import { ref } from 'vue'
import { ElContainer, ElHeader, ElMain, ElFooter, ElMenu, ElMenuItem } from 'element-plus'
import DisplayComponent from '@/components/mainPages/display.vue'
import basicInfo from '@/views/root.vue'

const activeIndex = ref('1') // 默认激活的菜单项

const handleMenuItemClick = (index) => {
  activeIndex.value = index
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="navigator-header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleMenuItemClick">
          <el-menu-item index="1"><basicInfo></basicInfo></el-menu-item>
          <el-menu-item index="2">订单管理</el-menu-item>
          <el-menu-item index="3">商品管理</el-menu-item>
          <el-menu-item index="4">营销活动</el-menu-item>
        </el-menu>
      </el-header>
      
      <el-main class="navigator-main">
        <div v-if="activeIndex === '1'">
          <DisplayComponent></DisplayComponent>
        </div>
        <div v-else-if="activeIndex === '2'">订单管理内容</div>
        <div v-else-if="activeIndex === '3'">商品管理内容</div>
        <div v-else-if="activeIndex === '4'">营销活动内容</div>
      </el-main>
      <el-footer class="navigator-footer">Footer</el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.navigator-header {
  background-color: #20a0ff;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.navigator-main {
  background-color: #f0f0f0;
  text-align: center;
  line-height: 160px;
}
.navigator-footer {
  background-color: #7692a8;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
</style>
