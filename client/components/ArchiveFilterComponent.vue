<template>
  <div class="flex flex-col items-center gap-6 my-6 px-4">
    <div class="flex flex-wrap justify-center gap-4">
      <!-- Grade Filter -->
      <div>
        <label class="block text-sm font-medium mb-1">Filtrer på trinn:</label>
        <select
          v-model="filters.grade"
          class="border px-3 py-2 rounded shadow w-40"
        >
          <option value="">Deaktiver</option>
          <option value="8">8. trinn</option>
          <option value="9">9. trinn</option>
          <option value="10">10. trinn</option>
          <option value="100">Globalt</option>
        </select>
      </div>

      <!-- Tag Filter -->
      <div>
        <label class="block text-sm font-medium mb-1">Tag (stikkord):</label>
        <input
          type="text"
          v-model="filters.tag"
          placeholder="Skriv inn tag"
          class="border px-3 py-2 rounded shadow w-40"
          @keyup.esc="filters.tag = ''"
        />
      </div>

      <!-- Company Filter -->
      <div>
        <label class="block text-sm font-medium mb-1">Firma:</label>
        <select
          v-model="filters.company"
          class="border px-3 py-2 rounded shadow w-40 text-black"
        >
          <option value="">Alle</option>
          <option
            v-for="company in companies"
            :key="company._id"
            :value="company.companyName"
          >
            {{ company.companyName }}
          </option>
        </select>
      </div>

      <!-- Published Date Filter -->
      <div>
        <label class="block text-sm font-medium mb-1">Publisert etter:</label>
        <input
          type="date"
          v-model="filters.publishedAfter"
          class="border px-3 py-2 rounded shadow w-40"
        />
      </div>
    </div>

    <!-- Clear Button -->
    <button
      class="mt-4 px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
      @click="clearFilters"
    >
      Nullstill filter
    </button>

    <!-- News List -->
    <ArchiveComponent
      :grade="filters.grade"
      :tag="filters.tag"
      :company="filters.company"
      :published-after="filters.publishedAfter"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ArchiveComponent from "./ArchiveComponent.vue"; // update path if needed

const filters = ref({
  grade: "",
  tag: "",
  company: "",
  publishedAfter: "",
});

const companies = ref([]);

onMounted(async () => {
  try {
    const { public: publicConfig } = useRuntimeConfig();
    const res = await axios.get(`${publicConfig.apiBase}/company`);
    companies.value = res.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
});

function clearFilters() {
  filters.value = {
    grade: "",
    tag: "",
    company: "",
    publishedAfter: "",
  };
}
</script>
