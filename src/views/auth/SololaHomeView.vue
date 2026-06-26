<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useDashboardStore } from '@/stores/dashboard/dashboard';

const router = useRouter();
const store = useDashboardStore();

const highlights = [
  {
    title: 'Conversations',
    desc: 'Volume de messages et fréquence des échanges avec le chatbot.',
  },
  {
    title: 'Utilisateurs',
    desc: 'Numéros uniques, genre déclaré et dates de première et dernière visite.',
  },
  {
    title: 'Thèmes abordés',
    desc: 'Santé, droits et autres sujets les plus consultés par période.',
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
  <div class="home">
    <header class="home__header">
      <div class="home__brand">
        <span class="home__org">Ipas</span>
        <span class="home__sep" aria-hidden="true">/</span>
        <span class="home__product">Solola na nga Admin</span>
      </div>
      <button type="button" class="home__link" @click="goToLogin">Connexion</button>
    </header>

    <main class="home__main">
      <section class="home__hero">
        <div class="home__hero-text">
          <p class="home__eyebrow">Tableau de bord · accès réservé</p>
          <h1>
            Suivi et analyse du chatbot
            <em>Solola na nga</em>
          </h1>
          <p class="home__lead">
            Interface d'administration pour les équipes Ipas. Consultez l'activité des
            utilisateurs, les thèmes de conversation et l'évolution de l'audience sur la
            plateforme Solola na nga.
          </p>
          <div class="home__actions">
            <button type="button" class="home__btn home__btn--primary" @click="goToLogin">
              Se connecter
            </button>
            <button type="button" class="home__btn home__btn--secondary" @click="goToDashboard">
              Ouvrir le dashboard
            </button>
          </div>
        </div>

        <aside class="home__panel" aria-label="Aperçu des indicateurs">
          <p class="home__panel-title">Ce que vous pouvez suivre</p>
          <ul class="home__panel-list">
            <li v-for="item in highlights" :key="item.title">
              <strong>{{ item.title }}</strong>
              <span>{{ item.desc }}</span>
            </li>
          </ul>
        </aside>
      </section>

      <section class="home__info">
        <h2>À propos</h2>
        <p>
          <strong>Solola na nga Admin</strong> est l'outil de pilotage développé par
          <strong>Ipas</strong> pour accompagner le chatbot Solola na nga. Il centralise
          les statistiques d'usage : nombre d'utilisateurs, répartition par genre, thèmes
          consultés et croissance de l'audience dans le temps.
        </p>
      </section>
    </main>

    <footer class="home__footer">
      © {{ new Date().getFullYear() }} Ipas · Solola na nga Admin
    </footer>
  </div>
</template>

<style scoped>
.home {
  --green: #1a5c4a;
  --green-soft: #e8f2ef;
  --ink: #1c1917;
  --muted: #57534e;
  --line: #e7e5e4;
  --bg: #fafaf9;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.home__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid var(--line);
  background: #fff;
}

.home__brand {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.home__org {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--green);
}

.home__sep {
  color: #d6d3d1;
}

.home__product {
  font-size: 1rem;
  font-weight: 600;
}

.home__link {
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.home__link:hover {
  border-color: var(--green);
  background: var(--green-soft);
}

.home__main {
  flex: 1;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 3rem 2rem 4rem;
}

.home__hero {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: start;
  margin-bottom: 3.5rem;
}

.home__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1rem;
}

.home__hero h1 {
  font-size: clamp(1.85rem, 3.5vw, 2.6rem);
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
}

.home__hero h1 em {
  display: block;
  font-style: normal;
  color: var(--green);
  margin-top: 0.25rem;
}

.home__lead {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--muted);
  max-width: 34rem;
  margin-bottom: 2rem;
}

.home__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.home__btn {
  padding: 0.7rem 1.35rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s;
}

.home__btn--primary {
  background: var(--green);
  color: #fff;
}

.home__btn--primary:hover {
  background: #144a3c;
}

.home__btn--secondary {
  background: #fff;
  color: var(--ink);
  border-color: var(--line);
}

.home__btn--secondary:hover {
  border-color: var(--green);
  background: var(--green-soft);
}

.home__panel {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 1.5rem 1.75rem;
}

.home__panel-title {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--line);
}

.home__panel-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.home__panel-list li {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.home__panel-list strong {
  font-size: 0.95rem;
  color: var(--ink);
}

.home__panel-list span {
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--muted);
}

.home__info {
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}

.home__info h2 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.home__info p {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--muted);
  max-width: 42rem;
  margin: 0;
}

.home__footer {
  padding: 1.25rem 2rem;
  border-top: 1px solid var(--line);
  font-size: 0.8rem;
  color: var(--muted);
  text-align: center;
  background: #fff;
}

@media (max-width: 900px) {
  .home__hero {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .home__header,
  .home__main,
  .home__footer {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .home__main {
    padding-top: 2rem;
  }
}
</style>
