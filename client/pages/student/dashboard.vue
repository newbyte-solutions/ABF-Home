<template>
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
        Navn: <span class="font-normal">{{ name || "Ikke autorisert" }}</span>
      </h2>
      <p class="font-semibold text-xl">
        Din bedrift:
        <span class="font-normal">{{
          company || "Ingen bedrift tilknyttet"
        }}</span>
      </p>
      <button
        @click="$router.push(`/student/company/${companyId}`)"
        class="px-6 py-2 border-4 border-blue-500 absolute bottom-10 font-semibold"
      >
        Bedrift portal
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const { public: publicConfig } = useRuntimeConfig();

export default {
  data() {
    return {
      name: "",
      email: "",
      username: "",
      class: "",
      teacher: "",
      company: "",
      companyId: "",
    };
  },
  async mounted() {
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
    }
    try {
      const response = await axios.get(`${publicConfig.apiBase}/auth/me`, {
        withCredentials: true,
      });
      this.name = response.data.name;
      this.email = response.data.email;
      this.username = response.data.username;
      this.class = response.data.class;
      this.teacher = response.data.teacher;
    } catch (error) {
      console.error("error fetching user:", error);
    }
  },
};
</script>
