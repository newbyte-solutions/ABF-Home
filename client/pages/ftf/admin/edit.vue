<template>
  <AuthCheck :isAdmin="false" :isStudent="false" :isFtf="true" />
  <div class="container">
    <FtfItemEditor />
  </div>
</template>