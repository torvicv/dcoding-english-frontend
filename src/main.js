import { createApp } from 'vue'
import './style.css'
import 'vue-toastification';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import router from './router';

import App from './App.vue';

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .use(Toast)
    .mount('#app')
