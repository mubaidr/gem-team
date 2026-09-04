<script setup lang="ts">
useHead({
  titleTemplate: "%s",
});

useSeoMeta({
  title: "Gem Team",
  ogTitle: "Gem Team",
  description:
    "Turn AI coding into an engineering process: agent definitions that enforce good software engineering.",
  ogDescription:
    "Turn AI coding into an engineering process: agent definitions that enforce good software engineering.",
});

const stages = [
  {
    name: "Classify",
    agent: "gem-orchestrator",
    output:
      "Routes the task to the right specialist with a lean context budget.",
  },
  {
    name: "Plan",
    agent: "gem-planner",
    output:
      "Wave plan with milestones, handoffs, risks, and acceptance criteria.",
  },
  {
    name: "Implement",
    agent: "gem-implementer",
    output: "TDD cycles. Tests green before anything merges.",
  },
  {
    name: "Review",
    agent: "gem-reviewer",
    output: "Independent quality, security, and contract checks.",
  },
  {
    name: "Learn",
    agent: "gem-skill-creator",
    output: "Packages what worked into reusable skills.",
  },
];

const phases = [
  {
    name: "Classify",
    agent: "gem-orchestrator",
    description:
      "Reads the task and routes it to the right specialist. Loads only the context the task needs, so sessions stay lean and cheap.",
    output: "task routing · context budget",
  },
  {
    name: "Plan",
    agent: "gem-planner",
    description:
      "Turns the task into a bounded wave plan: milestones, routing, handoffs, risks, and acceptance criteria. Cuts scope with YAGNI and KISS before any code is written.",
    output: "plan.yaml · acceptance criteria",
  },
  {
    name: "Implement",
    agent: "gem-implementer",
    description:
      "Builds in TDD cycles — red, green, refactor. Applies SOLID, fail-fast, and least-surprise. Every major decision carries a one-line reason.",
    output: "tests green · reviewed diff",
  },
  {
    name: "Review",
    agent: "gem-reviewer",
    description:
      "Independent review of plans, code, and decisions. Checks quality, security, and contracts before anything merges.",
    output: "review verdict · security audit",
  },
  {
    name: "Learn",
    agent: "gem-skill-creator",
    description:
      "Packages what worked into reusable skills, so the team gets better with every session.",
    output: "reusable SKILL.md",
  },
];

const capabilities = [
  {
    title: "TDD by default",
    description:
      "Tests are written before code. Red, green, refactor, every cycle.",
  },
  {
    title: "Code review on every change",
    description:
      "An independent reviewer checks quality, security, and contracts before anything merges.",
  },
  {
    title: "Security audits",
    description:
      "Targeted searches for vulnerabilities in code, configuration, and integrations.",
  },
  {
    title: "Cost-aware routing",
    description:
      "Model tiers and progressive context keep token spend down without losing signal.",
  },
  {
    title: "Resumable plans",
    description:
      "Persistent plan IDs let you pause and resume a session without losing context.",
  },
  {
    title: "Model-agnostic",
    description:
      "Hardened output contracts work across Copilot, Claude, Cursor, Codex, Gemini, and Windsurf.",
  },
  {
    title: "Anti-slop directives",
    description: "Agents refuse dead buttons, buzzwords, and template filler.",
  },
];

const tools = [
  "GitHub Copilot",
  "Claude Code",
  "Cursor",
  "OpenCode",
  "Codex CLI",
  "Gemini CLI",
  "Windsurf",
];
</script>

<template>
  <div>
    <section class="border-b border-default/70">
      <div
        class="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8"
      >
        <div>
          <p class="eyebrow">Open-source agent team</p>
          <h1
            class="mt-6 text-4xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl lg:text-6xl"
          >
            Turn AI coding into an engineering process.
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-pretty text-muted">
            Gem Team installs a team of specialist agents that plan, build,
            review, and learn. TDD, code reviews, and security checks run
            automatically. Every session gets a plan, tests, a review, and a
            record of what worked.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <UButton
              to="/getting-started/installation"
              size="lg"
              color="primary"
              trailing-icon="i-lucide-arrow-right"
            >
              Install Gem Team
            </UButton>
            <UButton
              to="/getting-started"
              size="lg"
              color="neutral"
              variant="outline"
            >
              Read the docs
            </UButton>
          </div>
          <p class="mt-6 font-mono text-xs text-muted">
            Apache 2.0 · Open source · Works with any model
          </p>
        </div>

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
              v-for="(stage, i) in stages"
              :key="stage.agent"
              class="flex gap-4"
            >
              <div class="flex flex-col items-center">
                <span
                  class="grid size-7 shrink-0 place-items-center rounded-md border border-default/70 bg-default font-mono text-[0.65rem] text-muted"
                >
                  {{ i + 1 }}
                </span>
                <span
                  v-if="i < stages.length - 1"
                  class="my-1 w-px flex-1 bg-default/70"
                  aria-hidden="true"
                />
              </div>
              <div class="min-w-0 pb-5">
                <div class="flex flex-wrap items-baseline gap-x-2">
                  <span class="text-sm font-semibold">{{ stage.name }}</span>
                  <code class="font-mono text-xs text-primary">{{
                    stage.agent
                  }}</code>
                </div>
                <p class="mt-1 text-sm leading-6 text-muted">
                  {{ stage.output }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section id="workflow" class="border-b border-default/70">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div class="max-w-2xl">
          <p class="eyebrow">How it works</p>
          <h2
            class="mt-4 text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl"
          >
            One pipeline, five stages.
          </h2>
          <p class="mt-4 text-lg leading-8 text-muted">
            Every task flows through the same pipeline. Each stage has one job,
            a defined output, and a handoff to the next.
          </p>
        </div>
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
      </div>
    </section>

    <section id="why" class="border-b border-default/70 bg-muted/25">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div class="max-w-2xl">
          <p class="eyebrow">What you get</p>
          <h2
            class="mt-4 text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl"
          >
            Engineering discipline, enforced.
          </h2>
          <p class="mt-4 text-lg leading-8 text-muted">
            The agents don't suggest good practice — they run it. These are the
            gates every session passes through.
          </p>
        </div>
        <ul class="mt-14 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          <li v-for="item in capabilities" :key="item.title" class="flex gap-4">
            <span
              class="mt-2 size-1.5 shrink-0 rounded-sm bg-primary"
              aria-hidden="true"
            />
            <div>
              <h3 class="font-semibold">
                {{ item.title }}
              </h3>
              <p class="mt-1 leading-7 text-muted">
                {{ item.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section id="tools" class="border-b border-default/70">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div class="max-w-2xl">
          <p class="eyebrow">Bring your own tools</p>
          <h2
            class="mt-4 text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl"
          >
            Works with the tools you already use.
          </h2>
          <p class="mt-4 text-lg leading-8 text-muted">
            Install once, use from any of these.
          </p>
        </div>
        <ul class="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <li
            v-for="tool in tools"
            :key="tool"
            class="rounded-lg border border-default/70 px-4 py-3 text-sm font-medium"
          >
            {{ tool }}
          </li>
        </ul>
      </div>
    </section>

    <section id="install" class="border-b border-default/70">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div
          class="rounded-xl border border-default/70 bg-default/60 p-8 sm:p-12"
        >
          <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2
                class="text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl"
              >
                Install the team in one command.
              </h2>
              <p class="mt-4 text-lg leading-8 text-muted">
                APM installs the agents and skills into your project. Open
                source, Apache 2.0, works with any model.
              </p>
              <div class="mt-8 flex flex-wrap gap-3">
                <UButton
                  to="/getting-started/installation"
                  size="lg"
                  color="primary"
                  trailing-icon="i-lucide-arrow-right"
                >
                  Installation guide
                </UButton>
                <UButton
                  to="https://github.com/mubaidr/gem-team"
                  target="_blank"
                  size="lg"
                  color="neutral"
                  variant="outline"
                  leading-icon="i-simple-icons-github"
                >
                  View on GitHub
                </UButton>
              </div>
            </div>
            <div>
              <pre
                class="overflow-x-auto rounded-lg border border-default/70 bg-muted/40 p-5 font-mono text-sm leading-7"
              ><code>curl -sSL https://aka.ms/apm-unix | sh
apm install mubaidr/gem-team</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
