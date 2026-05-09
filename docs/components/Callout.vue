<template>
  <div class="my-6">
    <UAlert
      :icon="icon || 'i-lucide-info'"
      :title="title"
      :description="description"
      :color="color || 'primary'"
      :variant="variant || 'subtle'"
      class="backdrop-blur-sm"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  title: String,
  description: String,
  color: String,
  variant: String,
});
</script>
