---
title: Installation - Gem Team
description: How to install and run the Gem Team documentation site
---

This guide covers setting up the Gem Team documentation site locally.

## Prerequisites

- Node.js 20+
- npm or pnpm

## Clone the Repository

```bash
git clone https://github.com/mubaidr/gem-team.git
cd gem-team/docs
```

## Install Dependencies

```bash
npm install
```

## Available Scripts

| Command | Description |
| Command | Description |
| --- | --- || `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run generate` | Generate static site |
| `npm run preview` | Preview production build |

## Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

## Configuration

The docs app uses Nuxt 4 with Nuxt UI. Key configuration files:

### `nuxt.config.ts`

Core modules and site settings:

```typescript
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui", // UI component library
    "@nuxt/content", // Markdown content
    "@nuxt/image", // Image optimization
    "@nuxt/fonts", // Font management
    "@nuxtjs/sitemap", // SEO sitemap
    "@nuxtjs/robots", // SEO robots.txt
  ],
  site: {
    url: "https://gem-team.pages.dev",
  },
});
```

### `app.config.ts`

UI theme configuration with emerald primary color and custom page hero styles.

### `@theme` CSS Variables

Color customization uses CSS `@theme` directive (not Tailwind config):

```css
@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

## Dependencies

| Package                | Purpose                                |
| ---------------------- | -------------------------------------- |
| `@nuxt/ui`             | UI components and theming              |
| `@nuxt/content`        | Markdown content renderer              |
| `@nuxt/image`          | Image optimization                     |
| `@nuxt/fonts`          | Font loading (Inter from Google Fonts) |
| `@nuxtjs/sitemap`      | Auto-generated sitemap.xml             |
| `@nuxtjs/robots`       | robots.txt configuration               |
| `@iconify-json/lucide` | Icon library                           |

## Deployment

The site is designed for deployment on Cloudflare Pages or similar platforms. Build with `npm run build` and deploy the `.output` directory.
