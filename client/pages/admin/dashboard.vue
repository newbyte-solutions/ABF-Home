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
      <form
        @submit.prevent="handleNewArticle"
        class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 class="font-semibold text-4xl text-center mb-10">Ny Artikkel</h2>
        <input
          required
          type="text"
          v-model="articleTitle"
          placeholder="Title"
          id="articleTitle"
          name="articleTitle"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="text"
          v-model="articleDescription"
          placeholder="Description"
          id="articleDescription"
          name="articleDescription"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          required
          type="text"
          v-model="articleTags"
          placeholder="Tags (comma separated)"
          id="articleTags"
          name="articleTags"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          required
          v-model="articleContent"
          placeholder="Content"
          id="articleContent"
          name="articleContent"
          rows="6"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <input
          type="file"
          @change="handleImageUpload"
          accept="image/*"
          id="articleImage"
          name="articleImage"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />
        <input
          required
          type="text"
          v-model="articleAuthor"
          placeholder="Author"
          id="articleAuthor"
          name="articleAuthor"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          required
          v-model="articleCompany"
          id="articleCompany"
          name="articleCompany"
          class="w-full mb-4 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Company</option>
          <option
            v-for="company in companies"
            :key="company.id"
            :value="company.id"
          >
            {{ company.name }}
          </option>
        </select>
        <select
          required
          v-model="articleGrade"
          id="articleGrade"
          name="articleGrade"
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
        formData.append("email", this.companyEmail);
        formData.append("phone", this.companyPhone);
        formData.append("contactPerson", this.contactPerson);
        formData.append("registrationDate", this.companyRegistrationDate);
        formData.append("grade", this.companyGrade);

        if (this.companyLogo) {
          formData.append("companyLogo", this.companyLogo);
        }

        const response = await axios.post(
          "http://localhost:5000/company/register-company",
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
    handleImageUpload(event) {
      this.articleImage = event.target.files[0];
    },
    async handleNewArticle() {
      try {
        const formData = new FormData();
        formData.append("title", this.articleTitle);
        formData.append("description", this.articleDescription);
        formData.append("tags", this.articleTags);
        formData.append("content", this.articleContent);
        formData.append("author", this.articleAuthor);
        formData.append("company", this.articleCompany);
        formData.append("grade", this.articleGrade);

        if (this.articleImage) {
          formData.append("image", this.articleImage);
        }

        const response = await axios.post(
          "http://localhost:5000/articles/create",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        if (response.data) {
          this.articleTitle = "";
          this.articleDescription = "";
          this.articleTags = "";
          this.articleContent = "";
          this.articleAuthor = "";
          this.articleCompany = "";
          this.articleGrade = "";
          this.articleImage = null;

          alert("Article created successfully!");
        }
      } catch (error) {
        console.error("Article creation failed:", error);
        alert(error.response?.data?.message || "Article creation failed");
      }
    },
  },
};
</script>
