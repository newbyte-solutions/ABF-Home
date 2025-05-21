<template>
  <div class="w-full min-h-screen bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold mb-8 text-center">FTF Admin Dashboard</h1>
      <div class="flex flex-col gap-4">
        <button class="w-full bg-blue-600 text-white font-semibold py-3 rounded shadow hover:bg-blue-700 transition" @click="goTo('create')">Create</button>
        <button class="w-full bg-blue-600 text-white font-semibold py-3 rounded shadow hover:bg-blue-700 transition" @click="goTo('edit')">Edit</button>
        <button class="w-full bg-blue-600 text-white font-semibold py-3 rounded shadow hover:bg-blue-700 transition" @click="goTo('view')">View</button>
        <button class="w-full bg-blue-600 text-white font-semibold py-3 rounded shadow hover:bg-blue-700 transition" @click="goTo('manage')">Manage</button>
        <button class="w-full bg-blue-600 text-white font-semibold py-3 rounded shadow hover:bg-blue-700 transition" @click="goTo('delete')">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

function goTo(action: string) {
  router.push(`/ftf/admin/${action}`)
}
</script>