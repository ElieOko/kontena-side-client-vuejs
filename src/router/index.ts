import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthRoutes from './AuthRoutes'
import { MainRoutes } from './MainRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    MainRoutes,
    AuthRoutes
  ]
})
// //{
//   name: 'Side Login',
//   path: '/auth/login',
//   component: () => import('@/views/authentication/SideLogin.vue')
// }
export default router
