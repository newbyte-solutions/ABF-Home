<template>
  <div></div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";

onMounted(async () => {
  const { public: publicConfig } = useRuntimeConfig();
  try {
    const request = await axios.get(
      `${publicConfig.apiBase}/auth/remove_admin`,
    );
  } catch (error) {
    console.error("Error removing user", error);
  }
});
</script>
