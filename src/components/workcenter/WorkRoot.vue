<script setup>
import { ElContainer, ElAside, ElMain } from "element-plus";
</script>


<template>
    <div>

    </div>  
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
            <el-menu default-active="1" class="el-menu-work" @select="handleSelect">
                <el-menu-item index="1">工作广场</el-menu-item>
                <el-menu-item index="2">我的工作</el-menu-item>
                <el-menu-item index="3">工作通知</el-menu-item>
            </el-menu>

        </el-aside>
        
        <el-main>Main</el-main>
      </el-container>
    </div>
  </template>
  

<style scoped>
</style>