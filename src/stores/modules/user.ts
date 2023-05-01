import {  getUserinfo } from './../../apis/user';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('UserStore', () => {
    const userinfo = ref({
        username: '',
        avatarUrl: '',
        role:0
    })
    
    const doGetUserinfo = async () => {
        // const { data: loginStatus } = await getStatus()
        // if (loginStatus) {
            const res = await getUserinfo()
            userinfo.value = res.data
            
        // }

    }
    doGetUserinfo()
    return { userinfo, doGetUserinfo }
})
