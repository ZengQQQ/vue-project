import baseApi from "@/api/baseUrl";


export const getUserInfoService = () => {
    return baseApi.get("/getCurrentUser",null,{params: {}});
};

export const updateUserInfoService = (params) => {
    return baseApi.post("/user/UpdateUser",null,{params: params});
};



export const getStudents = (params) => {
    return baseApi.post("/admin/queryUser", null,{params: params});
};
export const getTeachers = (params) => {
    return baseApi.post("/admin/queryUser", null,{params: params});
};


export const updatePasswordService = (params) => {
    return baseApi.post("/user/updatePassword",null,{params: params});
}