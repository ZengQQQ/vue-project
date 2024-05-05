import baseApi from "@/api/baseUrl";


//获取本人作为队长的团队
export const fetchPersonTeamList = (params) => {
  return baseApi.get("/team/list",params)
}

//获取所有团队
export const fetchAllTeamList = () => {
  return baseApi.get("/team/list")
}

//搜索特定团队
export const fetchSearchTeamList = (params) => {
  return baseApi.get("/team/search",params)
}

//加入团队接口
export const joinTeam = (params) => {
  return baseApi.post("/team/join",params)
}


//获取自己所在团队，但是不是队长
export const fetchMemberTeamList = (params) => {
  return baseApi.get("/team/member",params)
}

//创建队伍
export const createNewTeam = (captainInfo,TeamINfo)=>{
  const params = {
    captainInfo:captainInfo,
    TeamInfo:TeamINfo
  }
  return baseApi.post("/team/create",params)
}


//退出团队
export const quitTeam = (userInfo,teamInfo) => {
  const params = {
    userInfo:userInfo,
    teamInfo:teamInfo
  }
  return baseApi.post("/team/quit",params)
}


//更新团队信息
export const updateTeamInfo = (newTeamInfo,oldTeamInfo) => {
  const params={
    newTeamInfo:newTeamInfo,
    oldTeamInfo:oldTeamInfo
  }
  return baseApi.post("/team/update",params)
}

//解散团队
export const deleteTeam = (teamInfo) => {
  return baseApi.post("/team/delete",teamInfo)
}

//删除团队成员
export const deleteTeamMember = (userInfo,teamInfo) => {
  const params = {
    userInfo:userInfo,
    teamInfo:teamInfo
  }
  return baseApi.post("/team/deleteMember",params)
}


/***************************************队伍通知接口************************************** */
//获取发送给自己的通知
export const fetchTeamReceiveApplication = (userInfo) => {
  return baseApi.get("/team/application",userInfo)
}
//获取自己发送的通知
export const fetchTeamSendApplication = (userInfo) => {
  return baseApi.get("/team/sendApplication",userInfo)
}
//同意加入团队
export const agreeJoinTeam = (userInfo,teamInfo) => {
  const params = {
    userInfo:userInfo,
    teamInfo:teamInfo
  }
  return baseApi.post("/team/agreeJoin",params)
}
//拒绝加入团队
export const refuseJoinTeam = (userInfo,teamInfo) => {
  const params = {
    userInfo:userInfo,
    teamInfo:teamInfo
  }
  return baseApi.post("/team/refuseJoin",params)
}