import { requireDashboardAuth } from './dashboardGuard';

export const MainRoutes ={
    path: '/main',
    meta: {
        requiresAuth: false
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'dashboard',
            path: '/dashboard',
            component: () => import('@/views/dashboard/MainScreenView.vue'),
            beforeEnter: requireDashboardAuth,
        },
        {
            name: 'chat-dashboard',
            path: '/dashboard/chat',
            component: () => import('@/views/dashboard/ChatDashboardView.vue'),
            beforeEnter: requireDashboardAuth,
        },
        {
            name: 'users-dashboard',
            path: '/dashboard/users',
            component: () => import('@/views/dashboard/UsersDashboardView.vue'),
            beforeEnter: requireDashboardAuth,
        },
        /**
         * 
         * Service Achat
         * 
         */
    

    ]
}