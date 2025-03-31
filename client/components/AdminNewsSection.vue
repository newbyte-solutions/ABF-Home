<template>
  <div class="w-full min-h-screen flex">
    <div class="container mx-auto p-4">
      <ul class="divide-y divide-gray-200 border-t border-b">
        <li v-for="article in articles" :key="article._id" class="mb-6 prose py-6">
          <h2 class="text-2xl font-bold mb-2">{{ article.articleTitle }}</h2>
          <div>{{ article.articleDescription }}</div>
          <div v-html="article.articleContent"></div>
          <div>{{ article.articleTags }}</div>
          <div>{{ article.articleAuthor }}</div>
          <div>{{ article.articleCompany }}</div>
          <div class="text-sm text-gray-500 mt-2">
            Published: {{ new Date(article.articlePublishedDate).toLocaleDateString() }}
          </div>
          <!-- Changed form to direct button click -->
          <button @click="deleteArticle(article._id)" class="text-red-500">Delete</button>
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