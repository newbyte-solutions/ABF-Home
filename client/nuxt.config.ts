// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/index.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2025-01-13",

  app: {
    head: {
      title: 'HUS Arbeidslivsfag',
      meta: [
        { name: 'description', content: `Offisell nettside for Helland Ungdomsskole's arbeidslivsfag.` },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:5000", // Becomes /api in production
    },
  },
});
