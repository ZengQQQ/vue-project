<script setup>
import { ref } from 'vue'
import { ElContainer, ElHeader, ElMain, ElMenu, ElMenuItem } from 'element-plus'
const activeIndex = ref('1') // 默认激活的菜单项
</script>



<template>
    <div class="common-layout">
      <el-container >
        <el-header class="navigator-header">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="2">订单管理</el-menu-item>
            <el-menu-item index="3">商品管理</el-menu-item>
            <el-menu-item index="4">营销活动</el-menu-item>
          <!-- 根据需要添加更多菜单项 -->
          </el-menu>
        </el-header>
        
        <el-main class="navigator-main">Main</el-main>
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