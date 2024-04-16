import { defineStore } from "pinia";

export const userAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: JSON.parse(localStorage.getItem('token')) || '',
        errors: null
    }),
    actions: {
        setCurrentUser(user) {
            this.user = user;
        },
        setCurrentToken(token) {
            localStorage.setItem('token', JSON.stringify(token));
            this.token = token;
        },
        setErrors(errors) {
            this.errors = errors;
        },
        clearStoreData() {
            localStorage.removeItem('token');
            this.token = '';
            this.user = null;
        },
        clearErrors() {
            this.errors = null;
        }
    }
});