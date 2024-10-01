<script setup lang="ts">
import { stepUserRegister } from '@/stores/step_register/step_user';
import type { IActivity } from '@/utils/interface/user/IActivity';
import type { IUser, IUserRequest } from '@/utils/interface/user/IUser';
import { useAxiosRequest } from '@/utils/service/custom';
import { Parent } from '@/utils/service/proxy';
import { ref, watchEffect } from 'vue';

const storeUser = stepUserRegister();
const activity = ref("");
const user = ref<IUserRequest>({
    username: '',
    email: '',
    password: ''
})
const valid = ref(true);
const show1 = ref(false);
const userNameRule = ref([
    (v: string) => !!v || 'Username is required',
    (v: string) => (v && v.length <= 25 && v.length > 2) || 'Username must be less than 25 characters'
]);
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 100 && v.length > 3) || 'Password must be less than 100 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

// fusername.value = `${ffamilyname.value}${flastname.value}`
const fnameRules = ref([
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 25) || 'Name must be less than 25 characters'
]);
const activities = ref<Array<IActivity>>([{name:""}]);
watchEffect( async()=>{
    useAxiosRequest().get(Parent.activity.list).then(res=>{
        activities.value = res.data.activities
        activity.value = activities.value[0].name
    }).catch(error=>{
        console.log(error)
    })

})

const saveStepUser = ()=>{
    if(user.value.username.length > 2 && activity.value && user.value.password.length > 3){
        user.value.activity = activity.value
        storeUser.persistance(user.value);
        alert("success");
    }
    else{
        alert("bug");
    }
}
</script>
<template>
    <v-form ref="form" v-model="valid" lazy-validation action="/pages/boxedlogin" class="mt-5">
        <v-row class="mt-1">
            <v-col cols="12" md="6" >
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Nom de famille</v-label>
                <VTextField v-model="user.family_name" ></VTextField>
            </v-col>
            <v-col cols="12" md="6">
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Prenom</v-label>
                <VTextField v-model="user.last_name"></VTextField>
            </v-col>
        </v-row>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Activité*</v-label>
        <v-autocomplete v-model="activity"  item-title="name" item-value="name"   :items="activities" color="primary" variant="outlined" hide-details></v-autocomplete>
        <v-row class="mt-1">
            <v-col cols="12" md="6">
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Nom d'Utilisateur*</v-label>
                <VTextField v-model="user.username" :rules="userNameRule" required ></VTextField>
            </v-col>
            <v-col cols="12" md="6">
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Email Adddress*</v-label>
                <VTextField v-model="user.email" :rules="emailRules"></VTextField>
            </v-col>
        </v-row>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Password*</v-label>
        <VTextField
            v-model="user.password"
            :counter="100"
            :rules="passwordRules"
            required
            variant="outlined"
            type="password"
            color="primary"
        ></VTextField>
        <v-btn size="large" class="mt-2" color="primary" block submit rounded="pill" @click="saveStepUser()" >Sauvegarder</v-btn>
    </v-form>
</template>
