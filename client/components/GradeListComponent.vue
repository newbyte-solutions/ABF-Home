<template>
    <div class="text-center text-2xl font-semibold text-gray-800 dark:text-gray-700">
      <span v-for="(user, index) in users" :key="user.id">
        {{ user.username }}{{ index < users.length - 1 ? ', ' : '' }}
      </span>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const props = defineProps({
      grade: {
          type: String,
          required: false,
      },
  });
  
  const users = ref([]);
  
  const fetchUsers = async () => {
      try {
          console.log('Fetching users...');
          const { public: publicConfig } = useRuntimeConfig();
          console.log('API Base URL:', publicConfig.apiBase);
          const response = await axios.get(`${publicConfig.apiBase}/auth/`, {
              withCredentials: true,
          });
          let fetchedUsers = response.data;
          console.log('Fetched users:', fetchedUsers);
          if (props.grade) {
              console.log('Filtering users by grade:', props.grade);
              fetchedUsers = fetchedUsers.filter(user => String(user.grade) === props.grade);
              console.log('Filtered users:', fetchedUsers);
          }
          users.value = fetchedUsers;
      } catch (error) {
          console.error('Error fetching users:', error);
          console.error('Error details:', error.response || error.message);
          users.value = [];
      }
  };
  
  onMounted(() => {
      console.log('Component mounted, fetching users...');
      fetchUsers();
  });
  </script>