<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElForm, ElInput, ElCheckbox, ElButton } from 'element-plus';
import LoginService from '@/api/LoginService'; // 你的登录服务

const router = useRouter();
const username = ref(''); // 响应式变量用户名
const password = ref(''); // 响应式变量密码
const identify = ref('student'); // 身份

async function loginProcess() {
  try {
    const res = await LoginService.login(
      username.value,
      password.value,
      identify.value
    );
    if (res.loginSuccess) {
      alert('登录成功');
      router.push('/home');
    } else {
      alert('登录失败');
    }
  } catch (e) {
    console.error('登录异常', e);
    // 你可能还想添加一些错误处理逻辑
  }
}

</script>





<template>
    <div class="container-fluid">
      <div class="row main-content bg-success text-center">
        <el-form @submit.prevent="loginProcess"> <!-- 添加阻止默认行为的表单提交事件监听 -->
          <!-- 其他内容保持不变 -->
          <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
            <!-- ... -->
            <div class="row">
              <ElInput v-model="username" placeholder="Username" /> <!-- Element Plus 输入框组件绑定username -->
            </div>
            <div class="row">
              <ElInput type="password" v-model="password" placeholder="Password" /> <!-- Element Plus 输入框组件绑定password -->
            </div>
            <div class="row">
              <!-- 此行为示例，Element Plus 按钮组件，登录按钮 -->
              <ElButton type="primary" @click="loginProcess">登录</ElButton>
            </div>
            <!-- ... -->
          </div>
        </el-form>
      </div>
    </div>
  </template>

<style>
.main-content{
	width: 50%;
	border-radius: 20px;
	box-shadow: 0 5px 5px rgba(0,0,0,.4);
	margin: 5em auto;
	display: flex;
}
.company__info{
	background-color: #008080;
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	color: #fff;
}
.fa-android{
	font-size:3em;
}
@media screen and (max-width: 640px) {
	.main-content{width: 90%;}
	.company__info{
		display: none;
	}
	.login_form{
		border-top-left-radius:20px;
		border-bottom-left-radius:20px;
	}
}
@media screen and (min-width: 642px) and (max-width:800px){
	.main-content{width: 70%;}
}
.row > h2{
	color:#008080;
}
.login_form{
	background-color: #fff;
	border-top-right-radius:20px;
	border-bottom-right-radius:20px;
	border-top:1px solid #ccc;
	border-right:1px solid #ccc;
}
form{
	padding: 0 2em;
}
.form__input{
	width: 100%;
	border:0px solid transparent;
	border-radius: 0;
	border-bottom: 1px solid #aaa;
	padding: 1em .5em .5em;
	padding-left: 2em;
	outline:none;
	margin:1.5em auto;
	transition: all .5s ease;
}
.form__input:focus{
	border-bottom-color: #008080;
	box-shadow: 0 0 5px rgba(0,80,80,.4); 
	border-radius: 4px;
}
.btn{
	transition: all .5s ease;
	width: 70%;
	border-radius: 30px;
	color:#008080;
	font-weight: 600;
	background-color: #fff;
	border: 1px solid #008080;
	margin-top: 1.5em;
	margin-bottom: 1em;
}
.btn:hover, .btn:focus{
	background-color: #008080;
	color:#fff;
}
</style>