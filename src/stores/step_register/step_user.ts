import type { IUser, IUserRequest } from "@/utils/interface/user/IUser";
import { defineStore } from "pinia";

export const stepUserRegister = defineStore({
    id:"step1",
    state :()=>({
        // @ts-ignore
        user:JSON.parse(localStorage.getItem('user_info')),
    }),
    actions:{
        persistance(user : IUserRequest){
            this.user = user
            localStorage.setItem('user_info', JSON.stringify(user));
        },
        destroy(){
            localStorage.removeItem('user_info');
        }
    }
})