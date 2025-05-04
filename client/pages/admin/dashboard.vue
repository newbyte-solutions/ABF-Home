<template>
  <CheckAdmin />
  <div
  class="w-full min-h-screen bg-gray-900 text-white flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 items-center justify-center p-4"
  >
    <RegisterUser />
    <RegisterCompany />
    <CreateArticleAdmin />
  </div>
  <div class="w-full min-h-screen bg-gray-900 text-white flex flex-col space-y-6 items center justify-center p-4">
    <AdminNewsSection />
  </div>
  <div class="w-full min-h-screen bg-gray-900 text-white flex flex-col space-y-6 items center justify-center p-4">
    <AdminCompanySection />
  </div>
  <div class="w-full min-h-screen bg-gray-900 text-white flex flex-col space-y-6 items center justify-center p-4">
    <AdminUserManager />
  </div>
  <div class="w-full min-h-screen bg-gray-900 text-white flex flex-col space-y-6 items center justify-center p-4">
    <LogoutButton />
  </div>
</template>