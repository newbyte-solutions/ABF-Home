<template>
  <div class="w-full">
    <form
      @submit.prevent="handleNewArticle"
      class="space-y-4"
    >

      <div>
        <label for="articleTitle" class="block mb-2 text-sm font-medium text-gray-300">Artikkel tittel</label>
        <input
          v-model="articleTitle"
          id="articleTitle"
          type="text"
          placeholder="Artikkel tittel"
          required
          class="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
      <div>
        <label for="articleDescription" class="block mb-2 text-sm font-medium text-gray-300">Beskrivelse</label>
        <input
          v-model="articleDescription"
          id="articleDescription"
          type="text"
          placeholder="Beskrivelse"
          required
          class="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
      <div>
        <label for="articleContent" class="block mb-2 text-sm font-medium text-gray-300">Innhold (Markdown Support)</label>
        <textarea
          v-model="articleContent"
          id="articleContent"
          placeholder="Innhold"
          required
          rows="6"
          class="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
        ></textarea>
      </div>

      <div>
        <label for="articleAuthor" class="block mb-2 text-sm font-medium text-gray-300">Forfatter</label>
        <input
          v-model="articleAuthor"
          id="articleAuthor"
          type="text"
          placeholder="Forfatter"
          required
          class="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
      
      <div>
        <label for="articleGrade" class="block mb-2 text-sm font-medium text-gray-300">Klasse</label>
        <select
          v-model="articleGrade"
          id="articleGrade"
          required
          class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 cursor-pointer"
        >
          <option value="">Velg klasse</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="teacher">Lærer</option>
        </select>
      </div>

      <div>
        <label for="articleTags" class="block mb-2 text-sm font-medium text-gray-300">Tags</label>
        <input
          v-model="articleTags"
          id="articleTags"
          type="text"
          placeholder="Tags (komma-separert)"
          class="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>

      <div>
        <label for="articleImage" class="block mb-2 text-sm font-medium text-gray-300">Bilde</label>
        <input
          id="articleImage"
          type="file"
          @change="handleImageChange"
          accept="image/*"
          class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer transition duration-200"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
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
