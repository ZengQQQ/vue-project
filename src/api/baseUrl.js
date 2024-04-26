// baseApi.js
import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://localhost:8080/',
  // 跨域访问时是否需要使用凭证
  withCredentials: false,
  // 可以在这里添加拦截器
});
baseApi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
baseApi.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';

export default baseApi;