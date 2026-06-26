import { defineStore } from 'pinia';

interface AuthUser {
  token: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUser | null,
  }),
  actions: {
    logout() {
      this.user = null;
    },
  },
});
