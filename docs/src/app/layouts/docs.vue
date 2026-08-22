<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");
</script>

<template>
  <UContainer class="py-8 sm:py-12">
    <UPage>
      <template #left>
        <UPageAside class="lg:pr-8">
          <div
            class="mb-4 flex items-center gap-2 px-3 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-primary"
          >
            <span
              class="size-1.5 rounded-full bg-primary shadow-sm shadow-primary"
            />
            Documentation
          </div>
          <UContentNavigation highlight :navigation="navigation" />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
