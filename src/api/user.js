import baseApi from "@/api/baseUrl";


export const getUserInfoService = (params) => {
    return baseApi.get("/user/info", params)
}

export default getUserInfoService;


