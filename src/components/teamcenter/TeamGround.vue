<template>
    <div>
    <el-input v-model="searchCriteria.name" placeholder="搜索队伍名称"></el-input>
    <el-input v-model="searchCriteria.leader" placeholder="搜索队长名称"></el-input>
    <el-input v-model="searchCriteria.requirement" placeholder="搜索技能需求"></el-input>
    <el-input v-model="searchCriteria.intro" placeholder="搜索队伍简介"></el-input>
    <el-checkbox v-model="searchCriteria.full">只显示未满员队伍</el-checkbox>
    <el-button @click="search">搜索</el-button>
    <el-button @click="resetSearch">重置</el-button>
    <!-- ...其他代码 -->
      <el-card class="team-card" v-for="team in paginatedTeams" :key="team.id">
        <div class="team-info">
            <el-row >
                <h3>{{ team.name }}</h3>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="5">
                    <p>队长：{{ team.leader }}</p>
                </el-col>
                <el-col :span="10" :offset="10">
                    <p>队员：{{ team.members.join(', ') }}</p>
                </el-col>
            </el-row>
            <el-row>
                <p>简介：{{ team.intro }}</p>
            </el-row>
            <el-row>
                <p>需求：{{ team.requirement }}</p>
            </el-row>
            <el-row>
                <p>队伍人数：{{ team.currentMembers }}/{{ team.totalMembers }}</p>
            </el-row>
        </div>
        <div class="buttons">
          <el-button type="primary" @click="viewDetails(team)">查看详情</el-button>
          <el-button :disabled="isTeamFull(team)" type="primary" @click="applyToJoin(team)">申请加入</el-button>
        </div>   
      </el-card>
      <el-pagination
        class="pagination"
        :total="totalTeams"
        :page-size="pageSize"
        @current-change="handlePageChange"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { ElCard, ElButton, ElPagination, ElMessage } from 'element-plus';
  import { fetchAllTeamList, fetchSearchTeamList} from '@/api/team.js';
  // 模拟队伍数据
//   const teams = ref([]);
// teams.values = fetchAllTeamList();
const teams = ref([
    { id: 1, name: '队伍1', leader: '张三', members: ['李四', '王五'], intro: '这是队伍1的简介', requirement: '需要xxx技能', currentMembers: 2, totalMembers: 5 },
    // 其他队伍数据...
    {id: 2, name: '队伍2', leader: '李四', members: ['张三', '王五'], intro: '这是队伍2的简介', requirement: '需要yyy技能', currentMembers: 2, totalMembers: 3},
    {id: 3, name: '队伍3', leader: '王五', members: ['张三', '李四'], intro: '这是队伍3的简介', requirement: '需要zzz技能', currentMembers: 2, totalMembers: 4},
    {id: 4, name: '队伍4', leader: '赵六', members: ['张三', '李四', '王五'], intro: '这是队伍4的简介', requirement: '需要aaa技能', currentMembers: 3, totalMembers: 3},
    {id: 5, name: '队伍5', leader: '孙七', members: ['张三', '李四', '王五'], intro: '这是队伍5的简介', requirement: '需要bbb技能', currentMembers: 3, totalMembers: 3},
    {id: 6, name: '队伍6', leader: '周八', members: ['张三', '李四', '王五'], intro: '这是队伍6的简介', requirement: '需要ccc技能', currentMembers: 3, totalMembers: 3},
    {id: 7, name: '队伍7', leader: '吴九', members: ['张三', '李四', '王五'], intro: '这是队伍7的简介', requirement: '需要ddd技能', currentMembers: 3, totalMembers: 3},
    {id: 8, name: '队伍8', leader: '郑十', members: ['张三', '李四', '王五'], intro: '这是队伍8的简介', requirement: '需要eee技能', currentMembers: 3, totalMembers: 3},
    {id: 9, name: '队伍9', leader: '张三', members: ['李四', '王五'], intro: '这是队伍9的简介', requirement: '需要fff技能', currentMembers: 2, totalMembers: 5},
    {id: 10, name: '队伍10', leader: '李四', members: ['张三', '王五'], intro: '这是队伍10的简介', requirement: '需要ggg技能', currentMembers: 2, totalMembers: 3},
    {id: 11, name: '队伍11', leader: '王五', members: ['张三', '李四'], intro: '这是队伍11的简介', requirement: '需要hhh技能', currentMembers: 2, totalMembers: 4},
    {id: 12, name: '队伍12', leader: '赵六', members: ['张三', '李四', '王五'], intro: '这是队伍12的简介', requirement: '需要iii技能', currentMembers: 3, totalMembers: 3},
    {id: 13, name: '队伍13', leader: '孙七', members: ['张三', '李四', '王五'], intro: '这是队伍13的简介', requirement: '需要jjj技能', currentMembers: 3, totalMembers: 3},
    {id: 14, name: '队伍14', leader: '周八', members: ['张三', '李四', '王五'], intro: '这是队伍14的简介', requirement: '需要kkk技能', currentMembers: 3, totalMembers: 3},
    {id: 15, name: '队伍15', leader: '吴九', members: ['张三', '李四', '王五'], intro: '这是队伍15的简介', requirement: '需要lll技能', currentMembers: 3, totalMembers: 3},
    {id: 16, name: '队伍16', leader: '郑十', members: ['张三', '李四', '王五'], intro: '这是队伍16的简介', requirement: '需要mmm技能', currentMembers: 3, totalMembers: 3},
  ]);
  
//搜索功能  
const searchCriteria = ref({
  name: '',
  leader: '',
  requirement: '',
  intro: '',
  full: false,
});

const search = async () => {
  // 发送搜索请求
//只填写有值的搜索条件
const searchParams = {};
if (searchName.value) searchParams.name = searchName.value;
if (searchLeader.value) searchParams.leader = searchLeader.value;
if (searchRequirement.value) searchParams.requirement = searchRequirement.value;
if (searchIntro.value) searchParams.intro = searchIntro.value;
searchParams.full = searchFull.value;

//如果有搜索条件，就发送搜索请求
if (Object.keys(searchParams).length > 0) {
  try {
    const result = await fetchSearchTeamList(searchCriteria.value);
    teams.value = result;
    ElMessage.success('搜索成功');
  } catch (error) {
    ElMessage.error('搜索失败');
  }
}
};
  

const resetSearch = async () => {
  // 重置搜索条件
  searchCriteria.value = {
    name: '',
    leader: '',
    requirement: '',
    intro: '',
    full: false,
  };
  // 重新获取所有队伍数据
  await fetchTeams();
};



  // 分页相关数据
  const currentPage = ref(1);
  const pageSize = 10;
  
  // 计算总队伍数
  const totalTeams = computed(() => teams.value.length);
  
  // 计算当前页的队伍数据
  const paginatedTeams = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = currentPage.value * pageSize;
    return teams.value.slice(start, end);
  });
  
  // 查看详情事件处理程序
  const viewDetails = (team) => {
    console.log('查看详情：', team);
    // 进行相应的操作，比如弹出模态框显示详情
  };
  
  // 申请加入事件处理程序
  const applyToJoin = (team) => {
    console.log('申请加入：', team);
    // 进行相应的操作，比如弹出确认对话框或发送申请请求
  };
  
  // 处理分页变化事件
  const handlePageChange = (newPage) => {
    console.log('当前页:', newPage);
    currentPage.value = newPage; // 正确更新currentPage的值
  };
  
  // 判断队伍是否已满员
  const isTeamFull = (team) => {
    return team.currentMembers >= team.totalMembers;
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
  
  .pagination {
    margin-top: 20px;
  }


  /* ...搜索样式 */
.search-section {
  margin-bottom: 20px;
}

.search-section .el-input,
.search-section .el-checkbox {
  margin-right: 10px;
}
  </style>
  