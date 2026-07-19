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
</script>

<template>
  <UPage class="relative">
    <UPageHero orientation="horizontal" class="py-16">
      <template #title>
        Turn AI Coding Into an
        <span class="text-primary">Engineering Process</span>
      </template>
      <template #description>
        Agent definitions that enforce good software engineering: optimizing
        cost, time, and quality.
      </template>
      <template #links>
        <UButton
          to="/getting-started"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
        >
          Get Started
        </UButton>
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="outline"
          size="xl"
          to="https://github.com/mubaidr/gem-team"
          target="_blank"
        >
          Source
        </UButton>
      </template>
      <template #default>
        <StarsBg />

        <div class="space-y-12">
          <UMarquee :repeat="2">
            <span>fewer bugs</span>
            <span>lower costs</span>
            <span>ship faster</span>
            <span>quality by default</span>
            <span>automated reviews</span>
            <span>no context bloat</span>
            <span>smarter agents</span>
            <span>learn from code</span>
            <span>secure by design</span>
            <span>works everywhere</span>
          </UMarquee>
          <div
            class="not-prose w-full overflow-x-auto rounded-tl-xl rounded-tr-xl border border-default bg-elevated p-8 scrollbar-thin"
          >
            <pre
              class="text-sm leading-relaxed"
            ><code class="text-default">apm install mubaidr/gem-team --target copilot,claude,cursor,opencode,codex,gemini,windsurf</code></pre>
          </div>
        </div>
      </template>
    </UPageHero>

    <UPageSection class="dark:bg-neutral-950 py-32">
      <template #title> Built for Better Engineering </template>
      <template #description>
        Four pillars that make your AI code faster, safer, and cheaper.
      </template>
      <template #features>
        <UPageFeature icon="i-lucide-shield-check">
          <template #title> Quality by Default </template>
          <template #description>
            TDD, code reviews, and security audits happen automatically: not as
            afterthoughts.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-coins">
          <template #title> Smart & Efficient </template>
          <template #description>
            Fewer tokens, lower costs, no context bloat. Every request is lean
            and purposeful.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-brain">
          <template #title> Learns & Improves </template>
          <template #description>
            Remembers what works, extracts reusable skills, and gets better with
            every session.
          </template>
        </UPageFeature>
        <UPageFeature icon="i-lucide-plug">
          <template #title> Works With Your Tools </template>
          <template #description>
            Copilot, Claude, Cursor, Codex, Gemini, Windsurf: one install, all
            targets.
          </template>
        </UPageFeature>
      </template>
    </UPageSection>

    <UPageSection class="py-32">
      <template #title> Works With Your Favorite Tools </template>
      <template #description>
        One install command. Every major AI coding tool.
      </template>
      <template #features>
        <UPageFeature icon="i-simple-icons-githubcopilot">
          <template #title> GitHub Copilot </template>
          <template #description> VS Code & CLI </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-anthropic">
          <template #title> Claude Code </template>
          <template #description> Full agent support </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-cursor">
          <template #title> Cursor </template>
          <template #description> Agents & rules </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-opencode">
          <template #title> OpenCode </template>
          <template #description> Commands & skills </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-codex">
          <template #title> Codex CLI </template>
          <template #description> AGENTS.md </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-google">
          <template #title> Gemini CLI </template>
          <template #description> Skills & config </template>
        </UPageFeature>
        <UPageFeature icon="i-simple-icons-windsurf">
          <template #title> Windsurf </template>
          <template #description> Rules & skills </template>
        </UPageFeature>
      </template>
    </UPageSection>
  </UPage>
</template>
