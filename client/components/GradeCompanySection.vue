<template>
    <h2 class="text-center text-2xl font-semibold mb-4">Elevbedrifter</h2>
    <div class="w-full px-0 md:px-10 flex flex-col items-center">
      <div v-if="companies.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <router-link 
            v-for="company in companies" 
            :key="company._id"
            :to="`/company/${company._id}`" 
            class="transform hover:scale-105 transition-transform duration-200"
            >
            <div class="relative bg-gray-100 rounded-lg shadow-md overflow-hidden max-w-[16rem] h-full max-h-[24rem] flex flex-col">
                <img
                :src="company.companyLogo || 'https://placehold.co/400x400'"
                :alt="company.companyName"
                class="w-full h-[16rem] object-cover"
                />
                <div class="p-4 flex flex-col items-center">
                <h3 class="font-semibold text-lg text-center">{{ company.companyName }}</h3>
                <span class="mt-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Klasse {{ company.companyGrade }}
                </span>
                </div>
            </div>
        </router-link>
      </div>
      <div v-else class="text-center text-gray-500 py-10">
        Ingen elevbedrifter funnet for klasse {{ grade }}
      </div>
    </div>
  </template>
<script setup>
    import axios from "axios";
    
    const props = defineProps({
        grade: {
        type: String,
        required: true,
        },
    });
    
    const companies = ref([]);
    
    onMounted(async () => {
        try {
            const { public: publicConfig } = useRuntimeConfig();
            const response = await axios.get(`${publicConfig.apiBase}/company/`, {
                withCredentials: true,
            });
        
            console.log("Raw API Data:", response.data);
            console.log("Props.grade (String):", props.grade);
        
            companies.value = response.data.filter(
                (company) => String(company.companyGrade) === props.grade
            );
        
            console.log("Filtered Companies:", companies.value);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    });
</script>
