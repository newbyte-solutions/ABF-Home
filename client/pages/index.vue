<template>
  <div
    class="w-full min-h-screen absolute -z-10 bg-gradient-to-br from-purple-700 to-blue-500"
  ></div>
  <div class="w-full min-h-screen text-white">
    <div
      class="w-full min-h-screen flex flex-col justify-center items-center px-4 text-center relative"
    >
      <h1
        class="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-10 border-b-4 md:border-b-8 py-4 md:py-8"
      >
        Helland Ungdomsskole
      </h1>
      <p class="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
        8. 9. 10.
      </p>
      <p class="text-2xl md:text-3xl lg:text-4xl font-light">Arbeidslivsfag</p>
      <div class="absolute bottom-10 animate-bounce">
        <svg
          class="w-20 h-20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
    </div>
  </div>
  <div
    class="w-full min-h-screen bg-white drop-shadow-2xl relative flex flex-col justify-center items-center p-4"
  >
    <div class="w-full flex flex-col justify-center items-center">
      <NewsSection />
    </div>
  </div>
</template>