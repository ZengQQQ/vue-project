<script setup>
import loginService from '@/api/LoginService';
import { ref, computed } from 'vue';

const teacherInfo = ref({
  t_id: '',
  t_name: '',
  t_pwd: '',
  t_confirm_pwd: '',
  t_tele: '',
  t_mail: '',
  t_status: '',
  t_direction: ''
});

// Computed properties for real-time format validation
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^1[3-9]\d{9}$/;

const teacherEmailValid = computed(() => emailRegex.test(teacherInfo.value.t_mail));
const teacherPhoneValid = computed(() => phoneRegex.test(teacherInfo.value.t_tele));
const passwordsMatch = computed(() => teacherInfo.value.t_pwd === teacherInfo.value.t_confirm_pwd);

const validatePhone = () => {
  if (teacherInfo.value.t_tele !== '' && !teacherPhoneValid.value) {
    return 'Invalid phone number!';
  }
  return '';
};

const validateEmail = () => {
  if (teacherInfo.value.t_mail !== '' && !teacherEmailValid.value) {
    return 'Invalid email address!';
  }
  return '';
};

const validatePasswords = () => {
  if (teacherInfo.value.t_pwd !== '' && teacherInfo.value.t_confirm_pwd !== '' && !passwordsMatch.value) {
    return 'Passwords do not match!';
  }
  return '';
};


async function submitTeacherForm(){
  if (!passwordsMatch.value) {
    alert("Passwords do not match!");
    return;
  } else if (teacherInfo.value.t_tele!==''&& !teacherPhoneValid.value) {
    alert("Invalid phone number!");
    return;
  } else if (teacherInfo.value.t_mail!==''&&!teacherEmailValid.value) {
    alert("Invalid email address!");
    return;
  }

  //根据这里进行修改
// u_acc     varchar(8)    not null comment '学号和教师工号',
// u_pwd     varchar(64)   not null comment '用户密码',
// u_name    varchar(10)   null comment '用户名',
// u_tele    varchar(13)   null,
// u_mail    varchar(50)   null,
// u_identiy int default 0 null comment '用户身份0学生1老师',
  const mentorData = {
    u_acc: teacherInfo.value.t_id,
    u_pwd: teacherInfo.value.t_pwd,
    u_name: teacherInfo.value.t_name,
    u_tele: teacherInfo.value.t_tele,
    u_mail: teacherInfo.value.t_mail,
    identiy: 'mentor',
     };

  const res = await loginService.register(mentorData);
  if(res.flag===1 && res.success===1){
  //注册成功，返回登录？
    alert("注册成功！");
    return ;
  }else if(res.flag===1){
  //confirm 未检查到您的认证信息，请联系管理员添加
  alert("未检测到您的认证信息，请联系管理员添加。");
  return;
  }else if(res.success===0){
  //confirm 注册失败，请检查信息是否正确,检查您的账号是否已经注册。
    alert("注册失败，请检查信息是否正确，检查您的账号是否已经注册。");
    return;
  }
  
  alert("网络错误，请稍后再试。");
};
</script>

<template>
  <div class="teacherRegisterForm">
    <div class="head">
      <h1>Teacher Registration Form</h1>
    </div>
    <div class="form">
      <el-form @submit.prevent="submitTeacherForm">
        <el-form-item label="教工号">
          <input v-model="teacherInfo.t_id" placeholder="Enter Teacher ID" required />  
        </el-form-item>
        <el-form-item label="姓名">
          <input v-model="teacherInfo.t_name" placeholder="Enter Name" required />  
        </el-form-item> 
        <el-form-item label="密码">
          <input v-model="teacherInfo.t_pwd" type="password" placeholder="Enter Password" required />  
        </el-form-item>
        <el-form-item label="密码确认">
          <input v-model="teacherInfo.t_confirm_pwd" type="password" placeholder="Confirm Password" required />
          <p v-if="validatePasswords()" style="color: red;">{{ validatePasswords() }}</p>
        </el-form-item>
        <el-form-item label="电话">
          <input v-model="teacherInfo.t_tele" placeholder="Enter Phone Number" @input="validatePhone" />
          <p v-if="validatePhone()" style="color: red;">{{ validatePhone() }}</p>
        </el-form-item>
        <el-form-item label="邮箱">
          <input v-model="teacherInfo.t_mail" placeholder="Enter Email" @input="validateEmail" />
          <p v-if="validateEmail()" style="color: red;">{{ validateEmail() }}</p>
        </el-form-item>
      <!-- <el-form-item label="研究方向">
          <input v-model="teacherInfo.t_direction" placeholder="Enter Research Field" required />
      </el-form-item> -->
          <el-form-item>
          <button type="submit">Register</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.teacherRegisterForm {
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
  .teacherRegisterForm {
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
