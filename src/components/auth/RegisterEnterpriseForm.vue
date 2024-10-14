<script setup lang="ts">
import { stepEnterpriseRegister } from '@/stores/step_register/step_enterprise';
import type { IEnterpriseRequest } from '@/utils/interface/enterprise/IEnterprise';
import type { ISecteur } from '@/utils/interface/enterprise/ISecteur';
import type { IStatusJuridique } from '@/utils/interface/enterprise/IStatusJuridique';
import { useAxiosRequest } from '@/utils/service/custom';
import { Parent } from '@/utils/service/proxy';
import { ref, watchEffect } from 'vue';
//import Logo from '@/layouts/full/logo/Logo.vue';
/*Social icons*/

const valid = ref(true);
const enterprise = ref<IEnterpriseRequest>({
    name: '',
    adresse: {},
    status_juridique: '',
    secteur: '',
    fiscal: {
        nif: '',
        rccm: ''
    },
    cordonnee: {
        site: {
            url: ''
        },
        phone: {
            phone_number: ''
        },
        email: {
            email_address: ''
        }
    }
})
const sector = ref("");
const statusJuridique = ref("");
const sectors = ref<Array<ISecteur>>([{name:""}]);
const itemStatusJuridique = ref<Array<IStatusJuridique>>([{name:""}]);
const items_status = ref(["EURL", "SARL", "SA", "SAS/SASU","SNC"]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const fnameRules = ref([
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters'
]); 
const storeEnteprise = stepEnterpriseRegister()
watchEffect( async()=>{
    useAxiosRequest().get(Parent.secteur.list).then(res=>{
        sectors.value = res.data.sector
        sector.value = sectors.value[0].name
    }).catch(error=>{
        console.log(error)
    })
    useAxiosRequest().get(Parent.statusJuridique.list).then(res=>{
        itemStatusJuridique.value = res.data.status_juridique
        statusJuridique.value = itemStatusJuridique.value[0].code as string
    }).catch(error=>{
        console.log(error)
    })
})
const saveEntepriseUser = ()=>{
    if(enterprise.value.name.length > 3){
        enterprise.value.secteur = sector.value;
        enterprise.value.status_juridique = statusJuridique.value;
        storeEnteprise.persistance(enterprise.value);
     
    }
    else{
        alert("bug");
    }
}
</script>
<template>
    <v-form ref="form" v-model="valid" lazy-validation action="/pages/boxedlogin" class="mt-5">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Entreprise Name*</v-label>
        <VTextField v-model="enterprise.name" :rules="fnameRules" required ></VTextField>
        <v-expansion-panels class="mb-6">
            <v-expansion-panel elevation="10">
            <v-expansion-panel-title>
                <v-row no-gutters>
                    <v-col cols="12" md="5"  class="d-flex justify-start">
                        <h6 class="text-h6">Details</h6>
                    </v-col>
                </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
               
                <v-row>
            <v-col cols="12" md="6">
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Secteur d'activité</v-label>
                <v-autocomplete v-model="sector"  item-title="name" item-value="name"   :items="sectors" color="primary" variant="outlined" hide-details>
                </v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Status Juridique</v-label>
                <v-autocomplete v-model="statusJuridique"  item-title="code" item-value="code"   :items="itemStatusJuridique" color="primary" variant="outlined" hide-details>
                </v-autocomplete>
            </v-col>
            
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-label class="text-subtitle-1 font-weight-medium pb-2">RCCM</v-label>
                <VTextField v-model="enterprise.fiscal.rccm" ></VTextField>
            </v-col>
            <v-col cols="12" md="6">
                <v-label class="text-subtitle-1 font-weight-medium pb-2">NIF/NAF</v-label>
                <VTextField v-model="enterprise.fiscal.nif" ></VTextField>
            </v-col>
        </v-row>
            </v-expansion-panel-text>
            <v-divider></v-divider>
            </v-expansion-panel>  
        </v-expansion-panels>
        <v-expansion-panels class="mb-6">
            <v-expansion-panel elevation="10">
            <v-expansion-panel-title>
                <v-row no-gutters>
                    <v-col cols="12" md="5"  class="d-flex justify-start">
                        <h6 class="text-h6">Coordonnées</h6>
                    </v-col>
                </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-label class="text-subtitle-1 font-weight-medium pb-2">Phone</v-label>
                        <VTextField v-model="enterprise.cordonnee.phone.phone_number" ></VTextField>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-label class="text-subtitle-1 font-weight-medium pb-2">Website</v-label>
                        <VTextField v-model="enterprise.cordonnee.site.url"></VTextField>
                    </v-col>
                </v-row>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Email Adddress</v-label>
                <VTextField v-model="enterprise.cordonnee.email.email_address" ></VTextField>
            </v-expansion-panel-text>
            <v-divider></v-divider>
            </v-expansion-panel>  
        </v-expansion-panels>
        <v-expansion-panels class="mb-6">
            <v-expansion-panel elevation="10">
            <v-expansion-panel-title>
                <v-row no-gutters>
                    <v-col cols="12" md="5"  class="d-flex justify-start">
                        <h6 class="text-h6">Addresse</h6>
                    </v-col>
                </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Siège Social</v-label>
                <VTextField v-model="enterprise.adresse.head_office"></VTextField>
                <v-row>
            <v-col cols="12" md="6">
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Ville</v-label>
                <VTextField v-model="enterprise.adresse.city"></VTextField>
            </v-col>
            <v-col cols="12" md="6">
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Pays</v-label>
                <v-select
                :items="items_status"
                hide-details
                placeholder="select"
                ></v-select>
            </v-col>
        </v-row>
            </v-expansion-panel-text>
            <v-divider></v-divider>
            </v-expansion-panel>  
        </v-expansion-panels>
        
        <v-btn size="large" class="mt-2" color="primary" block submit rounded="pill" @click="saveEntepriseUser">Sauvegarder</v-btn>
    </v-form>
</template>
