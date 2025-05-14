<template>
  <div class="p-5 w-full mx-auto">
    <h2 class="text-center text-3xl md:text-4xl font-bold mb-10">
      User Management
    </h2>
    <div class="flex flex-col gap-3">
      <div
        v-for="user in users"
        :key="user._id"
        class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-300 rounded shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex flex-col gap-2">
          <span class="text-xl font-semibold"
            >{{ user.name }} {{ user.username }}</span
          >
          <span class="text-gray-300">Email: {{ user.email }}</span>
          <span class="text-gray-300">Role: {{ user.role }}</span>
          <span class="text-gray-300">Grade: {{ user.grade }}</span>
          <span class="text-gray-300">Phone: {{ user.phone }}</span>
          <span class="text-gray-300"
            >FTF: {{ user.isFTF ? "Yes" : "No" }}</span
          >
          <span class="text-gray-300"
            >Created: {{ formatDate(user.createdAt) }}</span
          >
        </div>
        <div
          class="flex flex-row md:flex-col space-y-0 space-x-2 md:space-y-2 md:space-x-0 mt-4 md:mt-0"
        >
          <button
            @click="confirmDelete(user._id)"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Delete User
          </button>
          <button
            @click="editUser(user._id)"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Edit User
          </button>
          <button
            @click="toggleFTF(user._id)"
            class="text-white px-4 py-2 rounded cursor-pointer transition-all border-4 border-transparent"
            :class="{
              'bg-purple-500 hover:bg-purple-600': !user.isFTF,
              'border-purple-500 bg-transparent text-purple-600 hover:bg-purple-600 hover:text-white':
                user.isFTF,
            }"
          >
            Toggle FTF
          </button>
        </div>
      </div>
    </div>

    <ConfirmationModal
      :visible="isVisible"
      :title="title"
      :message="message"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useConfirmation } from "@/composables/useConfirmation";

const users = ref<any[]>([]);
const userMap = ref<Record<string, string>>({});
const router = useRouter();
const userToDelete = ref<string | null>(null);

const { isVisible, title, message, confirm, onConfirm, onCancel } =
  useConfirmation();

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("no-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

async function confirmDelete(userId: string) {
  const result = await confirm(
    "Confirm Deletion",
    "Are you sure you want to delete this user?",
  );
  if (result) {
    await deleteUser(userId);
  }
}

async function deleteUser(userId: string) {
  try {
    const { public: publicConfig } = useRuntimeConfig();
    await axios.delete(`${publicConfig.apiBase}/auth/${userId}`, {
      withCredentials: true,
    });
    users.value = users.value.filter((user) => user._id !== userId);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

function editUser(userId: string) {
  router.push(`/admin/users/${userId}`);
}

async function toggleFTF(userId: string) {
  try {
    const { public: publicConfig } = useRuntimeConfig();
    const response = await axios.put(
      `${publicConfig.apiBase}/auth/${userId}/toggle_isFTF`,
      {},
      { withCredentials: true },
    );
    const userIndex = users.value.findIndex((user) => user._id === userId);
    if (userIndex !== -1) {
      users.value[userIndex].isFTF = response.data.isFTF;
    }
  } catch (error) {
    console.error("Error toggling FTF for user:", error);
  }
}

onMounted(async () => {
  try {
    const { public: publicConfig } = useRuntimeConfig();
    const response = await axios.get(`${publicConfig.apiBase}/auth/`, {
      withCredentials: true,
    });
    users.value = response.data;
    users.value.forEach((user) => {
      userMap.value[user._id] = `${user.name} (${user.username})`;
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
});
</script>
