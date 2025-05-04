<template>
    <div class="hidden">Checking Admin...</div>
</template>

<script>
    import axios from 'axios';

    export default {
        async mounted() {
            try {
                const { public: publicConfig } = useRuntimeConfig();
                const response = await axios.get(`${publicConfig.apiBase}/auth/me`, { withCredentials: true });

                if (response.data.user.role !== 'admin') {
                    navigateTo('/');
                } else {
                    return;
                }
            } catch (error) {
                console.error('Error checking admin status:', error);
                navigateTo('/');
            }
        }
    }
</script>