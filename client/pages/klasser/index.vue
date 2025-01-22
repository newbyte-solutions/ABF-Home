<template>
  <div class="w-full min-h-screen absolute top-0 -z-10 bg-slate-800"></div>
  <div
    class="w-full min-h-screen text-white flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:space-x-20"
  >
    <div class="h-32 w-32 bg-gradient-to-br from-lime-400 to-green-500 p-1">
      <div class="h-full w-full bg-white flex justify-center items-center">
        <router-link
          to="/klasser/8"
          class="text-black text-5xl font-bold border-b-2 px-4 border-gray-800 py-2"
          >8</router-link
        >
      </div>
    </div>
    <div class="h-32 w-32 bg-gradient-to-br from-blue-700 to-purple-600 p-1">
      <div class="h-full w-full bg-white flex justify-center items-center">
        <router-link
          to="/klasser/9"
          class="text-black text-5xl font-bold border-b-2 px-4 border-gray-800 py-2"
          >9</router-link
        >
      </div>
    </div>
    <div class="h-32 w-32 bg-gradient-to-br from-red-700 to-orange-500 p-1">
      <div class="h-full w-full bg-white flex justify-center items-center">
        <router-link
          to="/klasser/10"
          class="text-black text-5xl font-bold border-b-2 px-4 border-gray-800 py-2"
          >10</router-link
        >
      </div>
    </div>
  </div>
</template>
