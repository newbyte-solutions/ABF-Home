<template>
  <div class="w-full h-fit px-0 md:px-10 flex flex-wrap gap-6 justify-center">
    <router-link
      v-for="news in filteredNews"
      :key="news._id"
      :to="`/article/${news._id}`"
      class="w-56 h-80 bg-gray-200 hover:scale-110 transition relative"
    >
      <img
        :src="news.articleImageUrl || 'https://placehold.co/300x200'"
        alt="News image"
        class="max-w-full max-h-[200px] drop-shadow-xl object-cover mx-auto"
      />
      <h1 class="text-xl font-semibold text-center my-4">
        {{ news.articleTitle }}
      </h1>
      <p class="px-2 text-center">
        {{ news.articleDescription }}
      </p>
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2"></div>
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
