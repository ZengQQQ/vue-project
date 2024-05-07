import baseApi from '@/api/baseUrl';
// 请求网址获取用户登录信息，传入用户账号，密码，标识：学生，老师，管理员。
export const login = (account, password, identity) => {
  const params = {
    u_acc: account,
    u_pwd: password,
    identity: identity
  };
  return baseApi.post("/loginControl",null,{params: params});
};


export const register = (params) => {
  console.log(params);
  return baseApi.post("/signUpControl",null,{params: params});
};

