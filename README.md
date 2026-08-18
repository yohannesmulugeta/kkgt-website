# KKGT Import Export — React Website

Professional multi-page corporate website for KKGT Import Export, rebuilt as a modern React application.

## Stack

- React 19
- Vite 8
- TypeScript
- React Router
- Framer Motion
- Lucide React
- GitHub Pages deployment workflow

## Main routes

- `/` — Home
- `/about` — Company story, mission and vision
- `/coffee` — Ethiopian coffee portfolio
- `/coffee/:slug` — Coffee origin detail
- `/commodities` — Agricultural commodities
- `/commodities/:slug` — Commodity detail
- `/agrochemicals` — Searchable crop-protection catalogue
- `/agrochemicals/product/:slug` — Product detail
- `/trading` — Import & trading
- `/quality` — Quality & operations
- `/contact` — Structured business inquiry

## Styling architecture

The production app intentionally loads only three CSS layers, in this order:

1. `src/styles.css` — original design system and component foundations
2. `src/overrides.css` — shared responsive, accessibility and UI refinements
3. `src/site.css` — current production header/menu, homepage business story, source-to-market interaction and final rendering safeguards

Do **not** re-import the older experimental files (`cinematic.css`, `interaction-fixes.css`, `business-story.css`, or the previous `fixes.css`). They are retained only as historical source because repository deletion is restricted in the current editing environment. Loading them again will recreate cascade conflicts.

The homepage business story uses four independent full-screen chapters rather than scroll hijacking or a large artificial spacer. This keeps Coffee, Agricultural Commodities, Agrochemicals and Import & Trading visually interactive while preserving normal browser scrolling.

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## GitHub Pages

The repository includes `.github/workflows/pages.yml`. The Vite base path is configured for:

`https://yohannesmulugeta.github.io/kkgt-website/`

If GitHub Pages was previously set to “Deploy from a branch”, change **Settings → Pages → Source** to **GitHub Actions**.

The deployment workflow now:

- builds the TypeScript/Vite application
- copies the supplied KKGT brand assets
- creates `dist/404.html` so direct React routes can recover on GitHub Pages
- verifies that the production bundle contains HTML, CSS, JavaScript and the KKGT logo before deployment
- uploads and deploys `dist/`

## Content integrity

The site deliberately avoids inventing regulated agrochemical data, coffee specifications, certifications, testimonials, export-market claims or company statistics. `DATA_REQUIRED.md` tracks the exact client-confirmed information still needed.

Current agrochemical data includes 14 publicly recoverable product names. Six products were also publicly grouped under fungicides on KKGT’s previous site; remaining category and technical fields stay unassigned until labels are supplied.

## Brand

Primary colors:

- KKGT green: `#0B5F35`
- KKGT orange: `#EF6A24`
- Deep green: `#062B1B`
- Warm paper: `#FBFAF6`

The original supplied KKGT logo remains in `assets/kkgt-logo.svg` and is copied into the production build by the Pages workflow.
