<script setup lang="ts">
useHead({
  titleTemplate: '%s'
})

useSeoMeta({
  title: 'Gem Team',
  ogTitle: 'Gem Team',
  description:
    'Turn AI coding into an engineering process: classified, planned, implemented, reviewed, and learned — with TDD, code review, and scoped handoffs.',
  ogDescription:
    'Turn AI coding into an engineering process: classified, planned, implemented, reviewed, and learned — with TDD, code review, and scoped handoffs.'
})

const site = useSiteConfig()
const origin = siteBaseUrl(composeSiteUrl(site.url, useRuntimeConfig().app.baseURL as string))
useSchemaOrg(
  computed(() => {
    return [
      {
        '@type': 'Organization',
        '@id': `${origin}#organization`,
        'name': 'Gem Team',
        'url': origin
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${origin}#software`,
        'name': 'Gem Team',
        'description':
          'Turn AI coding into an engineering process with TDD, code review, and scoped agent handoffs.',
        'applicationCategory': 'DeveloperApplication',
        'operatingSystem': 'Any',
        'url': origin,
        'license': 'https://www.apache.org/licenses/LICENSE-2.0',
        'publisher': { '@id': `${origin}#organization` }
      }
    ] as Record<string, unknown>[]
  })
)

const phases = [
  {
    name: 'Classify',
    agent: 'gem-orchestrator',
    description:
      'Reads the task, assigns complexity and risk, then routes to the right specialist. No repo inspection — uses only the request and supplied evidence.',
    output: 'task route · context file list'
  },
  {
    name: 'Plan',
    agent: 'gem-planner',
    description:
      'Builds an ordered wave plan with scoped handoffs and acceptance criteria. MEDIUM/HIGH only — TRIVIAL/LOW goes straight to execution.',
    output: 'plan.yaml · acceptance criteria'
  },
  {
    name: 'Implement',
    agent: 'gem-implementer',
    description:
      'TDD: write a failing test first, then minimal code, then refactor. One-line reason per decision. Bug fixes route through Debugger first.',
    output: 'green tests · reviewed diff'
  },
  {
    name: 'Review',
    agent: 'gem-reviewer',
    description:
      'Independent quality, security, and contract review. Three axes — mode, target, scope — matched to risk. Blocks on broken tests or unverified claims.',
    output: 'review verdict · security audit'
  },
  {
    name: 'Learn',
    agent: 'gem-skill-creator',
    description:
      'Promotes findings with confidence ≥ 0.95 into repo memory. Reusable patterns become SKILL.md playbooks for the next session.',
    output: 'SKILL.md skill file'
  }
]

const researchHighlights = [
  {
    title: 'Prompt caching cuts API cost',
    description:
      'Cache read ≈ 0.1× input (90% discount) across OpenAI, Anthropic, and Google. Scoped handoffs reuse context prefixes across turns instead of re-sending full history.',
    source: 'OpenAI · Anthropic · Google caching docs'
  },
  {
    title: 'Risk-gated specialist allocation',
    description:
      'Multi-agent overhead can be 60× latency; MAS benefits diminish as LLM capability improves. Specialists activate only when uncertainty justifies coordination cost.',
    source: 'ProcPilot (IEEE IEMCON 2026) · MAFBench (arXiv:2602.03128)'
  },
  {
    title: 'TDD improves AI code generation',
    description:
      'Test-driven interactive generation improved pass@1 by +45.97% across 4 LLMs and 2 Python datasets. Every implementation starts with a failing test.',
    source: 'TiCoder (IEEE TSE 2024)'
  },
  {
    title: 'Model routing lowers cost',
    description:
      'RouteLLM: >2× cost reduction without quality loss; UCCI: 31% cost reduction (95% CI [27%, 35%]). Premium for planning/review, explore for execution.',
    source: 'RouteLLM (ICLR 2025) · UCCI (arXiv:2605.18796)'
  },
  {
    title: 'Structured hand-offs beat narrative',
    description:
      'JSON hand-off extraction achieves 0.96 feasibility vs narrative summarization at 0.48. Evidence travels by reference via typed artifact paths.',
    source: 'State Compression (arXiv:2607.18265)'
  },
  {
    title: 'Prefix caching reduces cost 41–80%',
    description:
      'Cache-aware payload ordering and cluster-contiguous scheduling keep shared context warm across multi-agent turns.',
    source: 'Don\'t Break the Cache (arXiv:2601.06007)'
  }
]

const capabilities = [
  {
    title: 'TDD by default',
    description:
      'Every implementation starts with a failing test. Code is written only to make that test pass, then refactored. No test, no code.',
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
      'Targeted checks for hardcoded secrets, unsafe deserialization, missing input validation, and data-flow issues. Security findings block until resolved.',
    icon: 'i-lucide-shield-check'
  },
  {
    title: 'Cost-aware model routing',
    description:
      'Planner, Debugger, and Reviewer use premium models; Implementer, Researcher, and testers use explore models. Scoped handoffs cut tokens by ~80%.',
    icon: 'i-lucide-coins'
  },
  {
    title: 'Resumable plans',
    description:
      'Every MEDIUM/HIGH task gets a persistent plan_id. Close the session and resume from the last milestone — no context rebuild.',
    icon: 'i-lucide-play'
  },
  {
    title: 'Works with your tools',
    description:
      'One workflow across Copilot, Claude Code, Cursor, Codex, Gemini, Windsurf, and OpenCode. Same plan.yaml, same agent behavior everywhere.',
    icon: 'i-lucide-cpu'
  },
  {
    title: 'Anti-slop directives',
    description:
      'Agents refuse dead buttons, buzzwords, and template filler. Every line of code must do something concrete — verified by review.',
    icon: 'i-lucide-badge-check'
  }
]

const firstTasks = [
  {
    title: 'Write a plan for your task',
    description: 'Describe what you want to build and get a plan.yaml with milestones, acceptance criteria, and a scope cut before any code is written.',
    to: '/getting-started/quick-start'
  },
  {
    title: 'Run TDD on a feature',
    description: 'Start with a failing test, write code to make it pass, then refactor. No test, no code.',
    to: '/getting-started/first-steps'
  },
  {
    title: 'Review a change before it merges',
    description: 'Submit a diff for an independent quality, security, and contract check. Broken tests block the change.',
    to: '/agents/reviewer'
  },
  {
    title: 'Save a reusable skill',
    description: 'Turn a successful session into a SKILL.md so the next session starts from proven patterns instead of blank files.',
    to: '/agents/skill-creator'
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
    <UPageHero
      title="Turn AI coding into an engineering process."
      description="A coordinated team of specialist agents that classify, plan, implement, review, and learn from every task. TDD by default, independent code review on every change, scoped handoffs that cut token cost, and resumable plans you can come back to. One command installs it into any project."
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
        <div class="flex items-center gap-2">
          <UBadge
            color="success"
            variant="subtle"
            size="sm"
            class="mb-4"
          >
            Apache 2.0 · Open source · Works with any model
          </UBadge>
          <a
            href="https://mubaidr.js.org/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs text-muted hover:text-primary transition-colors"
          >
            by mubaidr.js.org
          </a>
        </div>
      </template>
    </UPageHero>

    <UPageSection
      id="how-it-works"
      headline="How it works"
      title="One pipeline, five stages."
      description="Every task flows through the same pipeline. Each stage has one job, a defined output, and a scoped handoff to the next — no full-context dumps."
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
      description="The agents don't suggest good practice — they run it. These are the gates every session passes through."
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
      id="evidence"
      headline="Research behind Gem Team"
      title="Every feature is backed by evidence."
      description="Design decisions cite verifiable research, provider docs, or published benchmarks — no fabricated statistics."
      :ui="{ root: 'bg-muted/25 border-y border-default/70' }"
    >
      <UPageGrid class="mt-14">
        <UPageFeature
          v-for="item in researchHighlights"
          :key="item.title"
          :title="item.title"
          :description="item.description + ' — ' + item.source"
          icon="i-lucide-file-text"
        />
      </UPageGrid>
      <div class="mt-8 text-center">
        <UButton
          to="/resources/research"
          color="neutral"
          variant="outline"
          label="View full research & benchmarks"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </UPageSection>

    <UPageSection
      id="first-tasks"
      headline="Common first tasks"
      title="What to try in your first session."
      description="Pick one and run it through the pipeline."
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
