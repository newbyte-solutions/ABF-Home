<template>
    <div class="w-full min-h-screen flex-col">
      <div class="w-full flex items-center justify-center py-4 bg-gray-800 text-white">
        <h1 class="font-bold text-2xl">Artikkler</h1>
      </div>
      <div class="w-full mx-auto p-4 flex flex-row">
        <ul class="divide-y divide-gray-200 ">
          <li v-for="article in filteredArticles" :key="article._id" class="mb-6 prose py-6 text-white">
            <h2 class="text-2xl font-bold mb-2 text-white">{{ article.articleTitle }}</h2>
            <div>{{ article.articleDescription }}</div>
            <div v-html="article.articleContent"></div>
            <div>Tags: {{ article.articleTags }}</div>
            <div>Forfatter: {{ article.articleAuthor }}</div>
            <div class="text-sm text-white mt-2">
              Published: {{ new Date(article.articlePublishedDate).toLocaleDateString() }}
            </div>
            <button @click="deleteArticle(article._id)" class="text-red-500">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const props = defineProps({
    companyId: {
      type: String,
      required: true,
    },
  });
  
  const articles = ref([]);
  const filteredArticles = ref([]);
  
  const fetchArticles = async () => {
      const { public: publicConfig } = useRuntimeConfig();
      try {
          const response = await axios.get(`${publicConfig.apiBase}/news/`, { withCredentials: true });
          articles.value = response.data;
          filteredArticles.value = articles.value.filter(article => article.articleCompany === props.companyId); 
      } catch (error) {
          console.error('Error fetching articles:', error);
      }
  };
  
  onMounted(() => {
      fetchArticles();
  });
  
  const deleteArticle = async (articleId) => {
      const { public: publicConfig } = useRuntimeConfig();
      try {
          await axios.delete(`${publicConfig.apiBase}/news/article/${articleId}`);
          await fetchArticles();
      } catch (error) {
          console.error('Error deleting article:', error);
      }
  };
  </script>
  