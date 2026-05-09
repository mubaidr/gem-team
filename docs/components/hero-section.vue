<template>
  <div class="py-20 sm:py-28 lg:py-36 bg-slate-50 dark:bg-slate-950">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Two-column grid: 60/40 split -->
      <div
        class="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start"
      >
        <!-- LEFT COLUMN: Main Hero Content (60%) -->
        <div class="flex flex-col">
          <!-- Badge -->
          <div class="mb-6">
            <UBadge
              color="primary"
              variant="subtle"
              size="lg"
              icon="i-lucide-sparkles"
            >
              Self-Learning AI Agents
            </UBadge>
          </div>

          <!-- Title -->
          <h1
            class="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white text-balance tracking-tight mb-6 leading-[1.1]"
          >
            <span class="text-primary">Gem Team</span>
          </h1>

          <!-- Description -->
          <p
            class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 text-balance mb-8 max-w-2xl leading-relaxed"
          >
            Self-learning multi-agent orchestration harness for
            <span
              class="font-semibold text-slate-900 dark:text-white bg-primary-50 dark:bg-primary-500/20 px-2 py-0.5 rounded"
            >
              spec-driven development
            </span>
            and automated verification.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap items-center gap-4 mb-12">
            <UButton
              to="/docs/introduction"
              label="Get Started"
              icon="i-lucide-rocket"
              color="primary"
              size="lg"
            />
            <UButton
              to="https://github.com/mubaidr/gem-team"
              target="_blank"
              external
              label="View on GitHub"
              icon="i-lucide-github"
              variant="outline"
              size="lg"
            />
          </div>

          <!-- Quick stats -->
          <div
            class="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-slate-200 dark:border-white/10"
          >
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-primary">14</div>
              <div class="text-xs sm:text-sm text-slate-500 mt-2">
                Specialized Agents
              </div>
            </div>
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-primary">4x</div>
              <div class="text-xs sm:text-sm text-slate-500 mt-2">
                Faster Dev
              </div>
            </div>
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-primary">TDD</div>
              <div class="text-xs sm:text-sm text-slate-500 mt-2">
                First Workflow
              </div>
            </div>
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-primary">∞</div>
              <div class="text-xs sm:text-sm text-slate-500 mt-2">
                Self-Learning
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Why Gem Team? Features (40%) -->
        <div class="lg:pt-4">
          <UPageCard
            class="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10"
            spotlight
            highlight
          >
            <div class="flex items-center gap-3 mb-6">
              <UIcon name="i-lucide-gem" class="w-5 h-5 text-primary" />
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                Why Gem Team?
              </h3>
            </div>

            <ul class="space-y-4">
              <li
                v-for="(feature, index) in whyFeatures"
                :key="feature.title"
                class="flex items-start gap-4"
              >
                <UBadge :color="feature.color" variant="subtle" size="sm">{{
                  index + 1
                }}</UBadge>
                <div>
                  <h4
                    class="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1"
                  >
                    {{ feature.title }}
                  </h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    {{ feature.description }}
                  </p>
                </div>
              </li>
            </ul>
          </UPageCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const whyFeatures = [
  {
    title: "Parallel Execution",
    description: "Multiple agents work simultaneously.",
    color: "emerald",
  },
  {
    title: "Wave-Based Processing",
    description: "Intelligent task cascades.",
    color: "sky",
  },
  {
    title: "Self-Healing",
    description: "Auto-recovery from failures.",
    color: "violet",
  },
  {
    title: "Enterprise Security",
    description: "OWASP, secrets, PII protection.",
    color: "amber",
  },
  {
    title: "Context Preservation",
    description: "Cross-session knowledge.",
    color: "rose",
  },
];
</script>
