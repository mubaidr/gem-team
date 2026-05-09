<script setup lang="ts">
const route = useRoute();

// Get path from route (e.g., /docs/introduction -> introduction)
const slug = route.params.slug ? route.params.slug.join("/") : "index";

const { data: page } = await useAsyncData("doc-" + slug, () =>
  queryCollection("docs")
    .path("/" + slug)
    .first(),
);

if (!page.value) {
  throw createError({ statusCode: 404, message: "Page not found" });
}

useSeoMeta({
  title: () => page.value?.title || "Gem Team Docs",
  description: () => page.value?.description || "",
});
</script>

<template>
  <div class="min-h-screen py-8 md:py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </div>
</template>
