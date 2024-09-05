<template>
  <footer class="bg-gray-900 text-white py-8">
    <div class="container mx-auto px-4 flex flex-row justify-between">
      <h2 class="text-2xl font-bold">Helland Ungdomsskole</h2>
      <p>Nettside av: ARP EB</p>
      <div class="flex space-x-4">
        <NuxtLink to="/g8" class="bg-gradient-to-r from-yellow-300 to-green-600 rounded-lg py-2 px-2 hover:text-white transition-colors duration-300">8.</NuxtLink>
        <NuxtLink to="/g9" class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg py-2 px-2 hover:text-white transition-colors duration-300">9.</NuxtLink>
        <NuxtLink to="/g10" class="bg-gradient-to-r from-orange-400 to-red-600 rounded-lg py-2 px-2 hover:text-white transition-colors duration-300">10</NuxtLink>      </div>
    </div>
  </footer>
</template>