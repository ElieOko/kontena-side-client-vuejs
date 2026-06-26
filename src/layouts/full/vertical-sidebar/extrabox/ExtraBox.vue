<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Icon } from '@iconify/vue';
import { useDashboardStore } from '@/stores/dashboard/dashboard';

const router = useRouter();
const store = useDashboardStore();
const { user: connectedUser } = storeToRefs(store);

const logout = () => {
  store.logout();
  router.push('/auth/dashboard-login');
};
</script>

<template>
  <v-sheet rounded="md" color="lightprimary" class="pa-4 ExtraBox hide-menu">
    <div v-if="connectedUser" class="d-flex align-center justify-space-between">
      <v-avatar size="50" color="primary">
        <span class="text-h6 text-white text-uppercase">
          {{ connectedUser.username.charAt(0) }}
        </span>
      </v-avatar>
      <div class="mx-3 flex-grow-1">
        <h6 class="text-h6 font-weight-semibold">{{ connectedUser.username }}</h6>
        <span class="text-subtitle-2 font-weight-medium text-grey100 text-capitalize">
          {{ connectedUser.role.name }}
        </span>
      </div>
      <v-btn icon class="bg-lightprimary" flat size="small" @click="logout">
        <Icon icon="solar:logout-linear" class="text-primary" stroke-width="3" height="24" width="24" />
      </v-btn>
    </div>
    <div v-else class="text-center">
      <p class="text-subtitle-2 text-grey100 mb-2">Aucun utilisateur connecté</p>
      <v-btn size="small" color="primary" variant="flat" to="/auth/dashboard-login">
        Se connecter
      </v-btn>
    </div>
  </v-sheet>
</template>

<style lang="scss">
.ExtraBox {
  position: relative;
}
</style>
