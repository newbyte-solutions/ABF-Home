<template>
  <div class="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Globale og objekt-logg</h2>
    <div v-if="loading" class="text-gray-500">Laster inn...</div>
    <div v-else-if="!logs.length" class="text-gray-500">
      Ingen logger funnet.
    </div>
    <ul v-else class="divide-y divide-gray-200">
      <li v-for="(log, idx) in logs" :key="idx" class="py-2 text-sm">
        <span class="font-semibold">{{ log.itemName || "Global" }}:</span>
        <span>{{ log.message }}</span>
        <span class="text-xs text-gray-400 ml-2">{{
          formatDate(log.date)
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const logs = ref<any[]>([]);
const loading = ref(true);

const { formatDateTime } = useFormatDate();
const formatDate = formatDateTime;

onMounted(async () => {
  loading.value = true;
  try {
    const { public: publicConfig } = useRuntimeConfig();
    // This endpoint should return all logs, both global and per item
    const res = await axios.get(`${publicConfig.apiBase}/ftf/logs`);
    logs.value = res.data;
  } catch (e) {
    logs.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
