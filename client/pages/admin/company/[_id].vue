<template>
  <CheckAdmin />
  <div class="container mx-auto p-4">
    <div v-if="company" class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Edit Company</h1>
      <form @submit.prevent="saveCompany" class="space-y-4">
        <div class="form-group">
          <label class="block mb-1">Company Name</label>
          <input v-model="company.companyName" type="text" class="w-full p-2 border rounded" />
        </div>
        <div class="form-group">
          <label class="block mb-1">Email</label>
          <input v-model="company.companyEmail" type="email" class="w-full p-2 border rounded" />
        </div>
        <div class="form-group">
          <label class="block mb-1">Phone</label>
          <input v-model="company.companyPhone" type="tel" class="w-full p-2 border rounded" />
        </div>
        <div class="form-group">
          <label class="block mb-1">Contact Person</label>
          <input v-model="company.companyContactPerson" type="text" class="w-full p-2 border rounded" />
        </div>
        <div class="form-group">
          <label class="block mb-1">Grade</label>
          <input v-model.number="company.companyGrade" type="number" class="w-full p-2 border rounded" />
        </div>
        <div class="form-group">
          <label class="block mb-1">Founded Date</label>
          <input v-model="company.companyFounded" type="date" class="w-full p-2 border rounded" />
        </div>
        <div class="form-group">
          <label class="block mb-1">Description</label>
          <textarea v-model="company.companyDescription" class="w-full p-2 border rounded"></textarea>
        </div>
        <div class="form-group">
          <label class="block mb-1">Content</label>
          <textarea v-model="company.companyContent" class="w-full p-2 border rounded"></textarea>
        </div>
        <div class="form-group">
          <label class="block mb-1">Tags</label>
          <input v-model="tagsString" type="text" class="w-full p-2 border rounded" placeholder="Comma-separated tags" />
        </div>

        <!-- Hidden fields -->
        <input type="hidden" v-model="company.companyLogo" />
        <input type="hidden" v-model="company.companyWebsite" />
        <input type="hidden" :value="JSON.stringify(company.companyStudents)" name="companyStudents" />
        <input type="hidden" v-model="company.companyCreatedAt" />

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRuntimeConfig } from '#imports'
import axios from 'axios'

const route = useRoute()
const config = useRuntimeConfig()

const company = ref(null)
const tagsString = ref('')

const fetchCompany = async () => {
  try {
    const res = await axios.get(`${config.public.apiBase}/company/${route.params._id}`, {
      withCredentials: true,
    })
    company.value = res.data
    tagsString.value = (res.data.companyTags || []).join(', ')
  } catch (err) {
    console.error('Failed to fetch company:', err)
  }
}

const saveCompany = async () => {
  if (!company.value) return

  try {
    const companyData = { ...company.value }
    companyData.companyTags = tagsString.value
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    // Parse companyStudents from hidden input if it's a stringified array
    if (typeof companyData.companyStudents === 'string') {
      companyData.companyStudents = JSON.parse(companyData.companyStudents)
    }

    await axios.put(
      `${config.public.apiBase}/company/${route.params._id}`,
      companyData,
      { withCredentials: true }
    )
    alert('Company updated successfully')
  } catch (err) {
    console.error('Error updating company:', err)
    alert('Error updating company')
  }
}

await fetchCompany()
</script>
