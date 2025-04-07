<template>
    <div class="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <form @submit.prevent="submit" class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md md:w-96 w-fit">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" v-model="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
            <input type="password" v-model="oldPassword" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">New Password</label>
            <input type="password" v-model="newPassword" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
            <input type="password" v-model="confirmPassword" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Update Password</button>
        </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const email = ref('');
  const oldPassword = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');
  
  const submit = async () => {
    if (newPassword.value !== confirmPassword.value) {
      alert('New passwords do not match');
      return;
    }
  
    try {
      const { public: publicConfig } = useRuntimeConfig();
      const response = await axios.post(`${publicConfig.apiBase}/auth/update_password`, {
        email: email.value,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      }, { withCredentials: true });
  
      alert('Password updated successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating password');
    }
  };
  </script>
