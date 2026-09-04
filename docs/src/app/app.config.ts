export default defineAppConfig({
  ui: {
    colors: {
      primary: "emerald",
      secondary: "teal",
      neutral: "zinc",
    },
    page: {
      slots: {
        root: "relative",
        container: "max-w-7xl",
      },
    },
    pageHero: {
      slots: {
        root: "relative overflow-hidden border-b border-default/70",
        container: "py-24 sm:py-32",
        title:
          "text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] text-balance",
        description: "max-w-2xl text-lg sm:text-xl leading-8 text-pretty",
      },
    },
    pageSection: {
      slots: {
        container: "py-20 sm:py-28",
      },
    },
    footer: {
      slots: {
        root: "border-t border-default/70 bg-muted/30",
        left: "text-sm text-muted",
      },
    },
  },
  seo: {
    siteName: "Gem Team",
  },
  header: {
    title: "Gem Team",
    to: "/",
    search: true,
    colorMode: true,
    logo: {
      light: "logo.svg",
      dark: "logo.svg",
      alt: "Gem Team",
    },
    links: [
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/mubaidr/gem-team",
        target: "_blank",
        "aria-label": "GitHub",
      },
    ],
  },
  footer: {
    credits: `Gem Team \u2022 Apache 2.0 License \u2022 \u00A9 ${new Date().getFullYear()}`,
    colorMode: false,
    links: [],
  },
  toc: {
    title: "On This Page",
    bottom: {
      title: "Community",
      edit: "https://github.com/mubaidr/gem-team/edit/main/docs/src/content",
      links: [
        {
          icon: "i-lucide-star",
          label: "Star on GitHub",
          to: "https://github.com/mubaidr/gem-team",
          target: "_blank",
        },
        {
          icon: "i-lucide-circle-dot",
          label: "Open an Issue",
          to: "https://github.com/mubaidr/gem-team/issues",
          target: "_blank",
        },
      ],
    },
  },
});
