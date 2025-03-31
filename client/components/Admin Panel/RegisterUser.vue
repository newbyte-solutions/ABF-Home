<template>
  <div class="py-32">
    <form
      @submit.prevent="handleRegistration"
      class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
    >
      <h2 class="font-semibold text-4xl text-center mb-10">Ny Bruker</h2>
      <input
        required
        type="text"
        v-model="username"
        placeholder="Username"
        id="username"
        name="username"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        required
        type="email"
        v-model="email"
        placeholder="Email"
        id="email"
        name="email"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        required
        type="tel"
        v-model="phone"
        placeholder="Phone Number"
        id="phone"
        name="phone"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        required
        type="password"
        v-model="password"
        placeholder="Password"
        id="password"
        name="password"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        required
        v-model="role"
        id="role"
        name="role"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="student">Student</option>
      </select>
      <select
        required
        v-model="grade"
        id="userGrade"
        name="userGrade"
        class="w-full mb-6 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Velg Klasse</option>
        <option value="8">8.</option>
        <option value="9">9.</option>
        <option value="10">10.</option>
        <option value="100">Lærar</option>
      </select>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      grade: "",
    };
  },
  methods: {
    async handleRegistration() {
      const { public: publicConfig } = useRuntimeConfig();
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
        console.log(response.data);
        this.$router.push("/");
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
  },
};
</script>
