<script setup lang="ts">
const { seo } = useAppConfig()

const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('docs')
)
const { data: files } = useLazyAsyncData(
  'search',
  () => queryCollectionSearchSections('docs'),
  {
    server: false
  }
)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      name: 'google-site-verification',
      content: 'Att722IPv6JXXr7hY-un7qZTjrQYNioBYlaSTMGn3f4'
    }
  ],
  link: [{ rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  ogImage:
    'https://raw.githubusercontent.com/mubaidr/gem-team/main/docs/src/public/logo.svg',
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)
</script>

<template>
  <UApp class="site-shell">
    <NuxtLoadingIndicator />

    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded focus:outline-none"
    >Skip to main content</a
    >

    <AppHeader aria-label="Main navigation" />

    <UMain id="main-content">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </UApp>
</template>
