<template>
  <div
    class="w-full min-h-screen bg-gray-900 text-white flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 items-center justify-center p-4"
  >
    <RegisterUser />
    <RegisterCompany />
    <CreateArticleAdmin />
  </div>
  <div class="w-full min-h-screen bg-gray-900 text-white flex flex-col space-y-6 items center justify-center p-4">
    <AdminNewsSection />
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        username: "",
        email: "",
        grade: "",
        phone: "",
        role: "",
        id: "",
        company: "",
        companyId: "",
      };
    },
    async mounted() {
      const { public: publicConfig } = useRuntimeConfig();
      try {
        const response = await axios.get(
          `${publicConfig.apiBase}/company/get_company`,
          {
            withCredentials: true,
          },
        );
        this.company = response.data.company;
        this.companyId = response.data.companyId;
      } catch (error) {
        console.error("Error fetching company:", error);
        alert("Failed to fetch company information. Please check your credentials.");
      }
      try {
        const response = await axios.get(`${publicConfig.apiBase}/auth/me`, {
          withCredentials: true,
        });
        this.name = response.data.name;
        this.email = response.data.email;
        this.username = response.data.username;
        this.grade = response.data.grade;
        this.phone = response.data.phone;
        this.role = response.data.role;
        this.id = response.data.id;

        if (this.role !== 'admin') {
          this.$router.push('/');
          alert("Access denied. Admin privileges required.");
        }
      } catch (error) {
        console.error("error fetching user:", error);
        alert("Failed to authenticate user. Please check your credentials.");
      }
    },  
  };
</script>