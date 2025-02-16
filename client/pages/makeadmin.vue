<template>
    <div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';

onMounted(async () => {
  try {
    const request = await axios.get('http://localhost:5000/auth/make_admin');
  } catch (error) {
    console.error('Error making user', error);
  }
});
</script>