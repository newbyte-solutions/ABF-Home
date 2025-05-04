<template>
  <div
    v-if="user"
    class="w-full min-h-screen mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md"
  >
    <div class="py-20">
      <h1 class="font-semibold text-4xl text-center mb-10 text-gray-200">
        Edit user: {{ user.username }}
      </h1>
      <form
        @submit.prevent="updateUser"
        class="max-w-md mx-auto bg-gray-100 p-8 rounded-xl shadow-xl"
      >
        <div class="mb-6">
          <label class="block text-gray-900 text-lg mb-3">Username</label>
          <input
            v-model="user.username"
            type="text"
            class="w-full bg-gray-800 text-white text-lg rounded-lg border-2 border-gray-700 px-4 py-3 focus:outline-none focus:border-blue-500 transition duration-300"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-900 text-lg mb-3">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="w-full bg-gray-800 text-white text-lg rounded-lg border-2 border-gray-700 px-4 py-3 focus:outline-none focus:border-blue-500 transition duration-300"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-900 text-lg mb-3">Phone</label>
          <input
            v-model="user.phone"
            type="tel"
            class="w-full bg-gray-800 text-white text-lg rounded-lg border-2 border-gray-700 px-4 py-3 focus:outline-none focus:border-blue-500 transition duration-300"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-900 text-lg mb-3">Grade</label>
          <select
            v-model="user.grade"
            class="w-full bg-gray-800 text-white text-lg rounded-lg border-2 border-gray-700 px-4 py-3 focus:outline-none focus:border-blue-500 transition duration-300"
          >
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div class="mb-8">
          <label class="block text-gray-900 text-lg mb-3">Role</label>
          <select
            v-model="user.role"
            class="w-full bg-gray-800 text-white text-lg rounded-lg border-2 border-gray-700 px-4 py-3 focus:outline-none focus:border-blue-500 transition duration-300"
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white text-lg font-semibold py-4 rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
        >
          Update User
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
      user: null,
    };
  },
  async created() {
    try {
      const { public: publicConfig } = useRuntimeConfig();
      const userId = this.$route.params._id;
      const response = await axios.get(
        `${publicConfig.apiBase}/auth/get_user/${userId}`,
        { withCredentials: true },
      );
      this.user = response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },
  methods: {
    async updateUser() {
      try {
        const { public: publicConfig } = useRuntimeConfig();
        const userId = this.$route.params._id;
        await axios.put(`${publicConfig.apiBase}/auth/${userId}`, this.user, {
          withCredentials: true,
        });
        this.$router.push("/admin/dashboard");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
  },
};
</script>
