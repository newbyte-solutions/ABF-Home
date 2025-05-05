<template>
  <div
    class="min-h-screen bg-gray-900 text-white py-14 flex flex-col items-center justify-center px-4"
  >
    <div class="w-full max-w-4xl bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <h2 class="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
        Company Details
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <p class="text-gray-400">Company Name:</p>
          <p class="font-semibold text-sm sm:text-base">
            {{ company.companyName }}
          </p>
        </div>
        <div>
          <p class="text-gray-400">Email:</p>
          <p class="font-semibold text-sm sm:text-base break-all">
            {{ company.companyEmail }}
          </p>
        </div>
        <div>
          <p class="text-gray-400">Phone:</p>
          <p class="font-semibold text-sm sm:text-base">
            {{ company.companyPhone }}
          </p>
        </div>
        <div>
          <p class="text-gray-400">Contact Person:</p>
          <p class="font-semibold text-sm sm:text-base">
            {{ company.companyContactPerson }}
          </p>
        </div>
        <div>
          <p class="text-gray-400">Grade:</p>
          <p class="font-semibold text-sm sm:text-base">
            {{ company.companyGrade }}
          </p>
        </div>
        <div>
          <p class="text-gray-400">Founded:</p>
          <p class="font-semibold text-sm sm:text-base">
            {{ formatDate(company.companyFounded) }}
          </p>
        </div>
        <div class="col-span-2">
          <p class="text-gray-400">Website:</p>
          <a
            :href="`https://husarbeidslivsfag.com/company/${company._id}`"
            target="_blank"
            class="text-blue-400 underline text-sm sm:text-base break-all"
          >
            https://husarbeidslivsfag.com/company/{{ company._id }}
          </a>
        </div>
        <div class="col-span-2">
          <p class="text-gray-400">Description:</p>
          <p class="font-semibold text-sm sm:text-base">
            {{ company.companyDescription }}
          </p>
        </div>
        <div class="col-span-2">
          <p class="text-gray-400">Tags:</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in company.companyTags"
              :key="tag"
              class="bg-blue-600 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="col-span-2">
          <p class="text-gray-400">Students:</p>
          <ul class="list-disc list-inside text-sm sm:text-base">
            <li v-for="studentId in company.companyStudents" :key="studentId">
              {{ userMap[studentId] || "Fetching..." }}
            </li>
          </ul>
        </div>
        <div class="col-span-2 flex justify-center mt-6">
          <img
            v-if="company.companyLogo"
            :src="company.companyLogo"
            alt="Company Logo"
            class="max-w-[200px] sm:max-w-xs rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
    <div
      class="mt-8 sm:mt-12 py-4 border-t-4 flex w-full md:w-2/3 items-center justify-center h-fit"
      v-if="company && company._id"
    >
      <StudentEditCompany :companyId="company._id" />
    </div>
    <div
      class="mt-8 sm:mt-12 py-4 border-t-4 flex w-full md:w-2/3 items-center justify-center h-fit"
      v-if="company && company._id"
    >
      <CreateArticleStudents :companyId="company._id" />
    </div>
    <div
      class="mt-8 sm:mt-12 py-4 border-t-4 flex w-full items-center justify-center h-fit"
      v-if="company && company._id"
    >
      <StudentArticleSection :companyId="company._id" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      company: {},
      userMap: {},
    };
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    async fetchStudentNames(studentIds) {
      console.log("Fetching student names for IDs:", studentIds);
      for (const id of studentIds) {
        if (!this.userMap[id]) {
          try {
            const { public: publicConfig } = useRuntimeConfig();
            const response = await axios.get(
              `${publicConfig.apiBase}/auth/get_user/${id}`,
              { withCredentials: true },
            );
            this.userMap = { ...this.userMap, [id]: response.data.username };
            console.log(
              "Retrieved username for ID:",
              id,
              ":",
              response.data.username,
            );
          } catch (error) {
            console.error(`Error fetching user ${id}:`, error);
          }
        }
      }
    },
  },
  async mounted() {
    const { public: publicConfig } = useRuntimeConfig();

    try {
      const companyResponse = await axios.get(
        `${publicConfig.apiBase}/company/${this.$route.params._id}`,
        { withCredentials: true },
      );
      this.company = companyResponse.data;
      await this.fetchStudentNames(this.company.companyStudents);
    } catch (error) {
      console.error("Error fetching data:", error);
      this.$router.push("/");
    }
  },
};
</script>
