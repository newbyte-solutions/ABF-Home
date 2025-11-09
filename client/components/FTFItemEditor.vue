<template>
  <div class="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Rediger utleieobjekt</h2>
    <form v-if="item" @submit.prevent="submitEdit" class="space-y-4">
      <div>
        <label class="block font-medium mb-1">Navn</label>
        <input v-model="item.name" type="text" class="input" required />
      </div>
      <div>
        <label class="block font-medium mb-1">Beskrivelse</label>
        <textarea v-model="item.description" class="input" required />
      </div>
      <div>
        <label class="block font-medium mb-1">Kategori</label>
        <select v-model="item.category" class="input" required>
          <option value="alpine">Alpint</option>
          <option value="bicycle">Sykkel</option>
          <option value="camping">Camping</option>
        </select>
      </div>
      <div>
        <label class="block font-medium mb-1">Type</label>
        <input v-model="item.type" type="text" class="input" required />
      </div>
      <div>
        <label class="block font-medium mb-1">Aldersgrense</label>
        <input v-model="item.ageRating" type="text" class="input" required />
      </div>
      <div>
        <label class="block font-medium mb-1">Tags (kommaseparert)</label>
        <input v-model="tagsString" type="text" class="input" />
      </div>
      <div>
        <label class="block font-medium mb-1"
          >Bilde-URL(er) (kommaseparert)</label
        >
        <input v-model="imagesString" type="text" class="input" />
      </div>
      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? "Lagrer..." : "Lagre endringer" }}
        </button>
      </div>
    </form>
    <div v-else class="text-gray-500">Laster inn...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const item = ref<any>(null);
const loading = ref(false);
const tagsString = ref("");
const imagesString = ref("");

onMounted(async () => {
  loading.value = true;
  try {
    const { public: publicConfig } = useRuntimeConfig();
    const res = await axios.get(
      `${publicConfig.apiBase}/ftf/items/${route.params.id}`,
    );
    item.value = res.data;
    tagsString.value = (item.value.tags || []).join(", ");
    imagesString.value = (item.value.images || []).join(", ");
  } catch (e) {
    item.value = null;
  } finally {
    loading.value = false;
  }
});

watch(tagsString, (val) => {
  if (item.value)
    item.value.tags = val
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
});
watch(imagesString, (val) => {
  if (item.value)
    item.value.images = val
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
});

async function submitEdit() {
  loading.value = true;
  try {
    const { public: publicConfig } = useRuntimeConfig();
    await axios.put(
      `${publicConfig.apiBase}/ftf/items/${item.value.id}`,
      item.value,
      { withCredentials: true },
    );
    alert("Endringer lagret!");
  } catch (e) {
    alert("Kunne ikke lagre endringer.");
  } finally {
    loading.value = false;
  }
}
</script>
