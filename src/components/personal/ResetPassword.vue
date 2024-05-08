<template>
  <el-card class="container">
    <template #header>
      <div class="card-header">
        <span style="font-size: large;">修改密码</span>
      </div>
    </template>

    <el-form ref="form" :model="passwordInfo" :rules="rules" label-width="80px">
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordInfo.newPassword" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="passwordInfo.confirmPassword" type="password" placeholder="请再次输入新密码"></el-input>
        <p v-if="validatePasswords()" style="color: red;">{{ validatePasswords() }}</p>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="updatePassword" class="submit-button">提交修改</el-button>
    </template>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage, ElForm } from "element-plus";
import { updateUserInfoService } from "@/api/user.js";
import {useUserInfoStore } from "@/stores/userInfo.js";

const userInfoStore = useUserInfoStore();
const passwordInfo = ref({
  newPassword: '',
  confirmPassword: '',
});

const rules = {
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== passwordInfo.value.newPassword) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ],
};

const formRef = ref(null);

async function updatePassword() {
  if (!formRef.value) return;
  const res = await updateUserInfoService({
    u_id: userInfoStore.info.u_id, // 假设你需要用户ID来更新密码
    u_pwd: passwordInfo.value.newPassword,
  });

  if (res.code === 200) {
    ElMessage.success('密码修改成功');
    // 重置密码输入
    passwordInfo.value.newPassword = '';
    passwordInfo.value.confirmPassword = '';
  } else {
    ElMessage.error(res.message || '密码修改失败');
  }
}

const validatePasswords = () => {
  if (passwordInfo.value.newPassword !== '' && passwordInfo.value.confirmPassword !== '' && passwordInfo.value.newPassword !== passwordInfo.value.confirmPassword) {
    return '两次输入密码不一致';
  } else {
    formRef.value = passwordInfo.value.newPassword;
  }
  return '';
};

</script>

<style scoped>
.container {
  /* 样式代码 */
}

.submit-button {
  /* 提交按钮的样式代码 */
}
</style>