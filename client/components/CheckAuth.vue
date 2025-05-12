<template>
    <span class="hidden">Checking Auth...</span>
</template>
  <script>
      import axios from 'axios';

      export default {
          props: {
              isAdmin: {
                  type: Boolean,
                  default: false
              },
              isStudent: {
                  type: Boolean,
                  default: false
              },
              isFtf: {
                  type: Boolean,
                  default: false
              }
          },
          async mounted() {
              try {
                const { public: publicConfig } = useRuntimeConfig();
                const response = await axios.get(`${publicConfig.apiBase}/auth/me`, {
                    withCredentials: true,
                });
                const user = response.data.user;

                let hasAccess = false;

                if (this.isAdmin && user.role === 'admin') {
                    hasAccess = true;
                }
                if (this.isStudent && user.role === 'student') {
                    hasAccess = true;
                }
                  if (this.isFtf && user.isFTF === true) {
                      hasAccess = true;
                  }
                
                  if (!hasAccess) {
                      window.location.href = '/';
                  }
              } catch (error) {
                  window.location.href = '/';
              }
          }
      }
  </script>