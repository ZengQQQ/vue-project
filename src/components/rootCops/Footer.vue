<template>
  <el-footer class="footer">
    <div class="wrapper">
      <h3>THANKS FOR VISITING</h3>
      <p>© {{ getCurrentYear() }} 竞技联盟-团队</p>
      <SocialLinks />
    </div>
  </el-footer>
</template>

<script>
import SocialLinks from '@/components/rootCops/SocialLinks.vue'; // Assuming the SocialLinks component is in the same directory
import { ElFooter } from 'element-plus';
export default {
  components: {
    SocialLinks
  },
  setup() {
    const getCurrentYear = () => {
      return new Date().getFullYear();
    };

    return {
      getCurrentYear
    };
  }
};
</script>

<style scoped>
 .footer {
  font-size: 1rem;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #5a5757;
  z-index: 0;
}

.wrapper {
  display: flex;
  width: 100%;
  padding: 1rem;
  max-width: 1400px;
  align-items: center;
  justify-content: space-between;
}

@media only screen and (max-width: 649px) {
.wrapper {
    flex-direction: column;
  }

.wrapper h3 {
    padding-bottom: .8rem;
  }
}
</style>
