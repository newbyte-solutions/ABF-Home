<template>
  <div class="w-full min-h-screen flex">
    <div class="container mx-auto p-4">
      <ul class="divide-y divide-gray-200 border-t border-b">
        <li
          v-for="article in articles"
          :key="article.id"
          class="mb-6 prose py-6"
        >
          <h2 class="text-2xl font-bold mb-2">{{ article.articleTitle }}</h2>
          <div>{{ article.articleDescription }}</div>
          <div v-html="article.articleContent"></div>
          <div>{{ article.articleTags }}</div>
          <div>{{ article.articleAuthor }}</div>
          <div>{{ article.articleCompany }}</div>
          <div class="text-sm text-gray-500 mt-2">
            Published:
            {{ new Date(article.articlePublishedDate).toLocaleDateString() }}
          </div>
          <form @submit.prevent="deleteArticle(article.id)">
            <input type="hidden" name="id" value="article.id" id="id" />
            <button type="submit">Delete</button>
          </form>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const { public: publicConfig } = useRuntimeConfig();

export default {
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    renderedContent() {
      return this.article ? marked(this.article.articleContent) : "";
    },
  },
  methods: {
    async deleteArticle(id) {
      try {
        await axios.delete(
          `${publicConfig.apiBase}/news/article/${id}`,
          {
          withCredentials: true,
        });
        this.articles = this.articles.filter((article) => article.id !== id);
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    },
  },
  async created() {
    try {
      const response = await axios.get(
        `${publicConfig.apiBase}/news/`,
        {
        withCredentials: true,
      }
    );
      this.articles = response.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  },
};
</script>
