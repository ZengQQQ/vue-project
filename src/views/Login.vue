<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // 引入 useRouter
import { ElForm, ElMessage } from "element-plus";
import LoginService from "@/api/LoginService"; // 引入登录接口
import CustomeParticles from "@/components/particles/ParticlesCustomer.vue"; // 引入粒子效果组件
import { useTokenStore } from "@/stores/token.js";

const router = useRouter(); // 使用 useRouter
const account = ref("");
const password = ref("");
const identify = ref("student");

const tokenStore = useTokenStore();

async function loginProcess() {
    const res = await LoginService.login(
      account.value,     
      password.value,
      identify.value
    );
    console.log(res);
    if (res.code === 200) {
      ElMessage.success(res.message?res.message:"登录成功");
      tokenStore.setToken(res);
      router.push("/home");
    } else {
      ElMessage.error(res.message?res.message:"登录失败");
    }
};

function reset() {
  account.value = "";
  password.value = "";
  identify.value = "student";
}
</script>


<template>
  <CustomeParticles/>
  <div class="pageContainer">
      <div class="loginForm">
        <el-form>
          <el-space direction="vertical" :size="30">
          <el-form-item class="el-item">
            <h1 style="margin: auto">竞赛系统登录</h1>
          </el-form-item>
          <div class="restOFform">
          <el-form-item id="usernameInput" class="text" label="账号">
            <el-input v-model="account" style="margin: auto; width:300px;"/>
          </el-form-item> 
          <el-form-item  id="passwordInput" class="text" label="密码">
            <el-input type="password" v-model="password" style="margin: auto;width: 300px;" />
          </el-form-item>

          <el-form-item class="text" label="身份" >
            <el-radio-group v-model="identify" style="margin: auto;">
              <el-radio value="student">学生</el-radio>
              <el-radio value="mentor">教师</el-radio>
              <el-radio value="admin">管理员</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="el-item" >
            <div style="margin: auto;">
              <el-space wrap :size="30">
                <el-button type="primary" @click="loginProcess">login</el-button>
                <el-button @click="reset">Reset</el-button>
              </el-space>
            </div>
          </el-form-item>

          
          <el-form-item class="el-item">
            <router-link to="/register" style="margin:auto;color:">没有账号？点击注册</router-link>
          </el-form-item>
        </div>
          </el-space>
        </el-form>
      </div>
</div>  
</template>



<style scoped>

.pageContainer{
  display: flex; /* 开启 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  min-height: 100vh; /* 容器最小高度为视窗高度 */
}


.loginForm {
  height: 420px;
  width: 400px;
  border: 2px solid #d3dce6; /* 设置边框颜色和宽度 */
  border-radius: 8px; /* 设置边框圆角 */
  padding: 20px; /* 设置内边距 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 设置阴影效果 */
  z-index: 1; /* 设置层级 */

  text-align: center;
  align-content: center;
  background-color: rgba(255, 255, 255, 0.4); /* 设置背景色为半透明白色 */
  backdrop-filter: blur(30px); /* 背景模糊 */
  -webkit-backdrop-filter: blur(30px); /* Safari 浏览器的背景模糊 */
  border: 2px solid rgba(255, 255, 255, 0.1); /* 设置边框为半透明白色 */
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6); /* 设置阴影，您可以调整颜色和模糊度 */
}

.text{
  /* 黑体加粗 */
  font-size-adjust: auto;
  font-weight: bold;
  font-family: "黑体";
  color:#000000;
}

.el-carousel__item h1 {
  color: #1b2025;
  opacity: 0.75;
  line-height: 200px;
  margin: auto;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>
