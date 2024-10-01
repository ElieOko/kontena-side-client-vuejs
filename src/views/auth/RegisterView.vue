<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import { Home2Icon } from 'vue-tabler-icons';
import StepUserView from './register/StepUserView.vue';
import StepEnterpriseView from './register/StepEnterpriseView.vue';
import StepServiceConfigView from './register/StepServiceConfigView.vue';
import { stepUserRegister } from '@/stores/step_register/step_user';
import { stepEnterpriseRegister } from '@/stores/step_register/step_enterprise';
import { stepConfigRegister } from '@/stores/step_register/step_config';
import { useAxiosRequest } from '@/utils/service/custom';
import { Parent } from '@/utils/service/proxy';
import type { IWorkSpaceUser } from '@/utils/interface/workspace/IWorkSpace';
import { progress } from '@/utils/animation/routage';
import router from '@/router';

const store = useEcomStore();
const thankyou = ref(false);
const storeUser = stepUserRegister();
const storeEnteprise = stepEnterpriseRegister();
const storeConfigService = stepConfigRegister()
const getCart = computed(() => {
    return store.cart;
});
const tab = ref('tab-1');
function changeTab(e: string) {
    tab.value = e;
}
const callComponentWithDelay = (path:string,interval : number = 2000)=>{
    progress.start()
    setTimeout(()=>{
        progress.finish()
        router.push(path);
    },
    interval);
}
//@click="thankyou = true"
const sendPostData = async ()=>{
    if(!storeUser.user || !storeEnteprise.enterprise || !storeConfigService.config) alert("Erreur au niveau des données");
    else ( async ()=>{
        await(
            useAxiosRequest().post(Parent.user.create,storeUser.user).then(res=>{
                if(res.status == 201){
                    const user_id = res.data.user.user_id;
                    console.log(res.data.message);
                    console.log(res.data.user);
                    useAxiosRequest().post(Parent.workspace.create,storeConfigService.config).then(rep=>{
                            if (rep.status == 201) {
                                console.log(res.data.message);
                                console.log(res.data.workspace);
                               const space_id = rep.data.workspace.space_id;
                               storeEnteprise.enterprise.user_workspace_id = Number(`${user_id}${space_id}`);
                               const bs : IWorkSpaceUser = {
                                user      : user_id,
                                workspace : space_id
                               }
                               useAxiosRequest().post(Parent.workspaceUser.create,bs).then(resp=>{
                                    if(resp.status == 201){
                                        console.log(resp.data.workspace_user);
                                        useAxiosRequest().post(Parent.enterprise.create,storeEnteprise.enterprise).then(resp=>{
                                            if(resp.status == 201){
                                                console.log(resp.data.message);
                                                console.log(resp.data.enterprise);
                                                callComponentWithDelay("/dashboard");
                                            }
                                            else{
                                                console.log("bug");
                                            }
                                        }).catch(err=>{
                                            
                                        });
                                    }
                                    else{
                                        console.log("bug");
                                    }
                                }).catch(err=>{
                                    
                                });
                               
                            }
                    }).catch(err=>{

                    });
                }
            }).catch(error =>{
                alert(error);
            })
        );
    })()
}
</script>
<template>
    <v-container fluid class="page-wrapper bg-background px-sm-5 px-4  rounded-xl">
    <v-card elevation="10" fluid class="bg-surface my-10 " >
        <v-card-text>
            <v-tabs v-model="tab" color="primary" class="customTab">
                <v-tab value="tab-1" rounded="md" class="mb-3 mx-2 text-left" height="70">
                    <UserIcon stroke-width="1.5" width="20" class="v-icon--start" />
                    <div>
                        <div>Utilisateur</div>
                        <span class="text-subtitle-2 text-lightText text-medium-emphasis font-weight-medium d-block">WorkSpace</span>
                    </div>
                </v-tab>

                <v-tab value="tab-2" rounded="md" class="mb-3 mx-2 text-left" height="70" :disabled="store.cart.length < 1">
                    <Home2Icon stroke-width="1.5" width="20" class="v-icon--start" />
                    <div>
                        <div>Entreprise</div>
                        <span class="text-subtitle-2 text-lightText text-medium-emphasis font-weight-medium d-block">
                            Entreprise Information
                        </span>
                    </div>
                </v-tab>

                <v-tab value="tab-3" rounded="md" class="mb-3 mx-2 text-left" height="70" :disabled="store.cart.length < 1">
                    <SettingsIcon stroke-width="1.5" width="20" class="v-icon--start" />
                    <div>
                        <div>Service</div>
                        <span class="text-subtitle-2 text-lightText text-medium-emphasis font-weight-medium d-block">
                            Service Configuration 
                        </span>
                    </div>
                </v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item value="tab-1" class="pa-1">
                    <StepUserView/>
                    <v-row class="mt-3 pb-1">
                        <v-col cols="12" sm="6" class="text-sm-left text-center">
                            <v-btn color="primary" rounded="pill" variant="tonal" to="/ecommerce/products-one">Continue</v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" class="text-sm-right text-center" v-if="storeUser.user">
                            <v-btn color="primary" rounded="pill" @click="changeTab('tab-2')" >Suivant</v-btn>
                        </v-col>
                    </v-row>
                </v-window-item>
                <v-window-item value="tab-2" class="pa-1">
                    <StepEnterpriseView />
                    <v-row class="mt-3">
                        <v-col cols="6">
                            <v-btn color="primary" rounded="pill" variant="tonal" @click="changeTab('tab-1')">Back</v-btn>
                        </v-col>
                        <v-col cols="6" class="text-right pb-5" v-if="storeEnteprise.enterprise">
                            <v-btn color="primary"  rounded="pill" @click="changeTab('tab-3')">Finalisation</v-btn>
                        </v-col>
                    </v-row>
                </v-window-item>
                <v-window-item value="tab-3" class="pa-1">
                    <StepServiceConfigView />
                    <v-row class="mt-3">
                        <v-col cols="12" sm="6">
                            <v-btn color="primary" variant="tonal" rounded="pill" @click="changeTab('tab-2')">Back</v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" class="text-sm-right pb-5">
                            <v-btn color="primary" rounded="pill" @click ="sendPostData()" >finish</v-btn>
                            <!-- Modal -->
                            <v-dialog v-model="thankyou" max-width="750">
                                <Thankyou />
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
    {{  }}
    <!-- <span>User:{{ storeUser.user }}|| Entreprise:{{ storeEnteprise.enterprise }}|| Service:{{storeConfigService.config  }}</span> -->
</v-container>
</template>
<style lang="scss">
.customTab {
    min-height: 68px;
}
</style>
