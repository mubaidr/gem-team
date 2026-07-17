<script setup lang="ts">
const { data: page } = await useAsyncData("index", () =>
  queryCollection("landing").first(),
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const title = page.value.seo?.title || page.value.title;
const description = page.value.seo?.description || page.value.description;

useSeoMeta({
  titleTemplate: "",
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});
</script>

<template>
  <div>
    <StarsBg />
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>
