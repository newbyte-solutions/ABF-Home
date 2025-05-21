<template>
  <div class="py-16"></div>
  <div class="bg-gray-800 rounded-lg shadow-lg p-8 max-w-xl mx-auto text-white">
    <h2 class="text-3xl font-bold mb-6 text-white border-b border-gray-700 pb-4 text-center">Nytt utleieobjekt</h2>
    <form @submit.prevent="submitItem" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="transition-all duration-200 hover:transform hover:scale-[1.02]">
          <label class="block font-semibold mb-2 text-gray-300">Navn</label>
          <input v-model="form.name" type="text" class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200" required />
        </div>
        <div class="transition-all duration-200 hover:transform hover:scale-[1.02]">
          <label class="block font-semibold mb-2 text-gray-300">Kategori</label>
          <select v-model="form.category" class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200" required>
            <option value="">Velg kategori</option>
            <option value="alpine">Alpint</option>
            <option value="bicycle">Sykkel</option>
            <option value="camping">Camping</option>
          </select>
        </div>
      </div>

      <div class="transition-all duration-200 hover:transform hover:scale-[1.02]">
        <label class="block font-semibold mb-2 text-gray-300">Beskrivelse</label>
        <textarea v-model="form.description" class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[100px]" required />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="transition-all duration-200 hover:transform hover:scale-[1.02]">
          <label class="block font-semibold mb-2 text-gray-300">Type</label>
          <input v-model="form.type" type="text" class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200" required />
        </div>
        <div class="transition-all duration-200 hover:transform hover:scale-[1.02]">
          <label class="block font-semibold mb-2 text-gray-300">Aldersgrense</label>
          <input v-model="form.ageRating" type="text" class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200" required />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="transition-all duration-200 hover:transform hover:scale-[1.02]">
          <label class="block font-semibold mb-2 text-gray-300">Tags</label>
          <input v-model="form.tags" type="text" placeholder="Separer med komma" class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
        </div>
        <div class="transition-all duration-200 hover:transform hover:scale-[1.02]">
          <label class="block font-semibold mb-2 text-gray-300">Bilde-URL(er)</label>
          <input v-model="form.images" type="text" placeholder="Separer med komma" class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="transition-all duration-200 hover:transform hover:scale-[1.02]">
          <label class="block font-semibold mb-2 text-gray-300">Status</label>
          <select v-model="form.status" class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200">
            <option value="active">Aktiv</option>
            <option value="inactive">Inaktiv</option>
            <option value="maintenance">Vedlikehold</option>
          </select>
        </div>
        <div class="transition-all duration-200 hover:transform hover:scale-[1.02] flex items-center">
          <label class="flex items-center cursor-pointer">
            <div class="relative">
              <input v-model="form.availability" type="checkbox" class="sr-only" />
              <div class="w-14 h-7 bg-gray-600 rounded-full border-2 border-gray-600"></div>
              <div class="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition transform" :class="{ 'translate-x-7 bg-blue-500': form.availability }"></div>
            </div>
            <span class="ml-3 font-semibold text-gray-300">{{ form.availability ? "Tilgjengelig" : "Utilgjengelig" }}</span>
          </label>
        </div>
      </div>

      <div class="flex justify-end pt-6 border-t border-gray-700">
        <button type="button" @click="submitItem" class="btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" :disabled="loading">
          <span class="flex items-center">
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? "Lagrer..." : "Opprett" }}
          </span>
        </button>
      </div>
    </form>
    <ConfirmationModal
      :visible="isVisible"
      :title="title"
      :message="message"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useConfirmation } from "@/composables/useConfirmation";

const { public: publicConfig } = useRuntimeConfig()

const form = ref({
  name: '',
  description: '',
  category: '',
  type: '',
  ageRating: '',
  tags: '',
  images: '',
  status: 'active',
  availability: true,
})

const loading = ref(false)
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
const pendingItem = ref<any>(null)

const { isVisible, title, message, confirm, onConfirm, onCancel } =
  useConfirmation();

async function submitItem() {
  const result = await confirm('Bekreft opprettelse', 'Er du sikker på at du vil opprette dette utleieobjektet?')
  if (!result) return

  loading.value = true
  try {
    const payload = {
      ...form.value,
      tags: form.value.tags ? form.value.tags.split(',').map(t => t.trim()) : [],
      images: form.value.images ? form.value.images.split(',').map(i => i.trim()) : [],
      id: crypto.randomUUID(),
    }
    await axios.post(`${publicConfig.apiBase}/ftf/items`, payload, { withCredentials: true })
    showModal.value = true
    modalTitle.value = 'Suksess'
    modalMessage.value = 'Utleieobjektet ble opprettet!'
    form.value = {
      name: '',
      description: '',
      category: '',
      type: '',
      ageRating: '',
      tags: '',
      images: '',
      status: 'active',
      availability: true,
    }
  } catch (error: any) {
    showModal.value = true
    modalTitle.value = 'Feil'
    modalMessage.value = error?.response?.data?.message || 'Noe gikk galt under opprettelsen.'
  } finally {
    loading.value = false
  }
}

function onModalConfirm() {
  showModal.value = false
}
</script>