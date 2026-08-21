<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");
</script>

<template>
  <UContainer class="py-6 sm:py-10">
    <UPage>
      <template #left>
        <UPageAside>
          <div
            class="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted"
          >
            Documentation
          </div>
          <UContentNavigation highlight :navigation="navigation" />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
