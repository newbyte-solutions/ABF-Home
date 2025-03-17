<template>
    <div class="w-full min-h-screen bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 class="text-4xl font-semibold text-gray-900 mb-8">Bedrifter</h1>
            <div class="grid gap-6">
                <div v-for="company in companies" 
                     :key="company._id" 
                     class="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <div class="flex flex-col md:flex-row md:items-start md:space-x-6">
                        <div class="w-full md:w-1/4 mb-4 md:mb-0">
                            <img :src="company.companyLogo" 
                                 alt="company logo" 
                                 class="w-full h-auto object-contain rounded">
                        </div>
                        <div class="w-full md:w-3/4">
                            <div class="flex justify-between items-start">
                                <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ company.companyName }}</h2>
                                <button @click="deleteCompany(company._id)" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                    Delete
                                </button>
                            </div>
                            <div class="space-y-2 text-gray-700">
                                <p class="text-lg">{{ company.companyDescription }}</p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <p><span class="font-semibold">Email:</span> {{ company.companyEmail }}</p>
                                        <p><span class="font-semibold">Contact:</span> {{ company.companyContactPerson }}</p>
                                        <p><span class="font-semibold">Phone:</span> {{ company.companyPhone }}</p>
                                    </div>
                                    <div>
                                        <p><span class="font-semibold">Grade:</span> {{ company.companyGrade }}</p>
                                        <p><span class="font-semibold">Students:</span> {{ company.companyStudents }}</p>
                                        <p><span class="font-semibold">Founded:</span> {{ formatDate(company.companyFounded) }}</p>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <span class="font-semibold">Tags:</span> {{ company.companyTags }}
                                </div>
                            </div>
                        </div>
                    </div>
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
            async deleteCompany(companyId) {
                try {
                    const { public: publicConfig } = useRuntimeConfig();
                    await axios.delete(
                        `${publicConfig.apiBase}/company/${companyId}`,
                        {
                            withCredentials: true
                        }
                    );
                    this.companies = this.companies.filter(company => company._id !== companyId);
                } catch (error) {
                    console.error('Error deleting company:', error);
                }
            }
        },
        async mounted() {
            try {
                const { public: publicConfig } = useRuntimeConfig();
                const response = await axios.get(
                    `${publicConfig.apiBase}/company/`,
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