<template>
    <div class="p-5 w-full mx-auto">
        <h2 class="text-center text-3xl md:text-4xl font-bold mb-10">User Management</h2>
        <div class="flex flex-col gap-3">
            <div v-for="user in users" :key="user._id" class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-300 rounded shadow-sm hover:shadow-md transition-shadow">
                <div class="flex flex-col gap-2">
                    <span class="text-xl font-semibold">{{ user.name }} {{ user.username }}</span>
                    <span class="text-gray-300">Email: {{ user.email }}</span>
                    <span class="text-gray-300">Role: {{ user.role }}</span>
                    <span class="text-gray-300">Grade: {{ user.grade }}</span>
                    <span class="text-gray-300">Phone: {{ user.phone }}</span>
                    <span class="text-gray-300">Created: {{ formatDate(user.createdAt) }}</span>
                </div>
                <div class="flex flex-row md:flex-col space-y-0 space-x-2 md:space-y-2 md:space-x-0 mt-4 md:mt-0">
                    <button @click="deleteUser(user._id)" class="bg-red-500 text-white text-base md:text-lg border-none px-4 py-2 rounded hover:bg-red-600 cursor-pointer transition-colors">Delete User</button>
                    <button @click="editUser(user._id)" class="bg-blue-500 text-white text-base md:text-lg border-none px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition-colors">Edit User</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                users: [],
                userMap: {},
            };
        },
        methods: {
            formatDate(date) {
                if (!date) return '';
                const d = new Date(date);
                return d.toLocaleDateString('no-NO', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            },
            async deleteUser(userId) {
                console.log('Attempting to delete user:', userId);
                try {
                    const { public: publicConfig } = useRuntimeConfig();
                    await axios.delete(
                        `${publicConfig.apiBase}/auth/${userId}`,
                        { withCredentials: true }
                    );
                    this.users = this.users.filter(user => user._id !== userId);
                    console.log('Successfully deleted user:', userId);
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            },
            async editUser(userId) {
                this.$router.push(`/admin/users/${userId}`);
            },
        },
        async mounted() {
            const { public: publicConfig } = useRuntimeConfig();
            try {
                const response = await axios.get(`${publicConfig.apiBase}/auth/`);
                this.users = response.data;
                this.users.forEach(user => {
                    this.userMap[user._id] = `${user.name} (${user.username})`;
                });
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    }
</script>