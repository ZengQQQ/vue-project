<script setup>
import { ref, onMounted } from "vue";
import { useUserInfoStore } from "@/stores/userInfo.js";
import {
  getMyManagedStalls,
  getMyParticipatedStalls,
  deleteStallProject,
} from "@/api/work";
import { ElMessage,ElMessageBox } from "element-plus";

const managedWorks = ref([]);
const participatedWorks = ref([]);
const userInfoStore = useUserInfoStore();
const currentTab = ref("managed");
const currentWork = ref([]);

async function fetchManagedWorks() {
  // 获取由用户管理的项目列表
  const data = await getMyManagedStalls({
    u_acc: userInfoStore.info.u_acc,
    currentPage: currentPage.value,
    pageSize: pageSize.value,
  });
  managedWorks.value = data.data.listPage;
  totalSize.value = data.data.totalSize;
}

async function fetchParticipatedWorks() {
  // 获取用户作为团队成员参与的项目列表
  const data = await getMyParticipatedStalls({
    u_acc: userInfoStore.info.u_acc,
    currentPage: currentPage.value,
    pageSize: pageSize.value,
  });
  participatedWorks.value = data.data.listPage;
  totalSize.value = data.data.totalSize;
}

onMounted(() => {
  fetchManagedWorks();
  fetchParticipatedWorks();
});

const editDialogVisible = ref(false);
const editedWork = ref({}); // 编辑中的项目

function showEditDialog(work) {
  // 打开编辑对话框并初始化编辑中的项目
  editedWork.value = { ...work };
  currentWork.value = { ...work };
  // editDialogVisible.value = true;
  ElMessageBox.confirm(
    '这将会取消当前承接的项目，确认继续?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      updateWork();
  
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })

}

async function updateWork() {
  // 发送更新请求到后端,删除项目的联系
  const data = await deleteStallProject({
    p_id: editedWork.value.project.p_id,
    st_id: editedWork.value.st_id,
  });
  editDialogVisible.value = false;
  if (data.code === 200) {
    fetchManagedWorks();
    fetchParticipatedWorks();
    ElMessage({
      message: "取消成功",
      type: "success",
    });
  } else {
    ElMessage.error(data.message ? data.message : "取消失败");
  }
}

// 在这里定义队伍详情、导师信息和项目详情的数据
const teamDetail = ref(null);
const mentorDetail = ref(null);
const projectDetail = ref(null);

const tempMentor = ref({
  u_acc: "",
  u_name: "",
  u_major: "",
  u_tele: "",
  u_mail: "",
});

const tempProject = ref({
  p_name: "",
  p_info: "",
  p_level: "A", // 默认值
  p_st: null,
  p_ddl: null,
  p_url: "#", // 默认值
  p_img: null,
  p_cc: "",
  p_maxtime: 0, // 默认值
  p_resagree: 0, // 默认值
  p_status: 0, // 默认值
});

const tempTeam = ref({
  captain: "",
  t_members: [],
  t_id: "",
  t_name: "",
  t_info: "",
  t_curnum: "",
  t_maxnum: "",
  t_status: "",
});

const currentPage = ref(1);
const pageSize = ref(12);
const totalSize = ref(0);


// 获取队伍详情
function showTeamDiaglog(work) {
  // 根据 work 中的信息，从后端获取队伍详情数据
  // 这里假设有一个名为 getTeamDetailById 的函数可以根据队伍 ID 获取队伍详情
  // 你需要根据实际情况修改这里的实现
  tempTeam.value = work.teamFix;
  console.log(tempTeam.value);
  teamDetail.value = true;
}

// 获取导师信息
function showMentorDiaglog(work) {
  // 根据 work 中的信息，从后端获取导师详情数据
  // 这里假设有一个名为 getMentorDetailById 的函数可以根据导师 ID 获取导师详情
  // 你需要根据实际情况修改这里的实现
  tempMentor.value = work.mentor;
  console.log(tempMentor.value);
  mentorDetail.value = true;
}

// 获取项目详情
function showProjectDiaglog(work) {
  tempProject.value = work.project;
  console.log(tempProject.value);
  projectDetail.value = true;
}


function handlePageSizeChange(val) {
  pageSize.value = val;
  currentPage.value = 1; // 页码改变后重置为第一页
  fetchManagedWorks();
  fetchParticipatedWorks();
}

function handleCurrentPageChange(val) {
  currentPage.value = val;
  fetchManagedWorks();
  fetchParticipatedWorks();
}


// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // 使用本地日期格式，您可以根据需要调整格式化方式
};

// 获取项目级别的文本表示
const getLevelText = (level) => {
  const levelMap = {
    1: "初级",
    2: "中级",
    3: "高级",
    // 根据实际情况添加更多级别
  };
  return levelMap[level] || "未知级别";
};
</script>

<template>
  <el-tabs v-model="currentTab">
    <el-tab-pane label="我管理的项目" name="managed">
      <!-- 用户管理的项目列表 -->
      <template v-if="managedWorks.length > 0">
      <div v-for="item in managedWorks" :key="item.st_id">
        
        <!-- 使用 work 的属性展示项目信息 -->
        <el-descriptions title="工作单" :column="3" border>
          <el-descriptions-item
            label="工作名称"
            label-align="right"
            align="center"
            label-class-name="my-label"
            class-name="my-content"
            width="150px"
          >
            {{ item.project.p_name }}
          </el-descriptions-item>

          <el-descriptions-item
            label="团队负责人"
            label-align="right"
            align="center"
          >
            {{ item.teamFix.captain.u_name }}
          </el-descriptions-item>
          <el-descriptions-item
            label="指导老师"
            label-align="right"
            align="center"
          >
            {{ item.mentor.m_name }}
          </el-descriptions-item>
          <el-descriptions-item label="成员" label-align="right" align="center">
            <el-row
              v-for="(member, index) in item.teamFix.members"
              :key="index"
            >
              <el-col :span="12">
                <span>{{ member.u_name }}</span>
              </el-col>
            </el-row>
          </el-descriptions-item>
          <el-descriptions-item
            label="开始时间"
            label-align="right"
            align="center"
          >
            {{ item.project.p_st }}
          </el-descriptions-item>
          <el-descriptions-item
            label="结束时间"
            label-align="right"
            align="center"
          >
            {{ item.project.p_ddl }}
          </el-descriptions-item>
          <el-descriptions-item
            label="工作类型"
            label-align="right"
            align="center"
          >
            <el-tag size="small">{{
              getLevelText(item.project.p_level)
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="目标" label-align="right" align="center">
            {{ item.project.p_cc }}
          </el-descriptions-item>
          <el-descriptions-item
            label="工作状态"
            label-align="right"
            align="center"
          >
            <el-tag size="small" type="success">{{ item.st_status }}</el-tag>
          </el-descriptions-item>
          <!-- 编辑按钮，点击打开编辑对话框 -->
          <el-descriptions-item label="操作" label-align="right" align="center">
            <el-button @click="showEditDialog(item)">取消项目</el-button>
            <el-button @click="showTeamDiaglog(item)">查看队伍详情</el-button>
            <el-button @click="showProjectDiaglog(item)"
              >查看项目详情</el-button
            >
            <el-button @click="showMentorDiaglog(item)">查看导师详情</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      </template>
      <template v-else>
        <el-empty></el-empty>
    </template>



    </el-tab-pane>
    <el-tab-pane label="我参与的项目" name="participated">
      <!-- 用户参与的项目列表 -->
      <template v-if="participatedWorks.length>0">
      <div v-for="item in participatedWorks" :key="item.st_id">
        <!-- 使用 work 的属性展示项目信息 -->
        <el-descriptions title="工作单" :column="3" border>
          <el-descriptions-item
            label="工作名称"
            label-align="right"
            align="center"
            label-class-name="my-label"
            class-name="my-content"
            width="150px"
          >
            {{ item.project.p_name }}
          </el-descriptions-item>
          <el-descriptions-item
            label="团队负责人"
            label-align="right"
            align="center"
          >
            {{ item.teamFix.captain.u_name }}
          </el-descriptions-item>
          <el-descriptions-item
            label="指导老师"
            label-align="right"
            align="center"
          >
            {{ item.mentor.m_name }}
          </el-descriptions-item>
          <el-descriptions-item label="成员" label-align="right" align="center">
            <el-row
              v-for="(member, index) in item.teamFix.members"
              :key="index"
            >
              <el-col :span="12">
                <span>{{ member.u_name }}</span>
              </el-col>
            </el-row>
          </el-descriptions-item>
          <el-descriptions-item
            label="开始时间"
            label-align="right"
            align="center"
          >
            {{ item.project.p_st }}
          </el-descriptions-item>
          <el-descriptions-item
            label="结束时间"
            label-align="right"
            align="center"
          >
            {{ item.project.p_ddl }}
          </el-descriptions-item>
          <el-descriptions-item
            label="工作类型"
            label-align="right"
            align="center"
          >
            <el-tag size="small">{{
              getLevelText(item.project.p_level)
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="目标" label-align="right" align="center">
            {{ item.project.p_cc }}
          </el-descriptions-item>
          <el-descriptions-item
            label="工作状态"
            label-align="right"
            align="center"
          >
            <el-tag size="small" type="success">{{ item.st_status }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="操作" label-align="right" align="center">
            <el-button @click="showTeamDiaglog(item)">查看队伍详情</el-button>
            <el-button @click="showProjectDiaglog(item)"
              >查看项目详情</el-button
            >
            <el-button @click="showMentorDiaglog(item)">查看导师详情</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </template>
    
    <template v-else>
      <el-empty></el-empty>
    </template>


    </el-tab-pane>
  </el-tabs>

  <el-dialog title="编辑项目" v-model="editDialogVisible" width="30%">
    <!-- 编辑表单 ：操作去除项目-->

    <!-- ...省略编辑表单的代码 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="updateWork" type="primary">保存</el-button>
    </div>
  </el-dialog>

  <!-- 队伍详情对话框 -->
  <el-dialog title="队伍详情" v-model="teamDetail" width="50%">
    <el-dialog title="队伍详情" v-model="teamDetail" width="50%">
      <el-form :model="tempTeam" label-width="100px">
        <el-form-item label="队伍名称">
          <span>{{ tempTeam.t_name }}</span>
        </el-form-item>
        <el-form-item label="队长">
          <span>{{ tempTeam.captain.u_name }}</span>
        </el-form-item>
        <el-form-item label="队伍成员">
          <span>
            <el-row v-for="(member, index) in tempTeam.members" :key="index">
              <el-col :span="12">
                <span>{{ member.u_name }}</span>
              </el-col>
            </el-row>
          </span>
        </el-form-item>
        <el-form-item label="队伍信息">
          <span>{{ tempTeam.t_info }}</span>
        </el-form-item>
        <el-form-item label="当前人数">
          <span>{{ tempTeam.t_curnum }}</span>
        </el-form-item>
        <el-form-item label="最大人数">
          <span>{{ tempTeam.t_maxnum }}</span>
        </el-form-item>
        <el-form-item label="队伍状态">
          <span>{{ tempTeam.t_status }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-dialog>

  <!-- 导师详情对话框 -->
  <el-dialog title="导师详情" v-model="mentorDetail" width="50%">
    <!-- 在这里显示导师详情的信息 -->
    <el-dialog title="导师详情" v-model="mentorDetail" width="50%">
      <el-form :model="tempMentor" label-width="100px">
        <el-form-item label="账号">
          <span>{{ tempMentor.u_acc }}</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span>{{ tempMentor.u_name }}</span>
        </el-form-item>
        <el-form-item label="专业">
          <span>{{ tempMentor.u_major }}</span>
        </el-form-item>
        <el-form-item label="电话">
          <span>{{ tempMentor.u_tele }}</span>
        </el-form-item>
        <el-form-item label="邮箱">
          <span>{{ tempMentor.u_mail }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- ... -->
  </el-dialog>

  <!-- 项目详情对话框 -->
  <el-dialog title="项目详情" v-model="projectDetail" width="50%">
    <el-form :model="tempProject" label-width="100px">
      <el-form-item label="项目名称">
        <span>{{ tempProject.p_name }}</span>
      </el-form-item>
      <el-form-item label="项目介绍">
        <span>{{ tempProject.p_info }}</span>
      </el-form-item>
      <el-form-item label="项目级别">
        <span>{{ tempProject.p_level }}</span>
      </el-form-item>
      <el-form-item label="开始时间">
        <span>{{ tempProject.p_st }}</span>
      </el-form-item>
      <el-form-item label="截止时间">
        <span>{{ tempProject.p_ddl }}</span>
      </el-form-item>
      <el-form-item label="比赛网址">
        <span>{{ tempProject.p_url }}</span>
      </el-form-item>
      <el-form-item label="比赛图片">
        <el-image :src="tempProject.p_img" fit="contain"></el-image>
      </el-form-item>
      <el-form-item label="完成条件">
        <span>{{ tempProject.p_cc }}</span>
      </el-form-item>
      <el-form-item label="最大申请数量">
        <span>{{ tempProject.p_maxtime }}</span>
      </el-form-item>
      <el-form-item label="需要同意">
        <span>{{ tempProject.p_resagree ? "是" : "否" }}</span>
      </el-form-item>
      <el-form-item label="项目状态">
        <span>{{ tempProject.p_status === 0 ? "正常" : "关闭" }}</span>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-pagination
    @size-change="handlePageSizeChange"
    @current-change="handleCurrentPageChange"
    :current-page="currentPage"
    :page-size="pageSize"
    layout="total, prev, pager, next, jumper"
    :total="totalSize"
  ></el-pagination>
</template>

<style scoped>
:deep(.my-label) {
  background: var(--el-color-success-light-9) !important;
}
:deep(.my-content) {
  background: var(--el-color-danger-light-9);
}
</style>
