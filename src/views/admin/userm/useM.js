import baseApi from "@/api/baseUrl";

// 测试
export function test() {
  return baseApi.get("");
}

// 获取数据

export async  function fetchAll(cpage) {
  const data = await baseApi.post("/admin/queryUser", {},{ params: { currentPage: cpage } });
  return data
}

export function fetch(data, cpage) {
  return baseApi.post("/admin/queryUser", data, { currentPage: cpage });
}

// 更新数据

export function update(data) {
  return baseApi.post("/admin/queryUser", data);
}

// 删除数据

// 查询数据
