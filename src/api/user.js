import baseApi from "@/api/baseUrl";


export const getUserInfoService = (params) => {
    return baseApi.get("/user/info", params)
}

export const updateUserInfoService = (userInfoData) => {
    return baseApi.post("/user/update", userInfoData)
}


