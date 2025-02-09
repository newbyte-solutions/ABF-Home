<template>
  <div class="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
    <form @submit.prevent="handleRegistration" class="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
      <input required type="text" v-model="username" placeholder="Username" id="username" name="username" class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input required type="email" v-model="email" placeholder="Email" id="email" name="email" class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input required type="password" v-model="password" placeholder="Password" id="password" name="password" class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <select required v-model="role" id="role" name="role" class="w-full mb-6 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="student">Student</option>
      </select>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">Register</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      role: ''
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/auth/check_admin', {
        withCredentials: true
      })
      if (response.data.role !== 'admin') {
        this.$router.push('/')
      }
    } catch (error) {
      console.error('Authorization check failed:', error)
      this.$router.push('/')
    }
  },
  methods: {
    async handleRegistration() {
      try {
        const response = await axios.post('http://localhost:5000/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          role: this.role
        }, {
          withCredentials: true
        })
        
        if (response.data) {
          this.username = ''
          this.email = ''
          this.password = ''
          this.role = ''
          
          alert('Registration successful!')
        }
      } catch (error) {
        console.error('Registration failed:', error)
        alert(error.response?.data?.message || 'Registration failed')
      }
    }
  }
}
</script>
