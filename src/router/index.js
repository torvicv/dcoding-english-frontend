import { createRouter, createWebHistory } from 'vue-router';
import { userAuthStore } from '../stores/userAuthStore';
import Home from './../components/Home.vue';
import Login from './../components/auth/Login.vue';
import Register from './../components/auth/Register.vue';

function checkIfUserIsLoggedIn() {
    const store = userAuthStore();
    if (store.token) {
        return '/';
    }
}

function checkIfUserIsNotLoggedIn() {
    const store = userAuthStore();
    if (!store.token) {
        return '/login';
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: [checkIfUserIsNotLoggedIn]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: [checkIfUserIsLoggedIn]
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: [checkIfUserIsLoggedIn]
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;