<template>
  <div class="team-management">
    <h2>队伍管理</h2>

    <!-- 创建队伍按钮 -->
    <el-button type="primary" @click="showCreateTeamDialog = true"
      >创建队伍</el-button
    >

    <!-- 队伍列表 -->
    <el-tabs v-model="activeTab">
      <!-- 我是队长的队伍 -->
      <el-tab-pane label="我的队伍" name="myTeams">
        <el-table :data="myTeams" stripe>
          <el-table-column prop="t_name" label="队伍名称"></el-table-column>
          <el-table-column prop="captain.u_name" label="队长"></el-table-column>
          <!-- <el-table-column prop="members" label="队伍成员"></el-table-column> -->
          <el-table-column label="队伍成员">
            <template #default="{ row }">
              <div v-if="row.members.length === 0">暂无</div>
              <div v-else>
                {{ row.members.map((member) => member.u_name).join(", ") }}
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="mentor" label="指导老师"></el-table-column> -->
          <el-table-column prop="t_curnum" label="当前人数"></el-table-column>
          <el-table-column prop="t_info" label="队伍简介"></el-table-column>
          
          <el-table-column
            prop="t_status"
            label="队伍状态"
            :formatter="getLevelText"
          ></el-table-column>
          <el-table-column label="操作" width="230">
            <template #default="{ row }">
              <el-button size="default" @click="editTeam(row)">编辑</el-button>
              <el-button size="default" @click="manageMembers(row)"
                >成员管理</el-button
              >
              <el-button size="default" @click="dismissTeam(row)" type="danger"
                >解散</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 我是成员的队伍 -->
      <el-tab-pane label="参与的队伍" name="joinedTeams">
        <el-table :data="joinedTeams" stripe>
          <el-table-column prop="t_name" label="队伍名称"></el-table-column>
          <el-table-column prop="captain.u_name" label="队长"></el-table-column>
          <!-- <el-table-column prop="members" label="队伍成员"></el-table-column> -->
          <el-table-column label="队伍成员">
            <template #default="{ row }">
              <div v-if="row.members.length === 0">暂无</div>
              <div v-else>
                {{ row.members.map((member) => member.u_name).join(", ") }}
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="mentor" label="指导老师"></el-table-column> -->
          <el-table-column prop="t_info" label="队伍简介"></el-table-column>
          <el-table-column
            prop="t_status"
            label="队伍状态"
            :formatter="getLevelText"
          ></el-table-column>
          <el-table-column label="操作" width="180">
            <template #default="{ row }">
              <el-button size="default" @click="leaveTeam(row)" type="warning"
                >退队</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 创建队伍弹窗 -->
    <el-dialog title="创建队伍" v-model="showCreateTeamDialog">
      <el-form :model="newTeam" label-width="100px">
        <el-form-item label="队伍名称">
          <el-input v-model.trim="newTeam.t_name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="指导老师">
            <el-input v-model.trim="newTeam.mentor"></el-input>
          </el-form-item> -->
        <el-form-item label="队伍简介">
          <el-input type="textarea" v-model.trim="newTeam.t_info"></el-input>
        </el-form-item>
        <el-form-item label="最大人数">
          <el-input-number
            v-model.number="newTeam.t_maxnum"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="队伍状态">
          <el-select v-model="newTeam.t_status" placeholder="请选择">
            <el-option label="开放" value="0"></el-option>
            <el-option label="关闭" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showCreateTeamDialog = false">取消</el-button>
        <el-button type="primary" @click="createTeam">创建</el-button>
      </div>
    </el-dialog>

    <!-- 编辑队伍弹窗 -->
    <el-dialog title="编辑队伍" v-model="showEditTeamDialog">
      <el-form :model="editTeamForm" label-width="100px">
        <el-form-item label="队伍名称">
          <el-input v-model.trim="editTeamForm.t_name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="指导老师">
            <el-input v-model.trim="editTeamForm.mentor"></el-input>
          </el-form-item> -->
        <el-form-item label="队伍简介">
          <el-input
            type="textarea"
            v-model.trim="editTeamForm.t_info"
          ></el-input>
        </el-form-item>
        <el-form-item label="最大人数">
          <el-input-number
            v-model.number="editTeamForm.t_maxnum"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="队伍状态">
          <el-select v-model="editTeamForm.t_status" placeholder="请选择">
            <el-option label="开放" value="0"></el-option>
            <el-option label="关闭" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditTeamDialog = false">取消</el-button>
        <el-button type="primary" @click="updateTeam">保存</el-button>
      </div>
    </el-dialog>

    <!-- 成员管理弹窗 -->
    <el-dialog title="队伍成员管理" v-model="showManageMembersDialog">
      <el-table :data="currentTeamMembers" stripe>
        <el-table-column prop="u_name" label="成员名称"></el-table-column>
        <!-- <el-table-column prop="role" label="角色"></el-table-column> -->
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="default" @click="kickMember(row)" type="danger"
              >踢出</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showManageMembersDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  ElButton,
  ElMessage,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTabPane,
  ElMessageBox,
} from "element-plus";
import {
  fetchPersonTeamList,
  fetchMemberTeamList,
  createNewTeam,
  updateTeamInfo,
  deleteTeam,
  deleteTeamMember,
  quitTeam,
} from "@/api/team.js";
import { useUserInfoStore } from "@/stores/userInfo.js";
const userInfoStore = useUserInfoStore();

const activeTab = ref("myTeams");
const myTeams = ref([
  // 这里应该是一个从后端获取的队伍列表
]);
const joinedTeams = ref([
  // 这里应该是一个从后端获取的队伍列表
]);
const showCreateTeamDialog = ref(false);
const showEditTeamDialog = ref(false);

const fetchMyTeams = async () => {
  const data = await fetchPersonTeamList({
    u_acc: userInfoStore.info.u_acc,
  });
  if (data.code === 200) {
    myTeams.value = data.data.listPage;
  } else {
    ElMessage.error(data.message ? data.message : "未找到");
  }
};

const fetchJoinedTeams = async () => {
  const data = await fetchMemberTeamList({
    u_acc: userInfoStore.info.u_acc,
  });
  if (data.code === 200) {
    joinedTeams.value = data.data.listPage;
  } else {
    ElMessage.error(data.message ? data.message : "未找到");
  }
};

const currentTeam = ref(null);
const newTeam = ref({
  t_name: "",
  t_info: "",
  t_maxnum: 5, // 可以设置一个默认值
  t_status: "0",
});
const editTeamForm = ref({
  t_id: null,
  t_name: "",
  t_info: "",
  t_maxnum: 5, // 可以设置一个默认值
  t_curnum: 0,
  members: [],
});

// 创建队伍的方法
const createTeam = async () => {
  // 发送请求到后端创建队伍
  console.log("创建队伍", newTeam.value);
  const data = await createNewTeam({
    t_name: newTeam.value.t_name,
    t_info: newTeam.value.t_info,
    t_maxnum: newTeam.value.t_maxnum,
    t_status: newTeam.value.t_status,
    u_acc: userInfoStore.info.u_acc,
  });
  if (data.code === 200) {
    ElMessage.success("创建成功");
    // 假设创建成功后，关闭弹窗并清空表单
    showCreateTeamDialog.value = false;
    newTeam.value = {
      t_name: "",
      t_info: "",
      t_maxnum: 5,
      t_status: "0",
    };
    // 重新加载队伍列表
    fetchJoinedTeams();
    fetchMyTeams();
  } else {
    ElMessage.error(data.message ? data.message : "未找到");
  }
};

// 更新队伍的方法
const updateTeam = async () => {
  // 发送请求到后端更新队伍信息
  console.log("更新队伍", editTeamForm.value);
  const data = await updateTeamInfo({
    t_id: editTeamForm.value.t_id,
    t_name: editTeamForm.value.t_name,
    t_info: editTeamForm.value.t_info,
    t_maxnum: editTeamForm.value.t_maxnum,
    t_status: editTeamForm.value.t_status,
    u_acc: userInfoStore.info.u_acc,
  });
  if (data.code === 200) {
    ElMessage.success("更新成功");
    // 假设更新成功后，关闭弹窗
    showEditTeamDialog.value = false;
    // 重新加载队伍列表
    fetchJoinedTeams();
    fetchMyTeams();
  } else {
    ElMessage.error(data.message ? data.message : "未找到");
  }
};

// 编辑队伍信息的方法
const editTeam = (team) => {
  editTeamForm.value = { ...team };
  currentTeam.value = team;
  showEditTeamDialog.value = true;
};


const dismissTeam = (team) => {
  // 解散队伍
  alert(`解散队伍: ${team.name}`);
  deleteTeam(team);
};


const leaveTeam = async (team) => {
  // 弹出确认框
  await ElMessageBox.confirm('确定要退出队伍吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  });

  // 用户点击确认后执行退队操作
  const data = await quitTeam({
    t_id: team.t_id,
    u_acc: userInfoStore.info.u_acc,
  });

  if (data.code === 200) {
    ElMessage.success('退队成功');
    fetchJoinedTeams();
    fetchMyTeams();
  } else {
    ElMessage.error(data.message ? data.message : '退队失败');
  }
};


const showManageMembersDialog = ref(false);
const currentTeamMembers = ref([]);

const manageMembers = (team) => {
  // 检查是否有成员，如果没有则显示提示并返回
  console.log("成员管理", team);
  if (team.members.length === 0) {
    ElMessage.warning("当前队伍没有成员");
    return; // 提前返回，不显示成员管理弹窗
  }

  currentTeam.value = team;
  currentTeamMembers.value = team.members; // 假定 `team.members` 是成员对象的数组
  showManageMembersDialog.value = true;
};


const kickMember = async (member) => {
  try {
    // 显示确认对话框并等待用户操作
    await ElMessageBox.confirm(
      `您确定要踢出成员 ${member.u_name} 吗?`,
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    );
    // 用户确认后执行踢出成员操作
    console.log("踢出成员", member);
    const data = await deleteTeamMember({
      t_id: currentTeam.value.t_id,
      u_acc: member.u_acc,
    });
    if (data.code === 200) {
      ElMessage.success("踢出成功");
      const index = currentTeamMembers.value.indexOf(member);
      if (index > -1) {
        currentTeamMembers.value.splice(index, 1);
      }
    } else {
      ElMessage.error(data.message ? data.message : "踢出失败");
    }
  } catch (error) {
    // 用户取消操作或者其他错误
    ElMessage.info("用户取消了踢出操作");
  }
};

const getLevelText = (row) => {
  // 根据队伍状态返回对应的文本,0,1,2,
  const level = row.t_status;
  const levelMap = {
    0: "开放",
    1: "关闭",
  };
  return levelMap[level] || "未知";
};

onMounted(() => {
  fetchJoinedTeams();
  fetchMyTeams();
});
</script>

<style scoped>
.team-management {
  padding: 20px;
}
</style>
