<template>
  <div class="w-full">
    <div v-if="company">
      <form @submit.prevent="saveCompany" class="space-y-4">
        <div class="form-group">
          <label class="block mb-2 text-sm font-medium text-gray-300"
            >Bedriftsnavn</label
          >
          <input
            v-model="company.companyName"
            type="text"
            class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div class="form-group">
          <label class="block mb-2 text-sm font-medium text-gray-300"
            >E-postadresse</label
          >
          <input
            v-model="company.companyEmail"
            type="email"
            class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div class="form-group">
          <label class="block mb-2 text-sm font-medium text-gray-300"
            >Telefonnummer</label
          >
          <input
            v-model="company.companyPhone"
            type="tel"
            class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div class="form-group">
          <label class="block mb-2 text-sm font-medium text-gray-300"
            >Kontaktperson</label
          >
          <input
            v-model="company.companyContactPerson"
            type="text"
            class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div class="form-group">
          <label class="block mb-2 text-sm font-medium text-gray-300"
            >Klasse</label
          >
          <select
            v-model.number="company.companyGrade"
            class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 cursor-pointer"
          >
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="100">Lærar</option>
          </select>
        </div>
        <div class="form-group">
          <label class="block mb-2 text-sm font-medium text-gray-300"
            >Grunnlagt</label
          >
          <input
            v-model="company.companyFounded"
            type="date"
            class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div class="form-group">
          <label class="block mb-2 text-sm font-medium text-gray-300"
            >Beskrivelse</label
          >
          <textarea
            v-model="company.companyDescription"
            rows="4"
            class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="block mb-2 text-sm font-medium text-gray-300"
            >Innhold</label
          >
          <textarea
            v-model="company.companyContent"
            rows="6"
            class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="block mb-2 text-sm font-medium text-gray-300"
            >Tags</label
          >
          <input
            v-model="tagsString"
            type="text"
            class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Komma-separerte tags"
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

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
        >
          Lagre endringer
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
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
