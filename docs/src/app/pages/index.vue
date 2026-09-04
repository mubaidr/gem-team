<script setup lang="ts">
useHead({
  titleTemplate: '%s'
})

useSeoMeta({
  title: 'Gem Team',
  ogTitle: 'Gem Team',
  description:
    'Turn AI coding into an engineering process: agent definitions that enforce good software engineering.',
  ogDescription:
    'Turn AI coding into an engineering process: agent definitions that enforce good software engineering.'
})
</script>

<template>
  <UPage class="relative">
    <UPageHero
      orientation="horizontal"
      class="min-h-[calc(100svh-4.5rem)] border-b-0 py-20 sm:py-28"
      :ui="{
        container: 'relative z-10 items-center',
        title: 'max-w-4xl text-balance tracking-tighter',
        description: 'max-w-xl leading-8 text-pretty',
        links: 'flex-wrap gap-3'
      }"
    >
      <template #headline>
        <span class="eyebrow">The open engineering system for AI</span>
      </template>
      <template #title>
        Turn AI coding into a
        <span class="relative whitespace-nowrap text-primary">
          <span
            class="absolute -inset-x-3 bottom-1 -z-10 h-3 rounded-full bg-primary/15 blur-lg"
          />
          better process.
        </span>
      </template>
      <template #description>
        A coordinated team of agents that plans, builds, reviews, and learns —
        so every coding session ships with more signal and less chaos.
      </template>
      <template #links>
        <UButton
          to="/getting-started"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
        >
          Start building
        </UButton>
        <UButton
          to="https://github.com/mubaidr/gem-team"
          target="_blank"
          size="xl"
          color="neutral"
          variant="outline"
          leading-icon="i-simple-icons-github"
        >
          View on GitHub
        </UButton>
      </template>
      <template #default>
        <div class="relative mx-auto w-full max-w-xl">
          <div class="absolute -inset-6 rounded-4xl bg-primary/10 blur-3xl" />
          <div
            class="surface-grid relative overflow-hidden rounded-[1.5rem] border border-default/80 bg-elevated/90 p-3 backdrop-blur sm:p-4"
          >
            <div
              class="overflow-hidden rounded-[1rem] border border-default/70 bg-default/90"
            >
              <div
                class="flex items-center justify-between border-b border-default/70 px-4 py-3"
              >
                <div class="flex items-center gap-2">
                  <span class="size-2 rounded-full bg-error/70" />
                  <span class="size-2 rounded-full bg-warning/70" />
                  <span class="size-2 rounded-full bg-success/70" />
                </div>
                <span
                  class="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-dimmed"
                >gem-team / ready</span
                >
              </div>
              <div class="space-y-5 p-5 text-left sm:p-7">
                <div class="flex items-start gap-3">
                  <span
                    class="mt-1 grid size-7 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary"
                  >
                    <UIcon name="i-lucide-route" class="size-4" />
                  </span>
                  <div>
                    <p class="font-semibold text-highlighted">
                      Route the work
                    </p>
                    <p class="mt-1 text-sm leading-6 text-muted">
                      Classify intent. Pick only the workflow depth it needs.
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span
                    class="mt-1 grid size-7 shrink-0 place-items-center rounded-lg bg-secondary/15 text-secondary"
                  >
                    <UIcon name="i-lucide-workflow" class="size-4" />
                  </span>
                  <div>
                    <p class="font-semibold text-highlighted">
                      Build in waves
                    </p>
                    <p class="mt-1 text-sm leading-6 text-muted">
                      Specialist agents collaborate with bounded context and
                      clear handoffs.
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span
                    class="mt-1 grid size-7 shrink-0 place-items-center rounded-lg bg-success/15 text-success"
                  >
                    <UIcon name="i-lucide-badge-check" class="size-4" />
                  </span>
                  <div>
                    <p class="font-semibold text-highlighted">
                      Verify, then learn
                    </p>
                    <p class="mt-1 text-sm leading-6 text-muted">
                      Quality gates catch regressions. Stable patterns become
                      reusable skills.
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="border-t border-default/70 bg-muted/40 px-5 py-4 font-mono text-xs text-muted sm:px-7"
              >
                <span class="mr-2 text-primary">$</span> apm install
                mubaidr/gem-team
              </div>
            </div>
          </div>
        </div>
      </template>
    </UPageHero>

    <UPageSection id="why" class="border-y border-default/70 bg-muted/25">
      <template #title>
        The anti-chaos layer for AI coding.
      </template>
      <template #description>
        Keep the speed of AI without giving up the discipline of a great
        engineering team.
      </template>
      <template #features>
        <UPageFeature icon="i-lucide-shield-check">
          <template #title>
            Quality by default
          </template>
          <template #description>
            TDD, reviews, security, and acceptance checks happen when they
            matter — not after the damage is done.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-ban">
          <template #title>
            Anti-slop built in
          </template>
          <template #description>
            Quality Directives kill dead buttons, buzzwords, template filler,
            and AI-generated noise before it ships.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-coins">
          <template #title>
            Less context. More signal.
          </template>
          <template #description>
            Progressive context and model routing keep every request lean,
            focused, and cost-aware.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-brain">
          <template #title>
            Learning is a feature
          </template>
          <template #description>
            Capture the patterns that work and turn them into reusable skills
            for the next session.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-bookmark">
          <template #title>
            Resumable by design
          </template>
          <template #description>
            Persistent plans with exact IDs mean you can pause, resume, or
            extend any MEDIUM/HIGH work without losing context.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-scale">
          <template #title>
            Works with any model
          </template>
          <template #description>
            Hardened output contracts and relational invariant fallbacks mean
            every agent works across commercial and open models — not just the
            ones that memorized your schema.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-plug">
          <template #title>
            Bring your own tools
          </template>
          <template #description>
            One package for Copilot, Claude, Cursor, Codex, Gemini, Windsurf,
            and more.
          </template>
        </UPageFeature>
      </template>
    </UPageSection>

    <UPageSection id="tools" class="border-t border-default/70 bg-muted/25">
      <template #title>
        One install. Your favorite tools.
      </template>
      <template #description>
        Keep your editor. Upgrade the process around it.
      </template>
      <template #features>
        <UPageFeature
          v-for="tool in [
            {
              icon: 'i-simple-icons-githubcopilot',
              title: 'GitHub Copilot',
              text: 'VS Code & CLI'
            },
            {
              icon: 'i-simple-icons-anthropic',
              title: 'Claude Code',
              text: 'Full agent support'
            },
            {
              icon: 'i-simple-icons-cursor',
              title: 'Cursor',
              text: 'Agents & rules'
            },
            {
              icon: 'i-simple-icons-opencode',
              title: 'OpenCode',
              text: 'Commands & skills'
            },
            {
              icon: 'i-simple-icons-codex',
              title: 'Codex CLI',
              text: 'AGENTS.md'
            },
            {
              icon: 'i-simple-icons-google',
              title: 'Gemini CLI',
              text: 'Skills & config'
            },
            {
              icon: 'i-lucide-wind',
              title: 'Windsurf',
              text: 'Rules & skills'
            }
          ]"
          :key="tool.title"
          :icon="tool.icon"
        >
          <template #title>
            {{ tool.title }}
          </template>
          <template #description>
            {{ tool.text }}
          </template>
        </UPageFeature>
      </template>
    </UPageSection>

    <UPageCTA
      class="border-t border-default/70"
      title="Make your next session count."
      description="Install Gem Team and give every coding session a smarter, more reliable workflow."
      :links="[
        {
          label: 'Start building',
          to: '/getting-started',
          trailingIcon: 'i-lucide-arrow-right'
        },
        {
          label: 'View on GitHub',
          to: 'https://github.com/mubaidr/gem-team',
          target: '_blank',
          color: 'neutral',
          variant: 'subtle',
          trailingIcon: 'i-simple-icons-github'
        }
      ]"
    />
  </UPage>
</template>
