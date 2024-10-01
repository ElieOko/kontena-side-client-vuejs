const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/blank/BlankLayoutView.vue'),
    meta: {
        requiresAuth: false
    },
    children: [

        {
            name: 'register',
            path: '/auth/register',
            component: () => import('@/views/auth/RegisterView.vue')
        },
        {
            name: 'login',
            path: '/auth/login',
            component: () => import('@/views/auth/LoginView.vue')
        },
        {
            name: 'workspace',
            path: '/auth/workspace-sign',
            component: () => import('@/views/auth/WorkSpaceView.vue')
        }
    ]
};
// suffix="@example.com"
export default AuthRoutes;
