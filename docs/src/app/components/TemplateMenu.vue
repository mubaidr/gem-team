<template>
  <UDropdownMenu
    v-slot="{ open }"
    :modal="false"
    :items="[
      {
        label: 'Documentation',
        to: '/',
      },
      {
        label: 'Getting Started',
        to: '/getting-started',
      },
      {
        label: 'Guide',
        to: '/guide',
      },
      {
        label: 'Agents',
        to: '/agents',
      },
      {
        label: 'Configuration',
        to: '/configuration',
      },
      {
        label: 'Resources',
        to: '/resources',
      },
      {
        label: 'GitHub',
        to: 'https://github.com/mubaidr/gem-team',
        target: '_blank',
      },
      {
        label: 'Issues',
        to: 'https://github.com/mubaidr/gem-team/issues',
        target: '_blank',
      },
    ]"
    :content="{ align: 'start' }"
    :ui="{ content: 'min-w-fit' }"
    size="xs"
  >
    <UButton
      label="Menu"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      size="xs"
      class="-mb-1.5 font-semibold rounded-full truncate"
      :class="[open && 'bg-primary/15']"
      :ui="{
        trailingIcon: [
          'transition-transform duration-200',
          open ? 'rotate-180' : undefined,
        ]
          .filter(Boolean)
          .join(' '),
      }"
    />
  </UDropdownMenu>
</template>
