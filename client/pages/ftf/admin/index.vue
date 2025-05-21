<template>
  <CheckAuth :isAdmin="false" :isStudent="false" :isFtf="true" />
  <div
    class="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-start py-14 px-4"
  >
    <div class="w-full text-center my-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800">
        Fjord Til Fjells
      </h1>
      <p class="text-gray-600 mt-4">
        Welcome to the Fjord Til Fjells admin panel
      </p>
    </div>
    <FTFAdminDashboard />
  </div>
</template>
