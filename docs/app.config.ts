export default defineAppConfig({
  ui: {
    primary: "emerald",
    colors: {
      primary: "emerald",
      secondary: "sky",
    },
    pageHero: {
      slots: {
        root: "relative overflow-hidden",
        container:
          "flex flex-col lg:grid py-32 sm:py-40 lg:py-48 gap-16 sm:gap-y-24",
        headline: "mb-6",
        title:
          "text-6xl sm:text-7xl lg:text-8xl text-pretty tracking-tight font-bold text-white",
        description: "text-lg sm:text-xl/8 text-slate-400 max-w-2xl",
        links: "flex flex-wrap gap-4 mt-10",
      },
    },
    badge: {
      variants: {
        subtle: {
          emerald:
            "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
          sky: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
          violet:
            "bg-violet-500/10 text-violet-400 border border-violet-500/20",
          amber: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
          rose: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
        },
      },
    },
  },
  socials: {
    github: "https://github.com/mubaidr/gem-team",
    patreon: "https://patreon.com/gemteam",
  },
});
