<template>
  <h2 class="text-center text-2xl font-semibold my-4">Nyheter</h2>
  <div
    class="w-full h-fit px-4 md:px-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10"
  >
    <router-link
      v-for="news in newsItems"
      :key="news._id"
      :to="`/article/${news._id}`"
      class="w-full md:w-auto"
    >
      <div
        class="w-full md:w-56 h-auto md:h-80 bg-gray-100 hover:scale-105 transition-transform duration-300 rounded-lg shadow-md p-4"
      >
        <img
          :src="news.articleImageUrl || 'https://placehold.co/300x200'"
          alt="News image"
          class="w-full h-[200px] object-cover object-center rounded-md mb-4"
        />
        <h1 class="text-xl font-semibold text-center mb-2 line-clamp-2">
          {{ news.articleTitle }}
        </h1>
        <p class="px-2 text-center text-sm text-gray-600 line-clamp-2 mb-8">
          {{ news.articleDescription }}
        </p>
      </div>
    </router-link>
  </div>
  <div class="flex justify-center mt-10">
    <router-link
      to="/article"
      :class="{
        'px-6 py-3 border-2 rounded-md transition-colors duration-300': true,
        'border-green-400 hover:bg-green-400 hover:text-white': grade === '8',
        'border-indigo-400 hover:bg-indigo-400 hover:text-white': grade === '9',
        'border-orange-400 hover:bg-orange-400 hover:text-white':
          grade === '10',
      }"
    >
      Se mer
    </router-link>
  </div>
</template>

<script setup>
import axios from "axios";

const newsItems = ref([]);

const props = defineProps({
  grade: {
    type: String,
    required: false,
  },
});

onMounted(async () => {
  try {
    const { public: publicConfig } = useRuntimeConfig();
    const response = await axios.get(`${publicConfig.apiBase}/news/`);
    newsItems.value = props.grade
      ? response.data
          .filter((news) => news.articleGrade === props.grade)
          .slice(0, 3)
      : response.data.slice(0, 3);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
});
</script>
