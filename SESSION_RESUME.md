# Session resume (local / Cursor)

**Read this first when picking the project back up.**

## Canonical paths

- **Local repo:** `C:\Projects\bdrefresh`
- **npm package name:** `banddservicing-next` (historical; folder is `bdrefresh`)
- **Remote:** `origin` → `emailaaguirre-eng/bdrefresh`, default branch **`main`**

## Quick commands

```powershell
cd C:\Projects\bdrefresh
npm install
npm run dev
npm run lint
npm run build
```

## Deploy / hosting notes

- Set **`NEXT_PUBLIC_SITE_URL`** to the production origin (no trailing slash) so `metadataBase`, sitemap, and robots use the right URLs. Falls back to `http://localhost:3000` if unset (`lib/site.ts`).
- **Contact form:** `components/forms/ProjectInquiryForm.tsx` → `NEXT_PUBLIC_CONTACT_FORM_ACTION` or default **`/contact/send.php`**. Ensure that exists on the host (e.g. cPanel).

## Product context (recent direction)

- **Work** (`app/work/page.tsx`): Hero title uses split **`Represent` + shimmer `ative` + shimmer `work`**. Hero lead emphasizes real systems and client-facing value; sections below still include confidentiality / illustrative mockup framing. **Page `metadata.description`** is aligned with systems-first positioning (representative examples, stack from web through operational systems).
- **PageHero** (`components/layout/PageHero.tsx`): Two-column title | lead from **`md`** breakpoint.
- **ClosingBand** replaced older frosted CTA shell site-wide where applicable; see `components/layout/ClosingBand.tsx`.

## Stale docs

- **`REVIEW_PACK.md`** still refers to an older folder name (`banddservicing-next/`); treat this file as the **current** resume pointer.

## For agents

- Work only in this repo unless the user says otherwise.
- Prefer small, scoped diffs; match existing patterns (`PageHero`, `Reveal`, `SectionTag`, Tailwind `bd.*` tokens).
