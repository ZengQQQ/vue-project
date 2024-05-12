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
            <el-menu-item index="1-2" route="/admin/studentAuth">学生</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="用户信息">
            <el-menu-item index="1-3" route="/admin/userM">用户</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-menu-item index="3"  route="/admin/projectM">
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
            <el-menu-item index="4-1" route="/admin/stall">房间（“合同”）</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="房间消息">
            <el-menu-item index="4-2" route="/admin/smmessage">队伍导师</el-menu-item>
            <el-menu-item index="4-3" route="/admin/spmessage">队伍项目</el-menu-item>
            <el-menu-item index="4-4" route="/admin/stmessage" v-if="false">队伍消息</el-menu-item>
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
            <el-menu-item index="5-1" route="/admin/teamM">队伍</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="5-2" route="/admin/teamumessage">队伍消息</el-menu-item>
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
const handleOpen = (key, keyPath) => { }
const handleClose = (key, keyPath) => { }

</script>