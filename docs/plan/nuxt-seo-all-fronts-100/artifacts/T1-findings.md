# T1 Findings: SEO and AI module/artifact audit (baseline)

Status: COMPLETED (audit, read-only on config/source)
Date: 2026-11-21
Working dir: /projects/gem-team/docs/src

## Method and evidence sources

- Module inventory derived from the INSTALLED package docs, not from assumed names:
  - `docs/src/node_modules/@nuxtjs/seo/README.md` lines 11-23 (module table)
  - `docs/src/node_modules/@nuxtjs/seo/package.json` line 4 (version 6.0.1), lines 54-67 (dependencies)
  - `docs/src/node_modules/nuxt-llms/README.md` lines 18-20, 87-90, 106-110
  - `docs/src/node_modules/nuxt-ai-ready/README.md` lines 17, 21-22
  - `docs/src/node_modules/@nuxtjs/robots/dist/module.mjs` lines 333-335, 354-364, 417-418, 449-453
  - `docs/src/node_modules/nuxt-seo-utils/dist/module.mjs` line 1411 (`configKey: "seo"`)
  - `docs/src/node_modules/nuxt-site-config/dist/module.mjs` line 17 (`configKey: "site"`)
  - `docs/src/node_modules/nuxt-schema-org/dist/module.mjs` line 61 (`configKey: "schemaOrg"`)
- Config evidence: `docs/src/nuxt.config.ts`, `docs/src/package.json`.
- Rendered-artifact evidence: fresh `npm run generate` (Node v26.13.0) executed 2026-11-21.
  The build FAILED at sitemap prerender (see Gap G1) but wrote artifacts to `docs/src/.output/public`
  (file mtimes 2026-11-21 15:42). All artifact presence below is from that fresh output.
- Routes use `app.baseURL: '/gem-team/'` (nuxt.config.ts:12-14), so public-root files are served
  under `/gem-team/`; both bare and prefixed routes are named below.

## 1. Module inventory (derived, not hardcoded)

Installed `@nuxtjs/seo` version: **6.0.1** (package.json line 4; declared `^6.0.1` at docs package.json:18).
Its README states (line 11): "installs 9 Nuxt SEO modules in one step". Derived module table:

| # | Module | Package | Config key | State | Config evidence |
|---|--------|---------|-----------|-------|-----------------|
| 1 | Robots | @nuxtjs/robots | `robots` | LOADED, robots.txt generation DISABLED | nuxt.config.ts:122-124 `robots: { robotsTxt: false }` |
| 2 | Sitemap | @nuxtjs/sitemap | `sitemap` | LOADED/ENABLED but BROKEN | nuxt.config.ts:130-133 `sitemap: { enabled: true, sources: ['/api/_sitemap'] }`; source 404s (G1) |
| 3 | Schema.org | nuxt-schema-org | `schemaOrg` | LOADED on defaults; NO explicit config | no `schemaOrg` key in nuxt.config.ts; cache dir `node_modules/.cache/nuxt/.nuxt/schema-org` exists; JSON-LD rendered (see 2) |
| 4 | OG Image | nuxt-og-image | `ogImage` | LOADED/ENABLED | nuxt.config.ts:118-120 `ogImage: { zeroRuntime: true }`; prerender log shows `/gem-team/_og/s/*.png` |
| 5 | SEO Utils | nuxt-seo-utils | `seo` | LOADED/ENABLED | nuxt.config.ts:126-128 `seo: { enabled: true }` |
| 6 | Link Checker | nuxt-link-checker | `linkChecker` | LOADED on defaults; NO explicit config | no `linkChecker` key; cache dir `node_modules/.cache/nuxt/.nuxt/link-checker` exists |
| 7 | Site Config | nuxt-site-config | `site` | LOADED/ENABLED | nuxt.config.ts:18-23 `site.url`, `site.name`, `site.description` |
| 8 | AI Ready | nuxt-ai-ready | `aiReady` | LOADED on defaults; NO explicit config; WON the llms conflict | no `aiReady` key in nuxt.config.ts; module README lines 21-22; cache dirs `.data/ai-ready`, `cache/ai-ready` |
| 9 | Skew Protection | nuxt-skew-protection | `skewProtection` | LOADED on defaults; NO explicit config | no `skewProtection` key in nuxt.config.ts; module present in installed deps (package.json line 64) |

Standalone module (NOT part of @nuxtjs/seo):
| 10 | LLM | nuxt-llms 0.3.2 | `llms` | LOADED/CONFIGURED but its llms output is OVERRIDDEN | nuxt.config.ts:9 (registered), :71-116 (full `llms` config with domain/title/full/sections) |

Notes:
- No module is explicitly disabled via `false`. All 10 are registered/loaded.
- Four modules (schema-org, link-checker, AI Ready, skew-protection) run purely on defaults with no
  explicit config key. Risk decision "Add explicit schema.org configuration" is therefore unmet today.
- `@nuxtjs/seo` README migration note (line 70) says to remove AI Ready/Skew Protection if listed
  separately; the project lists `nuxt-llms` separately (not `nuxt-ai-ready`), which does not avoid the
  generator collision documented in section 3.

## 2. Rendered artifact presence (fresh 2026-11-21 generate)

| Artifact | Route(s) | Status | Evidence |
|----------|----------|--------|----------|
| llms.txt | `/llms.txt`, `/gem-team/llms.txt` | PRESENT (503 bytes) | `.output/public/llms.txt`, mtime 2026-11-21 15:42:52 |
| llms-full.txt | `/llms-full.txt`, `/gem-team/llms-full.txt` | PRESENT (287311 bytes) | `.output/public/llms-full.txt`, mtime 2026-11-21 15:42:58 |
| robots.txt | `/robots.txt`, `/gem-team/robots.txt` | ABSENT | no such file in fresh `.output/public`; robotsTxt:false (nuxt.config.ts:123); robots module deletes `_robots.txt` from output (module.mjs:449-453) |
| _robots.txt | `/_robots.txt` | ABSENT | source `public/_robots.txt` exists but module unlinks it from output (module.mjs:449-453) |
| sitemap.xml | `/sitemap.xml`, `/gem-team/sitemap.xml` | ABSENT (build error) | `[@nuxt/sitemap] ERROR Failed to fetch source. { url: '/api/_sitemap' ... 404 }`; `Failed to prerender '/gem-team/sitemap.xml': 500 Server Error` |
| sitemap_index.xml | `/sitemap_index.xml` | ABSENT | same failed build |
| JSON-LD | every prerendered page, e.g. `/`, `/getting-started/installation`, `/guide/workflow-execute` | PRESENT (1 `application/ld+json` block per page checked) | fresh `.output/public/**/index.html`; home block is `@graph` with `WebSite` + `WebPage` |

JSON-LD sample (home, parsed): `@context: https://schema.org`, `@graph` of `WebSite`
(`https://mubaidr.github.io/gem-team/#website`) and `WebPage`
(`https://mubaidr.github.io/gem-team#webpage`), plus a `ReadAction` potentialAction.
Deep pages emit the same WebSite+WebPage shape with page-specific `@id`/`name`/`url` (no `Article`,
`HowTo`, `FAQPage`, or `BreadcrumbList`). This is baseline only; T4 owns schema enrichment.

Rendered robots meta tag is present: `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`.
Note: baseURL `/gem-team/` means `@nuxtjs/robots` refuses to generate a robots.txt at all
(module.mjs:333-335 logs an error and forces `robotsTxt:false` when baseURL length > 1).

## 3. Documented conflicts / defects

### C1: Duplicate llms.txt / llms-full.txt generators
- `nuxt-ai-ready` (bundled in @nuxtjs/seo 6.0.1, dependency at installed package.json:58) auto-generates
  `llms.txt` and `llms-full.txt` by default (README lines 21, 49) and on-demand `.md` routes
  (fresh build log prerendered `/configuration/quality.md`, `/resources.md`, etc.).
- Standalone `nuxt-llms` 0.3.2 (nuxt.config.ts:9) also generates `/llms.txt` and `/llms-full.txt`
  (its README lines 18-20, 87-90, 106-110), and is fully configured at nuxt.config.ts:71-116 with
  `domain`, `title`, `description`, `full`, and five `sections` using `contentCollection: 'docs'`.
- Net observed result: the served files are in **AI Ready format**, not nuxt-llms format. Evidence:
  current `.output/public/llms.txt` begins `# Gem Team`, `Canonical Origin: https://mubaidr.github.io/gem-team`,
  `## LLM Resources` with `Full Content`, `sitemap.xml`, `robots.txt` links. None of the nuxt-llms
  configured section headings ("Getting Started", "Guide", "Agents", "Configuration", "Resources")
  or the configured `full.title` ("Gem Team - Full Documentation") appear in the output.
  Therefore the `llms` config block is effectively dead/overridden; a single source must be chosen.
- Secondary effect: AI Ready's llms.txt advertises `/sitemap.xml` and `/robots.txt`, but neither route
  exists (section 2), so the AI discovery file points at two dead links.

### C2: robotsTxt:false + public/_robots.txt
- Source file `docs/src/public/_robots.txt` contains `User-agent: *`, `Allow: /`,
  `Sitemap: https://mubaidr.github.io/gem-team/sitemap.xml` (verified by read).
- `nuxt.config.ts:122-124` sets `robots: { robotsTxt: false }`, so @nuxtjs/robots generates no
  `/robots.txt` route. The module only reads `public/_robots.txt` as a merge source when
  `robotsTxt` is true (module.mjs:354-364); that branch is skipped here.
- The module's `nitro:build:public-assets` hook **deletes** `_robots.txt` from the output
  (module.mjs:449-453: `fsp.unlink(outputPath)`), so the file is not served at `/_robots.txt` either.
- Result: no robots.txt is served anywhere, and the sitemap reference in the source file is unreachable.
- Nuance for T3: `_robots.txt` is the module's own expected staging name (it renames a source
  `public/robots.txt` to `_robots.txt`, module.mjs:417-418). The real blocker is `robotsTxt:false`
  plus the non-root `baseURL`. A fix must either provide a served `/robots.txt` via a custom route
  or reconcile baseURL with the module's robots.txt generation; merely renaming the file is insufficient.
- The referenced sitemap URL is itself broken because of G1.

## 4. Baseline route list (all prerendered docs pages)

49 prerendered HTML content routes (home + 48 content pages), from
`docs/src/.output/public/**/index.html` (fresh build):

Home: `/` (app/pages/index.vue)

Getting Started (5):
`/getting-started` (Getting Started), `/getting-started/concepts` (Core Concepts),
`/getting-started/first-steps` (First Steps Walkthrough), `/getting-started/installation` (Installation),
`/getting-started/quick-start` (Quick Start)

Guide (15):
`/guide/comparison`, `/guide/compatibility`, `/guide/core-concepts`, `/guide/efficiency`,
`/guide/failure-handling`, `/guide/features`, `/guide/init-clarify`, `/guide/learning`,
`/guide/optimizations`, `/guide/plan`, `/guide/quality`, `/guide/route`, `/guide/workflow`,
`/guide/workflow-execute`, `/guide/workflow-output`

Agents (16):
`/agents` (Agent Team), `/agents/browser-tester`, `/agents/code-simplifier`, `/agents/debugger`,
`/agents/devops`, `/agents/documentation`, `/agents/implementer`, `/agents/mobile-tester`,
`/agents/model-routing`, `/agents/orchestrator`, `/agents/planner`, `/agents/researcher`,
`/agents/reviewer`, `/agents/reviewer-routing`, `/agents/skill-creator`, `/agents/skills`

Configuration (7):
`/configuration` (Configuration), `/configuration/devops`, `/configuration/examples`,
`/configuration/model-routing`, `/configuration/orchestrator`, `/configuration/quality`,
`/configuration/testing`

Resources (5):
`/resources` (Resources), `/resources/compatible-tools`, `/resources/contributing`,
`/resources/local-development`, `/resources/operational-notes`

Note: there is NO `/guide/index.html` (no `1.index.md` in `content/2.guide/`). The standalone nuxt-llms
config has a `Guide` section filtering `/guide%`, but AI Ready won generation, so this gap does not
surface in llms.txt today. T5/T8 should not expect `/guide` to return a page unless T4 adds one.

## 5. Named representative pages for T5 / T8 verification

Primary set (explicit task requirement):
- Home: `/` (`/gem-team/` when served) -> `index.html`
- Getting Started page: `/getting-started/installation` (also check `/getting-started` section index)
- Deep content page: `/guide/workflow-execute` (also `/agents/reviewer`, `/configuration/orchestrator`)

Full per-section set (plan T1 phrasing: "homepage plus one page per content section"):
- Home: `/`
- Getting Started: `/getting-started` (deep: `/getting-started/installation`)
- Guide: `/guide/core-concepts` (deep: `/guide/workflow-execute`)
- Agents: `/agents` (deep: `/agents/reviewer`)
- Configuration: `/configuration` (deep: `/configuration/orchestrator`)
- Resources: `/resources` (deep: `/resources/operational-notes`)

## 6. Other gaps observed (non-impacting to T1 conclusion, handed off)

- G1 (BLOCKER, build): `sitemap.sources: ['/api/_sitemap']` (nuxt.config.ts:132) points to a route that
  does not exist (no `server/` dir in docs/src). Fresh generate logs
  `GET /gem-team/api/_sitemap -> H3Error 404`, `[@nuxt/sitemap] ERROR Failed to fetch source`, and
  `Failed to prerender '/gem-team/sitemap.xml': 500 Server Error`. `npm run generate` exits non-zero.
  This is owned by T3 (nuxt.config.ts).
- G2 (schema completeness): JSON-LD is only generic WebSite+WebPage; no Article/HowTo/FAQ/Breadcrumb
  types on docs pages. Owned by T4/T3 decision "Add explicit schema.org configuration".
- G3 (config drift): `site.url = https://mubaidr.github.io` (nuxt.config.ts:19) while
  `llms.domain = https://mubaidr.github.io/gem-team` (nuxt.config.ts:72) and rendered JSON-LD uses the
  `/gem-team` path. Canonical/domain consistency should be checked by T5.
- G4: `/guide` has no index page (see section 4).

## 7. Stability notes

- Module names, counts, config-key mappings, and generator behavior are derived from installed package
  files at pinned versions (@nuxtjs/seo 6.0.1, nuxt-llms 0.3.2) -> stable=true.
- Artifact presence and the generate failure are mutable build-state observations from 2026-11-21
  -> stable=false; re-verify after T3/T4 changes.
