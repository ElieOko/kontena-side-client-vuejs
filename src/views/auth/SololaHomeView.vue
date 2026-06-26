<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { useDashboardStore } from '@/stores/dashboard/dashboard';

const router = useRouter();
const store = useDashboardStore();

const features = [
  {
    icon: 'solar:chart-2-bold-duotone',
    title: 'Statistiques en temps réel',
    desc: 'Suivez l\'activité des conversations, les thèmes consultés et la croissance des utilisateurs.',
  },
  {
    icon: 'solar:users-group-rounded-bold-duotone',
    title: 'Gestion des utilisateurs',
    desc: 'Consultez les numéros uniques, le genre déclaré et l\'historique d\'activité de chaque utilisateur.',
  },
  {
    icon: 'solar:shield-check-bold-duotone',
    title: 'Accès sécurisé',
    desc: 'Espace réservé aux administrateurs YouthSprint avec authentification dédiée.',
  },
];

const goToLogin = () => router.push('/auth/dashboard-login');

const goToDashboard = () => {
  store.syncAuthFromStorage();
  if (store.isAuthenticated) {
    router.push('/dashboard/chat');
  } else {
    goToLogin();
  }
};
</script>

<template>
  <div class="solola-home">
    <div class="solola-home__glow solola-home__glow--1" />
    <div class="solola-home__glow solola-home__glow--2" />

    <header class="solola-home__header">
      <div class="solola-home__brand">
        <div class="solola-home__badge">
          <Icon icon="solar:bolt-bold" width="14" />
          YouthSprint
        </div>
        <span class="solola-home__brand-name">Solola Admin</span>
      </div>
      <v-btn variant="outlined" color="white" class="solola-home__header-btn" @click="goToLogin">
        Connexion
      </v-btn>
    </header>

    <main class="solola-home__main">
      <section class="solola-home__hero">
        <div class="solola-home__hero-content">
          <h1>
            Le système d'administration
            <span>Solola Admin</span>
          </h1>
          <p>
            Plateforme d'analyse pour le chatbot Solola. Visualisez l'engagement des jeunes,
            identifiez les thèmes les plus consultés et pilotez votre impact avec des données claires.
          </p>
          <div class="solola-home__actions">
            <v-btn size="x-large" class="solola-home__cta" @click="goToLogin">
              <Icon icon="solar:login-3-bold" width="20" class="mr-2" />
              Se connecter
            </v-btn>
            <v-btn size="x-large" variant="outlined" class="solola-home__cta-secondary" @click="goToDashboard">
              Voir le dashboard
            </v-btn>
          </div>
        </div>

        <div class="solola-home__hero-visual">
          <img
            src="@/assets/images/backgrounds/login-bg.svg"
            alt="Illustration Solola Admin"
            class="solola-home__illustration"
          />
        </div>
      </section>

      <section class="solola-home__features">
        <v-row>
          <v-col v-for="feature in features" :key="feature.title" cols="12" md="4">
            <v-card class="feature-card" elevation="0">
              <div class="feature-card__icon">
                <Icon :icon="feature.icon" width="28" />
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.desc }}</p>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <section class="solola-home__about">
        <v-card class="about-card" elevation="0">
          <h2>À propos de Solola Admin</h2>
          <p>
            <strong>Solola Admin</strong> est l'interface d'administration développée par
            <strong>YouthSprint</strong> pour accompagner la plateforme conversationnelle Solola.
            Elle permet aux équipes de suivre les indicateurs clés : nombre d'utilisateurs,
            répartition par genre, thèmes de santé et droits consultés, et évolution de l'audience
            au fil du temps.
          </p>
          <v-btn color="teal-darken-1" variant="flat" size="large" @click="goToLogin">
            Accéder à l'espace admin
          </v-btn>
        </v-card>
      </section>
    </main>

    <footer class="solola-home__footer">
      © {{ new Date().getFullYear() }} YouthSprint · Solola Admin
    </footer>
  </div>
</template>

<style scoped>
.solola-home {
  --teal-dark: #0f766e;
  --teal-mid: #14b8a6;
  min-height: 100vh;
  background: linear-gradient(165deg, #042f2e 0%, #0f766e 35%, #134e4a 70%, #0f172a 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
}

.solola-home__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}

.solola-home__glow--1 {
  width: 500px;
  height: 500px;
  top: -150px;
  right: -100px;
  background: rgba(45, 212, 191, 0.25);
}

.solola-home__glow--2 {
  width: 400px;
  height: 400px;
  bottom: 10%;
  left: -100px;
  background: rgba(56, 189, 248, 0.12);
}

.solola-home__header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2.5rem;
}

.solola-home__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.solola-home__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.solola-home__brand-name {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.solola-home__header-btn {
  border-color: rgba(255, 255, 255, 0.35) !important;
}

.solola-home__main {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2.5rem 4rem;
}

.solola-home__hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  min-height: 55vh;
  padding: 2rem 0 4rem;
}

.solola-home__hero h1 {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}

.solola-home__hero h1 span {
  display: block;
  background: linear-gradient(90deg, #5eead4, #99f6e4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.solola-home__hero > .solola-home__hero-content > p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  max-width: 520px;
  margin-bottom: 2rem;
}

.solola-home__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.solola-home__cta {
  background: linear-gradient(135deg, #14b8a6, #2dd4bf) !important;
  color: #042f2e !important;
  font-weight: 700;
  border-radius: 12px !important;
  text-transform: none;
  box-shadow: 0 8px 32px rgba(20, 184, 166, 0.35);
}

.solola-home__cta-secondary {
  border-color: rgba(255, 255, 255, 0.4) !important;
  color: #fff !important;
  border-radius: 12px !important;
  text-transform: none;
}

.solola-home__illustration {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: block;
  filter: drop-shadow(0 24px 48px rgba(0, 0, 0, 0.3));
}

.solola-home__features {
  margin-bottom: 3rem;
}

.feature-card {
  padding: 1.75rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  backdrop-filter: blur(8px);
}

.feature-card__icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(94, 234, 212, 0.15);
  color: #5eead4;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
  margin: 0;
}

.about-card {
  padding: 2.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  color: #0f172a;
  text-align: center;
}

.about-card h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.about-card p {
  max-width: 680px;
  margin: 0 auto 1.5rem;
  line-height: 1.7;
  color: #475569;
}

.solola-home__footer {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 960px) {
  .solola-home__hero {
    grid-template-columns: 1fr;
    text-align: center;
    min-height: auto;
  }

  .solola-home__hero > .solola-home__hero-content > p {
    margin-left: auto;
    margin-right: auto;
  }

  .solola-home__actions {
    justify-content: center;
  }

  .solola-home__header {
    padding: 1rem 1.25rem;
  }

  .solola-home__main {
    padding: 1rem 1.25rem 3rem;
  }
}
</style>
