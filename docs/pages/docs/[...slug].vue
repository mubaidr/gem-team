<script setup lang="ts">
const route = useRoute();

// Content is in content/docs/ folder, so paths are /docs/{slug}
const slug = route.params.slug
  ? Array.isArray(route.params.slug)
    ? route.params.slug.join("/")
    : route.params.slug
  : "index";

// Build full path: /docs/contributing
const contentPath = "/docs/" + slug;

const { data: page } = await useAsyncData("doc-" + contentPath, () =>
  queryCollection("docs").path(contentPath).first(),
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    message: "Page not found at " + contentPath,
  });
}

useSeoMeta({
  title: () => page.value?.title || "Gem Team Docs",
  description: () => page.value?.description || "",
});
</script>

<template>
  <div class="min-h-screen py-8 md:py-12 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto max-w-4xl">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </div>
</template>
