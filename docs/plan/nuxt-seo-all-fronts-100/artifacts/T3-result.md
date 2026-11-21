# T3 Result: Activate and configure all Nuxt SEO modules (revised for deploy path)

Status: COMPLETED
Date: 2026-11-21
Working dir: `/projects/gem-team/docs/src`
Scope owned: `nuxt.config.ts`, rename of `public/_robots.txt` -> `public/robots.txt`, this evidence file.
No page, component, content, app, or workflow file was modified.

Revision driver: integration gate critic verdict "revise" - deploy uses `npm run build`
(`deploy-docs.yml:34`) and uploads `docs/src/.output/public` as a static GitHub Pages site,
so a `generate`-only sitemap proof was insufficient.

## Changes

- `nuxt.config.ts`
  - `nitro.prerender.routes: ['/', '/sitemap.xml']` (was `['/']`) - forces the sitemap into
    `.output/public` on the exact deploy command, which has no Nitro server at runtime.
  - `aiReady: { llmsTxt: false, llmsFullTxt: false }` - AI Ready stays loaded for markdown/MCP
    but stops generating llms.txt/llms-full.txt.
  - `llms.contentRawMarkdown: { rewriteLLMSTxt: false }` - nuxt-llms links point to prerendered
    HTML routes instead of unprerendered `/raw/*.md`.
  - `sitemap.sources: ['/api/_sitemap']` removed, leaving `sitemap: { enabled: true }`.
  - `schemaOrg`, `linkChecker`, `skewProtection` explicit config keys added (`enabled: true`;
    schemaOrg also `defaults: true`).
  - `robots`, `ogImage`, `seo`, `site`, `llms` blocks retained. `site.url` intentionally unchanged.
- `public/_robots.txt` renamed to `public/robots.txt` (content unchanged).

## 1. Module coverage (T1 verified list, all enabled)

All 9 modules shipped by installed `@nuxtjs/seo` 6.0.1 plus standalone `nuxt-llms` 0.3.2 remain
registered via `modules: ['@nuxtjs/seo', 'nuxt-llms']`; none is set to `false`.

| # | Module | Config key | Explicit config |
|---|--------|-----------|-----------------|
| 1 | Robots | `robots` | `robotsTxt: false` (module-forced for non-root baseURL; static robots.txt served) |
| 2 | Sitemap | `sitemap` | `enabled: true`, no broken source |
| 3 | Schema.org | `schemaOrg` | `enabled: true, defaults: true` |
| 4 | OG Image | `ogImage` | `zeroRuntime: true` |
| 5 | SEO Utils | `seo` | `enabled: true` |
| 6 | Link Checker | `linkChecker` | `enabled: true` |
| 7 | Site Config | `site` | `url`, `name`, `description` |
| 8 | AI Ready | `aiReady` | `llmsTxt: false, llmsFullTxt: false` (module stays enabled) |
| 9 | Skew Protection | `skewProtection` | `enabled: true` |
| 10 | LLM (standalone) | `llms` | `domain`, `title`, `description`, `contentRawMarkdown`, `full`, 5 `sections` |

## 2. Single unambiguous llms generator

`nuxt-llms` is the sole generator. Post-build read of `.output/public`:
`llms.txt` has nuxt-llms marker `Documentation Sets`, zero AI Ready marker `Canonical Origin`,
zero `/raw/` links, and all five configured section headings; `llms-full.txt` is present with full
content. Build log: `[nuxt-ai-ready] ... llms.txt files: 0.0kb, llms-full.txt: 0.0kb` - AI Ready
indexes but writes no llms artifacts, so there is no duplicate output.

## 3. robots.txt

`public/robots.txt` is served at `/gem-team/robots.txt` (79 bytes) with `User-agent: *`,
`Allow: /`, and `Sitemap: https://mubaidr.github.io/gem-team/sitemap.xml`.
`robots: { robotsTxt: false }` is retained because `@nuxtjs/robots` forces it when
`app.baseURL` length > 1 and deletes `_robots.txt` from output.

## 4. Sitemap on the exact deploy path (post-build assertions)

Command replicated from `deploy-docs.yml:31-41`:
`NUXT_APP_BASE_URL=/gem-team/ npm run build` (exit 0), then assertions on `docs/src/.output/public`:

- `.output/public/sitemap.xml` EXISTS (5496 bytes) - previously absent on this path; only
  `sitemap.md` was emitted. Nitro log line: `├─ /sitemap.xml`.
- robots.txt `Sitemap:` URL (`https://mubaidr.github.io/gem-team/sitemap.xml`) maps to the
  uploaded file `.output/public/sitemap.xml` under the `/gem-team/` Pages mount - target exists.
- Zero `api/_sitemap` / `Failed to fetch source` errors in the build log.
- `npm run generate` was NOT used as proof.

### Accepted risk: one duplicated base-path URL in sitemap.xml (explicit, evidenced)

`grep` of the fresh post-build sitemap shows one non-canonical entry
`https://mubaidr.github.io/gem-team/gem-team` (1 occurrence; 50 `<loc>` total). When the
prerender crawler follows it, a single non-fatal 404 is logged, but the build still exits 0 and
the sitemap file is valid.

Evidence for why no clean config-only filter exists:
- `node_modules/.cache/nuxt/sitemap/global-sources.json` shows the `nuxt:prerender` source lists
  both `{ loc: "/" }` and `{ loc: "/gem-team/" }`. The latter is re-based into the duplicated URL.
- `preNormalizeEntry` (`@nuxtjs/sitemap/dist/runtime/server/sitemap/urlset/normalise.js:52-87`)
  sets `_path.pathname` from the RAW loc, so the duplicate carries pathname `/gem-team/`.
- `createPathFilter` (`.../runtime/utils-pure.js:117-128`) calls
  `withoutBase('/gem-team/', '/gem-team/')`, which evaluates to `/` - identical to the legitimate
  home page's stripped path. Verified with ufo:
  `withoutBase('/gem-team/','/gem-team/') === '/'` and `withoutBase('/','/gem-team/') === '/'`.
- Therefore no `include`/`exclude` regex can distinguish the duplicate from the real home.
  Two exclude forms were trialled (`/\/gem-team\/gem-team/` and `/^\/gem-team\/?$/`); both were
  ineffective (50 locs, duplicate remained) and were reverted so no dead config remains.
- `excludeAppSources: ['nuxt:prerender']` is not viable: the `@nuxt/content@v3:urls` source is
  empty ("No collections found"), so it would empty the entire sitemap.

Risk assessment: one extra non-canonical URL in a 50-entry sitemap; canonicals on all rendered
pages remain correct (`https://mubaidr.github.io/gem-team...`, no duplication). Impact is limited
to a harmless crawl of one 404. Fix would require editing content/app or hardcoding 49 URLs in
config, both outside this task's scope; deferred to T5/T6 review or a content-owned follow-up.

## 5. Verification (final config, no dead flags)

| Check | Command | Exit |
|-------|---------|------|
| Config diagnostics | `npm run typecheck` | 0 |
| Exact deploy build | `NUXT_APP_BASE_URL=/gem-team/ npm run build` | 0 |
| Static generate (helper only, not deploy proof) | `npm run generate` | 0 |

Consumer read-path assertions: robots allow rule + sitemap directive read directly; llms generator
markers read directly; post-build sitemap.xml located at the robots-advertised target; canonicals
checked on home and two deep pages. Error/retry paths: first build attempt failed on `/raw/*.md`
404s, root-caused to Nuxt Content `rewriteLLMSTxt`, fixed via `llms.contentRawMarkdown`; sitemap
absence on deploy path fixed via `nitro.prerender.routes`; two exclude attempts reverted as
ineffective. No previously passing gate regressed (typecheck/build/generate all green, all modules
enabled, single llms generator, robots rename intact).

## Decisions (one-line reasons)

- Add `/sitemap.xml` to `nitro.prerender.routes` - static Pages deploy has no server to generate it on request.
- Keep `nuxt-llms` as generator - makes the previously dead llms config live without disabling any module.
- Set `rewriteLLMSTxt: false` - raw `.md` routes are not prerendered and broke the build.
- Drop `sitemap.sources` - config-only auto-discovery; no server route added.
- Leave `site.url` unchanged - `withSiteUrl` already appends `app.baseURL`.
- Revert both `sitemap.exclude` attempts - filter sees the baseURL-stripped path, so the duplicate is indistinguishable from home; dead config avoided.

## learn

- New failure mode: `npm run build` (static deploy path) does not emit sitemap.xml unless `/sitemap.xml` is in `nitro.prerender.routes`; `npm run generate` is not equivalent.
- Confirmed architecture fact: sitemap's `createPathFilter` filters on the baseURL-stripped raw loc, so a duplicated base path collapses to the same `/` as the home page and cannot be excluded by pattern.
