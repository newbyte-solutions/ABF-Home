<template>
  <div class="min-h-screen bg-gray-800 flex items-center justify-center py-16 px-6 sm:px-8 lg:px-10">
    <div class="max-w-lg w-full space-y-10 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl">
      <div>
        <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
          Kontakt Oss
        </h2>
      </div>
      <form class="mt-10 space-y-8" @submit.prevent="submitForm">
        <div class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Navn</label>
            <input id="name" name="name" type="text" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out" placeholder="Ditt navn" v-model="form.name">
          </div>
          <div>
            <label for="email-address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-postadresse</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out" placeholder="Din e-postadresse" v-model="form.email">
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Melding</label>
            <textarea id="message" name="message" required style="resize: none;" class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out" placeholder="Din melding" rows="5" v-model="form.message"></textarea>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
            Send Melding
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Håndter innsending av skjema her
      console.log('Skjema sendt:', this.form)
      // Tilbakestill skjema etter innsending
      this.form = {
        name: '',
        email: '',
        message: ''
      }
    }
  }
}
</script>