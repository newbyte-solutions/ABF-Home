<template>
  <AuthCheck :isAdmin="false" :isStudent="false" :isFtf="true" />
  <div class="container min-h-screen bg-gray-900">
    <FtfItemDeletor />
  </div>
</template>
