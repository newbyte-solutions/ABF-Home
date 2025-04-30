<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h1
          class="mt-6 text-center text-3xl md:text-5xl font-extrabold text-white"
        >
          Login
        </h1>
      </div>
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm">
          <div>
            <label for="email" class="text-white">Email:</label>
            <input
              type="text"
              id="email"
              v-model="email"
              required
              class="appearance-none relative block w-full px-3 mt-2 mb-4 py-2 border border-gray-600 placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm md:text-xl"
              placeholder="Email"
            />
          </div>
          <div>
            <label for="password" class="text-white">Passord:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="appearance-none relative block w-full px-3 mt-2 py-2 border border-gray-600 placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm md:text-xl"
              placeholder="Passord"
              autocomplete="current-password"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm md:text-xl font-semibold rounded-md text-black bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  async mounted() {
    const { public: publicConfig } = useRuntimeConfig();
    try {
      const response = await axios.get(`${publicConfig.apiBase}/auth/check_auth`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        this.$router.push("/student/dashboard");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  },
  methods: {
    async handleLogin() {
      const { public: publicConfig } = useRuntimeConfig();
      try {
        const response = await axios.post(
          `${publicConfig.apiBase}/auth/student_login`,
          {
            email: this.email,
            password: this.password,
          },
          {
            withCredentials: true,
          },
        );

        if (response.data) {
          this.$router.push("/student/dashboard");
        }
      } catch (error) {
        console.error("Login failed:", error);
        this.loginError = true;
      }
    },
  },
};
</script>
