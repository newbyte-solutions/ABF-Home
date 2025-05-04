<template>
  <div class="p-5">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto"
    >
      <div
        v-for="article in filteredNews"
        :key="article._id"
        class="bg-white rounded-lg p-5 shadow-md"
      >
        <h3 class="mt-0 mb-2.5">{{ article.articleTitle }}</h3>
        <p>{{ article.articleDescription }}</p>
        <span class="text-gray-600 text-sm">{{
          formatDate(article.articlePublishedDate)
        }}</span>
      </div>
    </div>
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
  console.log("Raw articles from API:", response.data);

  console.log("Fetching news for company:", props.companyId);
  try {
    const response = await axios.get(`${publicConfig.apiBase}/news/`);
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
