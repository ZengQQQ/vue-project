// baseApi.js
import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://localhost:8080',
  // 跨域访问时是否需要使用凭证
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
  // 可以在这里添加拦截器
});

export default baseApi;