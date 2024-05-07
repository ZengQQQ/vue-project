<template>
  <div class="memberSearch">
    <div class="tabs">
      <button
        :class="{ active: activeTab === 'students' }"
        @click="activeTab = 'students'"
      >
        学生
      </button>
      <button
        :class="{ active: activeTab === 'mentors' }"
        @click="activeTab = 'mentors'"
      >
        导师
      </button>
    </div>

    <div class="memberList" v-if="activeTab === 'mentors'">
      <div v-for="mentor in mentors" :key="mentor.u_id" class="member">
        <p>名称：{{ mentor.u_name }}</p>
        <p>研究方向：{{ mentor.u_major }}</p>
        <p>简介：{{ mentor.u_info }}</p>
        <button @click="inviteMember(mentor)">邀请加入</button>
      </div>
    </div>

    <div class="memberList" v-if="activeTab === 'students'">
      <div v-for="student in students" :key="student.u_uid" class="member">
        <p>名字：{{ student.u_name }}</p>
        <p>专业：{{ student.u_major }}</p>
        <p>简介：{{ student.u_info }}</p>
        <button @click="inviteMember(student)">邀请加入</button>
      </div>
    </div>

    <!-- 团队列表对话框 -->
    <el-dialog v-model="showModal" title="选择团队">
      <span>选择您要邀请其加入的团队：</span>
      <el-select v-model="selectedTeam" placeholder="请选择团队">
        <el-option
          v-for="team in teams"
          :key="team.t_id"
          :label="team.t_name"
          :value="team.t_id"
        ></el-option>
      </el-select>
      <span>填写邀请理由：</span>
  <el-input
    v-model="invitationMessage"
    type="textarea"
    :rows="2"
    placeholder="请简短描述您的邀请理由"
  ></el-input>
      <el-button @click="sendInvitation">确认</el-button>
      <el-button @click="showModal = false">取消</el-button>
      <el-button @click="loadMoreTeams" v-show="hasMoreTeams"
        >加载更多</el-button
      >
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getStudents, getTeachers } from "@/api/user.js";
import { ElMessage } from "element-plus";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { fetchPersonTeamList,sendInvitationToTeam } from "@/api/team";

const userInfoStore = useUserInfoStore();

const mentors = ref([]);
const students = ref([]);
const activeTab = ref("students");
const showModal = ref(false);
const selectedMember = ref(null);
const selectedTeam = ref(null);
const userTeams = ref([]);
const teams = ref([]);
const hasMoreTeams = ref(true);
const teamPage = ref(1);
const teamPageSize = 16;
const teamTotalPage = ref(0);

const invitationMessage = ref('');

const fetchStudents = async () => {
  const data = await getStudents({ u_identity: 0 });
  if (data.code === 200) {
    students.value = data.data.listPage;
    console.log("students", students.value);
  } else {
    ElMessage.error(data.message ? data.message : "未找到");
  }
};

const fetchMentors = async () => {
  const data = await getTeachers({ u_identity: 1 });
  if (data.code === 200) {
    mentors.value = data.data.listPage;
    console.log("mentors", mentors.value);
  } else {
    ElMessage.error(data.message ? data.message : "未找到");
  }
};

const fetchPersonTeams = async () => {
  try {
    const data = await fetchPersonTeamList({ u_acc: userInfoStore.info.u_acc });
    userTeams.value = data.data.listPage;
    teams.value = data.data.listPage;
    teamTotalPage.value = data.data.totalPage;
    console.log("userTeams", userTeams.value);
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

const inviteMember = (member) => {
  selectedMember.value = member;
  showModal.value = true;
};

const sendInvitation = async () => {
  // 假设有一个API方法 sendInvite 来处理邀请逻辑
  try {
    const response = await sendInvitationToTeam({
      t_id: selectedTeam.value,
      u_acc: selectedMember.value.u_acc,
      tsm_info: invitationMessage.value,  // 使用用户填写的申请理由
      tsm_dct: "0",  // 0表示邀请
    });
    if (response.code === 200) {
      ElMessage.success("邀请发送成功");
      invitationMessage.value = '';  // 清空申请理由输入框
    } else {
      ElMessage.error(response.message || "邀请发送失败");
    }
  } catch (error) {
    console.error("Error sending invitation:", error);
    ElMessage.error("邀请发送失败");
  }
  showModal.value = false; // 关闭模态框
};


const loadMoreTeams = async () => {
  try {
    const data = await fetchPersonTeamList({
      u_acc: userInfoStore.info.u_acc,
      currentPage: teamPage.value + 1,
      pageSize: teamPageSize,
    });
    const newTeams = data.data.listPage;
    console.log("newTeams", newTeams);
    if (newTeams.length > 0) {
      teams.value = [...teams.value, ...newTeams];
      teamPage.value++;
    } else {
      hasMoreTeams.value = false;
    }
  } catch (error) {
    console.error("Error loading more teams:", error);
  }
};

onMounted(() => {
  fetchStudents();
  fetchMentors();
  fetchPersonTeams();
});
</script>

<style>
.tabs {
  display: flex;
}

.tabs button {
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  outline: none;
}

.tabs button.active {
  background-color: lightgray;
}

.memberList {
  display: flex;
  flex-wrap: wrap;
}

.member {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 200px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalContent {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

.modalContent button {
  margin-top: 10px;
}
</style>
