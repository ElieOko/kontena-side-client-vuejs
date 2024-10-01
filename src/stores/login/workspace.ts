import { defineStore } from "pinia";

interface IWork{
    workspace : number
}
export const setupWorkSpace = defineStore({
    id:"workspace",
    state :()=>({
        // @ts-ignore
        work:JSON.parse(localStorage.getItem('keys_workspace')),
    }),
    actions:{
        persistance(wk : IWork){
            this.work = wk
            localStorage.setItem('keys_workspace', JSON.stringify(wk));  
        }
    }
})