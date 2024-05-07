// baseApi.js
import axios from "axios";
import { ElMessage } from "element-plus";
import { useTokenStore } from "@/stores/token.js";
import router from "@/router";


const baseApi = axios.create({
  baseURL: "http://localhost:8080/",
  // 跨域访问时是否需要使用凭证
  withCredentials: false,
  // 可以在这里添加拦截器
});
// baseApi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
baseApi.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";
baseApi.defaults.headers.get["Content-Type"] = "application/json;charset=UTF-8";

// 添加请求拦截器
baseApi.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    //添加token
    const tokenStore = useTokenStore();
    if (tokenStore.token) {
      config.headers.Authorization = tokenStore.token;
      console.log("header 带的tokens:" + tokenStore.token);
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
baseApi.interceptors.response.use(
  (response) => {
    // 判断业务是否请求成功
    if (response.data.code === 200) {
      return response.data;
    } else if (response.data.code === 401) {
      //未授权
      ElMessage.error("请先登录");
      router.push("/login");
    } else if (response.data.code === 403) {
      //无权限,重定向
      ElMessage.error(
        response.data.message ? response.data.message : "无权限访问"
      );
    }
    //操作失败
    ElMessage.error(response.data.message ? response.data.message : "服务异常");
    return Promise.reject(response.data);
  },
  (error) => {
    // 对响应错误做点什么
    // console.log("http error:");
    // console.log(error);
    //判断响应错误，401代表未授权
    if (error.response.status === 401) {
      ElMessage.error("请先登录");
      router.push("/login");
    } else if (error.response) {
      // 服务器响应了，但状态码不是 2xx
      ElMessage.error("服务器响应异常");
    } else if (error.request) {
      // 请求已发送，但没有收到响应
      ElMessage.error("请求超时，请检查网络连接");
    } else {
      // 发送请求时发生了一些错误
      ElMessage.error("请求发生错误，请重试");
    }
    return Promise.reject(error);
  }
);

export default baseApi;
