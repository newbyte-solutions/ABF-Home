<template>
  <div
    class="w-full max-w-md mx-auto md:px-10 px-4 flex flex-col md:flex-row items-center justify-center"
  >
    <div class="w-full flex flex-col">
      <div class="form-group">
        <label class="font-semibold text-sm md:text-base"
          >Select Student:</label
        >
        <select
          @change="assignStudent(companyId, $event.target.value)"
          class="mt-2 border border-gray-300 rounded px-4 py-2 w-full text-black text-sm md:text-base"
        >
          <option value="" disabled selected>Select a student</option>
          <option
            v-for="student in students"
            :key="student.id"
            :value="student.id"
            class="text-black"
          >
            {{ student.username }}
          </option>
        </select>
      </div>
      <div class="mt-4">
        <p>
          <span class="font-semibold text-sm md:text-base"
            >Assigned Students:</span
          >
        </p>
        <ul class="w-full space-y-2">
          <li
            v-for="studentId in assignedStudents"
            :key="studentId"
            class="text-sm md:text-base break-words"
          >
            {{ userMap[studentId] || "Loading..." }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const props = defineProps({
  companyId: {
    type: String,
    required: true,
  },
});

const students = ref([]);
const assignedStudents = ref([]);
const userMap = ref({});

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

const fetchAssignedStudents = async () => {
  console.log("Fetching assigned students for company:", props.companyId);
  if (!props.companyId) {
    console.error("Error: companyId is undefined.");
    return;
  }
  try {
    const { public: publicConfig } = useRuntimeConfig();
    const response = await axios.get(
      `${publicConfig.apiBase}/company/${props.companyId}`,
    );
    console.log("API Response:", response.data);
    assignedStudents.value = response.data.companyStudents || [];
    fetchStudentNames(response.data.companyStudents || []);
  } catch (error) {
    console.error("Error fetching assigned students:", error);
  }
};

const assignStudent = async (companyId, studentId) => {
  if (!studentId) return;
  try {
    const { public: publicConfig } = useRuntimeConfig();
    const response = await axios.put(
      `${publicConfig.apiBase}/company/update_students/${companyId}`,
      {
        studentId,
      },
    );
    console.log("Updated assigned students:", response.data);
    assignedStudents.value = response.data.companyStudents || [];
    fetchStudentNames(response.data.companyStudents || []);
  } catch (error) {
    console.error("Error assigning student:", error);
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

watch(
  () => props.companyId,
  (newCompanyId) => {
    if (newCompanyId) {
      fetchAssignedStudents();
    }
  },
  { immediate: true },
);

onMounted(async () => {
  await fetchStudents();
});
</script>
