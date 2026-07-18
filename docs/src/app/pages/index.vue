<script setup lang="ts">
useSeoMeta({
  title: "Gem Team",
  ogTitle: "Gem Team",
  description:
    "Turn AI coding into an orchestrated loop — plan, build, review, debug, learn — with smarter tool calling and leaner context.",
  ogDescription:
    "Turn AI coding into an orchestrated loop — plan, build, review, debug, learn — with smarter tool calling and leaner context.",
});
</script>

<template>
  <UPage class="relative">
    <UPageHero orientation="horizontal" class="py-24">
      <template #title>
        Ship Better Code with <span class="text-primary">Gem Team</span>
      </template>
      <template #description>
        16 specialist agents, wave-based parallelism, and progressive context
        management — spec-driven orchestration for software development
        that plans, builds, reviews, debugs, and learns.
      </template>
      <template #links>
        <UButton
          to="/getting-started"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
        >
          Getting Started
        </UButton>
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="outline"
          size="xl"
          to="https://github.com/mubaidr/gem-team"
          target="_blank"
        >
          View on GitHub
        </UButton>
      </template>
      <template #default>
        <StarsBg />

        <UPageSection class="pt-8">
          <UCodeGroup>
            <pre class="w-full max-w-2xl" lang="bash">
apm install mubaidr/gem-team --target copilot,claude,cursor,opencode,codex,gemini,windsurf</pre>
          </UCodeGroup>
        </UPageSection>
      </template>
    </UPageHero>

    <UPageSection class="dark:bg-neutral-950 py-32">
      <template #title> Why Gem Team? </template>
      <template #description>
        Gem Team wraps your AI with a disciplined engineering delivery system —
        plan, build, review, debug, learn.
      </template>
      <template #features>
        <UPageFeature icon="i-lucide-workflow">
          <template #title> Delivery Flow </template>
          <template #description>
            Spec-driven execution, wave-based parallelism, verification gates,
            and resumable plans. Structured processes replace ad-hoc prompting
            for consistent results.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-bot">
          <template #title> 16 Specialist Agents </template>
          <template #description>
            Planner, Researcher, Implementer, Reviewer, Critic, Debugger,
            Designer, DevOps, Tester, Documentation, Code Simplifier, and more —
            each focused on its domain.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-brain">
          <template #title> Context Management </template>
          <template #description>
            Progressive context envelope, three-tier memory, skill extraction,
            and PRD management — context overhead minimized at every step.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-coins">
          <template #title> Cost Control </template>
          <template #description>
            Model routing, output hygiene, context pruning, and discovery depth
            scaling — fewer tokens, same results.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-shield-check">
          <template #title> Quality Gates </template>
          <template #description>
            TDD by default, diagnose-then-fix, integration gates, security
            audits (OWASP), and accessibility checks (WCAG 2.1 AA).
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-target">
          <template #title> Precise Tool Calling </template>
          <template #description>
            Targeted context snapshots per agent, output hygiene rules, model
            routing — precision without prompt waste.
          </template>
        </UPageFeature>
      </template>
    </UPageSection>

    <UPageSection class="py-32">
      <template #title> Works With Your Favorite Tools </template>
      <template #description>
        Gem Team integrates with every major AI coding tool via APM — one
        install command, all targets.
      </template>
      <template #features>
        <UPageFeature icon="i-simple-icons-githubcopilot">
          <template #title> GitHub Copilot </template>
          <template #description>
            VS Code Copilot & GitHub Copilot CLI with `.github/agents/`.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-anthropic">
          <template #title> Claude Code </template>
          <template #description>
            Agents, rules, commands, skills, hooks, and MCP config.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-cursor">
          <template #title> Cursor </template>
          <template #description>
            Agents, rules, skills, commands, hooks, and MCP config.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-opencode">
          <template #title> OpenCode </template>
          <template #description>
            Agents, commands, skills, MCP, and compiled instructions.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-codex">
          <template #title> Codex CLI </template>
          <template #description>
            Agents, `AGENTS.md`, and Codex config.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-google">
          <template #title> Gemini CLI </template>
          <template #description>
            `GEMINI.md`, skills, instructions, and config.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-windsurf">
          <template #title> Windsurf </template>
          <template #description>
            Rules, skills, commands, hooks, and MCP config.
          </template>
        </UPageFeature>
      </template>
    </UPageSection>
  </UPage>
</template>
