<template>
  <div class="w-full mx-auto p-1 md:p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-2xl font-bold mb-4 text-gray-800">
        Edit Company Content
      </h3>
      <textarea
        rows="8"
        placeholder="Enter new company content"
        v-model="newContent"
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-y min-h-[150px] text-black mb-4"
      ></textarea>
      <div class="flex justify-end">
        <button
          @click="updateContent"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Update Content
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watchEffect, onMounted } from "vue";

const props = defineProps({
  companyId: {
    type: String,
    required: true,
  },
});

const company = ref({});
const newContent = ref("");

const fetchCompany = async () => {
  try {
    console.log("Fetching company data for ID:", props.companyId);
    const { public: publicConfig } = useRuntimeConfig();
    const response = await axios.get(
      `${publicConfig.apiBase}/company/${props.companyId}`,
      { withCredentials: true },
    );
    company.value = response.data;

    // ✅ Preload the content into the textarea
    newContent.value = response.data.companyContent || "";

    console.log("Successfully fetched company data:", response.data);
  } catch (error) {
    console.error("Error fetching company:", error);
    console.error("Error details:", error.response?.data || error.message);
  }
};

const updateContent = async () => {
  try {
    console.log("Updating company content for ID:", props.companyId);
    console.log("New Content:", newContent.value);
    const { public: publicConfig } = useRuntimeConfig();
    await axios.put(
      `${publicConfig.apiBase}/company/update_content/${props.companyId}`,
      {
        companyContent: newContent.value,
      },
      { withCredentials: true },
    );
    console.log("Successfully updated company content");
    fetchCompany();
  } catch (error) {
    console.error("Error updating content:", error);
    console.error("Error details:", error.response?.data || error.message);
  }
};

// ✅ Fetch when mounted
onMounted(fetchCompany);
</script>
