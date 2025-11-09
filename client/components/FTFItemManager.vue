<template>
  <div class="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">
      Administrer status og tilgjengelighet
    </h2>
    <form v-if="item" @submit.prevent="submitManage" class="space-y-4">
      <div>
        <label class="block font-medium mb-1">Status</label>
        <select v-model="item.status" class="input">
          <option value="active">Aktiv</option>
          <option value="inactive">Inaktiv</option>
          <option value="maintenance">Vedlikehold</option>
        </select>
      </div>
      <div>
        <label class="block font-medium mb-1">Tilgjengelig</label>
        <input v-model="item.availability" type="checkbox" class="mr-2" />
        <span>{{ item.availability ? "Tilgjengelig" : "Utilgjengelig" }}</span>
      </div>
      <div>
        <label class="block font-medium mb-1">Check-in/out bruker</label>
        <input
          v-model="item.currentUser"
          type="text"
          class="input"
          placeholder="Bruker-ID eller navn"
        />
      </div>
      <div>
        <label class="block font-medium mb-1"
          >Legg til logg (reparasjon, status, etc)</label
        >
        <textarea
          v-model="logEntry"
          class="input"
          placeholder="Skriv logginnlegg her..."
        />
      </div>
      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? "Lagrer..." : "Lagre endringer" }}
        </button>
      </div>
    </form>
    <div v-else class="text-gray-500">Laster inn...</div>
    <div
      v-if="item && item.logs && Array.isArray(item.logs) && item.logs.length"
      class="mt-6"
    >
      <h3 class="font-semibold mb-2">Logg for objektet</h3>
      <ul class="text-xs text-gray-700 space-y-1">
        <li v-for="(log, idx) in item.logs" :key="idx">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const item = ref<any>(null);
const loading = ref(false);
const logEntry = ref("");

onMounted(async () => {
  loading.value = true;
  try {
    const { public: publicConfig } = useRuntimeConfig();
    const res = await axios.get(
      `${publicConfig.apiBase}/ftf/items/${route.params.id}`,
    );
    item.value = res.data;
  } catch (e) {
    item.value = null;
  } finally {
    loading.value = false;
  }
});

async function submitManage() {
  loading.value = true;
  try {
    const { public: publicConfig } = useRuntimeConfig();
    // Add log entry if present
    if (logEntry.value) {
      if (!Array.isArray(item.value.logs)) item.value.logs = [];
      item.value.logs.push(
        `[${new Date().toLocaleString()}] ${logEntry.value}`,
      );
    }
    await axios.put(
      `${publicConfig.apiBase}/ftf/items/${item.value.id}`,
      item.value,
      { withCredentials: true },
    );
    logEntry.value = "";
    alert("Endringer lagret!");
  } catch (e) {
    alert("Kunne ikke lagre endringer.");
  } finally {
    loading.value = false;
  }
}
</script>
