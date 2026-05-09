<template>
  <div class="relative py-24 sm:py-32 lg:py-40">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-16">
        <UBadge label="The Team" variant="subtle" color="sky" class="mb-4" />
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance tracking-tight"
        >
          Meet the <span class="text-sky-400">Agents</span>
        </h2>
        <p class="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          14 specialized agents, each trained for specific development tasks
        </p>
      </div>

      <!-- Agents grid -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto"
      >
        <div v-for="agent in agents" :key="agent.name" class="group relative">
          <UCard
            class="text-center bg-slate-900/50 border-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm cursor-default"
            :ui="{
              base: 'p-4',
            }"
          >
            <!-- Avatar container -->
            <div class="relative mb-3">
              <div
                class="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary-400/20 to-primary-600/20 group-hover:from-primary-400/30 group-hover:to-primary-600/30 transition-all duration-300 border border-primary-500/20 group-hover:border-primary-500/40"
              >
                <UIcon :name="agent.icon" class="w-7 h-7 text-primary-400" />
              </div>

              <!-- Tooltip -->
              <div
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 border border-white/10 shadow-xl"
              >
                {{ agent.description }}
                <div
                  class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"
                />
              </div>
            </div>

            <!-- Name -->
            <h4
              class="text-xs font-medium text-slate-300 group-hover:text-white transition-colors truncate"
            >
              {{ agent.name }}
            </h4>
          </UCard>
        </div>
      </div>

      <!-- Footer note -->
      <p class="text-center text-sm text-slate-500 mt-8">
        Agents communicate via shared memory, context, and file system
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const agents = [
  {
    name: "gem-researcher",
    icon: "i-lucide-search",
    description: "Gathers information and analyzes requirements",
  },
  {
    name: "gem-planner",
    icon: "i-lucide-map",
    description: "Creates detailed implementation plans",
  },
  {
    name: "gem-implementer",
    icon: "i-lucide-code",
    description: "Writes code using TDD methodology",
  },
  {
    name: "gem-reviewer",
    icon: "i-lucide-eye",
    description: "Reviews code for quality and standards",
  },
  {
    name: "gem-debugger",
    icon: "i-lucide-bug",
    description: "Diagnoses and fixes issues",
  },
  {
    name: "gem-critic",
    icon: "i-lucide-message-square",
    description: "Challenges assumptions and finds edge cases",
  },
  {
    name: "gem-code-simplifier",
    icon: "i-lucide-minimize-2",
    description: "Refactors complex code into simpler forms",
  },
  {
    name: "gem-devops",
    icon: "i-lucide-server",
    description: "Handles deployment and infrastructure",
  },
  {
    name: "gem-documentation-writer",
    icon: "i-lucide-file-text",
    description: "Creates comprehensive documentation",
  },
  {
    name: "gem-designer",
    icon: "i-lucide-palette",
    description: "Designs web UI/UX with distinctive aesthetics",
  },
  {
    name: "gem-designer-mobile",
    icon: "i-lucide-smartphone",
    description: "Designs mobile UI/UX interfaces",
  },
  {
    name: "gem-implementer-mobile",
    icon: "i-lucide-code-2",
    description: "Implements React Native and Flutter",
  },
  {
    name: "gem-mobile-tester",
    icon: "i-lucide-test-2",
    description: "Tests iOS and Android applications",
  },
  {
    name: "gem-browser-tester",
    icon: "i-lucide-globe",
    description: "Tests web applications across browsers",
  },
];
</script>
