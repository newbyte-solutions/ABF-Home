<template>
  <CheckAuth :isAdmin="false" :isStudent="false" :isFtf="true" />
  <div class="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-start py-14 px-4">
    <div class="w-full text-center my-8">
      <h1 class="text-3xl font-bold text-gray-800">FTF Globale Logg</h1>
    </div>
    <FTFLogs />
  </div>
</template>