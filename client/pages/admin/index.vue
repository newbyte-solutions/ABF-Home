<template>
  <ClientOnly>
    <AuthCheck :isAdmin="true" :isStudent="false" :isFtf="false" />
    <div
      class="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 mt-10"
    >
      <AdminCompanyRegister />
      <AdminArticleCreate />
    </div>
    <div
      class="w-full min-h-screen bg-gray-900 text-white flex flex-col space-y-6 items-center justify-center p-4"
    >
      <AdminNewsSection />
    </div>
    <div
      class="w-full min-h-screen bg-gray-900 text-white flex flex-col space-y-6 items-center justify-center p-4"
    >
      <AdminCompanySection />
    </div>
    <div
      class="w-full min-h-screen bg-gray-900 text-white flex flex-col space-y-6 items-center justify-center p-4"
    >
      <AdminUserManager />
    </div>
    <div
      class="w-full h-fit bg-gray-900 text-white flex flex-col space-y-6 items-center justify-center p-4 pb-14"
    >
      <BaseLogoutButton class="py-3 md:py-4 w-64 md:w-96" />
    </div>
  </ClientOnly>
</template>
