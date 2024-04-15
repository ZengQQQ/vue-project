import baseUrl from './baseUrl';


//请求网址获取用户登录信息,传入用户账号，密码，标识：学生，老师，管理员。
const loginService = {
    login(account, password, identity) {
        return baseUrl.post("/login", {
          account: account,
          password: password,
          identity: identity   //student，mentor,admin
        }).then(response => {
          // 处理响应数据
          if (response.status === 200) {
            return response.data; // 返回处理后的数据
          } else {
            throw new Error(response.data.message); // 抛出错误
          }
        });
      },
   register(account, password,identity) {
        return baseUrl.post("/register", {
            account: account,
            password: password,
            identity: identity
        }).then(response => {
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(response.data.message);
            }
        });
    },
}

export default loginService;
