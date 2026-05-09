<template>
  <div class="my-6">
    <UButton
      :to="to || '#'"
      :label="label || 'Learn More'"
      :icon="icon || 'i-lucide-arrow-right'"
      variant="outline"
      color="primary"
      size="lg"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  to: String,
  label: String,
  icon: String,
});
</script>
