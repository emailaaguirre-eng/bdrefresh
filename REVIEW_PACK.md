# B&D Servicing — Next.js rebuild (review pack)

## Location

- **New app (do not delete):** `banddservicing-next/` (sibling to legacy `banddservicing-website/`)
- **Legacy reference:** `banddservicing-website/` — unchanged; use for copy and visual reference only.

## Folder structure (high level)

```
banddservicing-next/
├── app/                    # App Router pages, layout, globals, robots, sitemap
├── components/
│   ├── forms/              # Project inquiry form (POST target configurable)
│   ├── home/               # Homepage sections
│   ├── layout/             # Header, footer, chrome, page hero
│   ├── motion/             # Framer Motion wrappers (respects reduced motion)
│   ├── ui/                 # Container, SectionTag, ButtonLink
│   └── work/               # Work preview media (img + object for commerce.svg)
├── lib/                    # site URL, nav, shared content data
├── public/                 # bd-logo.svg, work-previews/*
├── scripts/prepare-standalone.mjs
├── ecosystem.config.cjs
├── .env.example
└── REVIEW_PACK.md
```

## Route structure

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, tech strip, WWD, services preview, process preview, CTA, values/terminal, work teaser |
| `/what-we-do` | Positioning + audience |
| `/services` | All seven services (per your list) |
| `/process` | Discovery → Build → Test & Launch → Improve |
| `/about` | “Built Beyond Templates…” + principles + **CoDre-X** (`#codrex`) |
| `/work` | Confidentiality framing + six titled use cases + illustrative assets |
| `/start-project` | Invitation, next steps, contact blocks, **form** |
| `/insights` | Scaffold only — ready for MDX/static posts later |
| `/sitemap.xml` | Generated |
| `/robots.txt` | Generated |

## Key components

- **`SiteChrome`** — skip link, `SiteHeader`, `<main id="main-content">`, `SiteFooter` (Powered by **CoDre-X** → `/about#codrex`).
- **`PageHero`** — dark hero with grid/orbs; used on inner pages.
- **`Reveal`** — `framer-motion` `whileInView`; no motion when `prefers-reduced-motion`.
- **`ProjectInquiryForm`** — posts to `NEXT_PUBLIC_CONTACT_FORM_ACTION` or default `/contact/send.php` (wire to your existing PHP or API).

## Design decisions

- **Palette & type:** Tailwind theme mirrors `:root` tokens from legacy `styles.css` (dark `#080c12` stack, light cool gray, steel blue `#2568a0`, teal `#1ba885`). Fonts: **Inter**, **DM Sans**, **Space Mono** via `next/font/google`.
- **Motion:** Subtle section reveals + optional hero float tokens; reduced-motion respected.
- **No stock photography** — work cards use your existing **SVG mockups** (+ `commerce-watch.png`) under `public/work-previews/`.
- **No database / auth / CMS** — content in TS modules under `lib/data.ts` and page files; Insights is a placeholder route.

## Preserved from the static site

- Color system, dark/light rhythm, tag/bracket section labels, shimmer accent text pattern.
- Nav order + “Start a Project” CTA.
- Work page tone: confidentiality-first, illustrative mockups, exact use-case titles.
- CoDre-X relationship and footer credit.
- Services list (aligned with homepage legacy set, including SEO + Graphic Design).
- Process four phases (aligned with your requested names).
- Contact details and form fields (PHP action path preserved as default).

## Improved vs static HTML

- **Component model** — one header/footer; no duplicated page shells.
- **Type-safe** routes and shared data.
- **SEO baseline** — per-page `metadata`, `metadataBase`, OG/Twitter defaults, sitemap, robots.
- **Production hosting** — `output: 'standalone'` + PM2 config + prepare script for static/public copy.
- **Maintainability** — add a page by creating `app/.../page.tsx` and optional `metadata`.

## Local commands

```bash
cd banddservicing-next
npm install
npm run dev
# http://localhost:3000
```

Optional: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`.

## Production build & PM2 (human-run only)

```bash
cd banddservicing-next
npm install
npm run build
npm run standalone:prepare
pm2 start ecosystem.config.cjs
pm2 save   # optional
```

- **Prepare step** copies `.next/static` and `public` into `.next/standalone` (required for Next standalone).
- Adjust **`PORT`** / **`HOSTNAME`** in `ecosystem.config.cjs` or via environment as needed.
- Deploy the **contents** of `.next/standalone` plus ensure your **contact handler** (e.g. `contact/send.php`) exists on the server if you keep the default form action.

## Placeholders / deferred

- **Insights:** no posts yet; add MDX or a static list when ready.
- **Contact:** form submits to configurable URL; no Next API route (keeps PHP or future API optional).
- **Favicon:** using `bd-logo.svg` in metadata; swap for dedicated `icon.png` if desired.
- **npm audit:** one critical advisory from toolchain at install time — run `npm audit` and upgrade when convenient.

## Non-goals (as requested)

- No live deploy, SSH, or cPanel changes from this work.
- Legacy `banddservicing-website` not modified.
