<template>
  <AuthCheck :isAdmin="false" :isStudent="false" :isFtf="true" />
  <div class="container">
    <FtfAdminItems />
  </div>
</template>