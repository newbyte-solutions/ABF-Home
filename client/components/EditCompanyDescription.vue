<template>
    <div class="w-full max-w-4xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-center">
        <div class="w-full md:w-3/4 lg:w-2/3 flex flex-col">
            <h3 class="text-lg md:text-xl font-semibold mb-2">Edit Description</h3>
            <textarea
                v-model="newDescription"
                class="w-full p-2 border rounded-md mb-4 text-black resize-y min-h-[100px]"
                rows="4"
                placeholder="Enter new company description"
            ></textarea>
            <button
                @click="updateDescription"
                class="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
                Update Description
            </button>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref } from 'vue';

const props = defineProps({
    companyId: {
        type: String,
        required: true
    }
});

const company = ref({});
const newDescription = ref('');

const fetchCompany = async () => {
    try {
        console.log('Fetching company data for ID:', props.companyId);
        const { public: publicConfig } = useRuntimeConfig();
        const response = await axios.get(`${publicConfig.apiBase}/company/${props.companyId}`, { withCredentials: true });
        company.value = response.data;
        console.log('Successfully fetched company data:', response.data);
    } catch (error) {
        console.error('Error fetching company:', error);
        console.error('Error details:', error.response?.data || error.message);
    }
};

const updateDescription = async () => {
    try {
        console.log('Updating company description for ID:', props.companyId);
        console.log('New description:', newDescription.value);
        const { public: publicConfig } = useRuntimeConfig();
        await axios.put(`${publicConfig.apiBase}/company/update_description/${props.companyId}`, {
            companyDescription: newDescription.value
        }, { withCredentials: true });
        console.log('Successfully updated company description');
        fetchCompany();
    } catch (error) {
        console.error('Error updating description:', error);
        console.error('Error details:', error.response?.data || error.message);
    }
};
</script>