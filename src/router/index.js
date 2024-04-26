import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false } // 添加元信息标记不需要验证
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false } // 添加元信息标记需要验证
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
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


// 导航守卫
router.beforeEach((to, from, next) => {
  // 假设有一个函数可以检查用户是否登录
  const isAuthenticated = checkAuth();
  // 检查路由是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // 用户未认证，重定向到登录页
      next({ name: 'Login' });
    } else {
      // 用户已认证，继续
      next();
    }
  } else {
    // 路由不需要认证，直接继续
    next();
  }
});


function checkAuth() {
  // 这里应该有检查用户登录状态的逻辑
  // 例如检查本地存储、Cookies或Vuex状态
  // 返回布尔值表示用户是否登录
  return false;
}


export default router