<template>
  <div
    class="w-full min-h-screen bg-gray-900 text-white flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 items-center justify-center p-4"
  >
    <RegisterUser />
    <RegisterCompany />
    <CreateArticleAdmin />
  </div>
</template>

<script>
import axios from "axios";
const { public: publicConfig } = useRuntimeConfig();

export default {
  data() {
    return {
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      contactPerson: "",
      companyFounded: "",
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
        `${publicConfig.apiBase}/auth/check_admin`,
        {
          withCredentials: true,
        },
      );
      if (response.data.role !== "admin") {
        this.$router.push("/");
      }
      // Fetch companies for the dropdown
      const companiesResponse = await axios.get(
        `${publicConfig.apiBase}/company/`,
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
          `${publicConfig.apiBase}/auth/register`,
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
          "companyFounded",
          this.companyFounded,
        );
        formData.append("companyGrade", this.companyGrade);

        if (this.companyLogo) {
          formData.append("companyLogo", this.companyLogo);
        }

        const response = await axios.post(
          `${publicConfig.apiBase}/company/new_company`,
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
          this.companyFounded = "";
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
