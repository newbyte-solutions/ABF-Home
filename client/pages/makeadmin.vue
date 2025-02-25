<template>
  <div></div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
const { public: publicConfig } = useRuntimeConfig();

onMounted(async () => {
  try {
    const request = await axios.get(`${publicConfig.apiBase}/auth/make_admin`);
  } catch (error) {
    console.error("Error making user", error);
  }
});
</script>
