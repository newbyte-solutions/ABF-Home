<template>
  <div class="py-20 px-4">
    <form
      @submit.prevent="handleNewCompany"
      class="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
      <h2 class="font-bold text-4xl text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Ny Bedrift</h2>
      <p class="text-center text-gray-400 mb-8 text-sm">Registrer din bedrift her</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="companyName" class="block text-sm font-medium text-gray-300 mb-2">Bedriftsnavn</label>
          <input
            required
            type="text"
            v-model="companyName"
            placeholder="Skriv bedriftsnavn"
            id="companyName"
            name="companyName"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label for="companyEmail" class="block text-sm font-medium text-gray-300 mb-2">E-post</label>
          <input
            required
            type="email"
            v-model="companyEmail"
            placeholder="bedrift@eksempel.no"
            id="companyEmail"
            name="companyEmail"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label for="companyPhone" class="block text-sm font-medium text-gray-300 mb-2">Telefonnummer</label>
          <input
            required
            type="tel"
            v-model="companyPhone"
            placeholder="+47 123 45 678"
            id="companyPhone"
            name="companyPhone"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label for="contactPerson" class="block text-sm font-medium text-gray-300 mb-2">Kontaktperson</label>
          <input
            required
            type="text"
            v-model="contactPerson"
            placeholder="Fornavn Etternavn"
            id="contactPerson"
            name="contactPerson"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label for="companyFounded" class="block text-sm font-medium text-gray-300 mb-2">Stiftelsesdato</label>
          <input
            required
            type="date"
            v-model="companyFounded"
            id="companyFounded"
            name="companyFounded"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label for="companyLogo" class="block text-sm font-medium text-gray-300 mb-2">Bedriftslogo (valgfritt)</label>
          <input
            type="file"
            @change="handleLogoUpload"
            accept="image/*"
            id="companyLogo"
            name="companyLogo"
            class="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer transition duration-200"
          />
        </div>
      </div>
      
      <div class="mt-4">
        <label for="companyGrade" class="block text-sm font-medium text-gray-300 mb-2">Klasse</label>
        <select
          required
          v-model="companyGrade"
          id="companyGrade"
          name="companyGrade"
          class="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 cursor-pointer"
        >
        <option value="">Velg Klasse</option>
        <option value="8">8.</option>
        <option value="9">9.</option>
        <option value="10">10.</option>
        <option value="100">Lærar</option>
        </select>
      </div>
      
      <button
        type="submit"
        class="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
      >
        Registrer Bedrift
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      contactPerson: "",
      companyFounded: "",
      companyGrade: "",
      companyLogo: null,
    };
  },
  methods: {
    handleLogoUpload(event) {
      this.companyLogo = event.target.files[0];
    },
    async handleNewCompany() {
      const { public: publicConfig } = useRuntimeConfig();
      try {
        const formData = new FormData();
        formData.append("companyName", this.companyName);
        formData.append("companyEmail", this.companyEmail);
        formData.append("companyPhone", this.companyPhone);
        formData.append("companyContactPerson", this.contactPerson);
        formData.append("companyGrade", this.companyGrade);
        formData.append("companyFounded", this.companyFounded);

        if (this.companyLogo) {
          formData.append("companyLogo", this.companyLogo);
        }

        const response = await axios.post(
          `${publicConfig.apiBase}/company/new_company`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        if (response.data) {
          this.companyName = "";
          this.companyEmail = "";
          this.companyPhone = "";
          this.companyContactPerson = "";
          this.companyFounded = "";
          this.companyGrade = "";
          this.companyLogo = null;

          alert("Company registration successful!");
        }
      } catch (error) {
        console.error("Company registration failed:", error);
        alert(error.response?.data?.message || "Company registration failed");
      }
    },
  },
};
</script>
