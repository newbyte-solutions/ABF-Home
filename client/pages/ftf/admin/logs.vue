<template>
  <AuthCheck :isAdmin="false" :isStudent="false" :isFtf="true" />
  <div
    class="w-full min-h-screen bg-gray-900 flex flex-col items-center justify-start py-14 px-4"
  >
    <div class="w-full text-center my-8">
      <h1 class="text-3xl font-bold text-white">FTF Globale Logg</h1>
    </div>
    <FtfLogs />
  </div>
</template>
