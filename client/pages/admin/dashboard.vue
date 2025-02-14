<template>
  <div
    class="w-full min-h-screen bg-gray-900 text-white flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 items-center justify-center p-4"
  >
    <div class="py-32">
      <form
        @submit.prevent="handleRegistration"
        class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 class="font-semibold text-4xl text-center mb-10">Ny Bruker</h2>
        <input
          required
          type="text"
          v-model="username"
          placeholder="Username"
          id="username"
          name="username"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="email"
          v-model="email"
          placeholder="Email"
          id="email"
          name="email"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="tel"
          v-model="phone"
          placeholder="Phone Number"
          id="phone"
          name="phone"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="password"
          v-model="password"
          placeholder="Password"
          id="password"
          name="password"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          required
          v-model="role"
          id="role"
          name="role"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select>
        <select
          required
          v-model="grade"
          id="userGrade"
          name="userGrade"
          class="w-full mb-6 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Velg Klasse</option>
          <option value="8">8.</option>
          <option value="9">9.</option>
          <option value="10">10.</option>
          <option value="100">Lærar</option>
        </select>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
    </div>
    <div class="py-20">
      <form
        @submit.prevent="handleNewCompany"
        class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 class="font-semibold text-4xl text-center mb-10">Ny Bedrift</h2>
        <input
          required
          type="text"
          v-model="companyName"
          placeholder="Company Name"
          id="companyName"
          name="companyName"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="email"
          v-model="companyEmail"
          placeholder="Email"
          id="companyEmail"
          name="companyEmail"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="tel"
          v-model="companyPhone"
          placeholder="Phone Number"
          id="companyPhone"
          name="companyPhone"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="text"
          v-model="contactPerson"
          placeholder="Contact Person"
          id="contactPerson"
          name="contactPerson"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="date"
          v-model="companyRegistrationDate"
          id="companyRegistrationDate"
          name="companyRegistrationDate"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          @change="handleLogoUpload"
          accept="image/*"
          id="companyLogo"
          name="companyLogo"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />
        <select
          required
          v-model="companyGrade"
          id="companyGrade"
          name="companyGrade"
          class="w-full mb-6 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Velg Klasse</option>
          <option value="8">8.</option>
          <option value="9">9.</option>
          <option value="10">10.</option>
          <option value="100">Lærar</option>
        </select>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
    </div>
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
            {{ company.name }}
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      grade: "",
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      contactPerson: "",
      companyRegistrationDate: "",
      companyGrade: "",
      companyLogo: null,
      articleTitle: "",
      articleDescription: "",
      articleTags: "",
      articleContent: "",
      articleImage: null,
      articleAuthor: "",
      articleCompany: "",
      articleGrade: "",
      companies: [],
    };
  },
  async created() {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/check_admin",
        {
          withCredentials: true,
        },
      );
      if (response.data.role !== "admin") {
        this.$router.push("/");
      }
      // Fetch companies for the dropdown
      const companiesResponse = await axios.get(
        "http://localhost:5000/company/companies",
        {
          withCredentials: true,
        },
      );
      this.companies = companiesResponse.data;
    } catch (error) {
      console.error("Authorization check failed:", error);
      this.$router.push("/");
    }
  },
  methods: {
    async handleRegistration() {
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/register",
          {
            username: this.username,
            email: this.email,
            password: this.password,
            phone: this.phone,
            role: this.role,
            grade: this.grade,
          },
          {
            withCredentials: true,
          },
        );

        if (response.data) {
          this.username = "";
          this.email = "";
          this.password = "";
          this.phone = "";
          this.role = "";
          this.grade = "";

          alert("Registration successful!");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        alert(error.response?.data?.message || "Registration failed");
      }
    },
    handleLogoUpload(event) {
      this.companyLogo = event.target.files[0];
    },
    async handleNewCompany() {
      try {
        const formData = new FormData();
        formData.append("companyName", this.companyName);
        formData.append("companyEmail", this.companyEmail);
        formData.append("companyPhone", this.companyPhone);
        formData.append("companyContactPerson", this.contactPerson);
        formData.append(
          "companyRegistrationDate",
          this.companyRegistrationDate,
        );
        formData.append("companyGrade", this.companyGrade);

        if (this.companyLogo) {
          formData.append("companyLogo", this.companyLogo);
        }

        const response = await axios.post(
          "http://localhost:5000/company/register_company",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        if (response.data) {
          this.companyName = "";
          this.companyEmail = "";
          this.companyPhone = "";
          this.companyContactPerson = "";
          this.companyRegistrationDate = "";
          this.companyGrade = "";
          this.companyLogo = null;

          alert("Company registration successful!");
        }
      } catch (error) {
        console.error("Company registration failed:", error);
        alert(error.response?.data?.message || "Company registration failed");
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
          "http://localhost:5000/news/new_article",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
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
