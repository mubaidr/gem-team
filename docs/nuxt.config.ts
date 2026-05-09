export default defineNuxtConfig({
  compatibilityDate: "2026-05-05",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/color-mode",
  ],
  css: ["~/assets/css/main.css"],
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },
  site: {
    url: "https://gem-team.pages.dev",
  },
  fonts: {
    families: [
      { name: "Inter", provider: "google" },
      { name: "JetBrains Mono", provider: "google" },
    ],
  },
  robots: {
    blockAiBots: false,
  },
});
