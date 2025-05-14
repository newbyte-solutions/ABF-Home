<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h2 class="text-xl font-semibold mb-4 text-black">{{ title }}</h2>
      <p class="mb-6 text-black">{{ message }}</p>
      <div class="flex justify-end space-x-4">
        <button @click="$emit('cancel')" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-black">
          Cancel
        </button>
        <button @click="$emit('confirm')" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  title: string
  message: string
}>()

defineEmits(['confirm', 'cancel'])
</script>
