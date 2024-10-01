<script setup lang="ts">
import { stepConfigRegister } from '@/stores/step_register/step_config';
import type { IConfigService } from '@/utils/interface/config/IConfigService';
import type { IServiceXP } from '@/utils/interface/service/IService';
import { useAxiosRequest } from '@/utils/service/custom';
import { Parent } from '@/utils/service/proxy';
import { ref, watchEffect } from 'vue';

const listCheckbox = ref<Array<Boolean>>([]);
const workspaceConfig = ref<IConfigService>({
    workspace: '',
    microservice: []
})
const storeConfigService = stepConfigRegister();
const fnameRules = ref([
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length > 3) || 'Name must be less than 10 characters'
]);

const services = ref<Array<IServiceXP>>([{}]);
watchEffect( async()=>{
    useAxiosRequest().get(Parent.service.list).then(res=>{
        services.value = res.data.services as Array<IServiceXP>
        services.value.map((v,k)=>{
            if(listCheckbox.value.length == 0) listCheckbox.value.push(false)
        }) 
    }).catch(error=>{
        console.log(error)
    })
})
const saveStepService = ()=>{
    listCheckbox.value.map((v:Boolean,k:number)=>{
        if(v == true){
            alert("d")
            workspaceConfig.value.microservice.push(services.value[k].name as string);
        }
    });
    if(workspaceConfig.value.microservice.length != 0 && workspaceConfig.value.workspace.length > 3){
        storeConfigService.persistance(workspaceConfig.value);
        alert("success");
    }
    else{
        alert("bug")
    }
}
</script>
<template>
    <v-col cols="12" lg="5" xl="4" class=" bg-surface">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">WorkSpace*</v-label>
        <VTextField v-model="workspaceConfig.workspace" :rules="fnameRules" required suffix=".kontena@editor.cd"></VTextField>
    </v-col>        
   <v-expansion-panels class="mb-6">
            <v-expansion-panel elevation="10">
            <v-expansion-panel-title>
                <v-row no-gutters>
                    <v-col cols="12" md="5"  class="d-flex justify-start">
                        <h6 class="text-h6">Service Configuration</h6>
                    </v-col>
                </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row class="ma-sm-n2 ma-n1">
                    <v-col cols="12" md="8">
                        <v-btn color="primary" class="mt-sm-0 mt-3" flat>Synchronisation</v-btn>
                        <v-row >
                            <v-col v-for="(service,key) in services" cols="12" lg="5" xl="4" class=" bg-surface">
                                <div class="d-flex justify-space-between my-4">
                                    <div>
                                        <h6 class="text-h6 mb-1">Service {{ service.name }}</h6>
                                        <h5 class="text-subtitle-1 text-grey100">{{ service.description?.slice(0, 1)}}...</h5>
                                    </div>
                                    <v-checkbox v-model="listCheckbox[key]" hide-details color="primary">
                                    </v-checkbox>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>

        </v-row>
     
            </v-expansion-panel-text>
            <v-divider></v-divider>
            </v-expansion-panel>  
   </v-expansion-panels>
   <v-col cols="6" md="4">
    <v-btn size="large" class="mt-2" color="primary" block submit rounded="pill" @click="saveStepService()" >Sauvegarder</v-btn>
   </v-col>
   
</template>