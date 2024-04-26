<template>
  <el-container>
    <!-- <el-header class="navigator-header"> -->
    <Nav @handleMenuItemClick="handleMenuItemClick"></Nav>
    <!-- </el-header> -->

    <!-- <el-main class="navigator-main"> -->
    <div v-if="activeIndex === '1'">
      <!-- 主页内容 -->
      <Header />
      <About />
      <Projects />
      <Contact />
    </div>
    <div v-else-if="activeIndex === '2'">订单管理内容</div>
    <div v-else-if="activeIndex === '3'">商品管理内容</div>
    <div v-else-if="activeIndex === '4'">营销活动内容</div>
    <el-footer>
      <Footer />
    </el-footer>
    
  </el-container>
</template>

<script>
import Nav from "@/components/rootCops/Nav.vue";
import Header from "@/components/rootCops/Header.vue";
import About from "@/components/rootCops/About.vue";
import Projects from "@/components/rootCops/Projects.vue";
import Contact from "@/components/rootCops/Contact.vue";
import Footer from "@/components/rootCops/Footer.vue";
import { ElContainer, ElHeader, ElMain, ElFooter } from "element-plus";

export default {
  components: {
    Nav,
    Header,
    About,
    Projects,
    Contact,
    Footer,
  },
  data() {
    return {
      activeIndex: "1", // 返回一个对象
    };
  },
  methods: {
    handleMenuItemClick(index) {
      console.log(index);
      this.activeIndex = index;
    },
  },
  mounted() {},
};
</script>

<style scoped>
/* 添加任何需要的样式 */
</style>
