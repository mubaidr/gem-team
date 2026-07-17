export default defineAppConfig({
  ui: {
    colors: {
      primary: "green",
      neutral: "slate",
    },
    footer: {
      slots: {
        root: "border-t border-default",
        left: "text-sm text-muted",
      },
    },
  },
  seo: {
    siteName: "Gem Team",
  },
  header: {
    title: "",
    to: "/",
    logo: {
      alt: "Gem Team",
      light: "/logo.svg",
      dark: "/logo.svg",
    },
    search: true,
    colorMode: true,
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
    links: [
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/mubaidr/gem-team",
        target: "_blank",
        "aria-label": "Gem Team on GitHub",
      },
      {
        icon: "i-lucide-file-text",
        label: "Apache 2.0",
        to: "https://github.com/mubaidr/gem-team/blob/main/LICENSE",
        target: "_blank",
        "aria-label": "License",
      },
    ],
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
