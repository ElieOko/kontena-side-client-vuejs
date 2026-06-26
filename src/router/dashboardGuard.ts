import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useDashboardStore } from '@/stores/dashboard/dashboard';

export const requireDashboardAuth = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const store = useDashboardStore();
  store.syncAuthFromStorage();

  if (store.isAuthenticated) {
    next();
    return;
  }
  next('/auth/dashboard-login');
};

export const requireSuperAdmin = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const store = useDashboardStore();
  store.syncAuthFromStorage();

  if (!store.isAuthenticated) {
    next('/auth/dashboard-login');
    return;
  }

  if (store.isSuperAdmin) {
    next();
    return;
  }

  next('/dashboard/chat');
};
