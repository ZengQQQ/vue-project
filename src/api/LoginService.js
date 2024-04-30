import baseUrl from '@/api/baseUrl';


//请求网址获取用户登录信息,传入用户账号，密码，标识：学生，老师，管理员。
const loginService = {
    login(account, password, identity) {
      var params = new URLSearchParams();
        params.append('account', account);
        params.append('password',password);
        params.append('identity',identity);//student，mentor,admin
        return baseUrl.post("/login",params )
      },

      //传入参数：identity={teacher,student}，params={数据库中表的键值对}
      //总的来说传入：{identity:{teacher or student},params:{键值对}}
      //返回{flag:0or1 , success:0or1} 0表示失败，1表示成功,flag表示是否有记录,1表示有记录，0表示没有记录,
      //status表示是否成功，1表示成功，0表示失败,这里可能是因为数据库中已经有了这个记录，所以插入失败
      register(params) {
        return baseUrl.post("/register", params)
    },
}

export default loginService;
