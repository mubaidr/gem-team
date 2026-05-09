<script setup lang="ts">
const { data: page } = await useAsyncData("index", () =>
  queryCollection("docs").path("/").first(),
);

useSeoMeta({
  title: "Gem Team - Self-Learning Multi-Agent Orchestration",
  description:
    "Gem Team is a self-learning multi-agent orchestration system powered by AI. Build intelligent agent teams that collaborate, learn, and improve over time.",
  ogTitle: "Gem Team - AI Agent Orchestration",
  ogDescription:
    "Build intelligent agent teams that collaborate, learn, and improve over time.",
  ogImage: "/og-image.png",
});
</script>
<template>
  <div class="min-h-screen">
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>
