<template>
  <div
    class="w-full min-h-screen bg-gradient-to-b -z-10 from-slate-400 to-slate-900 fixed"
  ></div>
  <div class="w-full h-fit">
    <div class="w-full h-screen flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-12 text-gray-800 text-center">Kom i kontakt</h2>
        <form @submit.prevent="submitForm" class="space-y-8">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Navn</label
            >
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700"
              >Melding</label
            >
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send inn
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  name: "",
  email: "",
  message: "",
});

const submitForm = async () => {
  try {
    // Handle form submission here
    console.log("Form submitted:", form.value);
    // Reset form after submission
    form.value = {
      name: "",
      email: "",
      message: "",
    };
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
</script>
