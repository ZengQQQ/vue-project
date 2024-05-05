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
export const createWork = (userInfo,workInfo) => {
    const params = {
        userInfo: userInfo,
        workInfo: workInfo
    }
  return baseApi.post("/work/create", params)
}


// 删除工作
export const deleteWork = (params) => {
    return baseApi.post("/work/delete", params)
    }


// 更新工作
export const updateWork = (newWorkInfo,oldWorkInfo) => {
    const params = {
        newWorkInfo: newWorkInfo,
        oldWorkInfo: oldWorkInfo
    }
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



    //工作通知模块
    /**
     * 工作通知模块
     * 获取工作消息通知等，包括工作申请，工作进度，工作完成等
     * 
     * 
     */

    //获取工作申请通知
    export const getWorkInform = (userInfo) => {
        return baseApi.get("/work/inform", userInfo)
        }

    export const acceptWorkApplication=(params) => {
        return baseApi.post("/work/acceptApplication", params)
        }

    export const refuseWorkApplication=(params) => {
        return baseApi.post("/work/refuseApplication", params)
        }


