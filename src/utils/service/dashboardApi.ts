import axios, { type AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_DASHBOARD_API_URL ?? 'http://127.0.0.1:8000/api/v1';

export interface DashboardStatItem {
  label: string;
  count: number;
}

export interface StatsPeriod {
  date_from: string | null;
  date_to: string | null;
}

export interface DashboardStats {
  users: { total_unique_users: number; period?: StatsPeriod | null };
  gender: { total: number; items: DashboardStatItem[]; period?: StatsPeriod | null };
  themes: { total: number; items: DashboardStatItem[]; period?: StatsPeriod | null };
}

export interface ThemeStats {
  total: number;
  items: DashboardStatItem[];
  period?: StatsPeriod | null;
}

export interface GrowthPoint {
  label: string;
  new_users: number;
  cumulative_users: number;
}

export interface UserGrowthStats {
  granularity: string;
  items: GrowthPoint[];
}

export interface TopThemePeriod {
  period: string;
  period_label: string;
  theme: string;
  count: number;
}

export interface TopThemesByPeriod {
  items: TopThemePeriod[];
}

export interface PlatformUser {
  phone_number: string;
  gender: string;
  first_seen: string | null;
  last_seen: string | null;
  messages_count: number;
}

export interface PlatformUsersList {
  total: number;
  items: PlatformUser[];
}

export interface DashboardUser {
  id: number;
  username: string;
  email: string | null;
  is_active: boolean;
  role: { id: number; name: string };
}

export interface DashboardAuthResponse {
  access_token: string;
  token_type: string;
  user: DashboardUser;
}

export type GrowthGranularity = 'day' | 'week' | 'month';

export type ThemePeriodFilter = 'all' | 'day' | 'month' | 'year';

export interface StatsPeriodParams {
  date_from?: string;
  date_to?: string;
}

const toDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getThemePeriodParams = (filter: ThemePeriodFilter): StatsPeriodParams | undefined => {
  if (filter === 'all') return undefined;

  const now = new Date();
  const today = toDateString(now);

  if (filter === 'day') {
    return { date_from: today, date_to: today };
  }

  if (filter === 'month') {
    return { date_from: toDateString(new Date(now.getFullYear(), now.getMonth(), 1)), date_to: today };
  }

  return { date_from: toDateString(new Date(now.getFullYear(), 0, 1)), date_to: today };
};

export const themePeriodLabel = (filter: ThemePeriodFilter): string => {
  const labels: Record<ThemePeriodFilter, string> = {
    all: 'Toutes les périodes',
    day: "Aujourd'hui",
    month: 'Ce mois',
    year: 'Cette année',
  };
  return labels[filter];
};

export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('243') && digits.length >= 12) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }
  return phone.startsWith('+') ? phone : `+${digits}`;
};

export const genderColor = (gender: string): string => {
  if (gender === 'Femme') return 'pink';
  if (gender === 'Homme') return 'blue';
  return 'grey';
};

const TOKEN_KEY = 'dashboard_auth_token';
const USER_KEY = 'dashboard_auth_user';

export const getDashboardToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const getDashboardUser = (): DashboardUser | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DashboardUser;
  } catch {
    return null;
  }
};

export const setDashboardToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const setDashboardUser = (user: DashboardUser): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearDashboardToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const createDashboardApi = (token?: string | null): AxiosInstance => {
  const authToken = token ?? getDashboardToken();
  return axios.create({
    baseURL,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  });
};

export const dashboardApi = {
  login(username: string, password: string) {
    return createDashboardApi().post<DashboardAuthResponse>('/dashboard/auth/login', {
      username,
      password,
    });
  },
  getStats(period?: StatsPeriodParams) {
    return createDashboardApi().get<DashboardStats>('/dashboard/stats', { params: period });
  },
  getUserGrowth(granularity: GrowthGranularity = 'day', period?: StatsPeriodParams) {
    return createDashboardApi().get<UserGrowthStats>('/dashboard/stats/users/growth', {
      params: { granularity, ...period },
    });
  },
  getTopThemesByPeriod() {
    return createDashboardApi().get<TopThemesByPeriod>('/dashboard/stats/themes/top-by-period');
  },
  getThemeStats(period?: StatsPeriodParams) {
    return createDashboardApi().get<ThemeStats>('/dashboard/stats/themes', { params: period });
  },
  getPlatformUsers(period?: StatsPeriodParams) {
    return createDashboardApi().get<PlatformUsersList>('/dashboard/stats/users/list', { params: period });
  },
};
