<script setup lang="ts">
const { footer } = useAppConfig();
</script>

<template>
  <UFooter>
    <template #left>
      <NuxtLink to="https://mubaidr.js.org">mubaidr.js.org</NuxtLink>
    </template>

    <template #right>
      <!-- {{ footer.credits }} -->

      <UColorModeButton v-if="footer?.colorMode" />

      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
