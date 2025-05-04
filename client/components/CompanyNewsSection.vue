<template>
  <h2 class="text-center text-2xl font-semibold my-4">Nyheter</h2>
  <div
    class="w-full h-fit px-4 md:px-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10"
  >
    <router-link
      v-for="article in filteredNews"
      :key="article._id"
      :to="`/article/${article._id}`"
      class="w-full md:w-auto"
    >
      <div
        class="w-full md:w-56 h-auto md:max-h-96 bg-gray-50 hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg border border-gray-200 p-4"
      >
        <img
          :src="article.articleImageUrl || 'https://placehold.co/300x200'"
          alt="Article image"
          class="w-full h-[200px] object-cover object-center rounded-md mb-4"
        />
        <h1 class="text-xl font-semibold text-center mb-2 line-clamp-2">
          {{ article.articleTitle }}
        </h1>
        <p class="px-2 text-center text-sm text-gray-600 line-clamp-3 mb-6">
          {{ article.articleDescription }}
        </p>
        <span class="block text-center text-xs text-gray-500">
          {{ formatDate(article.articlePublishedDate) }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  companyId: {
    type: String,
    required: true,
  },
});

const articles = ref([]);

const filteredNews = computed(() => {
  console.log("Filtering news articles, current count:", articles.value.length);
  return articles.value.slice(0, 3);
});

const fetchNews = async () => {
  const { public: publicConfig } = useRuntimeConfig();
  console.log("Company ID from props:", props.companyId);

  console.log("Fetching news for company:", props.companyId);
  try {
    const response = await axios.get(`${publicConfig.apiBase}/news/`);
    console.log("Raw articles from API:", response.data);

    console.log(
      "News API response received:",
      response.data.length,
      "articles",
    );
    articles.value = response.data.filter(
      (item) => item.articleCompany === props.companyId,
    );
    console.log("Filtered articles for company:", articles.value.length);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

const formatDate = (date) => {
  console.log("Formatting date:", date);
  return new Date(date).toLocaleDateString();
};

onMounted(() => {
  console.log("Component mounted, initiating news fetch");
  fetchNews();
});
</script>
