<template>
  <div class="relative">
    <!-- Section background with gradient overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/50 to-transparent"
    />

    <div class="relative py-24 sm:py-32 lg:py-40">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-16">
          <UBadge
            label="Capabilities"
            variant="subtle"
            color="emerald"
            class="mb-4"
          />
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance tracking-tight"
          >
            Built for <span class="text-emerald-400">Production</span>
          </h2>
          <p class="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive suite of AI agents working in harmony to deliver
            exceptional results.
          </p>
        </div>

        <!-- Features grid -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          <div
            v-for="feature in features"
            :key="feature.title"
            class="group relative"
          >
            <UCard
              class="h-full bg-slate-900/50 border-white/5 hover:border-emerald-500/30 hover:bg-slate-900/80 transition-all duration-300 backdrop-blur-sm"
            >
              <div class="flex flex-col h-full">
                <!-- Icon -->
                <div
                  class="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 transition-transform group-hover:scale-110"
                  :class="feature.iconBg"
                >
                  <UIcon
                    :name="feature.icon"
                    class="w-7 h-7"
                    :class="feature.iconColor"
                  />
                </div>

                <!-- Content -->
                <h3
                  class="text-lg font-semibold text-white mb-2 tracking-tight"
                >
                  {{ feature.title }}
                </h3>
                <p class="text-sm text-slate-400 leading-relaxed flex-1">
                  {{ feature.description }}
                </p>

                <!-- Hover glow effect -->
                <div
                  class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  :class="feature.glowColor"
                />
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: "4x Faster",
    icon: "i-lucide-zap",
    description:
      "Parallel execution with wave-based execution maximizes throughput and reduces development time.",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    glowColor: "bg-gradient-to-br from-emerald-500/5 to-transparent",
  },
  {
    title: "Built-in Security",
    icon: "i-lucide-shield-check",
    description:
      "OWASP scanning, secrets detection, and PII detection on critical tasks ensure enterprise-grade security.",
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-400",
    glowColor: "bg-gradient-to-br from-sky-500/5 to-transparent",
  },
  {
    title: "Self-Learning",
    icon: "i-lucide-brain",
    description:
      "Remembers patterns and adapts to your project's conventions over time for smarter assistance.",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    glowColor: "bg-gradient-to-br from-violet-500/5 to-transparent",
  },
  {
    title: "TDD-First",
    icon: "i-lucide-test-tube",
    description:
      "Test-driven development is enforced through the workflow, ensuring reliability from day one.",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    glowColor: "bg-gradient-to-br from-amber-500/5 to-transparent",
  },
];
</script>
