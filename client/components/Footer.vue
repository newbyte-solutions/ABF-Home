<template>
  <footer class="absolute bottom w-full h-fit py-6 flex flex-row bg-white z-30">
    <div
      class="flex w-full h-full flex-col md:flex-row justify-between items-center px-2 md:px-20 space-y-4 md:space-y-0"
    >
      <div class="flex-1 text-center md:text-left">
        <h1>Helland Ungdomsskole (<strong>HUS</strong>)</h1>
      </div>
      <div class="flex-1 text-center">
        <p>Website by: Newbyte Solutions</p>
      </div>
      <div class="flex-1 text-center md:text-right">
        <router-link to="/admin" class="text-blue-800 hover:text-gray-900 underline"
          >Admin</router-link
        >
        |
        <router-link to="/student" class="text-blue-800 hover:text-gray-900 underline"
        >Student</router-link
        >
      </div>
    </div>
  </footer>
</template>
