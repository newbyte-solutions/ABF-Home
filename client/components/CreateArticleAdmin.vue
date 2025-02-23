<template>
    <div class="py-20">
      <form @submit.prevent="handleNewArticle" class="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6 text-white text-center">Create New Article</h2>

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
          v-model="articleCompany" 
          required
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

<script>
import axios from "axios";
const { public: publicConfig } = useRuntimeConfig();

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
            try {
                const response = await axios.get(`${publicConfig.apiBase}/companies`);
                this.companies = response.data;
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        },
        handleImageChange(event) {
            this.articleImage = event.target.files[0];
            },
            async handleNewArticle() {
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