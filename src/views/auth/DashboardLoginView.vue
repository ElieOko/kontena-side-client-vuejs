<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useDashboardStore } from '@/stores/dashboard/dashboard';

const router = useRouter();
const store = useDashboardStore();
const username = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const error = ref('');

const highlights = [
  { icon: 'solar:chart-2-bold-duotone', text: 'Statistiques en temps réel' },
  { icon: 'solar:users-group-rounded-bold-duotone', text: 'Suivi des utilisateurs' },
  { icon: 'solar:chat-round-dots-bold-duotone', text: 'Analyse des thèmes consultés' },
];

const submit = async () => {
  if (!username.value.trim() || !password.value) return;

  loading.value = true;
  error.value = '';

  try {
    await store.login(username.value.trim(), password.value);
    router.push('/dashboard/chat');
  } catch {
    error.value = 'Identifiants invalides ou serveur indisponible.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="solola-auth">
    <div class="solola-auth__glow solola-auth__glow--1" />
    <div class="solola-auth__glow solola-auth__glow--2" />

    <v-container fluid class="solola-auth__container">
      <v-row class="solola-auth__row" no-gutters>
        <!-- Panneau branding -->
        <v-col cols="12" lg="6" class="solola-auth__brand d-none d-lg-flex">
          <div class="solola-auth__brand-inner">
            <div class="solola-auth__brand-top">
              <div class="solola-auth__badge">
                <Icon icon="solar:bolt-bold" width="14" />
                Ipas
              </div>
              <h1 class="solola-auth__title">Solola na nga Admin</h1>
              <p class="solola-auth__subtitle">
                Pilotez l'engagement de votre plateforme conversationnelle avec clarté et précision.
              </p>

              <ul class="solola-auth__features">
                <li v-for="item in highlights" :key="item.text">
                  <span class="solola-auth__feature-icon">
                    <Icon :icon="item.icon" width="22" />
                  </span>
                  {{ item.text }}
                </li>
              </ul>
            </div>

            <img
              src="@/assets/images/backgrounds/login-bg.svg"
              alt=""
              class="solola-auth__illustration"
              aria-hidden="true"
            />
          </div>
        </v-col>

        <!-- Formulaire -->
        <v-col cols="12" lg="6" class="solola-auth__form-col">
          <div class="solola-auth__form-wrap">
            <div class="solola-auth__mobile-brand d-lg-none">
              <div class="solola-auth__badge solola-auth__badge--light">
                <Icon icon="solar:bolt-bold" width="14" />
                Ipas
              </div>
              <h2 class="solola-auth__mobile-title">Solola na nga Admin</h2>
            </div>

            <v-card class="solola-auth__card" elevation="0">
              <div class="solola-auth__card-header">
                <div class="solola-auth__avatar">
                  <Icon icon="solar:shield-user-bold-duotone" width="28" />
                </div>
                <h3 class="solola-auth__card-title">Connexion administrateur</h3>
                <p class="solola-auth__card-desc">Entrez vos identifiants pour accéder au tableau de bord</p>
              </div>

              <v-alert
                v-if="error"
                type="error"
                variant="tonal"
                density="compact"
                class="mb-5"
                closable
                @click:close="error = ''"
              >
                {{ error }}
              </v-alert>

              <v-form @submit.prevent="submit">
                <v-text-field
                  v-model="username"
                  label="Nom d'utilisateur"
                  placeholder="admin"
                  variant="outlined"
                  density="comfortable"
                  class="solola-auth__field"
                  hide-details="auto"
                  autocomplete="username"
                  :disabled="loading"
                >
                  <template #prepend-inner>
                    <Icon icon="solar:user-bold-duotone" class="solola-auth__input-icon" width="20" />
                  </template>
                </v-text-field>

                <v-text-field
                  v-model="password"
                  label="Mot de passe"
                  placeholder="••••••••"
                  :type="showPassword ? 'text' : 'password'"
                  variant="outlined"
                  density="comfortable"
                  class="solola-auth__field solola-auth__field--password"
                  hide-details="auto"
                  autocomplete="current-password"
                  :disabled="loading"
                  @keyup.enter="submit"
                >
                  <template #prepend-inner>
                    <Icon icon="solar:lock-password-bold-duotone" class="solola-auth__input-icon" width="20" />
                  </template>
                  <template #append-inner>
                    <v-btn
                      icon
                      variant="text"
                      size="small"
                      :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
                      @click="showPassword = !showPassword"
                    >
                      <Icon
                        :icon="showPassword ? 'solar:eye-closed-bold' : 'solar:eye-bold'"
                        width="20"
                        class="solola-auth__input-icon"
                      />
                    </v-btn>
                  </template>
                </v-text-field>

                <v-btn
                  type="submit"
                  size="x-large"
                  block
                  class="solola-auth__submit mt-2"
                  :loading="loading"
                  :disabled="!username.trim() || !password"
                >
                  <Icon icon="solar:login-3-bold" width="20" class="mr-2" />
                  Accéder au dashboard
                </v-btn>
              </v-form>
            </v-card>

            <p class="solola-auth__footer">
              © {{ new Date().getFullYear() }} Ipas · Solola na nga Admin
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.solola-auth {
  --brand-dark: #0f766e;
  --brand-mid: #0d9488;
  --brand-light: #5eead4;
  --ink: #0f172a;
  --muted: #64748b;
  --card-border: rgba(148, 163, 184, 0.25);

  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #f8fafc;
}

.solola-auth__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.solola-auth__glow--1 {
  width: 420px;
  height: 420px;
  top: -120px;
  right: -80px;
  background: rgba(45, 212, 191, 0.35);
}

.solola-auth__glow--2 {
  width: 360px;
  height: 360px;
  bottom: -100px;
  left: 10%;
  background: rgba(14, 165, 233, 0.18);
}

.solola-auth__container {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 0 !important;
}

.solola-auth__row {
  min-height: 100vh;
}

/* ── Brand panel ── */
.solola-auth__brand {
  background: linear-gradient(145deg, #042f2e 0%, #0f766e 42%, #14b8a6 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
}

.solola-auth__brand::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(94, 234, 212, 0.15) 0%, transparent 40%);
}

.solola-auth__brand-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 3.5rem 3rem 2rem 4rem;
}

.solola-auth__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  width: fit-content;
  margin-bottom: 1.5rem;
}

.solola-auth__badge--light {
  background: rgba(13, 148, 136, 0.1);
  border-color: rgba(13, 148, 136, 0.2);
  color: var(--brand-dark);
}

.solola-auth__title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.solola-auth__subtitle {
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.82);
  max-width: 400px;
  margin-bottom: 2.5rem;
}

.solola-auth__features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.solola-auth__features li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.92);
}

.solola-auth__feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
}

.solola-auth__illustration {
  width: min(380px, 90%);
  align-self: center;
  opacity: 0.95;
  filter: drop-shadow(0 24px 48px rgba(0, 0, 0, 0.2));
}

/* ── Form panel ── */
.solola-auth__form-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
}

.solola-auth__form-wrap {
  width: 100%;
  max-width: 420px;
}

.solola-auth__mobile-brand {
  text-align: center;
  margin-bottom: 2rem;
}

.solola-auth__mobile-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--ink);
  margin-top: 0.75rem;
  letter-spacing: -0.02em;
}

.solola-auth__card {
  padding: 2.25rem 2rem;
  border-radius: 20px;
  border: 1px solid var(--card-border);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  box-shadow:
    0 4px 6px -1px rgba(15, 23, 42, 0.04),
    0 20px 48px -12px rgba(15, 23, 42, 0.08);
}

.solola-auth__card-header {
  text-align: center;
  margin-bottom: 1.75rem;
}

.solola-auth__avatar {
  width: 56px;
  height: 56px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: linear-gradient(135deg, #ccfbf1, #99f6e4);
  color: var(--brand-dark);
}

.solola-auth__card-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 0.35rem;
}

.solola-auth__card-desc {
  font-size: 0.9rem;
  color: var(--muted);
  margin: 0;
}

.solola-auth__field {
  margin-bottom: 1rem;
}

.solola-auth__field--password {
  margin-bottom: 0.25rem;
}

.solola-auth__input-icon {
  color: var(--muted);
  opacity: 0.85;
}

.solola-auth__submit {
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%) !important;
  color: #fff !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  border-radius: 12px !important;
  text-transform: none;
  box-shadow: 0 8px 24px -4px rgba(13, 148, 136, 0.45);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.solola-auth__submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px -4px rgba(13, 148, 136, 0.5);
}

.solola-auth__submit:disabled {
  opacity: 0.55;
  box-shadow: none;
}

.solola-auth__footer {
  text-align: center;
  font-size: 0.8rem;
  color: var(--muted);
  margin-top: 1.75rem;
  margin-bottom: 0;
}

@media (max-width: 1280px) {
  .solola-auth__form-col {
    padding: 2.5rem 1.25rem;
  }
}
</style>
