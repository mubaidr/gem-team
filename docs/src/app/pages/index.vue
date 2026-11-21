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

const phases = [
  {
    name: 'Classify',
    agent: 'gem-orchestrator',
    description:
      'Reads the task, picks the right specialist agent, and loads only the files the task needs. Keeps each session lean and cheap by ignoring unrelated code.',
    output: 'task route · context file list'
  },
  {
    name: 'Plan',
    agent: 'gem-planner',
    description:
      'Breaks the task into a bounded wave plan: milestones, routing, handoffs, risks, and acceptance criteria. Cuts scope with YAGNI and KISS before any code is written.',
    output: 'plan.yaml · acceptance criteria'
  },
  {
    name: 'Implement',
    agent: 'gem-implementer',
    description:
      'Builds in TDD cycles - write a failing test, make it pass, refactor. Applies fail-fast and least-surprise. Every major decision carries a one-line reason in the diff.',
    output: 'green tests · reviewed diff'
  },
  {
    name: 'Review',
    agent: 'gem-reviewer',
    description:
      'An independent reviewer checks quality, security, and contracts before anything merges. Blocks on broken tests or unverified claims.',
    output: 'review verdict · security audit'
  },
  {
    name: 'Learn',
    agent: 'gem-skill-creator',
    description:
      'Packages what worked into a reusable skill (SKILL.md) so the next session starts from proven patterns instead of blank files.',
    output: 'SKILL.md skill file'
  }
]

const capabilities = [
  {
    title: 'TDD by default',
    description:
      'Every change starts with a failing test. Code is written only to make that test pass, then refactored. No test, no code.',
    icon: 'i-lucide-flask-conical'
  },
  {
    title: 'Code review on every change',
    description:
      'A separate reviewer agent checks quality, security, and contracts before anything merges. Broken tests or unverified claims block the change.',
    icon: 'i-lucide-scan-eye'
  },
  {
    title: 'Security audits',
    description:
      'Targeted checks for vulnerabilities in code, configuration, and integrations - hardcoded secrets, unsafe deserialization, and missing input validation.',
    icon: 'i-lucide-shield-check'
  },
  {
    title: 'Cost-aware routing',
    description:
      'Simple tasks use small models; complex ones escalate. Context is loaded in slices so you never pay for files the task does not touch.',
    icon: 'i-lucide-coins'
  },
  {
    title: 'Resumable plans',
    description:
      'Each plan gets a persistent ID. Close the session and come back later - the agent resumes from the last milestone without rebuilding context.',
    icon: 'i-lucide-play'
  },
  {
    title: 'Model-agnostic',
    description:
      'Output contracts are hardened so the same plan works across Copilot, Claude, Cursor, Codex, Gemini, and Windsurf. Switch models without rewriting prompts.',
    icon: 'i-lucide-cpu'
  },
  {
    title: 'Anti-slop directives',
    description:
      'Agents refuse dead buttons, buzzwords, and template filler. Every line of code must do something concrete.',
    icon: 'i-lucide-badge-check'
  }
]

const stats = {
  headline: [
    {
      value: 'Sub-$0.001',
      label: 'typical API call on a 100K+ token context'
    },
    {
      value: '30x',
      label: 'cheaper than uncached input'
    }
  ],
  supporting: [
    { value: '82.8M+', label: 'tokens processed' },
    { value: '666', label: 'agent runs completed' },
    { value: '~124K', label: 'average context per run' },
    { value: '2-5s', label: 'typical response latency' }
  ]
}

const firstTasks = [
  {
    title: 'Write a plan for your task',
    description: 'Describe what you want to build and get a plan.yaml with milestones, acceptance criteria, and a scope cut before any code is written.',
    to: '/getting-started/installation'
  },
  {
    title: 'Run TDD on a feature',
    description: 'Start with a failing test, write code to make it pass, then refactor. No test, no code.',
    to: '/getting-started/installation'
  },
  {
    title: 'Review a change before it merges',
    description: 'Submit a diff for an independent quality, security, and contract check. Broken tests block the change.',
    to: '/getting-started/installation'
  },
  {
    title: 'Save a reusable skill',
    description: 'Turn a successful session into a SKILL.md so the next session starts from proven patterns instead of blank files.',
    to: '/getting-started/installation'
  }
]

const tools = [
  {
    name: 'GitHub Copilot',
    icon: 'i-simple-icons-github'
  },
  {
    name: 'Claude Code',
    icon: 'i-simple-icons-anthropic'
  },
  {
    name: 'Cursor',
    icon: 'i-simple-icons-cursor'
  },
  {
    name: 'OpenCode',
    icon: 'i-lucide-code'
  },
  {
    name: 'Codex CLI',
    icon: 'i-simple-icons-openai'
  },
  {
    name: 'Gemini CLI',
    icon: 'i-simple-icons-googlegemini'
  },
  {
    name: 'Windsurf',
    icon: 'i-lucide-wind'
  }
]
</script>

<template>
  <div>
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded focus:outline-none"
    >Skip to main content</a>

    <UPageHero
      title="Turn AI coding into an engineering process."
      description="Install a team of specialist agents that classify, plan, implement, review, and learn from every task. Tests are written before code, a separate reviewer checks every change, and each session ends with a reusable skill. One command installs it into any project."
      :links="[
        {
          label: 'Install Gem Team',
          to: '/getting-started/installation',
          color: 'primary',
          trailingIcon: 'i-lucide-arrow-right',
          size: 'lg'
        },
        {
          label: 'Read the docs',
          to: '/getting-started',
          color: 'neutral',
          variant: 'outline',
          size: 'lg'
        }
      ]"
      orientation="horizontal"
    >
      <template #default>
        <div
          class="rounded-xl border border-default/70 bg-default/60 p-6 sm:p-7"
        >
          <div
            class="mb-6 flex items-center justify-between border-b border-default/70 pb-4"
          >
            <span class="font-mono text-xs text-muted">agent pipeline</span>
            <span class="font-mono text-xs text-muted">5 stages</span>
          </div>
          <ol>
            <li
              v-for="(phase, i) in phases"
              :key="phase.agent"
              class="flex gap-4"
            >
              <div class="flex flex-col items-center">
                <span
                  class="grid size-7 shrink-0 place-items-center rounded-md border border-default/70 bg-default font-mono text-[0.65rem] text-muted"
                >
                  {{ i + 1 }}
                </span>
                <span
                  v-if="i < phases.length - 1"
                  class="my-1 w-px flex-1 bg-default/70"
                  aria-hidden="true"
                />
              </div>
              <div class="min-w-0 pb-5">
                <div class="flex flex-wrap items-baseline gap-x-2">
                  <span class="text-sm font-semibold">{{ phase.name }}</span>
                  <code class="font-mono text-xs text-primary">{{
                    phase.agent
                  }}</code>
                </div>
                <p class="mt-1 text-sm leading-6 text-muted">
                  {{ phase.output }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </template>

      <template #headline>
        <UBadge
          color="success"
          variant="subtle"
          size="sm"
          class="mb-4"
        >
          Apache 2.0 · Open source · Works with any model
        </UBadge>
      </template>
    </UPageHero>

    <UPageSection
      id="main-content"
      headline="Case Study"
      title="Stable plans. Warmer cache. Lower cost."
      align="center"
      :ui="{ container: 'py-16 sm:py-20' }"
    >
      <div
        class="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12"
      >
        <div
          v-for="stat in stats.headline"
          :key="stat.label"
          class="text-center"
        >
          <span
            class="text-4xl font-semibold tracking-tight text-primary sm:text-5xl"
          >{{ stat.value }}</span>
          <p class="mt-3 text-sm leading-6 text-muted">
            {{ stat.label }}
          </p>
        </div>
      </div>

      <div
        class="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-default/70 pt-8"
      >
        <div
          v-for="stat in stats.supporting"
          :key="stat.label"
          class="text-center"
        >
          <span class="text-lg font-semibold text-default">{{
            stat.value
          }}</span>
          <span class="ml-1.5 text-sm text-muted">{{ stat.label }}</span>
        </div>
      </div>

      <p
        class="mt-8 max-w-2xl text-center text-sm text-muted justify-center mx-auto"
      >
        DeepSeek V4.1 Flash charges $0.15/M uncached input and $0.003/M cached
        input. Gem-Team's scoped handoffs keep most calls hitting cache -
        turning large contexts into sub-penny operations.
        <UButton
          to="/guide/optimizations#cost-in-practice"
          color="primary"
          variant="link"
          label="See the full breakdown"
          trailing-icon="i-lucide-arrow-right"
          :ui="{ base: 'px-0' }"
          class="-ml-1"
        />
      </p>
    </UPageSection>

    <UPageSection
      id="workflow"
      headline="How it works"
      title="One pipeline, five stages."
      description="Every task flows through the same pipeline. Each stage has one job, a defined output, and a handoff to the next."
      :ui="{ container: 'border-t border-default/70' }"
    >
      <div class="mt-14">
        <div
          v-for="(phase, i) in phases"
          :key="phase.agent"
          class="grid gap-4 border-t border-default/70 py-8 sm:grid-cols-[240px_1fr] sm:gap-10"
        >
          <div>
            <div class="flex items-baseline gap-3">
              <span class="font-mono text-xs text-muted">{{
                String(i + 1).padStart(2, "0")
              }}</span>
              <h3 class="text-lg font-semibold">
                {{ phase.name }}
              </h3>
            </div>
            <code
              class="mt-2 inline-block rounded-md border border-default/70 bg-muted/40 px-2 py-0.5 font-mono text-xs text-primary"
            >
              {{ phase.agent }}
            </code>
          </div>
          <div>
            <p class="leading-8 text-muted">
              {{ phase.description }}
            </p>
            <p class="mt-3 font-mono text-xs text-muted">
              Output: {{ phase.output }}
            </p>
          </div>
        </div>
      </div>
    </UPageSection>

    <UPageSection
      id="why"
      headline="What you get"
      title="Engineering discipline, enforced."
      description="The agents don't suggest good practice - they run it. These are the gates every session passes through."
      :ui="{ root: 'bg-muted/25 border-y border-default/70' }"
    >
      <UPageGrid class="mt-14">
        <UPageFeature
          v-for="item in capabilities"
          :key="item.title"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="first-tasks"
      headline="Common first tasks"
      title="What to try in your first session."
      description="Pick one of these and run it through the pipeline."
      :ui="{ container: 'border-t border-default/70' }"
    >
      <UPageGrid class="mt-14">
        <UPageCard
          v-for="(task, i) in firstTasks"
          :key="i"
          :title="task.title"
          :description="task.description"
        >
          <template #footer>
            <UButton
              :to="task.to"
              color="primary"
              variant="link"
              size="xs"
              label="Try it"
              trailing-icon="i-lucide-arrow-right"
              :ui="{ base: 'px-0' }"
            />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="tools"
      headline="Bring your own tools"
      title="Works with the tools you already use."
      description="Install once, use from any of these."
    >
      <UPageGrid
        :ui="{
          base: 'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'
        }"
      >
        <UPageCard
          v-for="tool in tools"
          :key="tool.name"
          :ui="{
            root: 'border-default/70',
            body: 'px-4 py-3 flex items-center gap-3'
          }"
        >
          <UIcon
            :name="tool.icon"
            class="size-5 shrink-0 text-muted"
          />
          <span class="text-sm font-medium">{{ tool.name }}</span>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <UPageCTA
      title="Install the team in one command."
      description="APM installs the agents and skills into your project. Open source, Apache 2.0, works with any model."
      :links="[
        {
          label: 'Installation guide',
          to: '/getting-started/installation',
          color: 'primary',
          trailingIcon: 'i-lucide-arrow-right'
        },
        {
          label: 'View on GitHub',
          to: 'https://github.com/mubaidr/gem-team',
          target: '_blank',
          color: 'neutral',
          variant: 'outline',
          leadingIcon: 'i-simple-icons-github'
        }
      ]"
      :ui="{ root: 'border-t border-default/70' }"
    >
      <template #default>
        <pre
          class="overflow-x-auto rounded-lg border border-default/70 bg-muted/40 p-5 font-mono text-sm leading-7"
        ><code>curl -sSL https://aka.ms/apm-unix | sh
apm install mubaidr/gem-team</code></pre>
      </template>
    </UPageCTA>
  </div>
</template>
