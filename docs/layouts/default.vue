<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Animated background gradients -->
    <div class="fixed inset-0 -z-10">
      <div
        class="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900"
      />
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]"
      />
      <div
        class="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[128px]"
      />
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50"
      />
    </div>

    <header
      class="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/5"
    >
      <div
        class="container mx-auto px-4 py-4 flex items-center justify-between"
      >
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div
            class="relative p-1 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/25"
          >
            <img src="/logo.svg" alt="Gem Team" class="h-8 w-8" />
          </div>
          <div class="flex flex-col">
            <span
              class="font-bold text-lg text-white tracking-tight leading-none"
              >Gem Team</span
            >
            <span class="text-xs text-slate-500">AI Agents</span>
          </div>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-1">
          <UTooltip text="Features" :popper="{ arrow: true }">
            <a
              href="#features"
              class="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              Features
            </a>
          </UTooltip>
          <UTooltip text="Agent specifications" :popper="{ arrow: true }">
            <a
              href="#agents"
              class="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              Agents
            </a>
          </UTooltip>
          <UTooltip text="View source code" :popper="{ arrow: true }">
            <a
              href="https://github.com/mubaidr/gem-team"
              target="_blank"
              rel="noopener"
              class="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium flex items-center gap-2"
            >
              <UIcon name="i-lucide-github" class="w-4 h-4" />
              GitHub
            </a>
          </UTooltip>
        </nav>

        <div class="flex items-center gap-2">
          <UTooltip text="Support us on Patreon" :popper="{ arrow: true }">
            <UButton
              to="https://patreon.com/gemteam"
              target="_blank"
              external
              icon="i-lucide-heart"
              color="rose"
              variant="solid"
              size="sm"
              class="shadow-lg shadow-rose-500/25"
            />
          </UTooltip>
          <UColorModeButton />
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="border-t border-white/5 py-12 mt-20 bg-slate-950/50">
      <div class="container mx-auto px-4">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div class="flex items-center gap-3">
            <img src="/logo.svg" alt="Gem Team" class="h-8 w-8 opacity-60" />
            <div>
              <p class="text-white font-medium">Gem Team</p>
              <p class="text-sm text-slate-500">
                Self-Learning Multi-Agent Orchestration
              </p>
            </div>
          </div>
          <div class="flex items-center gap-6 text-sm text-slate-400">
            <span>Built with Nuxt & Nuxt UI</span>
            <span class="hidden md:block">•</span>
            <a
              href="https://github.com/mubaidr/gem-team"
              target="_blank"
              class="flex items-center gap-1 hover:text-white transition-colors"
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
