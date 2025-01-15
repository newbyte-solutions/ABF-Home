<template>
  <div class="w-full h-20 bg-white text-black absolute drop-shadow-2xl">
    <div class="w-full h-20 flex justify-center py-5 items-start space-x-4">
      <div class="absolute left-10">
        <h1 class="tracking-wider text-3xl font-bold">HUS</h1>
      </div>
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
  </div>
</template>
