import { createRouter, createWebHistory } from 'vue-router';

function checkIfUserIsLoggedIn() {
    
}

function checkIfUserIsNotLoggedIn() {
    
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: [checkIfUserIsLoggedIn]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: [checkIfUserIsNotLoggedIn]
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: [checkIfUserIsNotLoggedIn]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;