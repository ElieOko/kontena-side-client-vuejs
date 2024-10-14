import type { IChartAccount } from "@/utils/interface/core/finance/IChartAccount";
import { defineStore } from "pinia";
export const useChartAccount = defineStore({
    id:"chartAccount",
    state :()=>({
        // @ts-ignore
        config:awaitJSON.parse(localStorage.getItem('chartAccount')),
    }),
    actions:{
        persistance(config : Array<IChartAccount>){
            this.config = config
            localStorage.setItem('chartAccount', JSON.stringify(config));  
        },
        destroy(){
            localStorage.removeItem('chartAccount');
        },
        async fetchAll(){
            // @ts-ignore
            return await JSON.parse(localStorage.getItem('chartAccount'))
        }
    }
})