<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
</script>

<template>
  <UContainer class="py-8 sm:py-12">
    <UPage>
      <template #left>
        <UPageAside class="lg:pr-8">
          <UContentNavigation highlight :navigation="navigation" />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
