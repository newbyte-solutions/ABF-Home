<template>
  <AuthCheck :isAdmin="false" :isStudent="true" :isFtf="false" />
  <div class="w-full min-h-screen bg-gray-900 text-white py-14">
    <div class="w-full h-fit py-10 flex flex-col items-center justify-center">
      <h1 class="text-4xl font-semibold border-b-2 border-blue-500 pb-2 px-4">
        Elev Portal
      </h1>
    </div>

    <div
      class="mx-10 p-10 min-h-96 bg-white text-black rounded-lg shadow-lg relative"
    >
      <h2 class="font-semibold text-xl">
        Navn:
        <span class="font-normal">{{ username || "Ikke autorisert" }}</span>
      </h2>
      <p class="font-semibold text-xl">
        Din bedrift:
        <span class="font-normal">{{
          company || "Ingen bedrift tilknyttet"
        }}</span>
      </p>
      <button
        v-if="companyId"
        @click="$router.push(`/student/company/${companyId}`)"
        class="px-6 py-2 border-4 border-blue-500 absolute bottom-10 font-semibold"
      >
        Bedrift portal
      </button>
      <button 
        @click="$router.push('/student/company/create')"
        class="px-6 py-2 border-4 border-green-500 absolute bottom-10 left-10 font-semibold"
      >
        Opprett bedrift
      </button>
      <div class="absolute bottom-10 right-10">
        <BaseLogoutButton />
      </div>
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

      const user = response.data.user;

      this.username = user.username;
      this.email = user.email;
      this.role = user.role;
      this.id = user.id;

      try {
        const companyResponse = await axios.get(
          `${publicConfig.apiBase}/company/user_company/${this.id}`,
          { withCredentials: true },
        );

        if (companyResponse.data) {
          this.company = companyResponse.data.companyName;
          this.companyId = companyResponse.data._id;
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Not authorized - please log in");
      this.$router.push("/");
    }
  },
};
</script>
