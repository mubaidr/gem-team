<template>
  <div class="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12">
        <UBadge label="The Team" variant="subtle" color="sky" class="mb-4" />
        <h2
          class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          Meet the <span class="text-sky-500">Agents</span>
        </h2>
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          14 specialized agents, each trained for specific development tasks
        </p>
      </div>

      <!-- Agents grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto"
      >
        <UPageCard
          class="text-center cursor-default"
          spotlight
          v-for="agent in agents"
          :key="agent.name"
        >
          <div class="flex flex-col items-center">
            <div
              class="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mb-2"
            >
              <UIcon
                :name="agent.icon"
                class="w-6 h-6 text-sky-600 dark:text-sky-400"
              />
            </div>
            <span
              class="font-semibold text-slate-700 dark:text-slate-300 truncate"
              >{{ agent.name }}</span
            >
            <br />
            <div class="text-sm">
              {{ agent.description }}
            </div>
          </div>
        </UPageCard>
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
    icon: "i-lucide-tablet",
    description: "Tests iOS and Android applications",
  },
  {
    name: "gem-browser-tester",
    icon: "i-lucide-globe",
    description: "Tests web applications across browsers",
  },
];
</script>
