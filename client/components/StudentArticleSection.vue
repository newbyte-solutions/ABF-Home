<template>
  <div class="w-full min-h-screen flex-col">
    <div
      class="w-full flex items-center justify-center py-4 bg-gray-800 text-white"
    >
      <h1 class="font-bold text-2xl">Artikkler</h1>
    </div>
    <div class="container mx-auto p-4">
      <div class="flex flex-col gap-6">
        <div
          v-for="article in filteredArticles"
          :key="article._id"
          class="bg-white rounded-lg shadow-lg overflow-hidden w-full"
        >
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">
              {{ article.articleTitle }}
            </h2>
            <div class="text-gray-600 mb-4">
              {{ article.articleDescription }}
            </div>
            <div class="prose mb-4" v-html="article.articleContent"></div>
            <div class="text-gray-600 mb-2">
              Tags: {{ article.articleTags }}
            </div>
            <div class="text-gray-600 mb-2">
              Forfatter: {{ article.articleAuthor }}
            </div>
            <div class="text-sm text-gray-500 mb-4">
              Gitt ut:
              {{ new Date(article.articlePublishedDate).toLocaleDateString() }}
            </div>
            <button
              @click="confirmDelete(article._id)"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Slett
            </button>
            <button
              @click="$router.push(`/student/article/${article._id}`)"
              class="px-4 py-2 bg-blue-500 ml-2 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
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
import axios from "axios";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { useConfirmation } from "@/composables/useConfirmation";

const props = defineProps({
  companyId: {
    type: String,
    required: true,
  },
});

const articles = ref([]);
const filteredArticles = ref([]);

const { isVisible, title, message, confirm, onConfirm, onCancel } =
  useConfirmation();

const fetchArticles = async () => {
  const { public: publicConfig } = useRuntimeConfig();
  try {
    const response = await axios.get(`${publicConfig.apiBase}/news/`, {
      withCredentials: true,
    });
    articles.value = response.data;
    filteredArticles.value = articles.value.filter(
      (article) => article.articleCompany === props.companyId,
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

const confirmDelete = async (articleId) => {
  const result = await confirm(
    "Bekreft sletting",
    "Er du sikker på at du vil slette denne artikkelen?",
  );
  if (result) {
    await deleteArticle(articleId);
  }
};

const deleteArticle = async (articleId) => {
  const { public: publicConfig } = useRuntimeConfig();
  try {
    await axios.delete(`${publicConfig.apiBase}/news/article/${articleId}`);
    await fetchArticles();
  } catch (error) {
    console.error("Error deleting article:", error);
  }
};

onMounted(() => {
  fetchArticles();
});
</script>
