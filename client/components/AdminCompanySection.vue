<template>
    <div class="w-full min-h-screen bg-gray-900 text-white">
        <h1 class="text-4xl font-semibold">Bedrifter</h1>
        <div class="w-full h-96 mx-0 md:mx-10 flex flex-col justify-center align-center">
            <div class="mb-6 py-6 prose" v-for="company in companies" :key="company._id">
                <h2 class="text-2xl font-bold mb-2">{{ company.companyName }}</h2>
                <div>{{ company.companyDescription }}</div>
                <div>{{ company.companyEmail }}</div>
                <div>{{ company.companyContactPerson }}</div>
                <div>{{ company.companyPhone }}</div>
                <div>{{ company.companyGrade }}</div>
                <div>{{ company.companyStudents }}</div>
                <div>{{ company.companyTags }}</div>
                <div>{{ company.companyFounded }}</div>
                <div>
                    <img :src="company.companyLogo" alt="company logo">
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
                companies: [],
            };
        },
        async mounted() {
            try {
                const { public: publicConfig } = useRuntimeConfig();
                const response = await axios.get(
                    `${publicConfig.apiBase}/`,
                    {
                        withCredentials: true
                    }
                );
                this.companies = response.data;
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        },
    };
</script>