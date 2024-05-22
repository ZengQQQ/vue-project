<template>
  <div class="notification-list">
    <h2>工作通知</h2>
      <el-header>
        <el-menu router>
          <el-menu-item index="/message/team/project2team">项目邀请我</el-menu-item>
          <el-menu-item index="/message/team/team2project">我申请项目</el-menu-item>
          <el-menu-item index="/message/team/teamMentor">队伍导师</el-menu-item>
          
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
  </div>
</template>

<script setup>

</script>

<style scoped>
.notification-list {
  padding: 20px;
}
</style>
