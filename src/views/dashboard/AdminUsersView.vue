<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { AdminUserCreatePayload, DashboardUser } from '@/utils/service/dashboardApi';
import { useDashboardStore } from '@/stores/dashboard/dashboard';
import IpasLogo from '@/components/shared/IpasLogo.vue';

const store = useDashboardStore();
const { adminUsers, loadingAdminUsers, savingAdminUser, error, user: currentUser } =
  storeToRefs(store);

const createDialog = ref(false);
const formError = ref('');
const form = ref<AdminUserCreatePayload>({
  username: '',
  password: '',
  email: '',
  role: 'admin',
});

const roleOptions = [
  { title: 'Administrateur', value: 'admin' },
  { title: 'Lecture seule', value: 'viewer' },
];

const activeCount = computed(() => adminUsers.value.filter((item) => item.is_active).length);

const formatDate = (value?: string): string => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const roleLabel = (role: string): string => {
  if (role === 'superadmin') return 'Super administrateur';
  if (role === 'viewer') return 'Lecture seule';
  return 'Administrateur';
};

const roleColor = (role: string): string => {
  if (role === 'superadmin') return 'deep-orange';
  if (role === 'viewer') return 'grey';
  return 'teal';
};

const resetForm = () => {
  form.value = { username: '', password: '', email: '', role: 'admin' };
  formError.value = '';
};

const openCreateDialog = () => {
  resetForm();
  createDialog.value = true;
};

const submitCreate = async () => {
  formError.value = '';
  if (!form.value.username.trim() || form.value.password.length < 6) {
    formError.value = 'Nom d\'utilisateur et mot de passe (6 caractères min.) requis.';
    return;
  }

  try {
    await store.createAdminUser({
      username: form.value.username.trim(),
      password: form.value.password,
      email: form.value.email?.trim() || null,
      role: form.value.role,
    });
    createDialog.value = false;
    resetForm();
  } catch {
    formError.value = store.error || 'Création impossible.';
  }
};

const canToggle = (item: DashboardUser): boolean => item.id !== currentUser.value?.id;

const setActive = async (item: DashboardUser, isActive: boolean) => {
  if (!canToggle(item) || item.is_active === isActive) return;
  try {
    await store.updateAdminUser(item.id, { is_active: isActive });
  } catch {
    // store.error already set
  }
};

onMounted(() => store.fetchAdminUsers());
</script>

<template>
  <div class="admin-users-page">
    <header class="page-hero mb-6">
      <div class="d-flex align-center justify-space-between flex-wrap ga-4">
        <div>
          <IpasLogo :height="32" class="mb-2" />
          <h1 class="text-h4 font-weight-bold mb-1">Comptes administrateurs</h1>
          <p class="text-body-2 text-medium-emphasis mb-0">
            Création et gestion des accès à la plateforme — réservé au super administrateur
          </p>
        </div>
        <div class="d-flex ga-2">
          <v-btn
            color="teal-darken-1"
            variant="flat"
            prepend-icon="mdi-account-plus"
            @click="openCreateDialog"
          >
            Nouveau compte
          </v-btn>
          <v-btn
            variant="outlined"
            prepend-icon="mdi-refresh"
            :loading="loadingAdminUsers"
            @click="store.fetchAdminUsers(true)"
          >
            Actualiser
          </v-btn>
        </div>
      </div>
    </header>

    <v-alert v-if="error" type="error" variant="tonal" class="mb-4" closable @click:close="store.error = ''">
      {{ error }}
    </v-alert>

    <v-row class="mb-4">
      <v-col cols="6" sm="4">
        <v-card class="stat-pill" elevation="0">
          <p class="text-caption text-medium-emphasis mb-1">Total comptes</p>
          <h3 class="text-h4 font-weight-bold">{{ adminUsers.length }}</h3>
        </v-card>
      </v-col>
      <v-col cols="6" sm="4">
        <v-card class="stat-pill" elevation="0">
          <p class="text-caption text-medium-emphasis mb-1">Actifs</p>
          <h3 class="text-h4 font-weight-bold text-teal">{{ activeCount }}</h3>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="stat-pill" elevation="0">
          <p class="text-caption text-medium-emphasis mb-1">Désactivés</p>
          <h3 class="text-h4 font-weight-bold text-grey">{{ adminUsers.length - activeCount }}</h3>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="table-card pa-4" elevation="0">
      <v-data-table
        :headers="[
          { title: 'Utilisateur', key: 'username', sortable: true },
          { title: 'E-mail', key: 'email', sortable: true },
          { title: 'Rôle', key: 'role.name', sortable: true },
          { title: 'Créé le', key: 'created_at', sortable: true },
          { title: 'Connexion', key: 'is_active', sortable: true, align: 'center' },
        ]"
        :items="adminUsers"
        :loading="loadingAdminUsers && !adminUsers.length"
        :items-per-page="10"
        class="admin-users-table"
        hover
      >
        <template #item.username="{ item }">
          <div class="d-flex align-center ga-2">
            <v-avatar size="32" color="teal-lighten-5">
              <v-icon icon="mdi-account-outline" size="16" color="teal-darken-1" />
            </v-avatar>
            <span class="font-weight-medium">{{ item.username }}</span>
          </div>
        </template>

        <template #item.email="{ item }">
          <span class="text-caption">{{ item.email || '—' }}</span>
        </template>

        <template #item.role.name="{ item }">
          <v-chip size="small" :color="roleColor(item.role.name)" variant="tonal">
            {{ roleLabel(item.role.name) }}
          </v-chip>
        </template>

        <template #item.created_at="{ item }">
          <span class="text-caption">{{ formatDate(item.created_at) }}</span>
        </template>

        <template #item.is_active="{ item }">
          <v-switch
            :model-value="item.is_active"
            color="teal"
            density="compact"
            hide-details
            :disabled="!canToggle(item) || savingAdminUser"
            :label="item.is_active ? 'Actif' : 'Désactivé'"
            @update:model-value="setActive(item, $event)"
          />
        </template>

        <template #no-data>
          <div class="text-center py-8 text-medium-emphasis">Aucun compte administrateur</div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="createDialog" max-width="520">
      <v-card class="pa-2">
        <v-card-title class="text-h6 font-weight-bold">Créer un compte</v-card-title>
        <v-card-text>
          <p class="text-body-2 text-medium-emphasis mb-4">
            Le compte pourra se connecter à Solola na nga Admin selon le rôle attribué.
          </p>

          <v-alert v-if="formError" type="error" variant="tonal" density="compact" class="mb-4">
            {{ formError }}
          </v-alert>

          <v-text-field
            v-model="form.username"
            label="Nom d'utilisateur"
            variant="outlined"
            density="comfortable"
            class="mb-3"
            autocomplete="off"
          />
          <v-text-field
            v-model="form.password"
            label="Mot de passe"
            type="password"
            variant="outlined"
            density="comfortable"
            class="mb-3"
            autocomplete="new-password"
          />
          <v-text-field
            v-model="form.email"
            label="E-mail (optionnel)"
            type="email"
            variant="outlined"
            density="comfortable"
            class="mb-3"
            autocomplete="off"
          />
          <v-select
            v-model="form.role"
            :items="roleOptions"
            item-title="title"
            item-value="value"
            label="Rôle"
            variant="outlined"
            density="comfortable"
          />
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn variant="text" @click="createDialog = false">Annuler</v-btn>
          <v-btn color="teal-darken-1" variant="flat" :loading="savingAdminUser" @click="submitCreate">
            Créer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.page-hero {
  padding: 1.5rem 1.75rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #fff7ed 0%, #f0fdfa 45%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
}

.stat-pill {
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #fff;
  height: 100%;
}

.table-card {
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #fff;
}

.admin-users-table :deep(th) {
  font-weight: 600 !important;
  color: #475569 !important;
}
</style>
