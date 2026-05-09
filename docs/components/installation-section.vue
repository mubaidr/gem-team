<template>
  <div class="py-24 sm:py-32 lg:py-40 bg-white dark:bg-slate-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-16">
        <UBadge
          color="amber"
          variant="subtle"
          size="lg"
          icon="i-lucide-download"
          class="mb-6"
        >
          Get Started
        </UBadge>
        <h2
          class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6"
        >
          Install in <span class="text-amber-500">Minutes</span>
        </h2>
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Choose your preferred installation method
        </p>
      </div>

      <!-- Installation options -->
      <div class="max-w-4xl mx-auto space-y-4">
        <UCard
          v-for="option in installOptions"
          :key="option.value"
          class="group hover:border-amber-500/50 transition-colors"
        >
          <div
            class="flex flex-col lg:flex-row items-start lg:items-center gap-4"
          >
            <UIcon :name="option.icon" class="w-6 h-6 text-amber-500" />
            <div class="flex-1">
              <h3
                class="text-lg font-semibold text-slate-900 dark:text-white mb-1"
              >
                {{ option.label }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-slate-400">
                {{ option.content }}
              </p>
            </div>
            <code
              class="text-sm font-mono text-emerald-600 dark:text-emerald-400 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded"
            >
              {{ option.code }}
            </code>
          </div>
        </UCard>
      </div>

      <!-- Quick start CTA -->
      <div class="text-center mt-12">
        <UButton
          to="/docs/introduction"
          label="Read the Docs"
          icon="i-lucide-book-open"
          variant="outline"
          size="lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const installOptions = [
  {
    label: "APM Package Manager",
    icon: "i-lucide-package",
    content: "Universal package manager for AI coding tools",
    code: "apm install mubaidr/gem-team",
    value: "apm",
  },
  {
    label: "VS Code Marketplace",
    icon: "i-lucide-shopping-bag",
    content: "Install directly from VS Code extensions",
    code: "Search 'gem-team' in Extensions",
    value: "vscode",
  },
  {
    label: "Awesome Copilot Extension",
    icon: "i-lucide-crown",
    content: "For GitHub Copilot users",
    code: "Install awesome-copilot, then gem-team",
    value: "awesome",
  },
  {
    label: "Manual Installation",
    icon: "i-lucide-folder-git-2",
    content: "Clone and configure manually",
    code: "git clone https://github.com/mubaidr/gem-team.git",
    value: "manual",
  },
];
</script>
