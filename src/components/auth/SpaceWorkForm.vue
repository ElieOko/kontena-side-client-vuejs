<script setup lang="ts">
import { ref } from 'vue';
//@ts-ignore
import Logo from '@/layouts/full/logo/Logo.vue';
import { progress } from '@/utils/animation/routage';
import router from '@/router';
import { useAxiosRequest } from '@/utils/service/custom';
import { Parent } from '@/utils/service/proxy';
import { setupWorkSpace } from '@/stores/login/workspace';
import { fa } from 'vuetify/locale';
const valid = ref(true);
const show1 = ref(false);

const workspace = ref('')
const domainSpace = ref(".kontena@editor.cd")
const callComponentWithDelay = (path:string,interval : number = 2000)=>{
    progress.start()
    setTimeout(()=>{
        progress.finish()
        router.push(path);
    },
    interval);
}
const fnameRules = ref([
    (v: string) => !!v || 'WorkSpace is required',
    (v: string) => (v && v.length >= 3) || 'Name must be less than 10 characters'
]);

const sendPostData = async ()=>{
    if(workspace.value.length != 3){
        show1.value = true;
        const data ={name:workspace.value};
        console.time('requeteAsync');
        await useAxiosRequest().post(Parent.workspace.auth,data).then(res=>{
            if(res.status == 201) alert("Succes");
            console.timeEnd('requeteAsync');
            setupWorkSpace().persistance({workspace:res.data.workspace});
            callComponentWithDelay("/auth/login");
        }).catch(error=>{
            show1.value = false;
            console.log(error);
        })
    }

}
</script>
<template>
    <v-form ref="form" v-model="valid" lazy-validation action="/dashboards/analytical" class="mt-sm-13 mt-8">
        <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Entrez votre espace de travail</v-label>
        <VTextField v-model="workspace" :rules="fnameRules" required :suffix="domainSpace"></VTextField>
        <v-btn size="large" class="mt-5 text-primary" color="lightprimary" block :loading="show1"  @click="sendPostData()" rounded="pill">Connexion</v-btn>
    </v-form>
</template>
