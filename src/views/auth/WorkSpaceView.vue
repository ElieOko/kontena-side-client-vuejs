<script setup lang="ts">
//@ts-ignore
import Logo from '@/layouts/full/logo/Logo.vue';
/* Reset form */
import SpaceWorkForm from '@/components/auth/SpaceWorkForm.vue';

</script>

<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" lg="12" xl="12" class="d-flex align-center">
                    <div class="boxed-auth-wrap">
                        <v-card elevation="10" class="px-sm-1 px-0  mx-auto index-2" max-width="450">
                            <v-card-item class="pa-sm-8">
                                <div class="d-flex justify-center my-5">
                                    <Logo />
                                </div>
                                <p class="text-subtitle-1 text-grey100 text-center text-10">
                                    {{ "Connectez-vous à votre espace de travail" }}
                                </p>
                                <SpaceWorkForm />
                            </v-card-item>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
