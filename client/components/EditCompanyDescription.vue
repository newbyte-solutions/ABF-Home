<template>

</template>

<script>
import axios from "axios";

const props = defineProps({
    companyId: {
        type: String,
        required: true
    }
});

export default {
    data() {
        return {
            company: {},
            newDescription: ''
        }
    },
    methods: {
        async fetchCompany() {
            try {
                const { public: publicConfig } = useRuntimeConfig();
                const response = await axios.get(`${publicConfig.apiBase}/company/${props.companyId}`, { withCredentials: true });
                this.company = response.data;
            } catch (error) {
                console.error('Error fetching company:', error);
            }
        },
        async updateDescription() {
            try {
                const { public: publicConfig } = useRuntimeConfig();
                await axios.put(`${publicConfig.apiBase}/company/update_description/${props.companyId}`, {
                    description: this.newDescription
                }, { withCredentials: true });
                this.fetchCompany();
            } catch (error) {
                console.error('Error updating description:', error);
            }
        }
    },
}
</script>