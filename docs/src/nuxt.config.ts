// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxtjs/seo",
    "nuxt-llms",
  ],

  css: ["~/assets/css/main.css"],

  site: {
    url: "https://mubaidr.github.io/gem-team",
    name: "Gem Team",
    description:
      "Spec-driven multi-agent orchestration for software development with 16 specialist agents.",
  },

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1,
        },
      },
    },
    experimental: {
      sqliteConnector: "native",
    },
  },

  compatibilityDate: "2026-06-30",

  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        "@unhead/schema-org/vue",
        "@vue/devtools-core",
        "@vue/devtools-kit",
      ],
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  llms: {
    domain: "https://mubaidr.github.io/gem-team",
    title: "Gem Team",
    description:
      "Spec-driven multi-agent orchestration for software development with 16 specialist agents.",
    full: {
      title: "Gem Team - Full Documentation",
      description:
        "Complete documentation for Gem Team: multi-agent orchestration with planning, implementation, review, debugging, and learning workflows.",
    },
    sections: [
      {
        title: "Getting Started",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/getting-started%" },
        ],
      },
      {
        title: "Guide",
        contentCollection: "docs",
        contentFilters: [{ field: "path", operator: "LIKE", value: "/guide%" }],
      },
      {
        title: "Agents",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/agents%" },
        ],
      },
      {
        title: "Configuration",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/configuration%" },
        ],
      },
      {
        title: "Resources",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/resources%" },
        ],
      },
    ],
  },

  ogImage: {
    zeroRuntime: true,
  },

  robots: {
    robotsTxt: false,
  },
});
