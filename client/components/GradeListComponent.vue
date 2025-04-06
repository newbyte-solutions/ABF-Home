<template>
    <div>
      <span v-for="(user, index) in users" :key="user.id">
        {{ user.name }}{{ index < users.length - 1 ? ', ' : '' }}
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
          const { public: publicConfig } = useRuntimeConfig();
          const response = await axios.get(`${publicConfig.apiBase}/auth/`, {
              withCredentials: true,
          });
          let fetchedUsers = response.data;
          if (props.grade) {
              fetchedUsers = fetchedUsers.filter(user => user.grade === props.grade);
          }
          users.value = fetchedUsers;
      } catch (error) {
          console.error('Error fetching users:', error);
          users.value = [];
      }
  };
  
  onMounted(fetchUsers);
  </script>
  