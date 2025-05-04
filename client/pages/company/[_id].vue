<template>
  <div class="py-8"></div>
  <div class="min-h-screen py-8">
    <div v-if="company" class="container mx-auto px-4 py-8">
      <img
        :src="company.companyLogo"
        :alt="company.companyLogo"
        class="w-48 h-48 object-contain mx-auto mb-6"
      />
      <h1 class="text-4xl font-bold text-center mb-4">
        {{ company.companyName }}
      </h1>
      <p class="text-lg text-gray-600 text-center mb-8">
        {{ company.companyDescription }}
      </p>
      <div class="grid grid-cols-2 gap-8 mb-8">
        <div class="bg-gray-100 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Elever:</h3>
          <ul
            class="text-gray-700 flex flex-col md:flex-row md:space-y-0 space-x-0 md:space-x-2 space-y-2"
          >
            <li v-for="(studentId, index) in company.companyStudents" :key="studentId">
              {{ userMap[studentId] }}{{ index !== company.companyStudents.length - 1 ? ',' : '' }}
            </li>
          </ul>
        </div>
        <div class="bg-gray-100 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Klasse:</h3>
          <p class="text-gray-700">{{ company.companyGrade }}.</p>
        </div>
      </div>
      <div class="flex justify-center mb-8">
        <div class="animate-bounce">
          <svg
            class="w-6 h-6 text-gray-500"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
      <CompanyNewsSection
        v-if="company && company._id"
        :companyId="company._id"
      />
      <div
        class=" mt-10 prose max-w-none md:max-w-4xl mx-auto w-full md:w-auto"
        v-html="marked(company.companyContent || '')"
      ></div>    
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { marked } from "marked";

const company = ref(null);
const students = ref([]);
const userMap = ref({});
const route = useRoute();

const fetchStudents = async () => {
  const { public: publicConfig } = useRuntimeConfig();
  try {
    const response = await axios.get(`${publicConfig.apiBase}/auth/`);
    students.value = response.data.filter((user) => user.role === "student");
    console.log("Fetched students:", students.value);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

const fetchStudentNames = async (studentIds) => {
  for (const id of studentIds) {
    if (!userMap.value[id]) {
      try {
        const { public: publicConfig } = useRuntimeConfig();
        const response = await axios.get(
          `${publicConfig.apiBase}/auth/get_user/${id}`,
        );
        userMap.value = { ...userMap.value, [id]: response.data.username };
      } catch (error) {
        console.error(`Error fetching user ${id}:`, error);
      }
    }
  }
};

onMounted(async () => {
  const { public: publicConfig } = useRuntimeConfig();
  await fetchStudents();

  try {
    const { data } = await axios.get(
      `${publicConfig.apiBase}/company/${route.params._id}`,
      {
        withCredentials: true,
      },
    );
    company.value = data;
    if (company.value && company.value.companyStudents) {
      await fetchStudentNames(company.value.companyStudents);
    }

    console.log("Company loaded:", company.value);
  } catch (error) {
    console.error("Error fetching company:", error);
  }
});

</script>
