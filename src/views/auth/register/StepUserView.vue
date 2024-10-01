<script setup lang="tsx">
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>
<template>
   <v-row class="auth">
        <v-col cols="12" lg="5" xl="4" class=" bg-surface">
            <div class="mt-xl-0 mt-5 mw-100" >
                <RegisterForm />
            </div>
        </v-col>
        <v-col cols="12" lg="7" xl="8" class="d-lg-flex align-center justify-center authentication position-relative">
            <div class="auth-header info@wrappixel.combdbdpt-lg-6 pt-2 px-sm-6 px-3 pb-lg-6 pb-0">
                <div class="position-relative">
                    <Logo /> 
                </div>
            </div>
            <div class="">
                <img src="@/assets/images/backgrounds/login-bg.svg" height="450" class="position-relative d-none d-lg-flex "
                            alt="login-background" />
            </div>
        </v-col>
    </v-row> 
</template>