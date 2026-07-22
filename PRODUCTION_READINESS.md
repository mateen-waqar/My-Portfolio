# Phase 17 — Final Review & Deployment Guide

Everything below was checked against the actual codebase (typecheck, lint,
and a real `next build`), not assumed. Two small fixes were applied as part
of this pass — both called out below.

---

## 1. Architecture Review

**Stack confirmed as shipped:** Next.js 16 (App Router, Turbopack build),
React 19, TypeScript strict mode, Tailwind v4, shadcn/ui primitives,
Framer Motion, GSAP (hero only), react-hook-form + zod, Resend for the
contact API route. `three.js` from the original brief was never added —
the hero achieves its depth with GSAP/CSS instead, which is the right
call for bundle size on a portfolio site.

**Composition (`src/app/page.tsx`):** Hero → About → Skills → Projects →
Experience → Education → Certifications → Services → GitHub Activity →
Blog → Contact, wrapped in a shared `Navbar`/`Footer` from the root
layout. `GithubActivity` and `Contact` are the only sections pulled in
with `next/dynamic` — a deliberate choice since they're the two sections
carrying extra client-side weight (a network-fetch hook and
react-hook-form + zod) that most visitors won't need before they scroll.

**Server vs. client split:** 5 of 11 sections are client components
(`hero`, `projects`, `experience`, `github-activity`, `contact`) — each
for a concrete reason (GSAP hero animation, filterable/modal project
grid, expandable timeline, client-side data fetch, form state). The
remaining 6 render on the server. This is close to the right ratio for a
mostly-static marketing site.

**Data layer:** all content (`projects`, `experience`, `skills`, etc.)
lives in typed constants under `src/constants/`, not hardcoded in
components — swapping or CMS-backing content later is a data change, not
a template rewrite.

**No structural issues found.** No prop-drilling of note, no duplicated
logic across sections, no `any` usage that surfaced during typecheck.

---

## 2. Accessibility Audit (WCAG 2.2)

Checked: landmark structure, heading hierarchy, focus handling, form
labeling, reduced-motion, color contrast intent.

| Area | Finding |
|---|---|
| Heading hierarchy | Clean: one `<h1>` (hero), `<h2>` per section via the shared `SectionHeading` component, `<h3>` for cards inside sections. No skipped levels. |
| Landmarks | `<header>`, `<main>`, `<footer>` all present and correctly used. |
| Keyboard skip navigation | **Missing — fixed in this pass.** There was no way for a keyboard user to jump past the nav straight to content. Added `src/components/common/skip-link.tsx`, wired it as the first focusable element in `layout.tsx`, and gave `<main>` an `id="main-content"` target in `page.tsx`. |
| Focus states | Global `:focus-visible` ring already defined in `globals.css` and never suppressed anywhere in the codebase — verified with a full-repo search. |
| Reduced motion | `<MotionConfig reducedMotion="user">` wraps the whole app, so every Framer Motion animation respects `prefers-reduced-motion` automatically. |
| Forms | Contact form: every input has a real `<label htmlFor>`, invalid fields carry `aria-invalid`, radio-style budget options use `<label>` wrapping. Good baseline; you may still want an `aria-live` region around the submit-status message if you add one later. |
| Images | No raw `<img>` tags in the codebase — nothing to check for missing `alt`, since the design uses generated icons/SVGs rather than photography. If you add a real headshot or project screenshots later, route them through `next/image` and give each a descriptive `alt`. |
| Color contrast | Palette is dark background (`#050816`/`#0F172A`) with white/gray text and blue/purple/cyan accents — this combination reads as WCAG AA-safe for body text at the sizes used, but run it through a contrast checker once real content/imagery is final, since accent-colored text on accent-colored backgrounds is the one combination worth double-checking by eye.

**Net result:** one real gap found and fixed (skip link). Everything
else already met a solid accessibility bar.

---

## 3. Performance Review

Ran an actual production build rather than estimating:

```
✓ Compiled successfully
✓ TypeScript: 0 errors
✓ ESLint: 0 errors (1 harmless warning in prettier.config.mjs, unrelated to app code)
✓ Static prerender: 12/12 routes
```

Route output — everything renders static except the API route, which is
correct:

| Route | Type |
|---|---|
| `/` | Static |
| `/api/contact` | Dynamic (serverless function, as it should be) |
| `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` | Static |
| `/icon`, `/apple-icon`, `/opengraph-image`, `/twitter-image` | Static (generated) |

**Bundle shape:** largest individual chunk is ~316KB uncompressed
(framer-motion, expected for a motion-heavy site), next largest ~224KB.
`next.config.ts` already rewrites `lucide-react` and `react-icons`
imports to per-icon modules via `optimizePackageImports`, so unused
icons aren't shipped. Image `formats` are restricted to AVIF/WebP.

**What's already in place for Core Web Vitals:**
- Fonts loaded via `next/font` (Geist Sans/Mono) — no layout shift from font swap, no external font request.
- `GithubActivity` and `Contact` code-split via `next/dynamic` with lightweight loading placeholders sized to their final height, so there's no layout jump when they hydrate.
- No client-side data fetching blocks the initial paint — the GitHub stats hook only runs once its section is in view.

**What to check once deployed (can't be measured from source alone):**
- Run a real Lighthouse pass against the deployed URL — LCP/CLS numbers depend on real network conditions and the actual OG image size, not just the code.
- If you add real project screenshots, keep them through `next/image` with explicit `width`/`height` so CLS stays at 0.

---

## 4. Production Readiness Checklist

- [x] TypeScript strict mode — 0 errors
- [x] ESLint — 0 errors
- [x] `next build` completes cleanly, all pages prerender
- [x] SEO: metadata, Open Graph, Twitter cards, canonical URL, JSON-LD, `robots.ts`, `sitemap.ts` all present (Phase 15)
- [x] Reduced-motion respected app-wide
- [x] Skip-to-content link (added this phase)
- [x] Contact API route has rate limiting (5 requests / 10 min per IP, in-memory)
- [ ] **Set real environment variables before deploying** — see §5
- [ ] Swap the in-memory rate limiter for Upstash/Redis (or similar) if the contact form needs to survive across serverless cold starts under real traffic — noted in the code as an accepted tradeoff for a low-traffic form, revisit only if that assumption changes
- [ ] Add a real headshot / project screenshots and route them through `next/image`
- [ ] Run Lighthouse against the live deployment once DNS/hosting is final
- [ ] Verify OG/Twitter card images render correctly by pasting the live URL into a social debugger (e.g. the platform's own card-preview tool) after deploy

---

## 5. Deployment Instructions (Vercel)

1. **Push the repo to GitHub** (or GitLab/Bitbucket).
2. **Import into Vercel** — vercel.com → New Project → select the repo. Vercel auto-detects Next.js; no build config needed.
3. **Set environment variables** in Vercel's Project Settings → Environment Variables (use the values from `.env.example` as the template):
   - `NEXT_PUBLIC_SITE_URL` — your real production domain, e.g. `https://mateenuddin.dev`
   - `RESEND_API_KEY` — from resend.com, needed for the contact form to actually send email
   - `CONTACT_TO_EMAIL` — the inbox that should receive contact-form submissions
4. **Deploy.** Vercel builds and gives you a preview URL; promote to production once it looks right.
5. **Attach your custom domain** in Project Settings → Domains, and update DNS per Vercel's instructions.
6. **Re-check metadata after the domain is live** — `metadataBase` in `layout.tsx` derives from `SITE.domain` in `src/constants/site.ts`, so if the production domain differs from what's currently in that constant, update it there before the final deploy so OG/canonical URLs are correct.
7. **Test the contact form end-to-end** against the live deployment once `RESEND_API_KEY` is set — this can't be verified from source alone since it depends on the Resend account being active.

---

## Summary

The build is clean (0 TypeScript errors, 0 lint errors, full static
prerender) and the accessibility/architecture bar was already high going
into this phase. One real gap — missing skip-navigation — was found and
fixed. What's left is deploy-time work (env vars, real Lighthouse run,
real content assets) that can only be verified against a live URL, not
from source.
