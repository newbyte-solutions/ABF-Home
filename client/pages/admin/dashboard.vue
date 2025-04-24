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
  <div class="w-full min-h-screen bg-gray-900 text-white flex flex-col space-y-6 items center justify-center p-4">
    <AdminCompanySection />
  </div>
  <div class="w-full min-h-screen bg-gray-900 text-white flex flex-col space-y-6 items center justify-center p-4">
    <AdminUserManager />
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
        const response = await axios.get(`${publicConfig.apiBase}/auth/me`, {
          withCredentials: true,
        });
        this.name = response.data.user.name;
        this.email = response.data.user.email;
        this.username = response.data.user.username;
        this.grade = response.data.user.grade;
        this.phone = response.data.user.phone;
        this.role = response.data.user.role;
        this.id = response.data.user.id;

        if (response.data.user.role !== "admin") {
          this.$router.push("/");
          console.log("Not an admin, redirecting to home page.");
          return;
        }
      } catch (error) {
        console.error("error fetching user:", error);
        this.$router.push("/");
        console.log("Error fetching user, redirecting to home page.");
      }
    },  
  };
</script>