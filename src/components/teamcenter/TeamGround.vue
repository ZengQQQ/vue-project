<template>
  <div>
    <!-- 搜索区域 -->
    <div class="search-section">
      <el-input v-model="searchCriteria.name" placeholder="搜索队伍名称"></el-input>
      <el-input v-model="searchCriteria.leader" placeholder="搜索队长名称"></el-input>
      <el-input v-model="searchCriteria.requirement" placeholder="搜索技能需求"></el-input>
      <el-input v-model="searchCriteria.intro" placeholder="搜索队伍简介"></el-input>
      <el-checkbox v-model="searchCriteria.full">只显示未满员队伍</el-checkbox>
      <el-button @click="search">搜索</el-button>
      <el-button @click="resetSearch">重置</el-button>
    </div>

    <!-- 队伍列表 -->
    <el-card class="team-card" v-for="team in teams" :key="team.t_id">
      <div class="team-info">
        <el-row>
          <h3>{{ team.t_name }}</h3>
        </el-row>
        <el-row >
            <p>队长：{{ team.captain.u_name }}</p>
        </el-row>
        <el-row>
          <p>简介：{{ team.t_info }}</p>
        </el-row>
        <el-row>
          <p>队伍人数：{{ team.t_curnum }}/{{ team.t_maxnum }}</p>
        </el-row>
      </div>
      <div class="buttons">
        <el-button type="primary" @click="viewDetails(team)">查看详情</el-button>
        <el-button :disabled="isTeamFull(team)" type="primary" @click="applyToJoin(team)">申请加入</el-button>
      </div>
    </el-card>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalSize">
    </el-pagination>
  </div>


  <el-dialog v-model="dialogVisible" width="50%" title="队伍详情">
    <div v-if="selectedTeam">
      <p><strong>队伍名称：</strong>{{ selectedTeam.t_name }}</p>
      <p><strong>队长：</strong>{{ selectedTeam.captain.u_name }}</p>
      <p><strong>队员：</strong>{{ selectedTeam.members.map(member => member.u_name).join(', ') }}</p>
      <p><strong>简介：</strong>{{ selectedTeam.t_info }}</p>
      <p><strong>队伍人数：</strong>{{ selectedTeam.t_curnum }}/{{ selectedTeam.t_maxnum }}</p>
    </div>
  </el-dialog>

  <!-- 填写申请理由 -->
  <el-dialog v-model="reasonDialogVisible" title="填写申请理由">
    <el-input v-model="reason" placeholder="请输入申请理由" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="reasonDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sendApplyMessage">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ElCard, ElButton, ElCheckbox, ElInput, ElMessage } from 'element-plus';
import { fetchAllTeamList, fetchSearchTeamList, joinTeam } from '@/api/team.js';
import {useUserInfoStore} from '@/stores/userInfo.js';

const userInfoStore = useUserInfoStore();

onMounted(()=>{
  fetchTeams();
});

const currentPage = ref(1);
const pageSize = ref(16); // 根据您的需求调整
const totalSize = ref(0);

// 搜索条件
const searchCriteria = ref({
  name: '',
  leader: '',
  requirement: '',
  intro: '',
  full: false,
});

// 队伍数据
const teams = ref([]);
//申请理由
const reason = ref('');
const reasonDialogVisible = ref(false);
const templateTeam = ref(null);

const fetchTeams = async () =>{
  const data = await fetchAllTeamList({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
  });
  if(data.code===200){
    teams.value = data.data.listPage;
    totalSize.value = data.data.totalSize;
  }else{
    ElMessage.error(data.message?data.message:"未找到");
  }
};


// 搜索功能
const search = async () => {
  try {
    // 每次搜索前重置当前页为第一页
    currentPage.value = 1;

    // 构造请求参数，包括搜索条件和分页信息
    const params = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      ...searchCriteria.value, // 展开搜索条件作为参数
    };

    // 发送搜索请求
    const result = await fetchSearchTeamList(params);

    // 处理返回的搜索结果
    if (result.code === 200) {
      teams.value = result.data.listPage;
      totalSize.value = result.data.totalSize; // 更新总记录数
      ElMessage.success('搜索成功');
    } else {
      ElMessage.error(result.message || '未找到');
    }
  } catch (error) {
    ElMessage.error('搜索失败');
  }
};

// 重置搜索条件
const resetSearch = async () => {
  searchCriteria.value = {
    name: '',
    leader: '',
    requirement: '',
    intro: '',
    full: false,
  };
  await fetchTeams(); // 重新获取所有队伍数据
};


// 申请加入事件处理程序
const applyToJoin = (team) => {
  //填写申请理由
  reasonDialogVisible.value = true;
  templateTeam.value = team;
};

// 发送申请理由
const sendApplyMessage = () => {
  if (!reason.value) {
    ElMessage.error('请填写申请理由');
    return;
  }
  // 进行相应的操作，比如弹出确认对话框或发送申请请求
   joinTeam({
    t_id:templateTeam.value.t_id,
    u_acc:userInfoStore.info.u_acc,
    tsm_info:reason.value,
    tsm_dct:1,
  })
    .then((res) => {
      if (res.code === 200) {
        ElMessage.success('申请成功');
        fetchTeams();
      } else {
        ElMessage.error(res.message || '申请失败');
      }
    })
    .catch((error) => {
      ElMessage.error('申请失败');
    });

  // 重置申请理由
  reason.value = '';
  reasonDialogVisible.value = false;
};


// 判断队伍是否已满员
const isTeamFull = (team) => {
  return team.t_curnum >= team.t_maxnum;
};


const handleSizeChange = newSize => {
  pageSize.value = newSize;
  fetchTeams();
};

const handleCurrentChange = newPage => {
  currentPage.value = newPage;
  fetchTeams();
};

const dialogVisible = ref(false);
const selectedTeam = ref(null);


const viewDetails = (team) => {
  selectedTeam.value = team;
  dialogVisible.value = true;
};

</script>

<style scoped>
.team-card {
  margin-bottom: 20px;
}

.team-info {
  padding: 20px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.search-section {
  margin-bottom: 20px;
}

.search-section .el-input,
.search-section .el-checkbox {
  margin-right: 10px;
}
</style>
