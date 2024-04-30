import baseApi from "@/api/baseUrl";


//获取本人作为队长的团队
export const fetchPersonTeamList = (params) => {
  return baseApi.get("/team/list",params)
}




  