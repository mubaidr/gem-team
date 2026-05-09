<template>
  <div class="relative py-24 sm:py-32 lg:py-40">
    <!-- Background gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-sky-950/30 to-transparent"
    />

    <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-16">
        <UBadge label="Workflow" variant="subtle" color="violet" class="mb-4" />
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance tracking-tight"
        >
          How It <span class="text-violet-400">Works</span>
        </h2>
        <p class="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          A streamlined workflow from planning to verification
        </p>
      </div>

      <!-- Workflow steps -->
      <div class="max-w-4xl mx-auto relative">
        <!-- Connection line (hidden on mobile) -->
        <div
          class="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-emerald-500/50 via-sky-500/50 via-violet-500/50 via-amber-500/50 to-teal-500/50"
        />

        <div
          class="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4"
        >
          <div
            v-for="(step, index) in steps"
            :key="step.title"
            class="flex flex-col items-center text-center w-full lg:w-auto"
          >
            <!-- Step indicator with number -->
            <div class="relative mb-4">
              <div
                class="w-20 h-20 rounded-2xl flex items-center justify-center transition-transform hover:scale-110"
                :class="step.bgColor"
              >
                <UIcon :name="step.icon" class="w-9 h-9 text-white" />
              </div>
              <span
                class="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-slate-900"
                :class="step.badgeBg"
              >
                {{ index + 1 }}
              </span>
            </div>

            <!-- Step info -->
            <h3 class="text-lg font-semibold text-white mb-1">
              {{ step.title }}
            </h3>
            <p class="text-sm text-slate-400 max-w-32">
              {{ step.description }}
            </p>

            <!-- Arrow (mobile only) -->
            <div v-if="index < steps.length - 1" class="lg:hidden mt-4">
              <UIcon
                name="i-lucide-arrow-down"
                class="w-6 h-6 text-slate-600"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Additional workflow features -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto"
      >
        <div
          v-for="feature in workflowFeatures"
          :key="feature.title"
          class="flex items-start gap-4"
        >
          <div
            class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            :class="feature.iconBg"
          >
            <UIcon
              :name="feature.icon"
              class="w-5 h-5"
              :class="feature.iconColor"
            />
          </div>
          <div>
            <h4 class="text-sm font-semibold text-white mb-1">
              {{ feature.title }}
            </h4>
            <p class="text-xs text-slate-400 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    title: "Orchestrate",
    icon: "i-lucide-cpu",
    description: "Coordinates workflow",
    bgColor:
      "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25",
    badgeBg: "bg-emerald-500",
  },
  {
    title: "Research",
    icon: "i-lucide-search",
    description: "Gathers requirements",
    bgColor:
      "bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg shadow-sky-500/25",
    badgeBg: "bg-sky-500",
  },
  {
    title: "Plan",
    icon: "i-lucide-map",
    description: "Creates implementation",
    bgColor:
      "bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/25",
    badgeBg: "bg-violet-500",
  },
  {
    title: "Execute",
    icon: "i-lucide-play",
    description: "Builds with TDD",
    bgColor:
      "bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/25",
    badgeBg: "bg-amber-500",
  },
  {
    title: "Verify",
    icon: "i-lucide-check-circle",
    description: "Validates quality",
    bgColor:
      "bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/25",
    badgeBg: "bg-teal-500",
  },
];

const workflowFeatures = [
  {
    title: "Parallel Execution",
    icon: "i-lucide-gem",
    description: "Multiple agents work simultaneously on independent tasks",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    title: "Shared Memory",
    icon: "i-lucide-database",
    description: "Agents share context and learn from previous interactions",
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-400",
  },
  {
    title: "Quality Gates",
    icon: "i-lucide-shield",
    description: "Automated checks ensure code meets quality standards",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
  },
];
</script>
