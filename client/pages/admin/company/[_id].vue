<template>
  <AuthCheck :isAdmin="true" :isStudent="false" :isFtf="false" />
  <div class="py-8"></div>
  <div class="container mx-auto p-4 bg-gray-900 min-h-screen">
    <div v-if="company" class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-6 text-center text-white">
        Edit Company
      </h1>
      <form @submit.prevent="saveCompany" class="space-y-4">
        <div class="form-group">
          <label class="block mb-1 text-white">Company Name</label>
          <input
            v-model="company.companyName"
            type="text"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Email</label>
          <input
            v-model="company.companyEmail"
            type="email"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Phone</label>
          <input
            v-model="company.companyPhone"
            type="tel"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Contact Person</label>
          <input
            v-model="company.companyContactPerson"
            type="text"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Grade</label>
          <input
            v-model.number="company.companyGrade"
            type="number"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Founded Date</label>
          <input
            v-model="company.companyFounded"
            type="date"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Description</label>
          <textarea
            v-model="company.companyDescription"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Content</label>
          <textarea
            v-model="company.companyContent"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="block mb-1 text-white">Tags</label>
          <input
            v-model="tagsString"
            type="text"
            class="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:border-blue-500"
            placeholder="Comma-separated tags"
          />
        </div>

        <!-- Hidden fields -->
        <input type="hidden" v-model="company.companyLogo" />
        <input type="hidden" v-model="company.companyWebsite" />
        <input
          type="hidden"
          :value="JSON.stringify(company.companyStudents)"
          name="companyStudents"
        />
        <input type="hidden" v-model="company.companyCreatedAt" />

        <div class="flex justify-center mt-4">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRuntimeConfig } from "#imports";
import axios from "axios";

const route = useRoute();
const config = useRuntimeConfig();

const company = ref(null);
const tagsString = ref("");

const fetchCompany = async () => {
  try {
    const res = await axios.get(
      `${config.public.apiBase}/company/${route.params._id}`,
      {
        withCredentials: true,
      },
    );
    company.value = res.data;
    tagsString.value = (res.data.companyTags || []).join(", ");
  } catch (err) {
    console.error("Failed to fetch company:", err);
  }
};

const saveCompany = async () => {
  if (!company.value) return;

  try {
    const companyData = { ...company.value };
    companyData.companyTags = tagsString.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Parse companyStudents from hidden input if it's a stringified array
    if (typeof companyData.companyStudents === "string") {
      companyData.companyStudents = JSON.parse(companyData.companyStudents);
    }

    await axios.put(
      `${config.public.apiBase}/company/${route.params._id}`,
      companyData,
      { withCredentials: true },
    );
    alert("Company updated successfully");
  } catch (err) {
    console.error("Error updating company:", err);
    alert("Error updating company");
  }
};

await fetchCompany();
</script>
