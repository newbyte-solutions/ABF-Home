<template>
  <div v-if="isLoading">
    <span>Checking authentication...</span>
  </div>
  <div v-else>
    <span class="hidden">Auth Check Complete</span>
  </div>
</template>

<script setup>
import axios from 'axios';

const props = defineProps({
  isAdmin: Boolean,
  isStudent: Boolean,
  isFtf: Boolean
});

const router = useRouter();
const { public: publicConfig } = useRuntimeConfig();
const isLoading = ref(true);

const checkAuth = async () => {
  try {
    const response = await axios.get(`${publicConfig.apiBase}/auth/me`, {
      withCredentials: true,
    });

    const user = response.data.user;
    let hasAccess = false;

    console.log('User:', user);

    if (props.isAdmin && user.role === 'admin') hasAccess = true;
    if (props.isStudent && user.role === 'student') hasAccess = true;
    if (props.isFtf && user.isFTF === true) hasAccess = true;

    if (!hasAccess) {
      router.push('/');
    }
  } catch (error) {
    router.push('/');
  } finally {
    isLoading.value = false;
  }
};

onMounted(checkAuth);
</script>
