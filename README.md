# Oluwaseun Olatunde — personal website

A premium, editorial personal site for Oluwaseun Olatunde, Head of Customer Operations at Flutterwave. Built from the PRD in `source/PRD.md` ("Intelligent warmth" design system: Ink, Paper, Signal, Teal, Mist, Coral; Fraunces + Inter).

**Live site:** https://easytechp5.github.io/oluwaseun-olatunde/

## Logo
`assets/img/logo.svg` (full lockup), `logo-light.svg` (for dark backgrounds), `logo-mark.svg` and `logo-mark-amber.svg` (icon only).

## Stack
Dependency-free static site: HTML, CSS and vanilla JS. Pages are generated from `scripts/build.mjs`.

```bash
node scripts/build.mjs      # regenerate every page
node scripts/serve.mjs      # preview at http://localhost:4173
npm test                    # rebuild + check links, alt text, labels, SEO basics, duplicate ids
```

## What's in
Home, About (animated timeline), Work (6 case studies), Insights (filterable), Speaking (with booking form), Community, Contact, Privacy, Terms, 404, sitemap.xml, robots.txt. Animated counters, reduced-motion support, cookie consent (non-essential tracking off by default), schema.org Person/Article markup.

## Before launch (placeholders to confirm)
- Email `hello@oluwaseunolatunde.com` and LinkedIn URL are placeholders: edit `EMAIL` / `LINKEDIN` in `scripts/build.mjs` and `CONFIG.email` in `assets/js/main.js`.
- Forms validate, then open the visitor's email app. Connect Supabase/Resend and a newsletter tool (see PRD section 8) for real storage.
- Case-study narrative is drafted from the PRD's public LinkedIn facts. Oluwaseun must approve every claim, metric and logo before launch.
- Insights cards are seed topics; full articles still to be written.
