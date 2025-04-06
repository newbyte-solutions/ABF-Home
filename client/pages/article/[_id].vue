<template>
  <div
    class="w-full min-h-screen bg-white drop-shadow-2xl relative flex flex-col justify-center items-center p-4 relative"
  >
    <div class="container mx-auto px-4 py-8">
      <div v-if="article">
        <div class="mb-8 flex justify-center">
          <img
            :src="article.articleImageUrl"
            alt="Article Image"
            class="h-1/4 w-1/4 md:max-w-96 object-cover rounded-lg"
          />
        </div>
        <h1
          class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center"
        >
          {{ article.articleTitle }}
        </h1>
        <div class="prose max-w-none mb-8 text-gray-700 text-xl">
          <div v-html="renderedContent"></div>
        </div>
        <div
          class="flex flex-wrap gap-4 text-sm md:text-base text-gray-600 flex absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <span class="flex items-center">
            <span class="font-semibold mr-1">Forfatter:</span>
            {{ article.articleAuthor }}
          </span>
          <span class="flex items-center">
            <span class="font-semibold mr-1">Utgitt:</span>
            {{ formatDate(article.articlePublishedDate) }}
          </span>
        </div>
      </div>
      <div v-else-if="error" class="text-center text-red-600 text-lg">
        {{ error }}
      </div>
      <div v-else class="text-center text-gray-600 text-lg">Loading...</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { marked } from "marked";

export default {
  data() {
    return {
      article: null,
      error: null,
    };
  },
  computed: {
    renderedContent() {
      return this.article ? marked(this.article.articleContent) : "";
    },
  },
  methods: {
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },
  },
  async mounted() {
    const { public: publicConfig } = useRuntimeConfig();
    try {
      const response = await axios.get(
        `${publicConfig.apiBase}/news/article/${this.$route.params._id}`,
      );
      this.article = response.data;
    } catch (error) {
      console.error("Error fetching article:", error);
      this.error = "Failed to load article";
    }
  },
};
</script>
