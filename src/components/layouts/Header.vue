<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul v-if="!store.user"
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <router-link
              to="/login"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Login</router-link
            >
          </li>
          <li>
            <router-link
              to="/register"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Register</router-link
            >
          </li>
        </ul>
        <ul v-else
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <router-link
              to="/"
              class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="#"
              @click="logoutUser"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { userAuthStore } from '../../stores/userAuthStore';
  import axios from 'axios';
  import { BASE_URL, config } from '../../helpers/config';
  import { useToast } from 'vue-toastification';
  import router from '../../router';

  const toast = useToast();
  const store = userAuthStore();

  const fetchCurrentLoginUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user`, config(store.token));
      store.setCurrentUser(response.data.user);
    } catch (error) {
      if (error?.response?.status === 401) {
        store.clearStoreData();
      }
      console.error(error);
    }
  }
  
  const logoutUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/logout`, null, config(store.token));
      store.clearStoreData();
      toast.success(response.data.message, {
        timeout: 3000
      });
      router.push('/login');

    } catch (error) {
      console.error(error);
    }
  }

  onMounted(() => {
    if (store.token) {
      fetchCurrentLoginUser();
    }
  })


</script>
