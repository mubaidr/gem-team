<script setup lang="ts"></script>

<template>
  <UFooter
    class="relative overflow-hidden border-t border-default/70 bg-default/70"
    aria-label="Footer"
  >
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2 text-sm font-medium text-muted">
        <span>Gem Team</span>
      </NuxtLink>
    </template>

    <template #right>
      <div class="flex items-center gap-4 text-sm text-muted">
        <a
          href="https://github.com/mubaidr/gem-team"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 hover:text-primary transition-colors"
          aria-label="GitHub repository"
        >
          <UIcon name="i-simple-icons-github" class="size-4" />
          <span>GitHub</span>
        </a>
        <span class="text-muted">Apache 2.0 License</span>
        <span class="text-muted">&copy; {{ new Date().getFullYear() }} Gem Team</span>
      </div>
    </template>
  </UFooter>
</template>
