<template>
  <div v-if="user">
    <form @submit.prevent="updateUser">
      <div>
        <label>Username:</label>
        <input v-model="user.username" type="text" />
      </div>
      <div>
        <label>Email:</label>
        <input v-model="user.email" type="email" />
      </div>
      <div>
        <label>Role:</label>
        <input v-model="user.role" type="text" />
      </div>
      <button type="submit">Update User</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: null
    }
  },
  async created() {
    try {
      const userId = this.$route.params._id
      const response = await axios.get(`/api/users/${userId}`)
      this.user = response.data
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  },
  methods: {
    async updateUser() {
      try {
        const userId = this.$route.params._id
        await axios.put(`/api/users/${userId}`, this.user)
        this.$router.push('/admin/users')
      } catch (error) {
        console.error('Error updating user:', error)
      }
    }
  }
}
</script>