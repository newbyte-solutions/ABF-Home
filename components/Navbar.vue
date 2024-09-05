<template>
  <nav class="bg-gray-900 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img src="~/assets/images/logo.svg" alt="Logo" class="h-10 w-auto mr-4" />
            <span class="text-xl font-semibold">Helland Ungdomsskole</span>
          </NuxtLink>
        </div>
        <div class="hidden md:flex space-x-4">
          <NuxtLink to="/" class="hover:text-gray-300 transition duration-300">Hjem</NuxtLink>
          <NuxtLink to="/#groups" class="hover:text-gray-300 transition duration-300">Grupper</NuxtLink>
          <NuxtLink to="/about" class="hover:text-gray-300 transition duration-300">Info</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-gray-300 transition duration-300">Kontakt</NuxtLink>
        </div>
        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="focus:outline-none">
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              <path v-else fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NuxtLink to="/" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white transition duration-300">Hjem</NuxtLink>
        <NuxtLink to="/#groups" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white transition duration-300">Grupper</NuxtLink>
        <NuxtLink to="/about" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white transition duration-300">Info</NuxtLink>
        <NuxtLink to="/contact" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white transition duration-300">Kontakt</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>
