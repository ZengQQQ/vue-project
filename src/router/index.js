import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Root',
    component:()=>import('@/views/root.vue'),
    meta: { requiresAuth: false }, // 添加元信息标记不需要验证
  },
  
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false } // 添加元信息标记不需要验证
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Layout.vue'),
    meta: { requiresAuth: false }, // 添加元信息标记需要验证
    children:[
      //workcenter
      {path:'/work/workGround',component:()=>import('@/components/workcenter/WorkGround.vue'),meta:{requiresAuth:false}},
      {path:'/work/workInform/project',component:()=>import('@/components/workcenter/WorkInformProject.vue'),meta:{requiresAuth:false}},
      {path:'/work/workInform/mentor',component:()=>import('@/components/workcenter/WorkInformMentor.vue'),meta:{requiresAuth:false}},
      {path:'/work/workList',component:()=>import('@/components/workcenter/WorkList.vue'),meta:{requiresAuth:false}},
      {path:'/work/workManage',component:()=>import('@/components/workcenter/WorkManage.vue'),meta:{requiresAuth:false}},

      //Teamcenter
      {path:'/team/teamGround',component:()=>import('@/components/teamcenter/TeamGround.vue'),meta:{requiresAuth:false}},
      {path:'/team/teamMange',component:()=>import('@/components/teamcenter/TeamManage.vue'),meta:{requiresAuth:false}},
      {path:'/team/teamInform',component:()=>import('@/components/teamcenter/TeamInformOrigin.vue'),meta:{requiresAuth:false}},
      {path:'/team/teamMember',component:()=>import('@/components/teamcenter/TeamMember.vue'),meta:{requiresAuth:false}},
      //personalcenter
      {path:'/user/personalManage',component:()=>import('@/components/personal/PersonInfo.vue'),meta:{requiresAuth:false}},
      {path:'/user/resetPassword',component:()=>import('@/components/personal/ResetPassword.vue'),meta:{requiresAuth:false}},
    ]
  },
  // 添加更多的路由规则
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { requiresAuth: false }
  },
{
  path:'/test',
  name:'Test',
  component:()=>import('@/views/test.vue'),
  meta:{requiresAuth:false}
},
{
  path: '/admin',
  name: "Admin",
  component:()=>import('@/views/admin/layout.vue'),
  children:[
    {path:'/admin/adhome',component:()=>import('@/views/admin/adhome.vue'),},
    {path:'/admin/mentorAuth',component:()=>import('@/views/admin/authm/mentorAuth.vue'),},
    {path:'/admin/studentAuth',component:()=>import('@/views/admin/authm/studentAuth.vue'),},
    {path:'/admin/userM',component:()=>import('@/views/admin/userm/userM.vue'),},
    {path:'/admin/projectM',component:()=>import('@/views/admin/compm/projectM.vue'),},
    {path:'/admin/stall',component:()=>import('@/views/admin/stall/stallm.vue'),},
    {path:'/admin/smmessage',component:()=>import('@/views/admin/stall_message/stall_mentor_message.vue'),},
    {path:'/admin/spmessage',component:()=>import('@/views/admin/stall_message/stall_project_message.vue'),},
    {path:'/admin/stmessage',component:()=>import('@/views/admin/stall_message/stall_team_message.vue'),},
    {path:'/admin/teamM',component:()=>import('@/views/admin/teamm/teamm.vue'),},
    {path:'/admin/teamumessage',component:()=>import('@/views/admin/teamm/team_user_message.vue'),},
  ]
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


// 导航守卫
// router.beforeEach((to, from, next) => {
  // 假设有一个函数可以检查用户是否登录
  // const isAuthenticated = checkAuth();
  // // 检查路由是否需要认证
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   if (!isAuthenticated) {
  //     // 用户未认证，重定向到登录页
  //     next({ name: 'Login' });
  //   } else {
  //     // 用户已认证，继续
  //     next();
  //   }
  // } else {
  //   // 路由不需要认证，直接继续
  //   next();
  // }
// });


function checkAuth() {
  // 这里应该有检查用户登录状态的逻辑
  // 例如检查本地存储、Cookies或Vuex状态
  // 返回布尔值表示用户是否登录
  return false;
}


export default router