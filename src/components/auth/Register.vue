<template>
  <div class="min-h-screen flex justify-center items-center ">
    <div class="w-1/2 shadow-[0_0_4px_#ccccccBB] divide-y divide-[#ccccccBB]">
      <div class=" flex justify-center">
        <div class="py-4">Register</div>
      </div>
      <form @submit.prevent="registerUser" class="max-w-xl mx-auto w-full my-4">
        <div class="relative z-0 w-full mb-5 group">
            <input v-model="data.user.name" type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
        </div>
        <p v-for="name in data.errors.name" class="text-xs text-red-600 mb-2">
          {{ name }}</p>
        <div class="relative z-0 w-full mb-5 group">
            <input v-model="data.user.email" type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <p v-for="email in data.errors.email" class="text-xs text-red-600 mb-2">
          {{ email }}</p>
        <div class="relative z-0 w-full mb-5 group">
            <input v-model="data.user.password" type="password" name="password" id="password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        <p v-for="password in data.errors.password" class="text-xs text-red-600 mb-2">
          {{ password }}</p>
        <div class="relative z-0 w-full mb-5 group">
            <input type="password" v-model="data.user.password_confirmation" name="password_confirmation" id="password_confirmation" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="password_confirmation" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
        </div>
        <p v-for="password_confirmation in data.errors.password_confirmation" class="text-xs text-red-600 mb-2">
          {{ password_confirmation }}</p>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </div>
  </div>

</template>

<script setup>

import { reactive } from 'vue';
import { userAuthStore } from '../../stores/userAuthStore';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import router from '../../router';
import { BASE_URL } from '../../helpers/config';
import "vue-toastification/dist/index.css";

const store = userAuthStore();
const data = reactive({
  loading: false,
  user: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
  errors: {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  }
});

const registerUser = async () => {

  store.clearErrors();
  data.loading = true;
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, data.user);
    data.loading = false;
    useToast().success(response.data.message, {
      timeout: 3000
    });
    router.push('/login');
  } catch (error) {
    data.loading = false;
    if (error?.response?.status === 422) {
      store.setErrors(error.response.data.errors);
      data.errors = error.response.data.errors;
      return;
    }
    console.error(error);
  }
}
</script>