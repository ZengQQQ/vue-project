import baseApi from "@/api/baseUrl";


// 添加数据

export function addApi(data) {
  return baseApi.post("/admin/user/add", null, { params: data });
}



// 获取数据

export  async function fetchAllApi(cpage) {
  const data = await baseApi.post("/admin/queryUser", {},{ params: { currentPage: cpage } });
  return data
}

export function fetchApi(data, cpage) {
  data.currentPage = cpage;
  return baseApi.post("/admin/queryUser", data, { currentPage: cpage });
}

// 更新数据

export function updateApi(data) {
  return baseApi.post("/admin/queryUser", null, { params: data });
}

// 删除数据

export function deleteApi(data) {
  return baseApi.post("/admin/queryUser", null, { params: data });
}


// 重置密码

export function resetPwdApi(data) {
    data.u_password = data.u_acc;
    return baseApi.post("/admin/user/update", null, { params: data });
}

