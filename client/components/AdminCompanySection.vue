<template>
    <div class="w-full min-h-screen bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 class="text-4xl text-center font-semibold text-gray-900 mb-8">Bedrifter</h1>
            <div class="grid gap-6">
                <div v-for="company in companies" :key="company._id" class="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <div class="flex flex-col md:flex-row md:items-start md:space-x-6">
                        <div class="w-full md:w-1/4 mb-4 md:mb-0">
                            <img :src="company.companyLogo" alt="company logo" class="w-full h-auto object-contain rounded">
                        </div>
                        <div class="w-full md:w-3/4">
                            <div class="flex justify-between items-start">
                                <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ company.companyName }}</h2>
                                <div class="flex flex-row space-x-4">
                                    <button @click="deleteCompany(company._id)" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                        Delete
                                    </button>
                                    <button @click="$router.push(`/admin/company/${company._id}`)" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                                        Edit
                                    </button>
                                    <button @click="toggleFTF(company._id)" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-all border-4 border-transparent" :class="{ 'border-4 border-purple-600 bg-transparent text-purple-600 hover:bg-purple-600 hover:text-white': company.companyIsFTF }">
                                        Toggle FTF
                                    </button>                                
                                </div>
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
                                        <p><span class="font-semibold">Students:</span> 
                                            <span v-if="company.companyStudents.length === 0">No students assigned</span>
                                            <ul v-else>
                                                <li v-for="studentId in company.companyStudents" :key="studentId">
                                                    {{ userMap[studentId] || 'Loading...' }}
                                                </li>
                                            </ul>
                                        </p>
                                        <p><span class="font-semibold">Founded:</span> {{ formatDate(company.companyFounded) }}</p>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <span class="font-semibold">Tags:</span> {{ company.companyTags }}
                                </div>
                                <div class="mt-4">
                                    <label class="font-semibold">Select Student:</label>
                                    <select @change="assignStudent(company._id, $event.target.value)" class="mt-2 border border-gray-300 rounded px-4 py-2 w-full text-black">
                                        <option value="" disabled selected>Select a student</option>
                                        <option v-for="user in users" :key="user._id" :value="user._id" class="text-black">
                                            {{ user.username }}
                                        </option>
                                    </select>
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
        async deleteCompany(companyId) {
            console.log('Attempting to delete company:', companyId);
            try {
                const { public: publicConfig } = useRuntimeConfig();
                await axios.delete(
                    `${publicConfig.apiBase}/company/${companyId}`,
                    { withCredentials: true }
                );
                this.companies = this.companies.filter(company => company._id !== companyId);
                console.log('Successfully deleted company:', companyId);
            } catch (error) {
                console.error('Error deleting company:', error);
            }
        },
        async toggleFTF(companyId) {
            console.log("Attempting to toggle FTF for company:", companyId);
            try {
                const { public: publicConfig } = useRuntimeConfig();
                const response = await axios.put(
                    `${publicConfig.apiBase}/company/toggle_ftf/${companyId}`,
                    {},
                    { withCredentials: true }
                );
                const company = this.companies.find(c => c._id === companyId);
                if (company) {
                    company.companyIsFTF = response.data.companyIsFTF;
                    console.log('Successfully toggled FTF for company:', companyId, 'New FTF status:', company.companyIsFTF);
                }
            } catch (error) {
                console.error('Error toggling FTF:', error);
            }
        },
        async assignStudent(companyId, studentId) {
            if (!studentId) return;
            console.log('Attempting to assign student:', studentId, 'to company:', companyId);
            try {
                const { public: publicConfig } = useRuntimeConfig();
                const response = await axios.put(
                    `${publicConfig.apiBase}/company/update_students/${companyId}`,
                    { studentId },
                    { withCredentials: true }
                );
                
                const company = this.companies.find(c => c._id === companyId);
                if (company) {
                    company.companyStudents = response.data.companyStudents;
                    this.fetchStudentNames(response.data.companyStudents);
                    console.log('Successfully assigned student to company. Updated student list:', response.data.companyStudents);
                }
            } catch (error) {
                console.error('Error assigning student:', error);
            }
        },
        async fetchStudentNames(studentIds) {
            console.log('Fetching student names for IDs:', studentIds);
            for (const id of studentIds) {
                if (!this.userMap[id]) { // Only fetch if not already retrieved
                    try {
                        const { public: publicConfig } = useRuntimeConfig();
                        const response = await axios.get(`${publicConfig.apiBase}/auth/get_user/${id}`, { withCredentials: true });
                        this.userMap = { ...this.userMap, [id]: response.data.username };
                        console.log('Retrieved username for ID:', id, ':', response.data.username);
                    } catch (error) {
                        console.error(`Error fetching user ${id}:`, error);
                    }
                }
            }
        },
        async fetchData() {
            console.log('Starting to fetch all data');
            try {
                const { public: publicConfig } = useRuntimeConfig();
                
                console.log('Fetching companies...');
                const companyResponse = await axios.get(`${publicConfig.apiBase}/company/`, { withCredentials: true });
                this.companies = companyResponse.data;
                console.log('Successfully fetched', this.companies.length, 'companies');
                
                for (const company of this.companies) {
                    await this.fetchStudentNames(company.companyStudents);
                }
                
                console.log('Fetching users...');
                const userResponse = await axios.get(`${publicConfig.apiBase}/auth`, { withCredentials: true });
                this.users = userResponse.data;
                console.log('Successfully fetched', this.users.length, 'users');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    },
    async mounted() {
        console.log('Component mounted, initiating data fetch');
        await this.fetchData();
    },
};
</script>