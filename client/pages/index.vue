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
    <h2 class="text-4xl font-semibold mb-10">Nyheter</h2>
    <div
      class="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="item in news"
        :key="item.title"
        class="flex flex-col bg-gray-100 rounded-lg shadow-xl h-full"
      >
        <div class="relative h-64">
          <img
            :src="item.articleImageUrl"
            alt="News image"
            class="absolute w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <h3 class="text-xl font-bold mb-2">{{ item.articleTitle }}</h3>
          <p class="text-gray-600 mb-4 flex-grow">{{ item.articleDescription }}</p>
          <div class="mt-auto">
            <span class="text-sm text-gray-500 block mb-4">{{
              item.date
            }}</span>
            <a
              :href="`/article/${item._id}`"
              class="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full text-center"
              >Les mer</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const { public: publicConfig } = useRuntimeConfig();

const news = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`${publicConfig.apiBase}/news/`);
    news.value = response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    news.value = [];
  }
});
</script>