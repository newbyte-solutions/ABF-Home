<template>
    <div class="p-5">
        <h2>User Management</h2>
        <div class="flex flex-col gap-2.5">
            <div v-for="user in users" :key="user._id" class="flex justify-between items-center p-2.5 border border-gray-300 rounded">
                <div class="flex flex-col gap-1">
                    <span>{{ user.name }} {{ user.username }}</span>
                    <span>Email: {{ user.email }}</span>
                    <span>Role: {{ user.role }}</span>
                    <span>Created: {{ formatDate(user.createdAt) }}</span>
                </div>
                <button @click="deleteUser(user._id)" class="bg-red-500 text-white border-none px-4 py-2 rounded hover:bg-red-700 cursor-pointer">Delete User</button>
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