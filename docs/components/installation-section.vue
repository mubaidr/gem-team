<template>
  <div class="relative py-24 sm:py-32 lg:py-40">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12">
        <UBadge
          label="Get Started"
          variant="subtle"
          color="amber"
          class="mb-4"
        />
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance tracking-tight"
        >
          Install in <span class="text-amber-400">Minutes</span>
        </h2>
        <p class="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          Choose your preferred installation method and start building
        </p>
      </div>

      <!-- Installation options accordion -->
      <div class="max-w-3xl mx-auto">
        <UAccordion
          :items="installOptions"
          :default-value="'apm'"
          type="single"
          class="bg-slate-900/50 border border-white/5 rounded-2xl backdrop-blur-sm overflow-hidden"
        >
          <template #item="{ item }">
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4"
            >
              <!-- Content -->
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-white mb-1">
                  {{ item.label }}
                </h3>
                <p class="text-sm text-slate-400">
                  {{ item.content }}
                </p>
              </div>

              <!-- Code block -->
              <code
                class="flex-1 w-full sm:w-auto bg-slate-950 rounded-xl p-3 text-sm font-mono text-emerald-400 border border-white/5 overflow-x-auto"
              >
                {{ item.code }}
              </code>
            </div>
          </template>

          <template #item-leading="{ item }">
            <div
              class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mr-3"
              :class="item.iconBg"
            >
              <UIcon
                :name="item.icon"
                class="w-5 h-5"
                :class="item.iconColor"
              />
            </div>
          </template>
        </UAccordion>
      </div>

      <!-- Quick start CTA -->
      <div class="text-center mt-12">
        <p class="text-sm text-slate-500 mb-4">New to Gem Team?</p>
        <UButton
          to="/docs/introduction"
          label="Read the Docs"
          icon="i-lucide-book-open"
          color="primary"
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
    label: "APM Package Manager (Recommended)",
    icon: "i-lucide-package",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    content: "Universal package manager for AI coding tools",
    code: "apm install mubaidr/gem-team",
    value: "apm",
  },
  {
    label: "VS Code Marketplace",
    icon: "i-lucide-shopping-bag",
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-400",
    content: "Install directly from VS Code extensions panel",
    code: "Search 'gem-team' in Extensions (Ctrl+Shift+X)",
    value: "vscode",
  },
  {
    label: "Awesome Copilot Extension",
    icon: "i-lucide-crown",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    content: "For GitHub Copilot users wanting enhanced capabilities",
    code: "Install awesome-copilot, then gem-team",
    value: "awesome",
  },
  {
    label: "Manual Installation",
    icon: "i-lucide-folder-git-2",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    content: "Clone and configure manually for custom setups",
    code: "git clone https://github.com/mubaidr/gem-team.git",
    value: "manual",
  },
];
</script>
