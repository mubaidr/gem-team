<template>
  <div class="py-24 sm:py-32 lg:py-40 bg-slate-50 dark:bg-slate-950">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-16">
        <UBadge
          color="violet"
          variant="subtle"
          size="lg"
          icon="i-lucide-git-branch"
          class="mb-6"
        >
          Workflow
        </UBadge>
        <h2
          class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6"
        >
          How It <span class="text-violet-500">Works</span>
        </h2>
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          A streamlined workflow from planning to verification
        </p>
      </div>

      <!-- Workflow steps -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
      >
        <UCard
          v-for="(step, index) in steps"
          :key="step.title"
          class="text-center"
        >
          <div class="flex flex-col items-center">
            <div
              class="w-12 h-12 rounded-full bg-violet-500 text-white flex items-center justify-center mb-4"
            >
              <UIcon :name="step.icon" class="w-6 h-6" />
            </div>
            <span class="text-xs text-slate-500 mb-2">{{ index + 1 }}</span>
            <h3
              class="text-lg font-semibold text-slate-900 dark:text-white mb-2"
            >
              {{ step.title }}
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              {{ step.description }}
            </p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    title: "Research",
    icon: "i-lucide-search",
    description: "Gathers requirements",
  },
  {
    title: "Plan",
    icon: "i-lucide-map",
    description: "Creates implementation",
  },
  { title: "Execute", icon: "i-lucide-play", description: "Builds with TDD" },
  {
    title: "Verify",
    icon: "i-lucide-check-circle",
    description: "Validates quality",
  },
];
</script>
