<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'; // 引入 useRouter
    import { ElForm } from 'element-plus';
    import loginService from '@/api/LoginService'; // 引入登录接口

    const router = useRouter(); // 使用 useRouter
    const username = ref('');
    const password = ref('');
    const identify = ref('student');

    async function login(){
        alert('login'); 
        const res = await loginService.login({username: username.value, password: password.value, identify: identify.value});
         if(res.loginSuccess){
             router.push('/home');
         }else{
                alert('登录失败');
         }
    }

    function reset(){
        username.value = '';
        password.value = '';
        identify.value = 'student';
    }
</script>


<template>
    <div>
      <el-form label-width="auto" style="max-width: 600px">
        
        <el-form-item label="账号">
          <el-input v-model="username" />
        </el-form-item>
        
        <el-form-item label="密码">
          <el-input v-model="password" />
        </el-form-item>
        
        <el-form-item label="身份">
          <el-radio-group v-model="identify">
            <el-radio value="student">学生</el-radio>
            <el-radio value="mentor">教师</el-radio>
            <el-radio value="administrator">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
      
        <el-form-item>
          <el-button type="primary" @click="login">login</el-button>
          <el-button @click="reset">Reset</el-button>
        </el-form-item>

        <el-form-item>
          <router-link to="/register">没有账号？点击注册</router-link>
        </el-form-item>

      </el-form>  
    </div>
  
  </template>
  
