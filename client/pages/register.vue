<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl"
    >
      <div>
        <h1
          class="mt-6 text-center text-3xl md:text-5xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Registrer
        </h1>
      </div>
      <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
        <div class="rounded-md space-y-4">
          <div>
            <label for="username" class="text-gray-300 text-sm font-medium"
              >Navn:</label
            >
            <input
              type="text"
              id="username"
              v-model="username"
              required
              class="appearance-none relative block w-full px-4 mt-2 py-3 border-0 rounded-lg placeholder-gray-400 text-gray-100 bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 sm:text-sm md:text-base"
              placeholder="Ola Norman"
            />
          </div>
          <div>
            <label for="email" class="text-gray-300 text-sm font-medium"
              >Epost:</label
            >
            <input
              type="text"
              id="email"
              v-model="email"
              required
              class="appearance-none relative block w-full px-4 mt-2 py-3 border-0 rounded-lg placeholder-gray-400 text-gray-100 bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 sm:text-sm md:text-base"
              placeholder="eksempel@epost.no"
            />
          </div>
          <div>
            <label for="phone" class="text-gray-300 text-sm font-medium"
              >Mobilnummer:</label
            >
            <input
              type="text"
              id="phone"
              v-model="phone"
              required
              class="appearance-none relative block w-full px-4 mt-2 py-3 border-0 rounded-lg placeholder-gray-400 text-gray-100 bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 sm:text-sm md:text-base"
              placeholder="12345678"
            />
          </div>
          <div>
            <label for="grade" class="text-gray-300 text-sm font-medium"
              >Klassetrinn:</label
            >
            <select
              name="grade"
              id="grade"
              v-model="grade"
              required
              class="appearance-none relative block w-full px-4 mt-2 py-3 border-0 rounded-lg placeholder-gray-400 text-gray-100 bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 sm:text-sm md:text-base"
            >
              <option value="" disabled>Velg klassetrinn</option>
              <option value="8">8. klasse</option>
              <option value="9">9. klasse</option>
              <option value="10">10. klasse</option>
            </select>
          </div>
          <div>
            <label for="password" class="text-gray-300 text-sm font-medium"
              >Passord:</label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="appearance-none relative block w-full px-4 mt-2 py-3 border-0 rounded-lg placeholder-gray-400 text-gray-100 bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 sm:text-sm md:text-base"
              placeholder="Passord"
              autocomplete="current-password"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border-0 text-sm md:text-base font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Registrer
          </button>
        </div>
        <p v-if="registerError" class="text-red-400 text-center mt-4 text-sm">
          Ugyldige opplysninger
        </p>
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
      phone: "",
      grade: "",
      password: "",
      registerError: false,
    };
  },
  methods: {
    async handleRegister() {
      const { public: publicConfig } = useRuntimeConfig();
      try {
        const response = await axios.post(
          `${publicConfig.apiBase}/auth/register`,
          {
            email: this.email,
            password: this.password,
          },
          {
            withCredentials: true,
          },
        );

        if (response.data && response.data.user.role === "admin") {
          this.$router.push("/admin");
        } else if (response.data && response.data.user.role === "student") {
          this.$router.push("/student");
        } else if (response.data && response.data.user.role === "guest") {
          this.$router.push("/guest");
        }
      } catch (error) {
        console.error("Login failed:", error);
        this.loginError = true;
      }
    },
  },
};
</script>
