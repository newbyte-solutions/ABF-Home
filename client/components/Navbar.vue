<template>
  <div class="w-full h-20 bg-white text-black absolute drop-shadow-2xl z-20">
    <div class="w-full h-20 flex justify-center py-5 items-start">
      <div class="absolute left-10">
        <h1 class="tracking-wider text-3xl font-bold">HUS</h1>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-4">
        <router-link
          to="/"
          active-class="active-link"
          class="tracking-wider text-2xl"
          >Hjem</router-link
        >
        <router-link
          to="/klasser"
          active-class="active-link"
          class="tracking-wider text-2xl"
          >Klasser</router-link
        >
        <router-link
          to="/nyheter"
          active-class="active-link"
          class="tracking-wider text-2xl"
          >Nyheter</router-link
        >
        <router-link
          to="/kontakt"
          active-class="active-link"
          class="tracking-wider text-2xl"
          >Kontakt</router-link
        >
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden absolute right-10">
        <button @click="isOpen = !isOpen" class="focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-if="isOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isOpen"
        class="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg"
      >
        <div class="flex flex-col items-center py-4 space-y-4">
          <router-link
            to="/"
            active-class="active-link"
            class="tracking-wider text-2xl"
            @click="isOpen = false"
            >Hjem</router-link
          >
          <router-link
            to="/klasser"
            active-class="active-link"
            class="tracking-wider text-2xl"
            @click="isOpen = false"
            >Klasser</router-link
          >
          <router-link
            to="/nyheter"
            active-class="active-link"
            class="tracking-wider text-2xl"
            @click="isOpen = false"
            >Nyheter</router-link
          >
          <router-link
            to="/kontakt"
            active-class="active-link"
            class="tracking-wider text-2xl"
            @click="isOpen = false"
            >Kontakt</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
