<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import type { GrowthGranularity, ThemePeriodFilter } from '@/utils/service/dashboardApi';
import { themePeriodLabel } from '@/utils/service/dashboardApi';
import { useDashboardStore } from '@/stores/dashboard/dashboard';

const store = useDashboardStore();
const {
  stats,
  topThemes,
  growthGranularity,
  themeFilter,
  globalDateFrom,
  globalDateTo,
  globalSearchActive,
  loadingStats,
  loadingGrowth,
  loadingThemes,
  loadingGlobalSearch,
  error,
} = storeToRefs(store);

const growth = computed(() => store.growth);
const displayThemes = computed(() => store.displayThemes);
const globalPeriodLabel = computed(() => store.globalPeriodLabel);
const loading = computed(() => loadingStats.value && !stats.value);
const themeFilterLabels = computed(() =>
  globalSearchActive.value ? globalPeriodLabel.value : themePeriodLabel(themeFilter.value),
);

const CHART_COLORS = ['#0D9488', '#14B8A6', '#2DD4BF', '#5EEAD4', '#F59E0B', '#8B5CF6'];

const GENDER_COLORS: Record<string, string> = {
  Femme: '#DB2777',
  Homme: '#2563EB',
  'Non renseigné': '#94A3B8',
};

const usersTotal = computed(() => stats.value?.users.total_unique_users ?? 0);
const messagesTotal = computed(() => displayThemes.value?.total ?? 0);

const topThemeLeader = computed(() => {
  if (globalSearchActive.value) {
    const items = [...(displayThemes.value?.items ?? [])].filter((item) => item.count > 0);
    if (!items.length) return { theme: '—', count: 0, period_label: globalPeriodLabel.value };
    const best = items.sort((a, b) => b.count - a.count)[0];
    return { theme: best.label, count: best.count, period_label: globalPeriodLabel.value };
  }
  const item = topThemes.value?.items.find((entry) => entry.period === 'day');
  return item ?? { theme: '—', count: 0, period_label: "Aujourd'hui" };
});

const formatGrowthLabel = (label: string): string => {
  const date = new Date(`${label}T00:00:00`);
  if (growthGranularity.value === 'month') {
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  }
  if (growthGranularity.value === 'week') {
    return `Sem. ${date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;
  }
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

const growthChart = computed(() => {
  const items = growth.value?.items ?? [];
  return {
    categories: items.map((item) => formatGrowthLabel(item.label)),
    series: [
      { name: 'Cumul utilisateurs', data: items.map((item) => item.cumulative_users) },
      { name: 'Nouveaux', data: items.map((item) => item.new_users) },
    ],
  };
});

const growthOptions = computed(() => ({
  chart: { type: 'area', toolbar: { show: false }, fontFamily: 'inherit', zoom: { enabled: false } },
  colors: ['#0D9488', '#99F6E4'],
  stroke: { curve: 'smooth', width: [3, 2] },
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 90, 100] },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: growthChart.value.categories,
    labels: { rotate: -35, style: { fontSize: '11px' } },
  },
  yaxis: { labels: { formatter: (value: number) => Math.round(value).toString() } },
  legend: { position: 'top', horizontalAlign: 'right' },
  grid: { borderColor: '#E2E8F0', strokeDashArray: 4 },
  tooltip: { shared: true },
}));

const genderChart = computed(() => {
  const items = stats.value?.gender.items ?? [];
  return {
    series: items.map((item) => item.count),
    labels: items.map((item) => item.label),
  };
});

const genderTotal = computed(() => stats.value?.gender.total ?? 0);

const genderOptions = computed(() => ({
  chart: { type: 'donut', fontFamily: 'inherit' },
  labels: genderChart.value.labels,
  colors: genderChart.value.labels.map((label) => GENDER_COLORS[label] ?? '#8B5CF6'),
  stroke: { width: 4, colors: ['#fff'] },
  legend: {
    position: 'bottom',
    fontSize: '13px',
    markers: { width: 12, height: 12, radius: 4 },
    formatter: (label: string, opts: { w: { globals: { series: number[] } }; seriesIndex: number }) => {
      const count = opts.w.globals.series[opts.seriesIndex];
      const pct = genderTotal.value ? ((count / genderTotal.value) * 100).toFixed(1) : '0';
      return `${label} · ${count} (${pct}%)`;
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => `${val.toFixed(0)}%`,
    style: { fontSize: '12px', fontWeight: 700 },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          name: { offsetY: 24, fontSize: '13px' },
          value: { offsetY: -8, fontSize: '26px', fontWeight: 700 },
          total: {
            show: true,
            label: 'Utilisateurs',
            fontSize: '12px',
            color: '#64748B',
            formatter: () => genderTotal.value.toString(),
          },
        },
      },
    },
  },
  tooltip: {
    y: { formatter: (val: number) => `${val} utilisateur(s)` },
  },
}));

const topThemeChart = computed(() => {
  if (globalSearchActive.value) {
    const leader = topThemeLeader.value;
    return {
      categories: [leader.period_label || 'Période'],
      series: [{ name: 'Consultations', data: [leader.count] }],
      themes: [leader.theme],
    };
  }
  const items = topThemes.value?.items ?? [];
  return {
    categories: items.map((item) => item.period_label),
    series: [{ name: 'Consultations', data: items.map((item) => item.count) }],
    themes: items.map((item) => item.theme),
  };
});

const topThemeOptions = computed(() => ({
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '48%',
      distributed: true,
      dataLabels: { position: 'top' },
    },
  },
  colors: CHART_COLORS,
  dataLabels: {
    enabled: true,
    formatter: (_val: number, opts: { dataPointIndex: number }) =>
      topThemeChart.value.themes[opts.dataPointIndex] ?? '',
    offsetY: -22,
    style: { fontSize: '11px', fontWeight: 600, colors: ['#334155'] },
  },
  xaxis: {
    categories: topThemeChart.value.categories,
    labels: { style: { fontSize: '12px', fontWeight: 500 } },
  },
  legend: { show: false },
  grid: { borderColor: '#E2E8F0', strokeDashArray: 4 },
  tooltip: {
    y: {
      formatter: (val: number, opts: { dataPointIndex: number }) => {
        const theme = topThemeChart.value.themes[opts.dataPointIndex];
        return `${val} — ${theme}`;
      },
    },
  },
}));

const themeOverview = computed(() => {
  const items = [...(displayThemes.value?.items ?? [])].sort((a, b) => b.count - a.count);
  return {
    categories: items.map((item) => item.label),
    series: [{ name: 'Messages', data: items.map((item) => item.count) }],
  };
});

const themeOverviewOptions = computed(() => ({
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
  plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: '65%' } },
  colors: ['#0D9488'],
  dataLabels: { enabled: false },
  xaxis: { categories: themeOverview.value.categories },
  grid: { borderColor: '#E2E8F0' },
}));

const loadAll = async () => {
  await store.ensureDashboardData();
};

const onGrowthGranularityChange = async (value: GrowthGranularity) => {
  await store.changeGrowthGranularity(value);
};

const onThemeFilterChange = async (value: ThemePeriodFilter) => {
  await store.changeThemeFilter(value);
};

const applyGlobalSearch = async () => {
  await store.applyGlobalSearch();
};

const clearGlobalSearch = async () => {
  await store.clearGlobalSearch();
};

const exportCsv = async () => {
  await store.exportToCsv();
};

onMounted(loadAll);
</script>

<template>
  <div class="solola-dashboard">
    <header class="dashboard-hero mb-6">
      <div class="d-flex align-center justify-space-between flex-wrap ga-4">
        <div>
          <div class="d-flex align-center ga-3 mb-2">
            <v-chip size="small" color="teal" variant="flat" class="font-weight-bold">
              YouthSprint
            </v-chip>
            <span class="text-caption text-medium-emphasis">Plateforme Solola</span>
          </div>
          <h1 class="text-h4 font-weight-bold mb-1">Solola Admin</h1>
          <p class="text-body-2 text-medium-emphasis mb-0">
            Analyse des conversations et de l'engagement utilisateurs
          </p>
        </div>
        <v-btn color="teal-darken-1" variant="flat" prepend-icon="mdi-refresh" :loading="loadingStats" @click="store.refreshDashboard()">
          Actualiser
        </v-btn>
      </div>
    </header>

    <v-card class="search-bar mb-4 pa-4" elevation="0">
      <div class="d-flex align-center ga-2 mb-3">
        <v-icon icon="mdi-magnify" color="teal-darken-1" />
        <h3 class="text-subtitle-1 font-weight-bold mb-0">Recherche globale par période</h3>
        <v-chip v-if="globalSearchActive" size="small" color="teal" variant="tonal">
          {{ globalPeriodLabel }}
        </v-chip>
      </div>
      <v-row align="center" dense>
        <v-col cols="12" sm="4" md="3">
          <v-text-field
            v-model="globalDateFrom"
            label="Date de début"
            type="date"
            variant="outlined"
            density="compact"
            hide-details
            :disabled="loadingGlobalSearch"
          />
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <v-text-field
            v-model="globalDateTo"
            label="Date de fin"
            type="date"
            variant="outlined"
            density="compact"
            hide-details
            :disabled="loadingGlobalSearch"
          />
        </v-col>
        <v-col cols="12" sm="4" md="6" class="d-flex flex-wrap ga-2">
          <v-btn
            color="teal-darken-1"
            variant="flat"
            prepend-icon="mdi-magnify"
            :loading="loadingGlobalSearch"
            @click="applyGlobalSearch"
          >
            Rechercher
          </v-btn>
          <v-btn
            v-if="globalSearchActive || globalDateFrom || globalDateTo"
            variant="outlined"
            color="teal"
            prepend-icon="mdi-filter-off"
            :disabled="loadingGlobalSearch"
            @click="clearGlobalSearch"
          >
            Réinitialiser
          </v-btn>
          <v-btn
            variant="tonal"
            color="teal"
            prepend-icon="mdi-download"
            :loading="loadingGlobalSearch"
            @click="exportCsv"
          >
            Exporter CSV
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-alert v-if="error" type="error" variant="tonal" class="mb-4" closable @click:close="error = ''">
      {{ error }}
    </v-alert>

    <v-row class="mb-2">
      <v-col cols="12" sm="4">
        <v-card class="kpi-card" elevation="0">
          <div class="kpi-icon kpi-icon--users">
            <v-icon icon="mdi-account-group-outline" size="22" />
          </div>
          <p class="text-caption text-medium-emphasis mb-1">Utilisateurs uniques</p>
          <h2 class="text-h3 font-weight-bold">{{ usersTotal }}</h2>
          <p v-if="globalSearchActive" class="text-caption text-teal-darken-1 mb-0">{{ globalPeriodLabel }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="kpi-card" elevation="0">
          <div class="kpi-icon kpi-icon--messages">
            <v-icon icon="mdi-message-text-outline" size="22" />
          </div>
          <p class="text-caption text-medium-emphasis mb-1">Messages analysés</p>
          <h2 class="text-h3 font-weight-bold">{{ messagesTotal }}</h2>
          <p v-if="globalSearchActive || themeFilter !== 'all'" class="text-caption text-teal-darken-1 mb-0">
            {{ themeFilterLabels }}
          </p>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="kpi-card" elevation="0">
          <div class="kpi-icon kpi-icon--theme">
            <v-icon icon="mdi-star-outline" size="22" />
          </div>
          <p class="text-caption text-medium-emphasis mb-1">
            {{ globalSearchActive ? 'Thème le plus consulté' : 'Thème le plus consulté aujourd\'hui' }}
          </p>
          <h2 class="text-h5 font-weight-bold text-truncate">{{ topThemeLeader.theme }}</h2>
          <p class="text-caption text-teal-darken-1 mb-0">{{ topThemeLeader.count }} consultations</p>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="8">
        <v-card class="chart-card pa-5" elevation="0">
          <div class="d-flex align-center justify-space-between flex-wrap ga-3 mb-4">
            <div>
              <h3 class="text-h6 font-weight-bold mb-1">Croissance des utilisateurs</h3>
              <p class="text-caption text-medium-emphasis mb-0">Évolution cumulative et nouveaux utilisateurs</p>
            </div>
            <v-btn-toggle
              :model-value="growthGranularity"
              mandatory
              density="compact"
              color="teal"
              variant="outlined"
              divided
              @update:model-value="onGrowthGranularityChange($event as GrowthGranularity)"
            >
              <v-btn value="day" size="small">Jour</v-btn>
              <v-btn value="week" size="small">Semaine</v-btn>
              <v-btn value="month" size="small">Mois</v-btn>
            </v-btn-toggle>
          </div>
          <div v-if="loading || loadingGrowth || loadingGlobalSearch" class="chart-loader">
            <v-progress-circular indeterminate color="teal" />
          </div>
          <apexchart
            v-else
            type="area"
            height="340"
            :options="growthOptions"
            :series="growthChart.series"
          />
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card class="chart-card pa-5" elevation="0">
          <h3 class="text-h6 font-weight-bold mb-1">Répartition par genre</h3>
          <p class="text-caption text-medium-emphasis mb-2">Un utilisateur = un numéro unique</p>
          <div v-if="loading || loadingGlobalSearch" class="chart-loader">
            <v-progress-circular indeterminate color="teal" />
          </div>
          <apexchart
            v-else
            type="donut"
            height="300"
            :options="genderOptions"
            :series="genderChart.series"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="5">
        <v-card class="chart-card pa-5" elevation="0">
          <h3 class="text-h6 font-weight-bold mb-1">Thème leader par période</h3>
          <p class="text-caption text-medium-emphasis mb-4">
            {{ globalSearchActive ? globalPeriodLabel : 'Jour · Semaine · Mois' }}
          </p>
          <div v-if="loading || loadingGlobalSearch" class="chart-loader">
            <v-progress-circular indeterminate color="teal" />
          </div>
          <apexchart
            v-else
            type="bar"
            height="320"
            :options="topThemeOptions"
            :series="topThemeChart.series"
          />
        </v-card>
      </v-col>

      <v-col cols="12" md="7">
        <v-card class="chart-card pa-5" elevation="0">
          <div class="d-flex align-center justify-space-between flex-wrap ga-3 mb-4">
            <div>
              <h3 class="text-h6 font-weight-bold mb-1">Vue globale des thèmes</h3>
              <p class="text-caption text-medium-emphasis mb-0">
                {{ themeFilter === 'all' ? 'Toutes les consultations enregistrées' : themeFilterLabels }}
              </p>
            </div>
            <v-btn-toggle
              :model-value="themeFilter"
              mandatory
              density="compact"
              color="teal"
              variant="outlined"
              divided
              :disabled="globalSearchActive"
              @update:model-value="onThemeFilterChange($event as ThemePeriodFilter)"
            >
              <v-btn value="all" size="small">Tout</v-btn>
              <v-btn value="day" size="small">Jour</v-btn>
              <v-btn value="month" size="small">Mois</v-btn>
              <v-btn value="year" size="small">Année</v-btn>
            </v-btn-toggle>
          </div>
          <div v-if="loading || loadingThemes || loadingGlobalSearch" class="chart-loader">
            <v-progress-circular indeterminate color="teal" />
          </div>
          <apexchart
            v-else
            type="bar"
            height="320"
            :options="themeOverviewOptions"
            :series="themeOverview.series"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.solola-dashboard {
  --solola-teal: #0d9488;
  --solola-surface: #f8fafc;
  --solola-border: #e2e8f0;
}

.dashboard-hero {
  padding: 1.5rem 1.75rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #f0fdfa 0%, #ecfeff 45%, #f8fafc 100%);
  border: 1px solid var(--solola-border);
}

.search-bar {
  border-radius: 14px;
  border: 1px solid var(--solola-border);
  background: #fff;
}

.kpi-card {
  padding: 1.25rem 1.5rem;
  border-radius: 14px;
  border: 1px solid var(--solola-border);
  background: #fff;
  height: 100%;
}

.kpi-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.kpi-icon--users {
  background: #ccfbf1;
  color: var(--solola-teal);
}

.kpi-icon--messages {
  background: #dbeafe;
  color: #2563eb;
}

.kpi-icon--theme {
  background: #fef3c7;
  color: #d97706;
}

.chart-card {
  border-radius: 14px;
  border: 1px solid var(--solola-border);
  background: #fff;
  height: 100%;
}

.chart-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
}
</style>
