<template>
  <div class="py-24 sm:py-32 lg:py-40 bg-slate-50 dark:bg-slate-950">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-16">
        <UBadge
          color="primary"
          variant="subtle"
          size="lg"
          icon="i-lucide-cpu"
          class="mb-6"
        >
          Capabilities
        </UBadge>
        <h2
          class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6"
        >
          Built for <span class="text-primary">Production</span>
        </h2>
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          A comprehensive suite of AI agents working in harmony.
        </p>
      </div>

      <!-- Features grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <UCard
          v-for="feature in features"
          :key="feature.title"
          class="group hover:border-primary-500/50 transition-colors"
        >
          <div class="flex flex-col">
            <UIcon :name="feature.icon" class="w-8 h-8 text-primary mb-4" />
            <h3
              class="text-lg font-semibold text-slate-900 dark:text-white mb-2"
            >
              {{ feature.title }}
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              {{ feature.description }}
            </p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: "4x Faster",
    icon: "i-lucide-zap",
    description: "Parallel execution maximizes throughput.",
  },
  {
    title: "Built-in Security",
    icon: "i-lucide-shield-check",
    description: "OWASP scanning and PII detection.",
  },
  {
    title: "Self-Learning",
    icon: "i-lucide-brain",
    description: "Adapts to your project's conventions.",
  },
  {
    title: "TDD-First",
    icon: "i-lucide-test-tube",
    description: "Test-driven development enforced.",
  },
];
</script>
