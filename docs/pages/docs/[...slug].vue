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
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>
