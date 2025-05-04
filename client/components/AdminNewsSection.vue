<template>
  <div class="w-full min-h-screen flex">
    <div class="container mx-auto">
      <h1 class="text-center text-3xl font-semibold mb-10">News</h1>
      <ul class="space-y-6">
        <li v-for="article in articles" :key="article._id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="flex flex-col md:flex-row">
            <div class="p-6 md:w-1/3">
              <h2 class="text-2xl text-gray-900 font-bold mb-4">{{ article.articleTitle }}</h2>
              <div class="mb-3 text-lg font-semibold text-gray-800">{{ article.articleDescription }}</div>
              <div class="text-sm text-gray-600 mb-2">Author: {{ article.articleAuthor }}</div>
              <div class="text-sm text-gray-600 mb-2">Company: {{ article.articleCompany }}</div>
              <div class="text-sm text-gray-600 mb-2">Tags: {{ article.articleTags }}</div>
              <div class="text-sm text-gray-500 mb-4 font-semibold">
                Published: {{ new Date(article.articlePublishedDate).toLocaleDateString() }}
              </div>
              <button @click="deleteArticle(article._id)" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </div>
            <div class="p-6 md:w-2/3 border-t md:border-t-0 md:border-l border-gray-200">
              <div v-html="article.articleContent" class="prose max-w-none"></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const articles = ref([]);

    const deleteArticle = async (id) => {
      const { public: publicConfig } = useRuntimeConfig();
      console.log("Attempting to delete article with ID:", id);

      if (!id) {
        console.error("Error: Article ID is undefined.");
        return;
      }

      try {
        await axios.delete(`${publicConfig.apiBase}/news/article/${id}`, { withCredentials: true });
        articles.value = articles.value.filter((article) => article.id !== id);
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    };

    onMounted(async () => {
      const { public: publicConfig } = useRuntimeConfig();
      try {
        const response = await axios.get(`${publicConfig.apiBase}/news/`);
        articles.value = response.data;
      } catch (error) {
        console.error("Error fetching news:", error);
        articles.value = [];
      }
    });

    return {
      articles,
      deleteArticle
    };
  }
};
</script>