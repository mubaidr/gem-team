<script setup lang="ts">
const { data: page } = await useAsyncData("index", () =>
  queryCollection("docs").path("/").first(),
);
</script>
<template>
  <div class="min-h-screen">
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>
