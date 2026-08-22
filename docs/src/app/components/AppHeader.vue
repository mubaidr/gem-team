<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");

const { header } = useAppConfig();
</script>

<template>
  <UHeader
    :ui="{
      root: 'border-b border-default/70 bg-default/75 backdrop-blur-xl',
      center: 'flex-1',
    }"
    :to="header?.to || '/'"
  >
    <UContentSearchButton
      v-if="header?.search"
      :collapsed="false"
      class="w-full"
    />

    <template #left>
      <NuxtLink
        :to="header?.to || '/'"
        class="flex min-h-11 items-center gap-3"
      >
        <!-- <AppLogo class="size-8" /> -->
        <div class="hidden sm:block">
          <span v-if="header?.title" class="font-semibold tracking-[-0.02em]">
            {{ header.title }}
          </span>
          <span
            class="mt-0.5 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted"
            >Engineering system for AI</span
          >
        </div>
      </NuxtLink>
    </template>

    <template #right>
      <UContentSearchButton v-if="header?.search" class="lg:hidden" />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #body>
      <UContentNavigation highlight :navigation="navigation" />
    </template>
  </UHeader>
</template>
