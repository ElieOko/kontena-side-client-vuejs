<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { formatPhoneNumber, genderColor } from '@/utils/service/dashboardApi';
import { useDashboardStore } from '@/stores/dashboard/dashboard';

const store = useDashboardStore();
const { platformUsers, loadingUsers, error } = storeToRefs(store);

const search = ref('');
const genderFilter = ref('Tous');

const genderOptions = ['Tous', 'Femme', 'Homme', 'Non renseigné'];

const filteredUsers = computed(() => {
  const query = search.value.trim().toLowerCase();
  return platformUsers.value.filter((user) => {
    const matchesGender = genderFilter.value === 'Tous' || user.gender === genderFilter.value;
    const phone = formatPhoneNumber(user.phone_number).toLowerCase();
    const matchesSearch = !query || user.phone_number.includes(query) || phone.includes(query);
    return matchesGender && matchesSearch;
  });
});

const genderCounts = computed(() => {
  const counts = { Femme: 0, Homme: 0, 'Non renseigné': 0 };
  for (const user of platformUsers.value) {
    if (user.gender in counts) {
      counts[user.gender as keyof typeof counts] += 1;
    }
  }
  return counts;
});

const formatDate = (value: string | null): string => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

onMounted(() => store.ensureUsersData());
</script>

<template>
  <div class="users-dashboard">
    <header class="page-hero mb-6">
      <div class="d-flex align-center justify-space-between flex-wrap ga-4">
        <div>
          <v-chip size="small" color="teal" variant="flat" class="font-weight-bold mb-2">Ipas</v-chip>
          <h1 class="text-h4 font-weight-bold mb-1">Utilisateurs de la plateforme</h1>
          <p class="text-body-2 text-medium-emphasis mb-0">
            Numéros de téléphone uniques et genre déclaré via Solola na nga
          </p>
        </div>
        <v-btn
          color="teal-darken-1"
          variant="flat"
          prepend-icon="mdi-refresh"
          :loading="loadingUsers"
          @click="store.refreshUsers()"
        >
          Actualiser
        </v-btn>
      </div>
    </header>

    <v-alert v-if="error" type="error" variant="tonal" class="mb-4">{{ error }}</v-alert>

    <v-row class="mb-4">
      <v-col cols="6" sm="3">
        <v-card class="stat-pill" elevation="0">
          <p class="text-caption text-medium-emphasis mb-1">Total</p>
          <h3 class="text-h4 font-weight-bold">{{ platformUsers.length }}</h3>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card class="stat-pill" elevation="0">
          <p class="text-caption text-medium-emphasis mb-1">Femmes</p>
          <h3 class="text-h4 font-weight-bold text-pink">{{ genderCounts.Femme }}</h3>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card class="stat-pill" elevation="0">
          <p class="text-caption text-medium-emphasis mb-1">Hommes</p>
          <h3 class="text-h4 font-weight-bold text-blue">{{ genderCounts.Homme }}</h3>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card class="stat-pill" elevation="0">
          <p class="text-caption text-medium-emphasis mb-1">Non renseigné</p>
          <h3 class="text-h4 font-weight-bold text-grey">{{ genderCounts['Non renseigné'] }}</h3>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="table-card pa-4" elevation="0">
      <div class="d-flex align-center justify-space-between flex-wrap ga-3 mb-4">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Rechercher un numéro"
          variant="outlined"
          density="compact"
          hide-details
          clearable
          style="max-width: 320px"
        />
        <v-btn-toggle v-model="genderFilter" mandatory density="compact" color="teal" variant="outlined" divided>
          <v-btn v-for="option in genderOptions" :key="option" :value="option" size="small">
            {{ option }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <v-data-table
        :headers="[
          { title: 'Téléphone', key: 'phone_number', sortable: true },
          { title: 'Genre', key: 'gender', sortable: true },
          { title: 'Messages', key: 'messages_count', sortable: true, align: 'end' },
          { title: 'Première visite', key: 'first_seen', sortable: true },
          { title: 'Dernière activité', key: 'last_seen', sortable: true },
        ]"
        :items="filteredUsers"
        :loading="loadingUsers && !platformUsers.length"
        :items-per-page="10"
        class="users-table"
        hover
      >
        <template #item.phone_number="{ item }">
          <div class="d-flex align-center ga-2">
            <v-avatar size="32" color="teal-lighten-5">
              <v-icon icon="mdi-phone-outline" size="16" color="teal-darken-1" />
            </v-avatar>
            <span class="font-weight-medium">{{ formatPhoneNumber(item.phone_number) }}</span>
          </div>
        </template>

        <template #item.gender="{ item }">
          <v-chip size="small" :color="genderColor(item.gender)" variant="tonal">
            {{ item.gender }}
          </v-chip>
        </template>

        <template #item.first_seen="{ item }">
          <span class="text-caption">{{ formatDate(item.first_seen) }}</span>
        </template>

        <template #item.last_seen="{ item }">
          <span class="text-caption">{{ formatDate(item.last_seen) }}</span>
        </template>

        <template #no-data>
          <div class="text-center py-8 text-medium-emphasis">Aucun utilisateur trouvé</div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<style scoped>
.page-hero {
  padding: 1.5rem 1.75rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #f0fdfa 0%, #ecfeff 45%, #f8fafc 100%);
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

.users-table :deep(th) {
  font-weight: 600 !important;
  color: #475569 !important;
}
</style>
