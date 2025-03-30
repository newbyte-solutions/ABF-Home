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
        Navn: <span class="font-normal">{{ username || "Ikke autorisert" }}</span>
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

        console.log("Response data:", response.data);
        
        // Assign data after passing the check
        this.name = response.data.user.name;
        this.email = response.data.user.email;
        this.username = response.data.user.username;
        this.grade = response.data.user.grade;
        this.phone = response.data.user.phone;
        this.role = response.data.user.role;
        this.id = response.data.user.id;


        if (response.data.user.role !== "student") {
          alert("Not authorized - please log in as a student");
          this.$router.push("/");
          return;
        }
        
        try {
          const companyResponse = await axios.get(
            `${publicConfig.apiBase}/company/user_company/${this.id}`,
            {
              withCredentials: true,
            }
          );
          this.company = companyResponse.data.company;
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