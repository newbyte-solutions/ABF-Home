<template>
    <div>
      <div v-if="company" class="container mx-auto px-4 py-8">
        <img :src="company.companyLogo" :alt="company.companyTitle" class="w-48 h-48 object-contain mx-auto mb-6">
        <h1 class="text-4xl font-bold text-center mb-4">{{ company.companyTitle }}</h1>
        <p class="text-lg text-gray-600 text-center mb-8">{{ company.companyDescription }}</p>
        <div class="grid grid-cols-2 gap-8 mb-8">
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-2">Students:</h3>
            <p class="text-gray-700">{{ company.companyStudents }}</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-2">Grade:</h3>
            <p class="text-gray-700">{{ company.companyGrade }}</p>
          </div>
        </div>
        <div class="prose max-w-none" v-html="marked(company.companyContent || '')"></div>
        <CompanyNewsSection :_id="company._id" v-if="company" />
    </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { marked } from "marked";

const company = ref(null);
const route = useRoute();

onMounted(async () => {
    const { public: publicConfig } = useRuntimeConfig();
    try {
      const { data } = await axios.get(`${publicConfig.apiBase}/company/${route.params._id}`, {
        withCredentials: true
      });
      company.value = data;
    } catch (error) {
      console.error('Error fetching company:', error);
    }
});
</script>