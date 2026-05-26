# Dispnsary – Full Next.js Clone

Complete Next.js (App Router) port of the [Dispnsary medical theme demo](https://demo.awaikenthemes.com/dispnsary/). The original HTTrack folder (`../impac`) is **never modified**.

## Pages included (33 routes)

All pages are crawled from the live WordPress demo and rendered as static HTML bodies with original CSS, JS, GSAP, Elementor, and ElementsKit behavior.

| Route | Description |
|-------|-------------|
| `/` | Home – Main |
| `/home-image`, `/home-video`, `/home-slider` | Home variants |
| `/about-us`, `/services`, `/blog`, `/contact-us`, `/appointment`, `/faqs` | Core pages |
| `/services/*` | Service detail pages (urology, neurology, pharmacy, etc.) |
| `/our-team`, `/our-team/dr-*` | Team listing and doctor profiles |
| `/image-gallery`, `/video-gallery` | Media galleries |
| `/research-breakthrough-…` (+ 5 more) | Blog posts |

## Architecture

- **`scripts/crawl-full-site.mjs`** – Downloads every page HTML, assets, Elementor webpack bundles, builds `pages-manifest.json` and `src/content/bodies/*.html`
- **`scripts/postprocess-manifest.mjs`** – Normalizes Elementor config URLs and builds global stylesheet list
- **`app/[[...slug]]/page.tsx`** – Catch-all static routes for every page
- **`WordPressPage`** – Full `<body>` HTML clone with per-page `body` classes and Elementor config
- **`public/vendor`** + **`public/assets`** – Local mirrors of plugins, theme, and uploads

## Commands

```bash
npm install

# Re-crawl entire site from demo (after changing source)
node scripts/crawl-full-site.mjs
node scripts/postprocess-manifest.mjs

npm run dev      # http://localhost:3000
npm run build
npm start
```

## Original project note

The `../impac` folder only contained a single HTTrack homepage. The **full site** is sourced from `demo.awaikenthemes.com` during crawl and stored under `dispnsary-next/mirror/` and `src/content/bodies/`.
