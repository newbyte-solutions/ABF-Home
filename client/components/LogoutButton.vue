<template>
  <button
    @click="logout"
    class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
  >
    Logout
  </button>
</template>
<script>
import axios from "axios";

export default {
  methods: {
    async logout() {
      const { public: publicConfig } = useRuntimeConfig();

      try {
        await axios.post(
          `${publicConfig.apiBase}/auth/logout`,
          {},
          { withCredentials: true }
        );
        window.location.href = '/';
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
};
</script>
