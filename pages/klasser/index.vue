<template>
  <div class="w-full min-h-screen absolute top-0 -z-10 bg-gradient-to-b from-slate-900 to-slate-800"></div>
  <div
    class="w-full min-h-screen text-white flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-16 p-12"
  >
    <div class="transform hover:scale-110 transition-transform duration-300 rounded-2xl shadow-2xl h-48 w-48 md:h-56 md:w-56 bg-gradient-to-br from-lime-400 to-green-500 p-1.5 hover:shadow-green-400/30 group">
      <div class="h-full w-full bg-white rounded-xl flex justify-center items-center hover:bg-opacity-95 transition-all">
        <router-link
          to="/klasser/8"
          class="text-black text-7xl md:text-8xl font-bold transition-colors duration-300 relative"
        >
          8
      </router-link>
      </div>
    </div>
    <div class="transform hover:scale-110 transition-transform duration-300 rounded-2xl shadow-2xl h-48 w-48 md:h-56 md:w-56 bg-gradient-to-br from-blue-600 to-purple-600 p-1.5 hover:shadow-blue-400/30 group">
      <div class="h-full w-full bg-white rounded-xl flex justify-center items-center hover:bg-opacity-95 transition-all">
        <router-link
          to="/klasser/9"
          class="text-black text-7xl md:text-8xl font-bold transition-colors duration-300 relative"
        >
          9
      </router-link>
      </div>
    </div>
    <div class="transform hover:scale-110 transition-transform duration-300 rounded-2xl shadow-2xl h-48 w-48 md:h-56 md:w-56 bg-gradient-to-br from-red-600 to-orange-500 p-1.5 hover:shadow-red-400/30 group">
      <div class="h-full w-full bg-white rounded-xl flex justify-center items-center hover:bg-opacity-95 transition-all">
        <router-link
          to="/klasser/10"
          class="text-black text-7xl md:text-8xl font-bold transition-colors duration-300 relative"
        >
          10
      </router-link>
      </div>
    </div>
  </div>
</template>
