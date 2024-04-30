//定义store
import { defineStore } from "pinia";
import  {ref }  from "vue";

// 创建一个名为 `token` 的 store
/* 第一个参数为名字，唯一性
    第二个参数：函数，函数内部

*/ 

export const useTokenStore = defineStore("token",()=>{

    const token = ref('')

    const setToken = (newToken) => {
        token.value = newToken;
    }

    const removeToken = () => {
        token.value = '';
    }

    return {
        token,
        setToken,
        removeToken,
    }
}
,
{
    persist: true, // 是否使用持久化插件
});