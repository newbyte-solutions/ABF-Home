<template>
  <div class="w-full min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl text-center font-semibold text-gray-900 mb-8">FTF Rental Items</h1>
      <div v-if="loading" class="text-gray-500 text-center">Laster inn...</div>
      <div v-else-if="!items.length" class="text-gray-500 text-center">Ingen utleieobjekter funnet.</div>
      <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in items"
          :key="item.id"
          class="bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col"
        >
          <img
            v-if="item.images && item.images.length"
            :src="item.images[0]"
            alt="Bilde av utleieobjekt"
            class="w-full h-48 object-cover rounded mb-4"
          />
          <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ item.name }}</h2>
          <p class="text-gray-700 mb-2">{{ item.description }}</p>
          <div class="flex flex-wrap gap-2 mb-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{{ item.category }}</span>
            <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{{ item.type }}</span>
            <span
              v-if="item.status"
              class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs"
              >{{ item.status }}</span
            >
            <span
              v-if="item.availability !== undefined"
              class="px-2 py-1"
              :class="item.availability ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'"
            >
              {{ item.availability ? "Tilgjengelig" : "Utilgjengelig" }}
            </span>
          </div>
          <div v-if="item.tags && item.tags.length" class="mb-2">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="inline-block bg-gray-200 text-gray-700 rounded px-2 py-0.5 text-xs mr-1"
              >{{ tag }}</span
            >
          </div>
          <div class="text-xs text-gray-400 mt-auto">ID: {{ item.id }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface FtfItem {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  tags?: string[];
  images?: string[];
  status?: string;
  availability?: boolean;
}

const items = ref<FtfItem[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { public: publicConfig } = useRuntimeConfig()
    const res = await axios.get(`${publicConfig.apiBase}/ftf/items`)
    items.value = res.data
  } catch (e) {
    items.value = []
  } finally {
    loading.value = false
  }
})
</script>