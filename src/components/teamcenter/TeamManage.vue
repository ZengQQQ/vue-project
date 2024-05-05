<template>
    <div class="team-management">
      <h2>队伍管理</h2>
      
      <!-- 创建队伍按钮 -->
      <el-button type="primary" @click="showCreateTeamDialog = true">创建队伍</el-button>
    
      <!-- 队伍列表 -->
      <el-tabs v-model="activeTab">
        <!-- 我是队长的队伍 -->
        <el-tab-pane label="我的队伍" name="myTeams">
          <el-table :data="myTeams" stripe>
            <el-table-column prop="name" label="队伍名称"></el-table-column>
            <el-table-column prop="leader" label="队长"></el-table-column>
            <el-table-column prop="members" label="队伍成员"></el-table-column>
            <el-table-column prop="mentor" label="指导老师"></el-table-column>
            <el-table-column prop="description" label="队伍简介"></el-table-column>
            <el-table-column prop="status" label="队伍状态"></el-table-column>
            <el-table-column label="操作" width="230">
              <template #default="{ row }">
                <el-button size="default" @click="editTeam(row)">编辑</el-button>
                <el-button size="default" @click="manageMembers(row)">成员管理</el-button>
                <el-button size="default" @click="dismissTeam(row)" type="danger">解散</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <!-- 我是成员的队伍 -->
        <el-tab-pane label="参与的队伍" name="joinedTeams">
          <el-table :data="joinedTeams" stripe>
            <el-table-column prop="name" label="队伍名称"></el-table-column>
            <el-table-column prop="leader" label="队长"></el-table-column>
            <el-table-column prop="members" label="队伍成员"></el-table-column>
            <el-table-column prop="mentor" label="指导老师"></el-table-column>
            <el-table-column prop="description" label="队伍简介"></el-table-column>
            <el-table-column prop="status" label="队伍状态"></el-table-column>
            <el-table-column label="操作" width="180">
              <template #default="{ row }">
                <el-button size="default" @click="leaveTeam(row)" type="warning">退队</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    
      <!-- 创建队伍弹窗 -->
      <el-dialog title="创建队伍" v-model="showCreateTeamDialog">
        <el-form :model="newTeam" label-width="100px">
          <el-form-item label="队伍名称">
            <el-input v-model.trim="newTeam.name"></el-input>
          </el-form-item>
          <el-form-item label="指导老师">
            <el-input v-model.trim="newTeam.mentor"></el-input>
          </el-form-item>
          <el-form-item label="队伍简介">
            <el-input type="textarea" v-model.trim="newTeam.description"></el-input>
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
            <el-input v-model.trim="editTeamForm.name"></el-input>
          </el-form-item>
          <el-form-item label="指导老师">
            <el-input v-model.trim="editTeamForm.mentor"></el-input>
          </el-form-item>
          <el-form-item label="队伍简介">
            <el-input type="textarea" v-model.trim="editTeamForm.description"></el-input>
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
          <el-table-column prop="name" label="成员名称"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button size="default" @click="kickMember(row)" type="danger">踢出</el-button>
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
  import { ref ,onMounted} from 'vue';
  import { ElButton, ElTable, ElTableColumn, ElTabs, ElTabPane } from 'element-plus';
  import { fetchPersonTeamList, 
    fetchMemberTeamList,
    createNewTeam,
    updateTeamInfo,
    deleteTeam,
    deleteTeamMember,
    quitTeam,
  } from '@/api/team.js'
import {useUserInfoStore} from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore();

  const activeTab = ref('myTeams');
  const myTeams = ref([
    // 这里应该是一个从后端获取的队伍列表
  ]);
  const joinedTeams = ref([
    // 这里应该是一个从后端获取的队伍列表
  ]);
  const showCreateTeamDialog = ref(false);
  const showEditTeamDialog = ref(false);
  
  // 方法应该实现具体的逻辑，这里仅做演示
  const fetchTeams = async () => {
    // 假设从后端获取的数据，你需要根据实际API调整
    // myTeams.value = await fetchPersonTeamList();
    // joinedTeams.value = await fetchMemberTeamList();
    myTeams.value = [
      { id: 1, name: '队伍A', leader: '队长A', members: ['成员1', '成员2'], mentor: '指导老师A', description: '队伍A简介', status: '活跃' }
    ];
    joinedTeams.value = [
      { id: 2, name: '队伍B', leader: '队长B', members: ['你', '成员3'], mentor: '指导老师B', description: '队伍B简介', status: '活跃' }
    ];
  };

  const currentTeam = ref(null);
  const newTeam = ref({
  name: '',
  mentor: '',
  description: ''
});
const editTeamForm = ref({
  id: null,
  name: '',
  mentor: '',
  description: ''
});

// 创建队伍的方法
const createTeam = () => {
  // 发送请求到后端创建队伍
  console.log('创建队伍', newTeam.value);
//   await createNewTeam(userInfoStore.info,newTeam.value);
  // 假设创建成功后，关闭弹窗并清空表单
  showCreateTeamDialog.value = false;
  newTeam.value = { name: '', mentor: '', description: '' };
  // 重新加载队伍列表
  fetchTeams();
};

// 更新队伍的方法
const updateTeam = () => {
  // 发送请求到后端更新队伍信息
  console.log('更新队伍', editTeamForm.value);
 updateTeamInfo(editTeamForm.value,currentTeam.value);
  // 假设更新成功后，关闭弹窗
  showEditTeamDialog.value = false;
  // 重新加载队伍列表
  fetchTeams();
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
  
  const leaveTeam = (team) => {
    // 退队操作
    alert(`退队: ${team.name}`);
    quitTeam(userInfoStore.info,team);
  };



const showManageMembersDialog = ref(false);
const currentTeamMembers = ref([]);  


const manageMembers = (team) => {
  currentTeam.values = team;
  currentTeamMembers.value = team.members; // 假定 `team.members` 是成员对象的数组
  showManageMembersDialog.value = true;
};

const kickMember = (member) => {
  // 发送请求到后端踢出成员
  console.log('踢出成员', member);
    // 假设踢出成功后，从 currentTeamMembers 中移除该成员
    deleteTeamMember(member,currentTeam.value);
    const index = currentTeamMembers.value.indexOf(member);
  if (index > -1) {
    currentTeamMembers.value.splice(index, 1);
  }
};


  
  onMounted(() => {
    fetchTeams();
  });
  </script>
  
  <style scoped>
  .team-management {
    padding: 20px;
  }
  </style>