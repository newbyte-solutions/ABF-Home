<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <section class="hero bg-gradient-to-br from-purple-600 to-blue-600 min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-3xl mb-10 md:mb-0 md:text-5xl">Velkommen til</h2>
        <h1 class="text-5xl md:text-8xl font-bold mb-4">Helland Ungdomsskole</h1>
        <div class="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

      </div>
    </section>

    <section class="bg-gray-900 py-16" id="groups">
      <h2 class="text-4xl font-semibold text-center mb-20">Grupper</h2>
      <div class="card-container flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0">
        <div class="card bg-gradient-to-br from-yellow-300 to-green-600 rounded-lg p-6 w-80 h-80 flex flex-col items-center justify-center hover:opacity-90 transition duration-300">
          <h3 class="text-2xl font-bold mb-4 text-white">Klasse</h3>
          <div class="number text-6xl font-bold text-white mb-4">8</div>
          <nuxt-link to="/g8" class="bg-white text-green-600 font-bold py-2 px-4 rounded hover:bg-opacity-90 text-lg">Se mer</nuxt-link>
        </div>
        <div class="card bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 w-80 h-80 flex flex-col items-center justify-center hover:opacity-90 transition duration-300">
          <h3 class="text-2xl font-bold mb-4 text-white">Klasse</h3>
          <div class="number text-6xl font-bold text-white mb-4">9</div>
          <nuxt-link to="/g9" class="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-opacity-90 text-lg">Se mer</nuxt-link>
        </div>
        <div class="card bg-gradient-to-br to-red-600 from-orange-400 rounded-lg p-6 w-80 h-80 flex flex-col items-center justify-center hover:opacity-90 transition duration-300">
          <h3 class="text-2xl font-bold mb-4 text-white">Klasse</h3>
          <div class="number text-6xl font-bold text-white mb-4">10</div>
          <nuxt-link to="/g10" class="bg-white text-red-600 font-bold py-2 px-4 rounded hover:bg-opacity-90 text-lg">Se mer</nuxt-link>
        </div>
      </div>
    </section>

    <section class="news bg-gray-800 py-16">
      <h2 class="text-3xl font-semibold text-center mb-10">Siste nytt</h2>
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="bg-white rounded-lg shadow-md overflow-hidden max-w-xs mx-auto">
                <img src="https://via.placeholder.com/400x200" alt="News 1" class="w-full h-48 object-cover">
                <div class="p-6 text-center">
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">Nyhet 1</h3>
                  <p class="text-gray-600 mb-4">Kort beskrivelse av nyhet 1 går her...</p>
                  <a href="#" class="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Les mer</a>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-md overflow-hidden max-w-xs mx-auto">
                <img src="https://via.placeholder.com/400x200" alt="News 2" class="w-full h-48 object-cover">
                <div class="p-6 text-center">
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">Nyhet 2</h3>
                  <p class="text-gray-600 mb-4">Kort beskrivelse av nyhet 2 går her...</p>
                  <a href="#" class="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Les mer</a>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-md overflow-hidden max-w-xs mx-auto">
                <img src="https://via.placeholder.com/400x200" alt="News 3" class="w-full h-48 object-cover">
                <div class="p-6 text-center">
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">Nyhet 3</h3>
                  <p class="text-gray-600 mb-4">Kort beskrivelse av nyhet 3 går her...</p>
                  <a href="#" class="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Les mer</a>
                </div>
              </div>
            </div>
          </div>
        </section>  </div>
</template>