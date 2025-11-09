<template>
  <div class="py-20">
    <form
      @submit.prevent="handleNewArticle"
      class="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 class="text-2xl font-bold mb-6 text-white text-center">
        Ny artikkel
      </h2>

      <label for="articleTitle" class="block mb-1 text-white">Artikkel tittel</label>
      <input
        v-model="articleTitle"
        id="articleTitle"
        type="text"
        placeholder="Artikkel tittel"
        required
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label for="articleDescription" class="block mb-1 text-white">Beskrivelse</label>
      <input
        v-model="articleDescription"
        id="articleDescription"
        type="text"
        placeholder="Beskrivelse"
        required
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label for="articleContent" class="block mb-1 text-white">Innhold (Markdown Support)</label>
      <textarea
        v-model="articleContent"
        id="articleContent"
        placeholder="Innhold"
        required
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
      ></textarea>

      <label for="articleAuthor" class="block mb-1 text-white">Forfatter</label>
      <input
        v-model="articleAuthor"
        id="articleAuthor"
        type="text"
        placeholder="Forfatter"
        required
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <label for="articleGrade" class="block mb-1 text-white">Klasse</label>
      <select
        v-model="articleGrade"
        id="articleGrade"
        required
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Velg klasse</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="teacher">Lærer</option>
      </select>

      <label for="articleTags" class="block mb-1 text-white">Tags</label>
      <input
        v-model="articleTags"
        id="articleTags"
        type="text"
        placeholder="Tags (komma-separert)"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label for="articleImage" class="block mb-1 text-white">Bilde</label>
      <input
        id="articleImage"
        type="file"
        @change="handleImageChange"
        accept="image/*"
        class="w-full mb-6 p-2 rounded bg-gray-700 text-white"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Opprett artikkel
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const props = defineProps({
  companyId: {
    type: String,
    required: true,
  },
});

const articleTitle = ref("");
const articleDescription = ref("");
const articleContent = ref("");
const articleAuthor = ref("");
const articleCompany = ref(props.companyId || ""); // This was the issue
const articleGrade = ref("");
const articleTags = ref("");
const articleImage = ref(null);

const handleImageChange = (event) => {
  articleImage.value = event.target.files[0];
};

const handleNewArticle = async () => {
  const { public: publicConfig } = useRuntimeConfig();
  const formData = new FormData();
  formData.append("articleTitle", articleTitle.value);
  formData.append("articleDescription", articleDescription.value);
  formData.append("articleContent", articleContent.value);
  formData.append("articleAuthor", articleAuthor.value);
  formData.append("articleCompany", articleCompany.value);
  formData.append("articleGrade", articleGrade.value);
  formData.append("articleTags", articleTags.value);

  if (articleImage.value) {
    formData.append("articleImage", articleImage.value);
  }

  try {
    const response = await axios.post(
      `${publicConfig.apiBase}/news/new_article`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    alert("Article created successfully!");
    resetForm();
  } catch (error) {
    console.error("Error creating article:", error);
    alert("Failed to create article. Please try again.");
  }
};

const resetForm = () => {
  articleTitle.value = "";
  articleDescription.value = "";
  articleContent.value = "";
  articleAuthor.value = "";
  articleCompany.value = props.companyId;
  articleGrade.value = "";
  articleTags.value = "";
  articleImage.value = null;
};
</script>
