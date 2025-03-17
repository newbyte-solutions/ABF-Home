<template>
  <div class="py-20">
    <form
      @submit.prevent="handleNewCompany"
      class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
    >
      <h2 class="font-semibold text-4xl text-center mb-10">Ny Bedrift</h2>
      <input
        required
        type="text"
        v-model="companyName"
        placeholder="Company Name"
        id="companyName"
        name="companyName"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        required
        type="email"
        v-model="companyEmail"
        placeholder="Email"
        id="companyEmail"
        name="companyEmail"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        required
        type="tel"
        v-model="companyPhone"
        placeholder="Phone Number"
        id="companyPhone"
        name="companyPhone"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        required
        type="text"
        v-model="contactPerson"
        placeholder="Contact Person"
        id="contactPerson"
        name="contactPerson"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        required
        type="date"
        v-model="companyFounded"
        id="companyFounded"
        name="companyFounded"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="file"
        @change="handleLogoUpload"
        accept="image/*"
        id="companyLogo"
        name="companyLogo"
        class="w-full mb-4 p-2 rounded bg-gray-700 text-white"
      />
      <select
        required
        v-model="companyGrade"
        id="companyGrade"
        name="companyGrade"
        class="w-full mb-6 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Velg Klasse</option>
        <option value="8">8.</option>
        <option value="9">9.</option>
        <option value="10">10.</option>
        <option value="100">Lærar</option>
      </select>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
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
