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
                      <el-input v-model="userInfo.u_acc" :disabled="true"></el-input>
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
                  <el-form-item label="专业" prop="u_major">
                        <el-input v-model="userInfo.u_major" placeholder="请输入专业或者研究方向"></el-input>
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
    u_id: userInfoStore.info.u_id,
    u_acc: userInfoStore.info.u_acc,
    u_name: userInfoStore.info.u_name,
    u_tele: userInfoStore.info.u_tele,
    u_mail: userInfoStore.info.u_mail,
    u_major: userInfoStore.info.u_major,
    u_intro: userInfoStore.info.u_intro,
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
    let res = await updateUserInfoService({
        u_id: userInfo.value.u_id,
        u_name: userInfo.value.u_name,
        u_tele: userInfo.value.u_tele,
        u_mail: userInfo.value.u_mail,
        u_major: userInfo.value.u_major,
        u_intro: userInfo.value.u_intro,
        u_acc: userInfo.value.u_acc,
    });

    console.log(userInfo.value);
    ElMessage.success(res.message?res.message:'修改成功');

    // 数据存储到pinia中
    userInfoStore.setInfo(userInfo.value);
}
</script>

<style scoped>

</style>
