import type { IEnterprise, IEnterpriseRequest } from "@/utils/interface/enterprise/IEnterprise";
import { defineStore } from "pinia";

export const stepEnterpriseRegister = defineStore({
    id:"step2",
    state :()=>({
        // @ts-ignore
        enterprise:JSON.parse(localStorage.getItem('enterprise')),
    }),
    actions:{
        persistance(enterprise : IEnterpriseRequest){
            this.enterprise = enterprise
            localStorage.setItem('enterprise', JSON.stringify(enterprise));  
        },
        destroy(){
            localStorage.removeItem('enterprise');
        }
    }
})