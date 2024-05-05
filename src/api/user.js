import baseApi from "@/api/baseUrl";


export const getUserInfoService = (params) => {
    return baseApi.get("/user/info", params);
};

export const updateUserInfoService = (userInfoData) => {
    return baseApi.post("/user/update", userInfoData);
};


export const getUserInfoByAccount = () => {
    console.log("getUserInfoByAccount");
    return baseApi.get("/getCurrentUser");
};

export const getStudents = (params) => {
    return baseApi.get("/user/student", params);
};
export const getTeachers = (params) => {
    return baseApi.get("/user/teacher", params);
};
