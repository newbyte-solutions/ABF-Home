<template>
  <div class="w-full min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl text-center font-semibold text-gray-900 mb-8">Bedrifter</h1>
      <div class="grid gap-6">
        <div
          v-for="company in companies"
          :key="company._id"
          class="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
        >
          <div class="flex flex-col md:flex-row md:items-start md:space-x-6">
            <div class="w-full md:w-1/4 mb-4 md:mb-0">
              <img :src="company.companyLogo" alt="company logo" class="w-full h-auto object-contain rounded" />
            </div>
            <div class="w-full md:w-3/4">
              <div class="flex justify-between items-start">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ company.companyName }}</h2>
                <div class="flex flex-row space-x-4">
                  <button
                    @click="confirmDelete(company._id)"
                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Slett
                  </button>
                  <button
                    @click="$router.push(`/admin/company/${company._id}`)"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Rediger
                  </button>
                  <button
                    @click="toggleFTF(company._id)"
                    class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-all border-4 border-purple-500"
                    :class="{ 'border-4 border-purple-600 bg-transparent text-purple-500 hover:bg-purple-600 hover:text-white': company.companyIsFTF }"
                  >
                    Toggle FTF
                  </button>
                </div>
              </div>
              <div class="space-y-2 text-gray-700">
                <p class="text-lg">{{ company.companyDescription }}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p><span class="font-semibold">Epost:</span> {{ company.companyEmail }}</p>
                    <p><span class="font-semibold">Kontaktperson:</span> {{ company.companyContactPerson }}</p>
                    <p><span class="font-semibold">Telefon:</span> {{ company.companyPhone }}</p>
                  </div>
                  <div>
                    <p><span class="font-semibold">Klassetrinn:</span> {{ company.companyGrade }}</p>
                    <p><span class="font-semibold">Studenter:</span>
                      <span v-if="company.companyStudents.length === 0">Ingen studenter tildelt</span>
                      <ul v-else>
                        <li v-for="studentId in company.companyStudents" :key="studentId">
                          {{ userMap[studentId] || 'Laster...' }}
                        </li>
                      </ul>
                    </p>
                    <p><span class="font-semibold">Grunnlagt:</span> {{ formatDate(company.companyFounded) }}</p>
                  </div>
                </div>
                <div class="mt-4">
                  <span class="font-semibold">Tags:</span> {{ company.companyTags }}
                </div>
                <div class="mt-4">
                  <label class="font-semibold">Velg elev:</label>
                  <select
                    @change="(e) => assignStudent(company._id, (e.target as HTMLSelectElement).value)"
                    class="mt-2 border border-gray-300 rounded px-4 py-2 w-full text-black"
                  >
                    <option value="" disabled selected>Velg en elev</option>
                    <option v-for="user in users" :key="user._id" :value="user._id" class="text-black">
                      {{ user.username }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ConfirmationModal
      :visible="isVisible"
      :title="title"
      :message="message"
      @confirm="onConfirm"
      @cancel="onCancel"
    />  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useConfirmation } from '@/composables/useConfirmation'

const companies = ref<any[]>([])
const users = ref<any[]>([])
const userMap = ref<Record<string, string>>({})
const companyToDelete = ref<string | null>(null)

const {
  isVisible,
  title,
  message,
  confirm,
  onConfirm,
  onCancel
} = useConfirmation()

async function confirmDelete(companyId: string) {
  const result = await confirm('Confirm Deletion', 'Are you sure you want to delete this company?')
  if (result) {
    await deleteCompany(companyId)
  }
}

async function deleteCompany(companyId: string) {
  try {
    const { public: publicConfig } = useRuntimeConfig()
    await axios.delete(`${publicConfig.apiBase}/company/${companyId}`, { withCredentials: true })
    companies.value = companies.value.filter(c => c._id !== companyId)
  } catch (error) {
    console.error('Error deleting company:', error)
  }
}

async function toggleFTF(companyId: string) {
  try {
    const { public: publicConfig } = useRuntimeConfig()
    const response = await axios.put(
      `${publicConfig.apiBase}/company/toggle_ftf/${companyId}`,
      {},
      { withCredentials: true }
    )
    const company = companies.value.find(c => c._id === companyId)
    if (company) {
      company.companyIsFTF = response.data.companyIsFTF
    }
  } catch (error) {
    console.error('Error toggling FTF:', error)
  }
}

async function assignStudent(companyId: string, studentId: string) {
  if (!studentId) return
  try {
    const { public: publicConfig } = useRuntimeConfig()
    const response = await axios.put(
      `${publicConfig.apiBase}/company/update_students/${companyId}`,
      { studentId },
      { withCredentials: true }
    )
    const company = companies.value.find(c => c._id === companyId)
    if (company) {
      company.companyStudents = response.data.companyStudents
      await fetchStudentNames(company.companyStudents)
    }
  } catch (error) {
    console.error('Error assigning student:', error)
  }
}

async function fetchStudentNames(studentIds: string[]) {
  for (const id of studentIds) {
    if (!userMap.value[id]) {
      try {
        const { public: publicConfig } = useRuntimeConfig()
        const response = await axios.get(`${publicConfig.apiBase}/auth/get_user/${id}`, { withCredentials: true })
        userMap.value = { ...userMap.value, [id]: response.data.username }
      } catch (error) {
        console.error(`Error fetching user ${id}:`, error)
      }
    }
  }
}

onMounted(async () => {
  try {
    const { public: publicConfig } = useRuntimeConfig()
    const companyResponse = await axios.get(`${publicConfig.apiBase}/company/`, { withCredentials: true })
    companies.value = companyResponse.data

    for (const company of companies.value) {
      await fetchStudentNames(company.companyStudents)
    }

    const userResponse = await axios.get(`${publicConfig.apiBase}/auth`, { withCredentials: true })
    users.value = userResponse.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('no-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>
