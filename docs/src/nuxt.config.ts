// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/seo'
  ],

  app: {
    baseURL: '/gem-team/'
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://mubaidr.github.io',
    name: 'Gem Team',
    description:
      'Turn AI coding into an engineering process: agent definitions that enforce good software engineering.'
  },

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },

  compatibilityDate: '2026-11-11',

  nitro: {
    prerender: {
      // Static Pages deploy has no Nitro server; emit sitemap.xml into .output/public.
      routes: ['/', '/sitemap.xml'],
      crawlLinks: true
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        '@unhead/schema-org/vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core'
      ]
    }
  },

  // AI Ready stays active for markdown/MCP; nuxt-llms is the sole llms.txt generator.
  aiReady: {
    llmsFullTxt: true
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    provider: 'iconify'
  },

  linkChecker: {
    enabled: true
  },

  ogImage: {
    zeroRuntime: true
  },

  robots: {
    // Non-root baseURL prevents module generation; public/robots.txt is served statically.
    robotsTxt: false
  },

  schemaOrg: {
    enabled: true,
    defaults: true
  },

  seo: {
    enabled: true
  },

  // Omit sources so the module auto-discovers prerendered Nuxt Content routes.
  sitemap: {
    enabled: true
  },

  skewProtection: {
    enabled: true
  }
})
