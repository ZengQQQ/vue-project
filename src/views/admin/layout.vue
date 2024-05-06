<template>
  <el-container>
    <el-aside width="160px">
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
        <!-- 导航开始 -->
        <el-menu-item index="1" route="/admin/adhome">
          <el-icon><icon-menu /></el-icon>
          <span>dashboard</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item-group title="注册信息">
            <el-menu-item index="1-1" route="/admin/mentorAuth">教师</el-menu-item>
            <el-menu-item index="1-2">学生</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="用户信息">
            <el-menu-item index="1-3">用户</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-menu-item index="3">
          <el-icon><icon-menu /></el-icon>
          <span>比赛管理</span>
        </el-menu-item>

        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>房间管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">房间</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="房间消息">
            <el-menu-item index="4-2">导师消息</el-menu-item>
            <el-menu-item index="4-3">比赛消息</el-menu-item>
            <el-menu-item index="4-4">队伍消息</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>队伍管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">队伍</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="5-2">队伍消息</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
      <!-- 正文区 -->
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
const router = useRouter();

// 打开关闭菜单
const handleOpen = (key, keyPath) => {}
const handleClose = (key, keyPath) => {}

</script>