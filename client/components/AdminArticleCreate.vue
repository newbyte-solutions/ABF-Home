<template>
  <div class="py-20 px-4">
    <form
      @submit.prevent="handleNewArticle"
      class="max-w-5xl mx-auto p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700"
    >
      <h2 class="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Create New Article
      </h2>
      <p class="text-center text-gray-400 mb-8 text-sm">Share your story with the community</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label for="articleTitle" class="block text-sm font-medium text-gray-300 mb-2">Article Title</label>
          <input
            v-model="articleTitle"
            type="text"
            placeholder="Enter a compelling title"
            required
            id="articleTitle"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div class="md:col-span-2">
          <label for="articleDescription" class="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <input
            v-model="articleDescription"
            type="text"
            placeholder="Brief overview of the article"
            required
            id="articleDescription"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div class="md:col-span-2">
          <label for="articleContent" class="block text-sm font-medium text-gray-300 mb-2">Content</label>
          <textarea
            v-model="articleContent"
            placeholder="Write your article content here..."
            required
            id="articleContent"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 h-40 resize-y"
          ></textarea>
        </div>
        <div>
          <label for="articleAuthor" class="block text-sm font-medium text-gray-300 mb-2">Author</label>
          <input
            v-model="articleAuthor"
            type="text"
            placeholder="Author name"
            required
            id="articleAuthor"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label for="articleCompany" class="block text-sm font-medium text-gray-300 mb-2">Company</label>
          <select
            v-model="articleCompany"
            required
            id="articleCompany"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 cursor-pointer"
          >
            <option value="">Select Company</option>
            <option
              v-for="company in companies"
              :key="company._id"
              :value="company._id"
            >
              {{ company.companyName }}
            </option>
            <option value="global">Global</option>
          </select>
        </div>
        <div>
          <label for="articleGrade" class="block text-sm font-medium text-gray-300 mb-2">Grade</label>
          <select
            v-model="articleGrade"
            required
            id="articleGrade"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 cursor-pointer"
          >
            <option value="">Select Grade</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div>
          <label for="articleTags" class="block text-sm font-medium text-gray-300 mb-2">Tags</label>
          <input
            v-model="articleTags"
            type="text"
            placeholder="e.g., technology, innovation, news (comma separated)"
            id="articleTags"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div class="md:col-span-2">
          <label for="articleImage" class="block text-sm font-medium text-gray-300 mb-2">Article Image (optional)</label>
          <input
            type="file"
            @change="handleImageChange"
            accept="image/*"
            id="articleImage"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer transition duration-200"
          />
        </div>
      </div>
      
      <button
        type="submit"
        class="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
      >
        Create Article
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      articleTitle: "",
      articleDescription: "",
      articleContent: "",
      articleAuthor: "",
      articleCompany: "",
      articleGrade: "",
      articleTags: "",
      articleImage: null,
      companies: [],
    };
  },
  mounted() {
    this.fetchCompanies();
  },
  methods: {
    async fetchCompanies() {
      const { public: publicConfig } = useRuntimeConfig();
      try {
        const response = await axios.get(`${publicConfig.apiBase}/company/`);
        this.companies = response.data;
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    },
    handleImageChange(event) {
      this.articleImage = event.target.files[0];
    },
    async handleNewArticle() {
      const { public: publicConfig } = useRuntimeConfig();
      const formData = new FormData();
      formData.append("articleTitle", this.articleTitle);
      formData.append("articleDescription", this.articleDescription);
      formData.append("articleContent", this.articleContent);
      formData.append("articleAuthor", this.articleAuthor);
      formData.append("articleCompany", this.articleCompany);
      formData.append("articleGrade", this.articleGrade);
      formData.append("articleTags", this.articleTags);

      if (this.articleImage) {
        formData.append("articleImage", this.articleImage);
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
        this.resetForm();
      } catch (error) {
        console.error("Error creating article:", error);
        alert("Failed to create article. Please try again.");
      }
    },
    resetForm() {
      this.articleTitle = "";
      this.articleDescription = "";
      this.articleContent = "";
      this.articleAuthor = "";
      this.articleCompany = "";
      this.articleGrade = "";
      this.articleTags = "";
      this.articleImage = null;
    },
  },
};
</script>
