import axios from 'axios';
import { defineStore } from 'pinia';
import { buildDashboardCsv, downloadCsv } from '@/utils/dashboardExport';
import {
  clearDashboardToken,
  dashboardApi,
  getDashboardToken,
  getDashboardUser,
  getThemePeriodParams,
  setDashboardToken,
  setDashboardUser,
  type AdminUserCreatePayload,
  type AdminUserUpdatePayload,
  type DashboardStats,
  type DashboardUser,
  type GrowthGranularity,
  type PlatformUser,
  type StatsPeriodParams,
  type ThemePeriodFilter,
  type ThemeStats,
  type TopThemesByPeriod,
  type UserGrowthStats,
} from '@/utils/service/dashboardApi';

const buildPeriodParams = (dateFrom: string, dateTo: string): StatsPeriodParams | undefined => {
  if (!dateFrom && !dateTo) return undefined;
  return {
    ...(dateFrom ? { date_from: dateFrom } : {}),
    ...(dateTo ? { date_to: dateTo } : {}),
  };
};

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    token: getDashboardToken(),
    user: getDashboardUser() as DashboardUser | null,
    stats: null as DashboardStats | null,
    topThemes: null as TopThemesByPeriod | null,
    growthByGranularity: {} as Partial<Record<GrowthGranularity, UserGrowthStats>>,
    growthGranularity: 'day' as GrowthGranularity,
    themeFilter: 'all' as ThemePeriodFilter,
    themesByFilter: {} as Partial<Record<ThemePeriodFilter, ThemeStats>>,
    platformUsers: [] as PlatformUser[],
    adminUsers: [] as DashboardUser[],
    periodUsers: [] as PlatformUser[],
    globalDateFrom: '',
    globalDateTo: '',
    globalSearchActive: false,
    loadingStats: false,
    loadingUsers: false,
    loadingAdminUsers: false,
    savingAdminUser: false,
    loadingGrowth: false,
    loadingThemes: false,
    loadingGlobalSearch: false,
    error: '',
    statsLoaded: false,
    usersLoaded: false,
    adminUsersLoaded: false,
    growthLoaded: {} as Partial<Record<GrowthGranularity, boolean>>,
    themesLoaded: {} as Partial<Record<ThemePeriodFilter, boolean>>,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isSuperAdmin: (state) => state.user?.role.name === 'superadmin',
    growth: (state) => state.growthByGranularity[state.growthGranularity] ?? null,
    globalPeriodParams: (state): StatsPeriodParams | undefined =>
      state.globalSearchActive ? buildPeriodParams(state.globalDateFrom, state.globalDateTo) : undefined,
    globalPeriodLabel: (state): string => {
      if (!state.globalSearchActive) return '';
      if (state.globalDateFrom && state.globalDateTo) {
        return `Du ${state.globalDateFrom} au ${state.globalDateTo}`;
      }
      if (state.globalDateFrom) return `À partir du ${state.globalDateFrom}`;
      if (state.globalDateTo) return `Jusqu'au ${state.globalDateTo}`;
      return 'Période personnalisée';
    },
    displayThemes: (state): ThemeStats | null => {
      if (state.globalSearchActive) {
        return state.stats?.themes ?? null;
      }
      if (state.themeFilter === 'all') {
        return state.stats?.themes ?? null;
      }
      return state.themesByFilter[state.themeFilter] ?? null;
    },
    exportUsers: (state): PlatformUser[] =>
      state.globalSearchActive ? state.periodUsers : state.platformUsers,
    isLoading: (state) =>
      state.loadingStats ||
      state.loadingUsers ||
      state.loadingAdminUsers ||
      state.loadingGrowth ||
      state.loadingThemes ||
      state.savingAdminUser ||
      state.loadingGlobalSearch,
  },

  actions: {
    syncAuthFromStorage() {
      this.token = getDashboardToken();
      this.user = getDashboardUser();
    },

    resetCache() {
      this.stats = null;
      this.topThemes = null;
      this.growthByGranularity = {};
      this.themesByFilter = {};
      this.themeFilter = 'all';
      this.platformUsers = [];
      this.adminUsers = [];
      this.periodUsers = [];
      this.globalDateFrom = '';
      this.globalDateTo = '';
      this.globalSearchActive = false;
      this.statsLoaded = false;
      this.usersLoaded = false;
      this.adminUsersLoaded = false;
      this.growthLoaded = {};
      this.themesLoaded = {};
      this.error = '';
    },

    handleError(err: unknown, fallback: string) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          this.error = 'Backend inaccessible. Lancez uvicorn sur le port 8000.';
        } else if (err.response.status === 401) {
          this.error = 'Session expirée. Reconnectez-vous.';
          this.logout();
        } else if (err.response.status === 422) {
          this.error = 'Période invalide : la date de début doit être antérieure ou égale à la date de fin.';
        } else {
          this.error = fallback;
        }
      } else {
        this.error = fallback;
      }
    },

    currentPeriodParams(): StatsPeriodParams | undefined {
      return this.globalSearchActive ? this.globalPeriodParams : undefined;
    },

    async login(username: string, password: string) {
      const response = await dashboardApi.login(username, password);
      setDashboardToken(response.data.access_token);
      setDashboardUser(response.data.user);
      this.token = response.data.access_token;
      this.user = response.data.user;
      this.resetCache();
      await Promise.all([this.fetchDashboardData(true), this.fetchUsers(true)]);
    },

    logout() {
      clearDashboardToken();
      this.token = null;
      this.user = null;
      this.resetCache();
    },

    async fetchStats(force = false) {
      if (!this.token) return;
      if (!force && this.statsLoaded && this.stats && !this.globalSearchActive) return;

      this.loadingStats = true;
      this.error = '';

      try {
        const period = this.currentPeriodParams();
        const statsResponse = await dashboardApi.getStats(period);
        this.stats = statsResponse.data;
        if (!this.globalSearchActive) {
          const topThemesResponse = await dashboardApi.getTopThemesByPeriod();
          this.topThemes = topThemesResponse.data;
        }
        if (!this.globalSearchActive) {
          this.statsLoaded = true;
        }
      } catch (err) {
        this.handleError(err, 'Impossible de charger les statistiques.');
        throw err;
      } finally {
        this.loadingStats = false;
      }
    },

    async fetchThemes(filter?: ThemePeriodFilter, force = false) {
      if (!this.token || this.globalSearchActive) return;

      const selected = filter ?? this.themeFilter;

      if (selected === 'all') {
        this.themeFilter = 'all';
        if (!this.statsLoaded || force) {
          await this.fetchStats(force);
        }
        return;
      }

      if (this.themesLoaded[selected] && !force && this.themesByFilter[selected]) {
        this.themeFilter = selected;
        return;
      }

      this.loadingThemes = true;
      this.error = '';

      try {
        const response = await dashboardApi.getThemeStats(getThemePeriodParams(selected));
        this.themesByFilter[selected] = response.data;
        this.themesLoaded[selected] = true;
        this.themeFilter = selected;
      } catch (err) {
        this.handleError(err, 'Impossible de charger les thèmes pour cette période.');
        throw err;
      } finally {
        this.loadingThemes = false;
      }
    },

    async changeThemeFilter(filter: ThemePeriodFilter) {
      if (this.globalSearchActive) return;
      await this.fetchThemes(filter);
    },

    async fetchUsers(force = false) {
      if (!this.token) return;
      if (!force && this.usersLoaded && !this.globalSearchActive) return;

      this.loadingUsers = true;
      this.error = '';

      try {
        const response = await dashboardApi.getPlatformUsers(this.currentPeriodParams());
        if (this.globalSearchActive) {
          this.periodUsers = response.data.items;
        } else {
          this.platformUsers = response.data.items;
          this.usersLoaded = true;
        }
      } catch (err) {
        this.handleError(err, 'Impossible de charger la liste des utilisateurs.');
        throw err;
      } finally {
        this.loadingUsers = false;
      }
    },

    async fetchGrowth(granularity?: GrowthGranularity, force = false) {
      if (!this.token) return;

      const selected = granularity ?? this.growthGranularity;

      if (
        !force &&
        !this.globalSearchActive &&
        this.growthLoaded[selected] &&
        this.growthByGranularity[selected]
      ) {
        if (granularity) this.growthGranularity = granularity;
        return;
      }

      this.loadingGrowth = true;
      this.error = '';

      try {
        const response = await dashboardApi.getUserGrowth(selected, this.currentPeriodParams());
        this.growthByGranularity[selected] = response.data;
        if (!this.globalSearchActive) {
          this.growthLoaded[selected] = true;
        }
        this.growthGranularity = selected;
      } catch (err) {
        this.handleError(err, 'Impossible de charger la croissance des utilisateurs.');
        throw err;
      } finally {
        this.loadingGrowth = false;
      }
    },

    async applyGlobalSearch() {
      if (!this.token) {
        this.error = 'Session expirée. Reconnectez-vous.';
        return;
      }

      if (!this.globalDateFrom && !this.globalDateTo) {
        this.error = 'Sélectionnez au moins une date de début ou de fin.';
        return;
      }

      if (this.globalDateFrom && this.globalDateTo && this.globalDateFrom > this.globalDateTo) {
        this.error = 'La date de début doit être antérieure ou égale à la date de fin.';
        return;
      }

      this.loadingGlobalSearch = true;
      this.error = '';
      this.globalSearchActive = true;
      this.themeFilter = 'all';
      this.growthLoaded = {};

      const period = buildPeriodParams(this.globalDateFrom, this.globalDateTo);

      try {
        const [statsRes, growthRes, usersRes] = await Promise.all([
          dashboardApi.getStats(period),
          dashboardApi.getUserGrowth(this.growthGranularity, period),
          dashboardApi.getPlatformUsers(period),
        ]);
        this.stats = statsRes.data;
        this.growthByGranularity[this.growthGranularity] = growthRes.data;
        this.periodUsers = usersRes.data.items;
      } catch (err) {
        this.globalSearchActive = false;
        this.handleError(err, 'Impossible de filtrer les données pour cette période.');
        throw err;
      } finally {
        this.loadingGlobalSearch = false;
      }
    },

    async clearGlobalSearch() {
      this.globalDateFrom = '';
      this.globalDateTo = '';
      this.globalSearchActive = false;
      this.periodUsers = [];
      this.growthLoaded = {};
      this.themesLoaded = {};
      this.themesByFilter = {};
      await this.refreshDashboard();
    },

    async exportToCsv() {
      if (!this.globalSearchActive && !this.usersLoaded) {
        await this.fetchUsers(true);
      }

      const periodLabel = this.globalSearchActive
        ? this.globalPeriodLabel
        : 'Toutes les périodes';

      const csv = buildDashboardCsv({
        periodLabel,
        dateFrom: this.globalDateFrom,
        dateTo: this.globalDateTo,
        stats: this.stats,
        growth: this.growth,
        topThemes: this.globalSearchActive ? null : this.topThemes,
        users: this.exportUsers,
      });

      const suffix = this.globalSearchActive
        ? `${this.globalDateFrom || 'debut'}_${this.globalDateTo || 'fin'}`
        : 'complet';
      downloadCsv(csv, `solola-admin-${suffix}.csv`);
    },

    async ensureDashboardData() {
      if (!this.token) {
        this.error = 'Session expirée. Reconnectez-vous.';
        return;
      }
      if (this.globalSearchActive) return;
      await Promise.all([
        this.fetchStats(),
        this.fetchGrowth(this.growthGranularity),
        this.fetchThemes(this.themeFilter),
      ]);
    },

    async ensureUsersData() {
      if (!this.token) {
        this.error = 'Session expirée. Reconnectez-vous.';
        return;
      }
      await this.fetchUsers();
    },

    async refreshDashboard() {
      if (this.globalSearchActive) {
        await this.applyGlobalSearch();
        return;
      }

      this.themesLoaded = {};
      this.themesByFilter = {};
      this.growthLoaded = {};
      await Promise.all([
        this.fetchStats(true),
        this.fetchGrowth(this.growthGranularity, true),
        this.fetchThemes(this.themeFilter, true),
      ]);
    },

    async refreshUsers() {
      await this.fetchUsers(true);
    },

    async changeGrowthGranularity(granularity: GrowthGranularity) {
      await this.fetchGrowth(granularity);
    },

    async fetchDashboardData(force = false) {
      if (this.globalSearchActive) {
        await this.applyGlobalSearch();
        return;
      }
      await Promise.all([
        this.fetchStats(force),
        this.fetchGrowth(this.growthGranularity, force),
        this.fetchThemes(this.themeFilter, force),
      ]);
    },

    async fetchAdminUsers(force = false) {
      if (!this.token || !this.isSuperAdmin) return;
      if (!force && this.adminUsersLoaded) return;

      this.loadingAdminUsers = true;
      this.error = '';

      try {
        const response = await dashboardApi.getAdminUsers();
        this.adminUsers = response.data.items;
        this.adminUsersLoaded = true;
      } catch (err) {
        this.handleError(err, 'Impossible de charger les comptes administrateurs.');
        throw err;
      } finally {
        this.loadingAdminUsers = false;
      }
    },

    async createAdminUser(payload: AdminUserCreatePayload) {
      if (!this.isSuperAdmin) return;

      this.savingAdminUser = true;
      this.error = '';

      try {
        const response = await dashboardApi.createAdminUser(payload);
        this.adminUsers = [response.data, ...this.adminUsers];
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 409) {
          this.error = String(err.response.data?.detail ?? 'Ce compte existe déjà.');
        } else {
          this.handleError(err, 'Impossible de créer le compte.');
        }
        throw err;
      } finally {
        this.savingAdminUser = false;
      }
    },

    async updateAdminUser(userId: number, payload: AdminUserUpdatePayload) {
      if (!this.isSuperAdmin) return;

      this.savingAdminUser = true;
      this.error = '';

      try {
        const response = await dashboardApi.updateAdminUser(userId, payload);
        const index = this.adminUsers.findIndex((user) => user.id === userId);
        if (index !== -1) {
          this.adminUsers[index] = response.data;
        }
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.data?.detail) {
          this.error = String(err.response.data.detail);
        } else {
          this.handleError(err, 'Impossible de mettre à jour le compte.');
        }
        throw err;
      } finally {
        this.savingAdminUser = false;
      }
    },

    async toggleAdminUserActive(user: DashboardUser) {
      await this.updateAdminUser(user.id, { is_active: !user.is_active });
    },
  },
});
