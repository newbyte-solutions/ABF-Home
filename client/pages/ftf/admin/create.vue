<template>
  <AuthCheck :isAdmin="false" :isStudent="false" :isFtf="true" />
  <div class="container min-h-screen w-full bg-gray-100">
    <FtfItemCreator />
  </div>
</template>