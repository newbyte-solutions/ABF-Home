<template>
  <div
    class="w-full mt h-fit py-10 flex justify-center items-center bg-gradient-to-br from-blue-700 to-purple-600 drop-shadow-2xl -z-20"
  >
    <h1 class="mt-20 font-bold text-5xl text-white">9. Klasse</h1>
  </div>
  <div class="w-full min-h-screen py-4 bg-white text-black flex flex-col">
   <GradeCompanySection grade="9"/>
    <div class="w-full flex flex-col justify-center items-center">
      <NewsSection grade="9" />
    </div>
    <h2 class="text-center text-2xl font-semibold my-10">Klasseliste</h2>
    <div class="w-full px-4 md:px-20">
      <GradeListComponent grade="9" />
    </div>
    <div class="my-20"></div>
  </div>
</template>
