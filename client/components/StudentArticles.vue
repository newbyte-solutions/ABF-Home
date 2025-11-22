<template>
  <div class="w-full">
    <div class="space-y-4">
      <div
        v-if="filteredArticles.length === 0"
        class="text-center py-12 text-gray-400"
      >
        <p class="text-lg">Ingen artikkler ennå</p>
      </div>
      <div
        v-for="article in filteredArticles"
        :key="article._id"
        class="bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
      >
        <div class="p-6">
          <h3 class="text-xl font-bold mb-3 text-white">
            {{ article.articleTitle }}
          </h3>
          <div class="text-gray-300 mb-3">
            {{ article.articleDescription }}
          </div>
          <div class="flex flex-wrap gap-2 mb-3">
            <span
              v-for="tag in typeof article.articleTags === 'string'
                ? article.articleTags.split(',')
                : article.articleTags"
              :key="tag"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30"
            >
              {{ tag.trim() }}
            </span>
          </div>
          <div class="text-sm text-gray-400 mb-4 flex items-center space-x-4">
            <span class="flex items-center">
              <svg
                class="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {{ article.articleAuthor }}
            </span>
            <span class="flex items-center">
              <svg
                class="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {{ formatDate(article.articlePublishedDate) }}
            </span>
          </div>
          <div class="flex gap-2">
            <button
              @click="$router.push(`/student/article/${article._id}`)"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 font-medium"
            >
              Rediger
            </button>
            <button
              @click="confirmDelete(article._id)"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 font-medium"
            >
              Slett
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BaseConfirmationModal
    :visible="isVisible"
    :title="title"
    :message="message"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import BaseConfirmationModal from "@/components/BaseConfirmationModal.vue";
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

const { formatDate } = useFormatDate();

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
