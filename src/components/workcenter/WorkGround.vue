<script>
import { ref, computed, watch } from "vue";
import {
  ElContainer,
  ElAside,
  ElMain,
  ElInput,
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDialog,
  ElMessage,
} from "element-plus";
import { getWorkList,getWorkListCondition,applyWorkWithTeam} from "@/api/work";
import { fetchPersonTeamList } from "@/api/team";
import SearchWork from "@/components/workcenter/SearchWork.vue";
import {useUserInfoStore} from '@/stores/userInfo.js'

export default {
  components: {
    ElContainer,
    ElAside,
    ElMain,
    ElInput,
    ElButton,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElDialog,
    SearchWork,
    
  },
  setup() {
    const jobs = ref([]);
    const searchQuery = ref("");
    const selectedJob = ref(null);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalJobs = ref(0);

    const teams = ref([]);
    const showTeamsDialog = ref(false);
    const selectedTeam = ref(null);

    const detailDialogVisible = ref(false);
    const small = ref(false);
    const background = ref(true);
    const disabled = ref(false);

    const hasMoreTeams = ref(true); // Flag to track if there are more teams to load
    const teamPage = ref(1); // Current page of teams
    const teamPageSize = 16; // Page size for teams
    const teamTotalPage = ref(0); // Total pages of teams

    const userInfoStore = useUserInfoStore();

    // 模拟获取工作数据的API调用
    const fetchJobs = async () => {
      // 替换为实际的API请求
      try {

      console.log("Fetching jobs...");
      
      const data = await getWorkList();

    console.log("Data from API:", data);
    console.log("pages",data.data.listPage);
    jobs.value = data.data.listPage;
    console.log("Jobs:", jobs.value);
    totalJobs.value = jobs.value.length;

      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    
    // 搜索工作
    const searchJobs = async (params) => {
      // 根据searchQuery.value过滤jobs并重新计算pagedJobs
      //如果parmas不为空，则进行搜索
      if (params){
        // 此处应替换为实际的搜索API请求
        // 假设getWorkList支持搜索查询
        try {
          const data = await getWorkListCondition(params);
          const searchRes = data.data.listPage;
          if (searchRes.length === 0) {
            ElMessage({
              type: "warning",
              message: "未查找到相关工作",
            });
          } else {
            jobs.value = searchRes;
            totalJobs.value = jobs.value.length;
          }
        } catch (error) {
          console.error("Search failed:", error);
        }
      } else {
        // 如果搜索框为空，则获取所有工作
        ElMessage({
          type: "info",
          message: "请输入搜索条件",
        });
      }
    };
    const openJobDetail = (job) => {
      selectedJob.value = job;
      detailDialogVisible.value = true;
    };

    // 分页改变事件
    const handlePageChange = (newPage) => {
      currentPage.value = newPage;
    };

    // 计算属性，根据当前页码返回相应页码的数据
    const pagedJobs = computed(() => {
      const offset = (currentPage.value - 1) * pageSize.value;
      return jobs.value.slice(offset, offset + pageSize.value);
    });

    // 监听currentPage变化，当currentPage变化时，重新计算pagedJobs
    watch(jobs, () => {
      totalJobs.value = jobs.value.length;
    });

    const fetchTeams = async () => {
      try {
        const data = await fetchPersonTeamList({u_acc:userInfoStore.info.u_acc});
        teams.value = data.data.listPage;
        teamTotalPage.value = data.data.totalPage;
        console.log("teams",teams.value);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    console.log(jobs.value.length, pagedJobs.value.length, totalJobs.value);

    // 申请工作
    const applyForJob = async () => {
      //首先获取团队列表
      await fetchTeams();
      //判断是否有团队
      if (teams.value.length > 0) {
        //有团队,弹出对话框
        if(currentPage.value < teamTotalPage.value){
        hasMoreTeams.value = true;  
      }else{
        hasMoreTeams.value = false;
      }
        showTeamsDialog.value = true;
      } else {
        ElMessage({
          type: "warning",
          message: "您目前还没有团队可供选择，请先前往组队中心创建团队",
        });

      }
    };

    // 确认选择的团队并申请工作
    const confirmTeamAndApply = async () => {
      if(!selectedJob.value || !selectedTeam.value) {
        ElMessage({
          type: "warning",
          message: "请选择工作和团队",
        });
        return;
      }
      try {
        await applyWorkWithTeam(selectedJob.value, selectedTeam.value);
        showTeamsDialog.value = false; // 关闭团队列表对话框
        teamPage.value = 1; // Reset the team page number
        hasMoreTeams.value = true; // Reset the flag for more teams
        // 可以在这里添加申请成功后的逻辑，比如显示提示信息等
      } catch (error) {
        console.error("Error applying for job with team:", error);
      }
    };
    // 初始加载数据
    fetchJobs(); //先自己给定初始的数据



    const loadMoreTeams = async () => {
      try {
        const data = await fetchPersonTeamList({
          u_acc: userInfoStore.info.u_acc,
          currentPage: teamPage.value + 1, // Load the next page of teams
          pageSize: teamPageSize,
        });
      
        const newTeams = data.data.listPage;
        console.log("newTeams",newTeams);
        if (newTeams.length > 0) {
          teams.value = [...teams.value, ...newTeams]; // Append new teams to the existing teams
          teamPage.value++; // Increment the page number
        } 
        else {
          hasMoreTeams.value = false; // No more teams to load
        }
      } catch (error) {
        console.error("Error loading more teams:", error);
      }
    };



// 格式化日期
const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // 使用本地日期格式，您可以根据需要调整格式化方式
    };

    // 获取项目级别的文本表示
    const getLevelText = (level) => {
      const levelMap = {
        'A': 'A类竞赛',
        'B': 'B类竞赛',
        'C': '特定项目',
        'D': '日常任务',
        // 根据实际情况添加更多级别
      };
      return levelMap[level] || '未知级别';
    };
    return {
      jobs,
      selectedJob,
      currentPage,
      openJobDetail,
      searchJobs,
      handlePageChange,
      pagedJobs,
      totalJobs,
      pageSize,

      detailDialogVisible,
      teams,
      showTeamsDialog,
      selectedTeam,
      applyForJob,
      confirmTeamAndApply,

      small,
      background,
      disabled,

      SearchWork,
hasMoreTeams,
      loadMoreTeams,
      formatDate,
      getLevelText,
    };
  },
};
</script>

<template>
  <!-- 没有数据就不展示 -->
  <div v-if="totalJobs !== 0">
    <!-- 搜索框 -->
    <SearchWork @sendJobParams="searchJobs" />

    <!-- 工作列表 -->
    <el-table :data="pagedJobs" style="width: 100%">
      <el-table-column prop="p_name" label="项目名称" />
      <el-table-column prop="editor.u_acc" label="创建者" width="180" />
      <el-table-column prop="p_info" label="项目介绍" />
      <el-table-column prop="p_st" label="开始时间" />
      <el-table-column prop="p_ddl" label="结束时间" />
      <el-table-column prop="p_level" label="级别" />
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="small"
            @click="openJobDetail(scope.row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      class="pagination-right"
      :current-page="currentPage"
      :page-size="pageSize"
      :disabled="disabled"
      :small="small"
      :background="background"
      @current-change="handlePageChange"
      layout="prev, pager, next, jumpe "
      :total="totalJobs"
      style="margin-top: 20px; margin-right: 20px"
    />
  </div>
  <div v-else>
    <el-empty description="没有数据哦~" />
  </div>

  <!-- 工作详情弹窗 -->
  <el-dialog
    :title="selectedJob ? `${selectedJob.p_name}` : '工作详情'"
    v-model="detailDialogVisible"
    width="50%"
  >
    <div v-if="selectedJob">
      <el-row>
        <el-col :span="6" class="detail-label">项目名称：</el-col>
        <el-col :span="18">{{ selectedJob.p_name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-label">项目介绍：</el-col>
        <el-col :span="18">{{ selectedJob.p_info }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-label">项目级别：</el-col>
        <el-col :span="18">{{ getLevelText(selectedJob.p_level) }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-label">开始时间：</el-col>
        <el-col :span="18">{{ formatDate(selectedJob.p_st) }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-label">结束时间：</el-col>
        <el-col :span="18">{{ formatDate(selectedJob.p_ddl) }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-label">比赛网址：</el-col>
        <el-col :span="18">
          <a :href="selectedJob.p_url" target="_blank">{{
            selectedJob.p_url
          }}</a>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-label">完成目标：</el-col>
        <el-col :span="18">{{ selectedJob.p_cc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-label">最大申请次数：</el-col>
        <el-col :span="18">{{
          selectedJob.p_maxtime === 0
            ? "无限次数"
            :selectedJob.p_maxtime
        }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-label">是否需要同意：</el-col>
        <el-col :span="18">{{
          selectedJob.p_resagree === 0 ? "无需同意" : "需要同意"
        }}</el-col>
      </el-row>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="detailDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="applyForJob">申请该项目</el-button>
      </span>
    </template>
  </el-dialog>



  <!-- 团队列表对话框 -->
  <el-dialog v-model="showTeamsDialog" title="选择团队">
    <span> 选择您要承接此项工作的团队： </span>
    <el-select v-model="selectedTeam" placeholder="请选择团队">
      <el-option
        v-for="team in teams"
        :key="team.t_id"
        :label="team.t_name"
        :value="team.t_id"
      >
      </el-option>
    </el-select>
    <el-button @click="confirmTeamAndApply">确认</el-button>
    <el-button @click="showTeamsDialog = false">取消</el-button>
    <el-button @click="loadMoreTeams" v-show="hasMoreTeams">加载更多</el-button>
 </el-dialog>
</template>


<style scoped>
.pagination-right {
  float: right;
  margin-right: 20px;
  justify-content: flex-end; /* 使分页导航栏靠右显示 */
}

.detail-label {
  font-weight: bold;
}

</style>
