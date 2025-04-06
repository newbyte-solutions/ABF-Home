<template>
    <div class="py-20">
      <form
        @submit.prevent="handleNewArticle"
        class="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg"
      >
        <h2 class="text-2xl font-bold mb-6 text-white text-center">
          Create New Article
        </h2>
  
        <input
          v-model="articleTitle"
          type="text"
          placeholder="Article Title"
          required
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="articleDescription"
          type="text"
          placeholder="Description"
          required
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          v-model="articleContent"
          placeholder="Content"
          required
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
        ></textarea>
  
        <input
          v-model="articleAuthor"
          type="text"
          placeholder="Author"
          required
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
  
        <select
          v-model="articleGrade"
          required
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Grade</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="teacher">Teacher</option>
        </select>
  
        <input
          v-model="articleTags"
          type="text"
          placeholder="Tags (comma separated)"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
  
        <input
          type="file"
          @change="handleImageChange"
          accept="image/*"
          class="w-full mb-6 p-2 rounded bg-gray-700 text-white"
        />
  
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Article
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const props = defineProps({
      companyId: {
          type: String,
          required: true
      }
  });
  
  const articleTitle = ref("");
  const articleDescription = ref("");
  const articleContent = ref("");
  const articleAuthor = ref("");
  const articleCompany = ref(props.companyId || '');  // This was the issue
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
  