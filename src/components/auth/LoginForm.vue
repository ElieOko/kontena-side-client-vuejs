<script setup lang="ts">
import { ref } from 'vue';
// import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';

/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/icon-facebook.svg';
import { progress } from '@/utils/animation/routage';
import router from '@/router';
import { useAxiosRequest } from '@/utils/service/custom';
import { Parent } from '@/utils/service/proxy';
import { setupWorkSpace } from '@/stores/login/workspace';

const checkbox = ref(false);
const show1 = ref(false);
const password = ref('');
const username = ref('');

const callComponentWithDelay = (path:string,interval : number = 2000)=>{
    progress.start()
    setTimeout(()=>{
        progress.finish()
        router.push(path);
    },
    interval);
}
async function sendPostData() {
    if(password.value.length > 3 && username.value.length > 4){
        const data = {
            workspace : setupWorkSpace().work.workspace,
            username :username.value,
            password :password.value
        }
        useAxiosRequest().post(Parent.user.auth,data).then(res =>{
            if(res.status == 200){
                callComponentWithDelay("/dashboard")
            }
        }).catch(error =>{

        });
    }

}
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="6" sm="6">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1 text-gray200 font-weight-semibold" block>
                <img :src="google" height="16" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">Sign in with</span>Google
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1 text-gray200 font-weight-semibold" block>
                <img :src="facebook" width="25" height="25" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">Sign in with</span>FB
            </v-btn>
        </v-col>
    </v-row>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative text-subtitle-1 text-grey100">or sign in with</span>
        </div>  
    </div>
    <Form @submit="sendPostData"  class="mt-5">
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">Username</v-label>
        <VTextField
            v-model="username"
            class="mb-8"
            required
            hide-details="auto"
        ></VTextField>
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">Password</v-label>
        <VTextField
            v-model="password"
            required
            hide-details="auto"
            type="password"
            class="pwdInput"
        ></VTextField>
        <div class="d-flex flex-wrap align-center my-3 ml-n2">
            <!-- <v-checkbox v-model="checkbox" :rules="[(v:any) => !!v || 'You must agree to continue!']" required hide-details color="primary">
                <template v-slot:label class="">Remeber this Device</template>
            </v-checkbox> -->
            <!-- <div class="ml-sm-auto">
                <RouterLink to="" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                    >Forgot Password ?</RouterLink
                >
            </div> -->
        </div>
        <v-btn size="large" rounded="pill" :loading="show1" color="primary" class="bg-red-500"  block type="submit" flat>Continuer</v-btn>
       
    </Form>
</template>
