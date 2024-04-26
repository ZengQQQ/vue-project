<template>
  <div class="menu-container">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleMenuItemClick">
      <el-menu-item index="1">主页</el-menu-item>
      <el-menu-item index="2">订单管理</el-menu-item>
      <el-menu-item index="3">商品管理</el-menu-item>
      <el-menu-item index="4">营销活动</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { ElMenu, ElMenuItem } from 'element-plus';

export default {
  methods: {
    handleMenuItemClick(index) {
      this.$emit('handleMenuItemClick', index);
    },
  },
  components: {
    ElMenu,
    ElMenuItem,
  },
};
</script>

<style scoped>
.menu-container {
  position: fixed;
  z-index: 9999;
  width: 100%;
  padding: 1rem;
  background: #181d23; /* 设置为黑色背景 */
}

.menu-container .el-menu-demo {
  margin: 0 auto;
}

.el-menu-demo {
  font-size: 1.2rem; /* 调整菜单项的字体大小 */
}

.el-menu-demo::before,
.el-menu-demo::after {
  display: none; /* 隐藏菜单的 ::before 和 ::after 伪元素 */
}

.el-menu-demo .el-menu-item {
  color: #fafafa; /* 设置菜单项的字体颜色 */
}

.el-menu-demo .el-menu-item:hover,
.el-menu-demo .el-menu-item.is-active {
  color: #f300b4; /* 设置菜单项的激活状态和悬停状态字体颜色 */
}
</style>
