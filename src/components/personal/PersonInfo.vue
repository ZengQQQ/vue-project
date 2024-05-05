<template> 
    <el-card class="container">
      <template #header>
        <div class="card-header">
          <span style="font-size: large;">个人基本信息</span>
        </div>
      </template>
      <el-row>
          <el-col :span="12">
              <el-form :model="userInfo" :rules="rules" label-width="80px">
                  <el-form-item label="ID" prop="u_id">
                      <el-input v-model="userInfo.u_id" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" prop="u_name">
                      <el-input v-model="userInfo.u_name" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="u_tele">
                      <el-input v-model="userInfo.u_tele" placeholder="请输入电话"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="u_mail">
                      <el-input v-model="userInfo.u_mail" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                  <el-form-item label="简介" prop="u_intro">
                      <el-input v-model="userInfo.u_intro" placeholder="请输入简介" type="textarea" :rows="4"></el-input>
                  </el-form-item>
              </el-form>
          </el-col>
      </el-row>

      <template #footer>
          <el-button type="primary" @click="updateUserInfo" class="submit-button">提交修改</el-button>
      </template> 
    </el-card>
</template>

<script setup>
import { ref } from "vue";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { ElForm, ElMessage } from "element-plus";
import { updateUserInfoService } from "@/api/user.js";

const userInfoStore = useUserInfoStore();

const userInfo = ref({
    u_id: '211110223',
    u_name: '张三',
    u_tele: '13116408747',
    u_mail: '22000304515@qq.com',
    u_intro: '我是某某专业的，喜欢干某某事情',
});

const rules ={
    u_id: [],
    u_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { max: 20, message: '姓名不能超过20个字符', trigger: 'blur' }],
    u_tele: [{ pattern: /^\d{11}$/, message: '请输入11位电话号码', trigger: 'blur' }],
    u_mail: [{ type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }],
    u_intro: [],
}

const updateUserInfo = async () => {
    // 调用接口
    let res = await updateUserInfoService(userInfo.value);

    console.log(userInfo.value);
    ElMessage.success(res.message?res.message:'修改成功');

    // 数据存储到pinia中
    userInfoStore.setInfo(userInfo.value);
}
</script>

<style scoped>

</style>
