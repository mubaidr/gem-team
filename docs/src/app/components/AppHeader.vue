<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");

const { header } = useAppConfig();
</script>

<template>
  <UHeader
    :ui="{
      root: 'border-b border-default/70 bg-default/80 backdrop-blur',
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
        <AppLogo class="size-7" />
        <div class="hidden sm:block">
          <span v-if="header?.title" class="font-semibold tracking-tight">
            {{ header.title }}
          </span>
          <span class="block text-xs text-muted"
            >Engineering for AI coding</span
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
