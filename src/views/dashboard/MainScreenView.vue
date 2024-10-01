<script lang="tsx" setup>
import CongratsCard from "@/components/dashboard/CongratulationsCardView.vue";
import { stepConfigRegister } from "@/stores/step_register/step_config";
import { stepEnterpriseRegister } from "@/stores/step_register/step_enterprise";
import { stepUserRegister } from "@/stores/step_register/step_user";

const storeUser = stepUserRegister();
const storeEnteprise = stepEnterpriseRegister();
const storeConfigService = stepConfigRegister()
storeUser.destroy()
storeEnteprise.destroy()
storeConfigService.destroy()
</script>
<template>
    <v-row>
        <v-col cols="12" sm="12" lg="6">
            <CongratsCard />
        </v-col>
        <h1>Test optimun</h1>
    </v-row>
</template>