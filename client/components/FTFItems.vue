<template>
  <div class="w-full min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl text-center font-semibold text-gray-900 mb-8">FTF Rental Items</h1>
      <div class="flex flex-wrap gap-4 mb-8 justify-center">
        <select v-model="selectedCategory" class="px-3 py-2 border rounded">
          <option value="">Alle kategorier</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <select v-model="selectedTag" class="px-3 py-2 border rounded">
          <option value="">Alle tags</option>
          <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>
      <div v-if="loading" class="text-gray-500 text-center">Laster inn...</div>
      <div v-else-if="!filteredItems.length" class="text-gray-500 text-center">Ingen utleieobjekter funnet.</div>
      <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in filteredItems"
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
          <div class="mb-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-2">{{ item.category }}</span>
            <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs mr-2">{{ item.type }}</span>
            <span
              v-if="item.status"
              class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs mr-2"
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
          <div v-if="item.specs" class="text-xs text-gray-500 mt-2">
            <pre>{{ item.specs }}</pre>
          </div>
          <div class="text-xs text-gray-400 mt-auto">ID: {{ item.id }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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
  specs?: any;
}

const items = ref<FtfItem[]>([])
const loading = ref(true)
const categories = ref<string[]>([])
const tags = ref<string[]>([])
const selectedCategory = ref('')
const selectedTag = ref('')

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const catMatch = !selectedCategory.value || item.category === selectedCategory.value
    const tagMatch = !selectedTag.value || (item.tags && item.tags.includes(selectedTag.value))
    return catMatch && tagMatch
  })
})

async function fetchFilters() {
  // Fetch unique categories and tags from the backend
  const { data: catData } = await axios.get('/ftf/items/categories')
  categories.value = catData
  const { data: tagData } = await axios.get('/ftf/items/tags')
  tags.value = tagData
}

onMounted(async () => {
  try {
    const res = await axios.get('/ftf/items')
    items.value = res.data
    await fetchFilters()
  } catch (e) {
    items.value = []
  } finally {
    loading.value = false
  }
})
</script>