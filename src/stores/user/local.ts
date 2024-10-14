import { defineStore } from "pinia";

export const useUserLocal = defineStore({
    id:"user_local",
    state :()=>({
        // @ts-ignore
        local:JSON.parse(localStorage.getItem('keys_user_local')),
    }),
    actions:{
        persistance(wk : any){
            this.local = wk
            localStorage.setItem('keys_user_local', JSON.stringify(wk));  
        }
    }
})