import baseApi  from "@/api/baseUrl";

// 获取工作列表
export const getWorkList = () => {
  return baseApi.get("/user/queryProject",null,{params: {}})
}

export const getWorkListCondition = (params) =>{
    return baseApi.post('/user/queryProject',null,{params:params});
}

//获取个人所在队伍承接工作列表
export const getWorkListByUser = (params) => {
  return baseApi.get("/user/queryJoinedStall",null,{params: params})
}

/*workManagement*/
// 创建新工作
export const fetchMyJobs= (params)  => {
    return baseApi.post("/user/queryProject",null,{params:params});
}


export const createJob = (params) => {
  return baseApi.post("/user/CreateProject", null,{params: params});
}


// 删除工作
export const deleteJob = (params) => {
    return baseApi.post("/user/CloseProject", null,{params: params});
    }


// 更新工作
export const updateJob = (params) => {
    console.log(params);
    return baseApi.post("/user/UpdateProject", null,{params: params});
}

//申请工作
export const applyWorkWithTeam = (params) => {
    console.log("applyWorkWIthTeam",params);
    return baseApi.post("/user/ProjectTeamMessageSend",null,{params:params});
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


/**自己管理的房间，和别人管理的房间，这里组队承接之后就得到了房间 */
export const getMyManagedStalls = (params) => {
    return baseApi.post("/user/queryStall",null,{params: params});
}

export const getMyParticipatedStalls = (params) => {
    return baseApi.post("/user/queryJoinedStall",null,{params: params});
}

export const updateStallInfo = (newStallInfo,oldStallInfo) => {
    const params = {
        newStallInfo: newStallInfo,
        oldStallInfo: oldStallInfo
    }
    return baseApi.post("/stall/update", null,{params: params});
}

export const deleteStallProject =  (params) => {
    return baseApi.post("/stall/delete",null,{params: params});
    }
    
export const createStallProject = (userInfo,stallInfo) => {
    const params = {
        userInfo: userInfo,
        stallInfo: stallInfo
    }
    return baseApi.post("/stall/create",null,{params: params});
}

export const deleteStallMentor = (userInfo,stallInfo) => {
    const params = {
        userInfo: userInfo,
        stallInfo: stallInfo
    }
    return baseApi.post("/stall/deleteMentor",null,{params: params});
}
