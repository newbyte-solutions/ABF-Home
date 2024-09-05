<template>
    <div class="min-h-screen bg-gray-900 text-white">
      <header id="hjem" class="h-96">
        <div class="w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 h-full flex flex-col justify-center">
          <h1 class="text-5xl mb-4">Velkommen til 9. klasse</h1>
          <p class="text-2xl opacity-80">Noe tekst her???</p>
        </div>
      </header>
  
      <section id="nyheter">
        <div class="container mx-auto px-4 py-20">
          <h2 class="text-3xl text-teal-400 mb-8">Siste nytt</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white bg-opacity-10 rounded-lg p-6 transform hover:-translate-y-1 transition-transform duration-300">
              <h3 class="text-xl text-blue-400 mb-2">Kommende vitenskapsmesse</h3>
              <p>Gjør deg klar for vår årlige vitenskapsmesse neste måned!</p>
            </div>
            <div class="bg-white bg-opacity-10 rounded-lg p-6 transform hover:-translate-y-1 transition-transform duration-300">
              <h3 class="text-xl text-blue-400 mb-2">Ny litteraturklubb</h3>
              <p>Bli med i vår nye litteraturklubb som starter denne uken.</p>
            </div>
            <div class="bg-white bg-opacity-10 rounded-lg p-6 transform hover:-translate-y-1 transition-transform duration-300">
              <h3 class="text-xl text-blue-400 mb-2">Resultater fra matematikkonkurranse</h3>
              <p>Gratulerer til matematikklaget vårt for deres nylige seier!</p>
            </div>
          </div>
        </div>
      </section>
  
      <section id="prosjekter" class="py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl text-teal-400 mb-8">Utvalgte prosjekter</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white bg-opacity-10 rounded-lg p-6 transform hover:-translate-y-1 transition-transform duration-300">
              <h3 class="text-xl text-blue-400 mb-2">Miljøbevissthetskampanje</h3>
              <p>Et elevledet initiativ for å fremme miljøvennlig praksis.</p>
            </div>
            <div class="bg-white bg-opacity-10 rounded-lg p-6 transform hover:-translate-y-1 transition-transform duration-300">
              <h3 class="text-xl text-blue-400 mb-2">Robotikk-verksted</h3>
              <p>Lær å bygge og programmere din egen robot!</p>
            </div>
            <div class="bg-white bg-opacity-10 rounded-lg p-6 transform hover:-translate-y-1 transition-transform duration-300">
              <h3 class="text-xl text-blue-400 mb-2">Samfunnsengasjement-program</h3>
              <p>Frivillige muligheter for å hjelpe lokale organisasjoner.</p>
            </div>
          </div>
        </div>
      </section>
  
      <section id="bilder" class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl text-teal-400 mb-8">Bildegalleri</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
              <img src="https://picsum.photos/400/300?random=1" alt="Bilde 1" class="w-full h-48 object-cover">
              <div class="p-4">
                <p class="text-gray-700">Beskrivelse for Bilde 1</p>
              </div>
            </div>
            <div class="bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
              <img src="https://picsum.photos/400/300?random=2" alt="Bilde 2" class="w-full h-48 object-cover">
              <div class="p-4">
                <p class="text-gray-700">Beskrivelse for Bilde 2</p>
              </div>
            </div>
            <div class="bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
              <img src="https://picsum.photos/400/300?random=3" alt="Bilde 3" class="w-full h-48 object-cover">
              <div class="p-4">
                <p class="text-gray-700">Beskrivelse for Bilde 3</p>
              </div>
            </div>
            <div class="bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
              <img src="https://picsum.photos/400/300?random=4" alt="Bilde 4" class="w-full h-48 object-cover">
              <div class="p-4">
                <p class="text-gray-700">Beskrivelse for Bilde 4</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
    </div>
  </template>
  