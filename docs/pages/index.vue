<script setup lang="ts">
const { data: page } = await useAsyncData("index", () =>
  queryCollection("docs").path("/").first(),
);
</script>
<template>
  <div>
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>
