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
import { getWorkList } from "@/api/work";
import { fetchPersonTeamList } from "@/api/team";
import SearchWork from "@/components/workcenter/SearchWork.vue"

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
    // 模拟获取工作数据的API调用
    const fetchJobs = async () => {
      // 替换为实际的API请求
      try {
        jobs.value = await getWorkList();
        totalJobs.value = jobs.value.length;
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    // 搜索工作
const searchJobs = async (params) => {
    // 根据searchQuery.value过滤jobs并重新计算pagedJobs
    //如果parmas不为空，则进行搜索
    if (params) {
      // 此处应替换为实际的搜索API请求
      // 假设getWorkList支持搜索查询
      try {
        const searchRes = await getWorkList(params);

        if(searchRes.length === 0) {
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

    // 打开工作详情
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

    // 初始加载数据
    // fetchJobs(); 先自己给定初始的数据
    jobs.value = [
    {
      Ic_id: "1",
      w_st: "2021-08-01",
      w_ddldate: "2021-08-31",
      w_name: "工作1",
      w_desc: "工作1描述",
    },
    {
      Ic_id: "2",
      w_st: "2021-08-02",
      w_ddldate: "2021-08-30",
      w_name: "工作2",
      w_desc: "工作2描述",
    },
    {
      Ic_id: "3",
      w_st: "2021-08-03",
      w_ddldate: "2021-08-29",
      w_name: "工作3",
      w_desc: "工作3描述",
    },
    {
      Ic_id: "4",
      w_st: "2021-08-04",
      w_ddldate: "2021-08-28",
      w_name: "工作4",
      w_desc: "工作4描述",
    },
    {
      Ic_id: "5",
      w_st: "2021-08-05",
      w_ddldate: "2021-08-27",
      w_name: "工作5",
      w_desc: "工作5描述",
    },
    {
      Ic_id: "6",
      w_st: "2021-08-06",
      w_ddldate: "2021-08-26",
      w_name: "工作6",
      w_desc: "工作6描述",
    },
    {
      Ic_id: "7",
      w_st: "2021-08-07",
      w_ddldate: "2021-08-25",
      w_name: "工作7",
      w_desc: "工作7描述",
    },
    {
      Ic_id: "8",
      w_st: "2021-08-08",
      w_ddldate: "2021-08-24",
      w_name: "工作8",
      w_desc: "工作8描述",
    },
    {
      Ic_id: "9",
      w_st: "2021-08-09",
      w_ddldate: "2021-08-23",
      w_name: "工作9",
      w_desc: "工作9描述",
    },
    {
      Ic_id: "10",
      w_st: "2021-08-10",
      w_ddldate: "2021-08-22",
      w_name: "工作10",
      w_desc: "工作10描述",
    },
    {
      Ic_id: "11",
      w_st: "2021-08-11",
      w_ddldate: "2021-08-21",
      w_name: "工作11",
      w_desc: "工作11描述",
    },
    {
      Ic_id: "12",
      w_st: "2021-08-12",
      w_ddldate: "2021-08-20",
      w_name: "工作12",
      w_desc: "工作12描述",
    },
    {
      Ic_id: "13",
      w_st: "2021-08-13",
      w_ddldate: "2021-08-19",
      w_name: "工作13",
      w_desc: "工作13描述",
    },
    {
      Ic_id: "14",
      w_st: "2021-08-14",
      w_ddldate: "2021-08-18",
      w_name: "工作14",
      w_desc: "工作14描述",
    },
    {
      Ic_id: "15",
      w_st: "2021-08-15",
      w_ddldate: "2021-08-17",
      w_name: "工作15",
      w_desc: "工作15描述",
    },
    {
      Ic_id: "16",
      w_st: "2021-08-16",
      w_ddldate: "2021-08-16",
      w_name: "工作16",
      w_desc: "工作16描述",
    },
    {
      Ic_id: "17",
      w_st: "2021-08-17",
      w_ddldate: "2021-08-15",
      w_name: "工作17",
      w_desc: "工作17描述",
    },
    {
      Ic_id: "18",
      w_st: "2021-08-18",
      w_ddldate: "2021-08-14",
      w_name: "工作18",
      w_desc: "工作18描述",
    },
    {
      Ic_id: "19",
      w_st: "2021-08-19",
      w_ddldate: "2021-08-13",
      w_name: "工作19",
      w_desc: "工作19描述",
    },
  ];

    const fetchTeams = async () => {
      try {
        teams.value = await fetchPersonTeamList();
        showTeamsDialog.value = true; // 显示团队列表对话框
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    console.log(jobs.value.length,pagedJobs.value.length,totalJobs.value)

    // 申请工作
    const applyForJob = async () => {
      //首先获取团队列表
      await fetchTeams();
      //判断是否有团队
      if (teams.value.length>0) {
        //有团队,弹出对话框
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
      try {
        await applyForJobWithTeam(selectedJob.value, selectedTeam.value);
        showTeamsDialog.value = false; // 关闭团队列表对话框
        // 可以在这里添加申请成功后的逻辑，比如显示提示信息等
      } catch (error) {
        console.error("Error applying for job with team:", error);
      }
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
    <el-table-column prop="Ic_id" label="工作ID" width="180" />
    <el-table-column prop="w_st" label="开始日期" width="180" />
    <el-table-column prop="w_ddldate" label="截止日期" />
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
    :title="
      selectedJob ? `${selectedJob.Ic_id} - ${selectedJob.w_st}` : '工作详情'
    "
    v-model="detailDialogVisible"
    width="50%"
  >
    <div v-if="selectedJob">
      <div v-for="(value, key) in selectedJob" :key="key">
        <strong>{{ key }}:</strong> {{ value }}
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="detailDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="applyForJob">申请工作</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 团队列表对话框 -->
  <el-dialog v-model="showTeamsDialog" title="选择团队">
    <span>
      选择您要承接此项工作的团队：
    </span>
    <el-select v-model="selectedTeam" placeholder="请选择团队">
      <el-option
        v-for="team in teams"
        :key="team.id"
        :label="team.name"
        :value="team.id"
      >
      </el-option>
    </el-select>
    <el-button @click="confirmTeamAndApply">确认</el-button>
    <el-button @click="showTeamsDialog=false">取消</el-button>
  </el-dialog>
</template>


<style scoped>

.pagination-right {
  float: right;
  margin-right: 20px;
  justify-content: flex-end; /* 使分页导航栏靠右显示 */
}

</style>
