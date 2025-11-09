<template>
  <AuthCheck :isAdmin="false" :isStudent="false" :isFtf="true" />
  <div class="container">
    <FtfItemManager />
  </div>
</template>