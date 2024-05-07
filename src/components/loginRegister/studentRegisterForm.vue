<script setup>
import {register} from '@/api/LoginService';
import { ElMessage } from 'element-plus';
import { ref, computed } from 'vue';

const studentInfo = ref({
  s_id: '',
  s_xuehao: '',
  s_name: '',
  s_major: '',
  s_pwd: '',
  s_confirm_pwd: '',
  s_tele: '',
  s_mail: '',
  s_status: ''
});

// Computed properties for real-time format validation
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^1[3-9]\d{9}$/;

const studentEmailValid = computed(() => emailRegex.test(studentInfo.value.s_mail));
const studentPhoneValid = computed(() => phoneRegex.test(studentInfo.value.s_tele));
const passwordsMatch = computed(() => studentInfo.value.s_pwd === studentInfo.value.s_confirm_pwd);

const validatePhone = () => {
  if (studentInfo.value.s_tele !== '' && !studentPhoneValid.value) {
    return 'Invalid phone number!';
  }
  return '';
};

const validateEmail = () => {
  if (studentInfo.value.s_mail !== '' && !studentEmailValid.value) {
    return 'Invalid email address!';
  }
  return '';
};

const validatePasswords = () => {
  if (studentInfo.value.s_pwd !== '' && studentInfo.value.s_confirm_pwd !== '' && !passwordsMatch.value) {
    return 'Passwords do not match!';
  }
  return '';
};

async function submitStudentForm(){
  if (!passwordsMatch.value) {
    alert("Passwords do not match!");
    return;
  }else if(studentInfo.value.s_tele!==''&& !studentPhoneValid.value){
    alert("Invalid phone number!");
    return;
  }else if(studentInfo.value.s_mail && !studentEmailValid.value){
    alert("Invalid email address!");
    return;
  }
  const sentData={
    u_acc: studentInfo.value.s_xuehao,
    u_pwd: studentInfo.value.s_pwd,
    u_name: studentInfo.value.s_name,
    u_major: studentInfo.value.s_major,
    u_tele: studentInfo.value.s_tele,
    u_mail: studentInfo.value.s_mail,
    u_identity: '0',
  };
  // Perform additional validation or form submission actions here
  try {
    const res = await register(sentData);
    if (res.code === 200) {;
      ElMessage.success('注册成功！');
    } else {
      ElMessage.error(res.message || '注册失败！');
    }
  } catch (error) {
    // Handle or report the error
  }
};

</script>

<template>
  <div class="studentRegisterForm">
    <div class="head">
      <h1>Student Registration Form</h1>
    </div>
    <div class="form">
      <el-form @submit.prevent="submitStudentForm">
        <el-form-item label="学号">
          <input v-model="studentInfo.s_xuehao" placeholder="Enter Student ID" required />  
        </el-form-item>
        <el-form-item label="姓名">
          <input v-model="studentInfo.s_name" placeholder="Enter Name" required />  
        </el-form-item> 
        <el-form-item label="专业">
          <input v-model="studentInfo.s_major" placeholder="Enter Major" required />
        </el-form-item>
        <el-form-item label="密码">
          <input v-model="studentInfo.s_pwd" type="password" placeholder="Enter Password" required />  
        </el-form-item>
        <el-form-item label="密码确认">
          <input v-model="studentInfo.s_confirm_pwd" type="password" placeholder="Confirm Password" required />
          <p v-if="validatePasswords()" style="color: red;">{{ validatePasswords() }}</p>
        </el-form-item>
        <el-form-item label="电话">
          <input v-model="studentInfo.s_tele" placeholder="Enter Phone Number" @input="validatePhone" />
          <p v-if="validatePhone()" style="color: red;">{{ validatePhone() }}</p>
        </el-form-item>
        <el-form-item label="邮箱">
          <input v-model="studentInfo.s_mail" placeholder="Enter Email" @input="validateEmail" />
          <p v-if="validateEmail()" style="color: red;">{{ validateEmail() }}</p>
        </el-form-item>
        <el-form-item>
          <button type="submit">Register</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.studentRegisterForm {
  max-width: 800px; /* 增大了 max-width */
  margin: 30px auto;
  padding: 50px; /* 增加了 padding */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #eaeaea;
}

.head h1 {
  font-size: 32px; /* 可以适当调整标题字体大小 */
  color: #333;
  margin-bottom: 40px; /* 增加了底部间距 */
  text-align: center;
  font-weight: 500;
}

.el-form {
  margin: 0 auto;
}

.el-form-item {
  margin-bottom: 25px; /* 增加了底部间距 */
  position: relative;
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 居中对齐 */
}

.el-form-item label {
  width: 150px; /* 设置 label 的宽度，保持一致 */
  text-align: center; /* label 文本居中 */
  margin-right: 50px; /* 右侧间距 */
}


.el-form-item input  {
  flex: 1; /* 使输入框填满剩余空间 */
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
  height: 40px; /* 设置输入框高度 */
  width:400px; /* 设置输入框宽度自适应 */
}

/* 其他样式保持不变 */
button[type="submit"] {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 5px;
  background-color: #40a9ff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #1890ff;
}

@media (max-width: 768px) {
  .studentRegisterForm {
    padding: 30px;
    margin: 20px;
  }
}
/* 添加错误提示的样式 */
p {
  margin: 5px 0 0;
  font-size: 12px;
  color: #ff4d4f;
  position: absolute;
  left: 0;
  bottom: -20px;
}
</style>
<!-- export default mentorRegisterForm; -->