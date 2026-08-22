<script setup lang="ts"></script>

<template>
  <UFooter
    class="relative overflow-hidden border-t border-default/70 bg-default/70"
  >
    <template #left>
      <div class="flex items-center gap-3 text-sm text-muted">
        <AppLogo class="size-6" />
        <span
          >Gem Team <span class="text-dimmed">/</span> Engineering for AI</span
        >
      </div>
    </template>

    <template #right>
      <div class="flex items-center gap-1">
        <UButton
          to="https://github.com/mubaidr/gem-team"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="Open Gem Team on GitHub"
          color="neutral"
          variant="ghost"
        />
        <UColorModeButton />
      </div>

      <!-- <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template> -->
    </template>
  </UFooter>
</template>
