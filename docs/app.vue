<script setup lang="ts">
useSeoMeta({
  titleTemplate: "%s | Gem Team",
  ogType: "website",
  ogSiteName: "Gem Team",
  twitterCard: "summary_large_image",
  twitterSite: "@mubaidr",
});

useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style></style>
