<template>
  <AuthCheck :isAdmin="true" :isStudent="false" :isFtf="false" />
  <div class="w-full mx-auto p-4 bg-gray-900 min-h-screen">
    <div v-if="article" class="max-w-2xl mx-auto py-20">
      <h1 class="text-2xl font-bold mb-6 text-center text-white">Edit Article</h1>
      <form @submit.prevent="saveArticle" class="space-y-4">
        <div class="form-group">
          <label class="block mb-1 text-white">Title</label>
          <input
            v-model="article.articleTitle"
            type="text"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Author</label>
          <input
            v-model="article.articleAuthor"
            type="text"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Description</label>
          <textarea
            v-model="article.articleDescription"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Content</label>
          <textarea
            v-model="article.articleContent"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Tags</label>
          <input
            v-model="tagsString"
            type="text"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
            placeholder="Comma-separated tags"
          />
        </div>

        <!-- Hidden fields -->
        <input type="hidden" v-model="article.artilceImageUrl" />
        <input type="hidden" v-model="article.articlePublishedDate" />

        <div class="flex justify-center mt-4">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const route = useRoute();
const config = useRuntimeConfig();

const article = ref(null);
const tagsString = ref("");

const fetchArticle = async () => {
  try {
    const res = await axios.get(
      `${config.public.apiBase}/news/article/${route.params._id}`,
      {
        withCredentials: true,
      },
    );
    article.value = res.data;
    tagsString.value = (res.data.articleTags || []).join(", ");
    console.log("Fetched article:", article.value);
  } catch (err) {
    console.error("Failed to fetch article:", err);
  }
};

const saveArticle = async () => {
  if (!article.value) return;

  try {
    const articleData = { ...article.value };
    articleData.articleTags = tagsString.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    await axios.put(
      `${config.public.apiBase}/news/article/${route.params._id}`,
      articleData,
      { withCredentials: true },
    );
    alert("Article updated successfully");
  } catch (err) {
    console.error("Error updating article:", err);
    alert("Error updating article");
  }
};

await fetchArticle();
</script>
