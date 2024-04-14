import { createApp } from 'vue'
import './style.css'
import 'vue-toastification';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';

import App from './App.vue';

createApp(App)
    .use(createPinia)
    .use(Toast)
    .mount('#app')
