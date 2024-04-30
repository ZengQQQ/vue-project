<script>
import { ref } from 'vue';
import { useTokenStore} from '@/stores/token.js';
import {ElMessage} from 'element-plus';
import {useUserInfoStore} from '@/stores/userInfo.js';


export default {
  // ...组件定义
  
  props:{
    detailDialogVisible: Boolean,
    nowselectedJob: Object,
  },

  setup(props) {
    const teams = ref([]);
    const showTeamsDialog = ref(false);
    const selectedTeam = ref(null);
    const selectedJob = ref(null);

    const userInfoStore = useUserInfoStore();
    // 获取团队列表
    const fetchTeams = async () => {
      try {
        teams.value = await getTeams();
        showTeamsDialog.value = true; // 显示团队列表对话框
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    // 申请工作
    const applyForJob = () => {
        //首先获取团队列表
        teams,value = fetchTeams();
        //判断是否有团队
        if(teams){
            //有团队,弹出对话框
        showTeamsDialog.value = true;
        
        
        }
        else{
            ElMessage({
                type: 'warning',
                message: '您目前还没有团队可供选择，请先前往组队中心创建团队'
            });
        }   
    };

    // 确认选择的团队并申请工作
    const confirmTeamAndApply = async () => {
      try {
        await applyForJobWithTeam(nowselectedJob.value, nowselectedTeam.value);
        showTeamsDialog.value = false; // 关闭团队列表对话框
        // 可以在这里添加申请成功后的逻辑，比如显示提示信息等
      } catch (error) {
        console.error('Error applying for job with team:', error);
      }
    };

    const dialogVisibleHandle = (value) => {
      this.$emit('updateDialogVisible', value);
    };

    return {
      // ...返回的响应式变量和方法
      teams,
      showTeamsDialog,
      selectedTeam,
      applyForJob,
      confirmTeamAndApply,
      dialogVisibleHandle,
    
    };
  },
};
</script>



<template>
    <!-- 工作详情对话框 -->
    <el-dialog
        :title="nowselectedJob ? `${nowselectedJob.Ic_id} - ${nowselectedJob.w_st}` : '工作详情'"
          v-model="detailDialogVisible"
          width="50%"
        >
        <div v-if="nowselectedJob">
        <div v-for="(value, key) in nowselectedJob" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogDetailVisible(false)">取消</el-button>
          <el-button type="primary" @click="applyForJob">申请工作</el-button>
        </span>
      </template>
        </el-dialog>


    <!-- 团队列表对话框 -->
    <el-dialog v-model="showTeamsDialog" title="选择团队">
      <el-select v-model="selectedTeam" placeholder="请选择团队">
        <el-option
          v-for="team in teams"
          :key="team.id"
          :label="team.name"
          :value="team.id">
        </el-option>
      </el-select>
      <el-button @click="confirmTeamAndApply">确认</el-button>
    </el-dialog>
  </template>