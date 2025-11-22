<template>
  <AuthCheck :isAdmin="false" :isStudent="true" :isFtf="false" />
  <div class="py-5"></div>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Company Logo and Header Section -->
      <div class="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden mb-6">
        <div
          class="relative bg-gradient-to-r from-blue-600 to-purple-600 h-32 sm:h-40"
        >
          <div class="absolute -bottom-12 left-8">
            <div
              v-if="company.companyLogo"
              class="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl shadow-xl border-4 border-gray-800 overflow-hidden"
            >
              <img
                :src="company.companyLogo"
                alt="Company Logo"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              v-else
              class="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-700 to-gray-600 rounded-2xl shadow-xl border-4 border-gray-800 flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 sm:w-16 sm:h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="pt-16 px-6 sm:px-8 pb-6">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4"
          >
            <div>
              <h1 class="text-3xl sm:text-4xl font-bold mb-2">
                {{ company.companyName }}
              </h1>
              <div class="flex flex-wrap gap-2 mb-3">
                <span
                  v-for="tag in company.companyTags"
                  :key="tag"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div
              v-if="company.companyGrade"
              class="flex items-center space-x-2 px-4 py-2 rounded-xl "
            >
              <span class="text-lg font-bold text-white">
                 {{ company.companyGrade }}. Klasse
              </span>
            </div>
          </div>

          <p class="text-gray-300 text-base sm:text-lg leading-relaxed">
            {{ company.companyDescription }}
          </p>
        </div>
      </div>

      <!-- Company Information Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Contact Information Card -->
        <div class="lg:col-span-2 bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 class="text-xl font-bold mb-5 flex items-center">
            <svg
              class="w-6 h-6 mr-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Kontaktinformasjon
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-2">
              <p
                class="text-xs uppercase tracking-wide text-gray-400 font-semibold"
              >
                Kontaktperson
              </p>
              <p class="text-base font-medium text-white flex items-center">
                <svg
                  class="w-4 h-4 mr-2 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {{ company.companyContactPerson }}
              </p>
            </div>

            <div class="space-y-2">
              <p
                class="text-xs uppercase tracking-wide text-gray-400 font-semibold"
              >
                E-postadresse
              </p>
              <a
                :href="`mailto:${company.companyEmail}`"
                class="text-base font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center break-all"
              >
                <svg
                  class="w-4 h-4 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {{ company.companyEmail }}
              </a>
            </div>

            <div class="space-y-2">
              <p
                class="text-xs uppercase tracking-wide text-gray-400 font-semibold"
              >
                Telefonnummer
              </p>
              <a
                :href="`tel:${company.companyPhone}`"
                class="text-base font-medium text-white hover:text-blue-300 transition-colors flex items-center"
              >
                <svg
                  class="w-4 h-4 mr-2 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {{ company.companyPhone }}
              </a>
            </div>

            <div class="space-y-2">
              <p
                class="text-xs uppercase tracking-wide text-gray-400 font-semibold"
              >
                Grunnlagt
              </p>
              <p class="text-base font-medium text-white flex items-center">
                <svg
                  class="w-4 h-4 mr-2 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {{ formatDate(company.companyFounded) }}
              </p>
            </div>

            <div class="space-y-2 sm:col-span-2">
              <p
                class="text-xs uppercase tracking-wide text-gray-400 font-semibold"
              >
                Offentlig Profil
              </p>
              <a
                :href="`https://husarbeidslivsfag.com/company/${company._id}`"
                target="_blank"
                class="text-base font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center break-all"
              >
                <svg
                  class="w-4 h-4 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Se Offentlig Profil
              </a>
            </div>
          </div>
        </div>

        <!-- Students Card -->
        <div class="bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 class="text-xl font-bold mb-5 flex items-center">
            <svg
              class="w-6 h-6 mr-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Elever
          </h2>
          <div class="space-y-3">
            <div
              v-for="studentId in company.companyStudents"
              :key="studentId"
              class="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-white font-bold text-sm">
                  {{ (userMap[studentId] || "?").charAt(0).toUpperCase() }}
                </span>
              </div>
              <span class="text-white font-medium">
                {{ userMap[studentId] || "Laster..." }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- FTF Redirect -->
      <div v-if="company && company._id && company.companyIsFTF" class="mb-6">
        <FtfRedirect />
      </div>

      <!-- Action Sections -->
      <div v-if="company && company._id" class="space-y-6">
        <div class="bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 class="text-xl font-bold mb-4 flex items-center">
            <svg
              class="w-6 h-6 mr-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Rediger Bedrift
          </h2>
          <StudentCompanyEdit :companyId="company._id" />
        </div>

        <div class="bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 class="text-xl font-bold mb-4 flex items-center">
            <svg
              class="w-6 h-6 mr-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Opprett Ny Artikkel
          </h2>
          <StudentArticleCreate :companyId="company._id" />
        </div>

        <div class="bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 class="text-xl font-bold mb-4 flex items-center">
            <svg
              class="w-6 h-6 mr-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            Bedriftsartikler
          </h2>
          <StudentArticles :companyId="company._id" />
        </div>
      </div>
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
