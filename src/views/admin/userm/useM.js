import baseApi from "@/api/baseUrl";


// 获取数据

export function fetchAll(cpage) {
  return baseApi.get("admin/queryUser", {params: cpage});
}


export function fetch(data,cpage) {
  return baseApi.get("/admin/queryUser", data,{params: cpage});
}


// 更新数据

export function update(data) {

  return baseApi.post("/admin/queryUser", data);
}

// 删除数据


// 查询数据


