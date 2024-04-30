// userService.js
import baseApi from './baseUrl';
import { useTokenStore } from '@/stores/token';

const userService = {
  getUser(id) {
    const tokenStore = useTokenStore();
    return baseApi.get(`users/${id}`,{headers: { 'Authorization': tokenStore.token}});
  },
  createUser(data) {
    return baseApi.post('users', data);
  },
  // 更多与用户相关的API请求
};

export default userService;


/*s使用模板
 *<template>
  <div>
    <!-- 组件模板，例如显示用户信息 -->
    <div v-if="user">{{ user.name }}</div>
    <div v-else-if="error">{{ error.message }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import userService from '@/services/userService';

export default {
  name: 'UserComponent',

  setup() {
    const user = ref(null);
    const error = ref(null);

    const fetchUser = async (userId) => {
      try {
        const response = await userService.getUser(userId);
        user.value = response.data;
      } catch (err) {
        error.value = err;
        console.error("Failed to fetch user:", err);
      }
    };

    const createUser = async (userData) => {
      try {
        const response = await userService.createUser(userData);
        user.value = response.data;
        // 处理创建用户后的逻辑
      } catch (err) {
        error.value = err;
        console.error("Failed to create user:", err);
      }
    };

    // 在组件挂载时获取用户信息
    onMounted(() => {
      fetchUser(1); // 假设我们想获取ID为1的用户
    });

    // 暴露给模板的响应式数据和方法
    return {
      user,
      error,
      fetchUser,
      createUser
    };
  }
};
</script> 
 */