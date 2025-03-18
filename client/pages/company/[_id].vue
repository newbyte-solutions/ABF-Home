<template>
    <div>
      <div v-if="company">
        {{ company }}
      </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { marked } from "marked";

const company = ref(null);
const route = useRoute();

onMounted(async () => {
    const { public: publicConfig } = useRuntimeConfig();
    try {
      const { data } = await axios.get(`${publicConfig.apiBase}/company/${route.params._id}`, {
        withCredentials: true
      });
      company.value = data;
    } catch (error) {
      console.error('Error fetching company:', error);
    }
});
</script>
