<template>
    <!-- <el-header class="navigator-header"> -->
    <Nav></Nav>
    <!-- </el-header> -->
        <!-- 主页内容 -->
        <Header />
        <About />
        <Projects />
        <Contact />
        <Footer />
      
</template>

<script>
import Nav from "@/components/rootCops/Nav.vue";
import Header from "@/components/rootCops/Header.vue";
import About from "@/components/rootCops/About.vue";
import Projects from "@/components/rootCops/Projects.vue";
import Contact from "@/components/rootCops/Contact.vue";
import Footer from "@/components/rootCops/Footer.vue";

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


</style>
