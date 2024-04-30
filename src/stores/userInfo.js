import { defineStore } from "pinia";


export const useUserInfoStore = defineStore("userInfo", () => {
    const info = ({})
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