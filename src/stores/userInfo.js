import { defineStore } from "pinia";
import { ref } from "vue";


export const useUserInfoStore = defineStore("userInfo", () => {
    const info = ref({})
    const setInfo =  (newInfo) => {
        info.value = newInfo;
    }

    const removeInfo = () => {
        info = {};
    }

    return{
        info,
        setInfo,
        removeInfo,
    }
}
,{persist: true,});

export default useUserInfoStore;