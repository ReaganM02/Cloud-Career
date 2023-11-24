// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vee-validate/nuxt', '@nuxtjs/google-fonts'],
  css: ['~/assets/css/main.css'],
  googleFonts: {
    families: {
      Nunito: [800],
      Lato: [400, 700]
    }
  },
  nitro: {
    imports: {
      dirs: ['./server/models/*']
    }
  },
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
  }

})
