<template>
  <div class="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
    <!-- Radial gradient background -->
    <div
      class="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-transparent to-transparent"
    />

    <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Badge -->
        <UBadge
          label="Self-Learning AI Agents"
          variant="subtle"
          color="emerald"
          class="mb-6"
        />

        <!-- Title -->
        <h1
          class="text-5xl sm:text-6xl lg:text-7xl font-bold text-white text-balance tracking-tight mb-6"
        >
          <span
            class="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent"
          >
            Gem Team
          </span>
        </h1>

        <!-- Description -->
        <p
          class="text-xl sm:text-2xl text-slate-400 text-balance mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Self-learning multi-agent orchestration harness for
          <span class="text-white font-semibold">spec-driven development</span>
          and automated verification.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4">
          <UButton
            to="/docs/introduction"
            label="Get Started"
            icon="i-lucide-rocket"
            color="primary"
            size="lg"
            class="shadow-lg shadow-emerald-500/25"
          />
          <UButton
            to="https://github.com/mubaidr/gem-team"
            target="_blank"
            external
            label="View on GitHub"
            icon="i-lucide-github"
            color="neutral"
            variant="outline"
            size="lg"
          />
        </div>

        <!-- Quick stats -->
        <div
          class="flex flex-wrap items-center justify-center gap-8 mt-16 pt-16 border-t border-white/5"
        >
          <div class="text-center">
            <div class="text-3xl font-bold text-emerald-400">14</div>
            <div class="text-sm text-slate-500 mt-1">Specialized Agents</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-emerald-400">4x</div>
            <div class="text-sm text-slate-500 mt-1">Faster Development</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-emerald-400">TDD</div>
            <div class="text-sm text-slate-500 mt-1">First Workflow</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-emerald-400">∞</div>
            <div class="text-sm text-slate-500 mt-1">Self-Learning</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative grid -->
    <div
      class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-30 pointer-events-none"
    />
  </div>
</template>

<script setup lang="ts">
// Hero section component - clean, modern design
</script>
