import type { IConfigService } from "@/utils/interface/config/IConfigService";
import { defineStore } from "pinia";

export const stepConfigRegister = defineStore({
    id:"step3",
    state :()=>({
        // @ts-ignore
        config:JSON.parse(localStorage.getItem('config_service')),
    }),
    actions:{
        persistance(config : IConfigService){
            this.config = config
            localStorage.setItem('config_service', JSON.stringify(config));  
        },
        destroy(){
            localStorage.removeItem('config_service');
        }
    }
})