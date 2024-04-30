<template>
  <nav id="navbar" :class="{ 'bg-active': isNavbarActive }">
    <div class="nav-wrapper">
      <p class="brand">
        欢迎来到
        <strong>竞技联盟</strong>
      </p>

      <!-- <div class="menu-links" @click="toggleMenu" :class="{ 'bg-scrolling': isNavbarActive }">
          <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleMenuItemClick"
        >
          <el-menu-item index="1">主页</el-menu-item>
          <el-menu-item index="2">工作中心</el-menu-item>
          <-- 创建工作（编辑任务，发布为工作），工作广场（查看已有工作，可以进行承接，但要有自己的队伍）。工作通知（申请的队伍） -->
          <!-- <el-menu-item index="3">组队管理</el-menu-item> -->
          <!-- 队伍广场，查找队员，队伍管理，组队申请-->
          <!-- <el-menu-item index="4">个人信息</el-menu-item> -->
          <!--个人信息，我的队伍，消息通知：（队伍申请，工作申请）  
        </el-menu>
      </div> 
    -->
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isNavbarActive: false, // 用于控制导航栏背景色的状态
      isActive: false,  // 用于控制菜单的展示状态
    };
  },
  components: {},
  methods: {
    // handleMenuItemClick(activeIndex) {
    //   this.$emit("handleMenuItemClick", activeIndex);
    // },
    handleScroll() {
      let scrollPos = window.scrollY || window.pageYOffset;

      if (scrollPos > 100) {
        this.isNavbarActive = true;
      } else {
        this.isNavbarActive = false;
      }
    },
    toggleMenu() {
      this.isActive = !this.isActive;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>



<style scoped>
#navbar {
  position: fixed;
  z-index: 9999;
  width: 100%;
  padding: 1rem;
}

.bg-scrolling {
  background-color: #202934;
  transition: background-color 0.5s ease;
}

.bg-active {
  background-color: #181d23; /* 设置为激活时的背景色 */
}

#navbar .nav-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-width: 1000px; */
  margin: 0 auto; /* 居中对齐 */
  padding: 0 2rem;
}

#navbar .brand {
  font-size: 1.6rem;
  color: #fafafa;
  cursor: default;
}

.menu-links {
  position: fixed;
  z-index: 9999;
  width: 470px;
  right: 0;       /*控制元素显示的左右位置，设置为 0 则元素会被显示在右侧*/
  top: 1rem;      /*控制元素显示的上下位置. 保持和 navbar 的 padding 相同，使得对齐8*/
  /* padding: 0; */
  background: #181d23;  /*默认的背景颜色*/ 
  
  transition: background-color 0.5s ease;  /*添加过渡效果*/ 
}

.el-menu-demo {
  font-size: 1.2rem; /* 调整菜单项的字体大小 */
  /* width: 100%; */
  margin: 0 auto;
}

/*设置菜单项的颜色*/
.el-menu-demo .el-menu-item {
  color: #fafafa; /* 设置菜单项的字体颜色 */
  background-color: #181d23; /* 增加一个背景颜色 */
  padding:0 0px;
  width:100px;
}

/*设置鼠标悬停和激活状态下的css */
.el-menu-demo .el-menu-item:hover,
.el-menu-demo .el-menu-item.is-active {
  color: #f300b4; /* 设置菜单项的激活状态和悬停状态字体颜色 */
  background-color: #202934; /* 增加一个背景颜色 */
}


.el-menu-demo::before,
.el-menu-demo::after {
  display: none; /* 隐藏菜单的 ::before 和 ::after 伪元素 */
}



</style>
