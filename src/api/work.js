import baseApi  from "@/api/baseUrl";

// 获取工作列表
export const getWorkList = () => {
  return baseApi.get("/work/list")
}

//获取个人承接工作列表
export const getWorkListByUser = (params) => {
  return baseApi.get("/work/listByUser", params)
}

// 创建新工作
export const createWork = (params) => {
  return baseApi.post("/work/create", params)
}


// 删除工作
export const deleteWork = (params) => {
    return baseApi.post("/work/delete", params)
    }


// 更新工作
export const updateWork = (params) => {
    return baseApi.post("/work/update", params)
    }


//查看工作申请
export const getWorkApply = (params) => {
    return baseApi.get("/work/apply", params)
    }

//同意工作申请
export const agreeWorkApply = (params) => {
    return baseApi.post("/work/agree", params)
    }

//拒绝工作申请
export const refuseWorkApply = (params) => {
    return baseApi.post("/work/refuse", params)
    }




export default { getWorkList, createWork, deleteWork, updateWork, getWorkApply, agreeWorkApply, refuseWorkApply}