<template>
  <div class="w-full h-fit px-0 md:px-10 flex flex-wrap gap-6 justify-center">
    <router-link
      v-for="news in filteredNews"
      :key="news._id"
      :to="`/article/${news._id}`"
      class="w-full md:w-auto"
    >
      <div
        class="w-full md:w-56 h-auto md:max-h-96 bg-gray-100 hover:scale-105 transition-transform duration-300 rounded-lg shadow-md p-4"
      >
        <img
          :src="news.articleImageUrl || 'https://placehold.co/300x200'"
          alt="News image"
          class="w-full h-[200px] object-cover object-center rounded-md mb-4"
        />
        <h1 class="text-xl font-semibold text-center mb-2 line-clamp-2">
          {{ news.articleTitle }}
        </h1>
        <p class="px-2 text-center text-sm text-gray-600 line-clamp-3 mb-8">
          {{ news.articleDescription }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const newsItems = ref([]);

const props = defineProps({
  grade: String,
  company: String,
  tags: String,
  publishedAfter: String,
});

const { public: publicConfig } = useRuntimeConfig();

onMounted(async () => {
  try {
    const response = await axios.get(`${publicConfig.apiBase}/news`);
    newsItems.value = response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
});

const filteredNews = computed(() => {
  return newsItems.value.filter((news) => {
    // Grade filter
    const matchesGrade = !props.grade || news.articleGrade === props.grade;

    // Company filter
    const matchesCompany =
      !props.company || news.articleCompany === props.company;

    // Tags filter
    const matchesTags =
      !props.tags ||
      news.articleTags.some((tag) =>
        tag.toLowerCase().includes(props.tags.toLowerCase()),
      );

    // Published Date filter
    const matchesPublishedAfter =
      !props.publishedAfter ||
      new Date(news.articlePublishedDate) >= new Date(props.publishedAfter);

    return (
      matchesGrade && matchesCompany && matchesTags && matchesPublishedAfter
    );
  });
});
</script>
