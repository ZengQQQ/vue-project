import baseApi from "@/api/baseUrl";


//获取本人作为队长的团队
export const fetchPersonTeamList = (params) => {
  return baseApi.post("/admin/queryTeam", null,{params: params});
}

//获取所有团队
export const fetchAllTeamList = () => {
  return baseApi.post("/admin/queryTeam",null,{params:{}});
}

//搜索特定团队
export const fetchSearchTeamList = (params) => {
  return baseApi.get("/team/search",null,{params: params});
}

//申请加入团队接口
export const joinTeam = (params) => {
  console.log(params);
  return baseApi.post("/user/TeamMessageSend",null,{params:params});
}


//获取自己所在团队，但是不是队长
export const fetchMemberTeamList = (params) => {
  return baseApi.post("/user/queryJoinedTeam",null,{params:params});
}

//创建队伍
export const createNewTeam = (params)=>{
  return baseApi.post("/user/CreateTeam",null,{params:params});
}


//退出团队
export const quitTeam = (params) => {
  console.log("quitTeam",params);
  return baseApi.post("/user/TeamMessageApproval",null,{params:params});
}


//更新团队信息
export const updateTeamInfo = (params) => {
  return baseApi.post("/user/UpdateTeam",null,{params:params});
}

//解散团队
export const deleteTeam = (params) => {
  console.log("deleteTeam",params);
  return baseApi.post("/user/DissolveTeam",null,{params:params});
}

//删除团队成员
export const deleteTeamMember = (params) => {
  console.log("deleteTeamMember",params);
  return baseApi.post("user/TeamMessageApproval",null,{params:params});
}


/***************************************队伍通知接口************************************** */
//获取自己作为队长，接受或者发送的通知
export const fetchTeamCaptainApplication = (params) => {
  return baseApi.post("/user/teamMemberMessage",null,{params:params});
}

//作为队员，获取自己发送和收到的通知
export const fetchTeamMemberApplication = (params) => {
  return baseApi.post("/user/memberTeamMessage",null,{params:params});
}

//同意加入团队
export const agreeJoinTeam = (params) => {
  console.log("agreeJoinTeam",params);
  return baseApi.post("/user/TeamMessageApproval",null,{params:params});
}
//拒绝加入团队
export const refuseJoinTeam = (params) => {
  return baseApi.post("/user/TeamMessageApproval",null,{params:params});
}

//发送学生邀请加入团队
export const sendInvitationToTeam = (params) => {
  console.log("studentInvite",params);
  return baseApi.post("/user/TeamMessageSend",null,{params:params});
}
//发送邀请导师加入
export const sendInvitationMentorToTeam = (params) => {
  console.log("mentorInvite",params);
  return baseApi.post("/user/MentorTeamMessageSend",null,{params:params});
}
