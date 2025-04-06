<template>
    <form @submit.prevent="submit">
      <div>
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Old Password</label>
        <input type="password" v-model="oldPassword" required />
      </div>
      <div>
        <label>New Password</label>
        <input type="password" v-model="newPassword" required />
      </div>
      <div>
        <label>Confirm New Password</label>
        <input type="password" v-model="confirmPassword" required />
      </div>
      <button type="submit">Update Password</button>
    </form>
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
      const response = await axios.post(`${publicConfig.apibase}/auth/update_password`, {
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
  