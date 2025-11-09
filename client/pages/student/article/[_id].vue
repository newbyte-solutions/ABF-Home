<template>
  <AuthCheck :isAdmin="false" :isStudent="true" :isFtf="false" />
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4"
  >
    <div v-if="article" class="max-w-3xl mx-auto">
      <div class="bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h1 class="text-3xl font-bold mb-8 text-center">Rediger Artikkel</h1>
        <form @submit.prevent="saveArticle" class="space-y-4">
          <div class="form-group">
            <label class="block mb-2 text-sm font-medium text-gray-300"
              >Tittel</label
            >
            <input
              v-model="article.articleTitle"
              type="text"
              class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div class="form-group">
            <label class="block mb-2 text-sm font-medium text-gray-300"
              >Forfatter</label
            >
            <input
              v-model="article.articleAuthor"
              type="text"
              class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div class="form-group">
            <label class="block mb-2 text-sm font-medium text-gray-300"
              >Beskrivelse</label
            >
            <textarea
              v-model="article.articleDescription"
              rows="3"
              class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
            ></textarea>
          </div>
          <div class="form-group">
            <label class="block mb-2 text-sm font-medium text-gray-300"
              >Innhold</label
            >
            <textarea
              v-model="article.articleContent"
              rows="8"
              class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
            ></textarea>
          </div>
          <div class="form-group">
            <label class="block mb-2 text-sm font-medium text-gray-300"
              >Tags</label
            >
            <input
              v-model="tagsString"
              type="text"
              class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Komma-separerte tags"
            />
          </div>

          <!-- Hidden fields -->
          <input type="hidden" v-model="article.artilceImageUrl" />
          <input type="hidden" v-model="article.articlePublishedDate" />

          <div class="flex gap-4 mt-6">
            <button
              type="button"
              @click="$router.back()"
              class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition duration-200"
            >
              Avbryt
            </button>
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            >
              Lagre endringer
            </button>
          </div>
        </form>
      </div>
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
