<template>
  <div class="w-full min-h-screen flex">
    <div class="container mx-auto">
      <h1 class="text-center text-3xl font-semibold mb-10">News</h1>
      <ul class="space-y-6">
        <li
          v-for="article in articles"
          :key="article._id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div class="flex flex-col md:flex-row">
            <div class="p-6 md:w-1/3">
              <h2 class="text-2xl text-gray-900 font-bold mb-4">
                {{ article.articleTitle }}
              </h2>
              <div class="mb-3 text-lg font-semibold text-gray-800">
                {{ article.articleDescription }}
              </div>
              <div class="text-sm text-gray-600 mb-2">
                Author: {{ article.articleAuthor }}
              </div>
              <div class="text-sm text-gray-600 mb-2">
                Company: {{ article.articleCompany }}
              </div>
              <div class="text-sm text-gray-600 mb-2">
                Tags: {{ article.articleTags }}
              </div>
              <div class="text-sm text-gray-500 mb-4 font-semibold">
                Published:
                {{
                  new Date(article.articlePublishedDate).toLocaleDateString()
                }}
              </div>
              <button
                @click="confirmDelete(article._id)"
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                @click="$router.push(`/admin/article/${article._id}`)"
                class="px-4 py-2 bg-blue-500 ml-2 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
            <div
              class="p-6 md:w-2/3 border-t md:border-t-0 md:border-l border-gray-200"
            >
              <div
                v-html="article.articleContent"
                class="prose max-w-none"
              ></div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <ConfirmationModal
      :visible="isVisible"
      :title="title"
      :message="message"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useConfirmation } from "@/composables/useConfirmation";
import ConfirmationModal from "@/components/ConfirmationModal.vue";

const router = useRouter();
const articles = ref([]);

const { isVisible, title, message, confirm, onConfirm, onCancel } =
  useConfirmation();

async function confirmDelete(id) {
  const result = await confirm(
    "Confirm Deletion",
    "Are you sure you want to delete this article?",
  );
  if (result) {
    await deleteArticle(id);
  }
}

async function deleteArticle(id) {
  const { public: publicConfig } = useRuntimeConfig();

  if (!id) {
    console.error("Error: Article ID is undefined.");
    return;
  }

  try {
    await axios.delete(`${publicConfig.apiBase}/news/article/${id}`, {
      withCredentials: true,
    });
    articles.value = articles.value.filter((article) => article._id !== id);
  } catch (error) {
    console.error("Error deleting article:", error);
  }
}

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
</script>
