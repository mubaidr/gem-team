<template>
  <div class="relative min-h-screen">
    <!-- Header - theme-aware styling -->
    <header
      class="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-slate-200 dark:border-white/5"
    >
      <div
        class="container mx-auto px-4 py-4 flex items-center justify-between"
      >
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div
            class="relative p-1 rounded-xl bg-linear-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/25"
          >
            <img src="/logo.svg" alt="Gem Team" class="h-8 w-8" />
          </div>
          <div class="flex flex-col">
            <span
              class="font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-none"
              >Gem Team</span
            >
            <span class="text-xs text-slate-500 dark:text-slate-500"
              >AI Agents</span
            >
          </div>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-1">
          <UTooltip text="Features" :popper="{ arrow: true }">
            <NuxtLink
              to="/docs/features"
              class="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-sm font-medium"
            >
              Features
            </NuxtLink>
          </UTooltip>
          <UTooltip text="Agent specifications" :popper="{ arrow: true }">
            <NuxtLink
              to="/docs/agents"
              class="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-sm font-medium"
            >
              Agents
            </NuxtLink>
          </UTooltip>
        </nav>

        <div class="flex items-center gap-2">
          <UTooltip text="Support us on Patreon" :popper="{ arrow: true }">
            <a
              href="https://patreon.com/mubaidr"
              target="_blank"
              rel="noopener"
              class="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-sm font-medium flex items-center gap-2"
            >
              <UIcon name="i-lucide-heart" class="w-4 h-4" />
            </a>
          </UTooltip>
          <UColorModeButton />
        </div>
      </div>
    </header>

    <main class="min-h-screen">
      <slot />
    </main>

    <footer
      class="border-t border-slate-200 dark:border-white/5 py-12 mt-20 bg-slate-50 dark:bg-slate-950/50"
    >
      <div class="container mx-auto px-4">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div class="flex items-center gap-3">
            <img src="/logo.svg" alt="Gem Team" class="h-8 w-8 opacity-60" />
            <div>
              <p class="text-slate-900 dark:text-white font-medium">Gem Team</p>
              <p class="text-sm text-slate-500">
                Self-Learning Multi-Agent Orchestration
              </p>
            </div>
          </div>
          <div class="flex items-center gap-6 text-sm text-slate-500">
            <span>Built with Nuxt & Nuxt UI</span>
            <span class="hidden md:block">•</span>
            <a
              href="https://github.com/mubaidr/gem-team"
              target="_blank"
              class="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <UIcon name="i-lucide-github" class="w-4 h-4" />
              Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>
