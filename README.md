# KKGT Import Export Website

Static multi-page corporate website for **Kelbesa Kekeba General Trading (KKGT Import Export)**.

## Pages

- `index.html` — corporate homepage
- `about.html` — company profile, values, mission and leadership
- `coffee.html` — Ethiopian coffee export and listed origins
- `commodities.html` — sesame, soybeans, pulses and beans
- `products.html` — searchable/filterable agrochemical catalogue
- `product.html?id=<product-id>` — dynamic product-detail view
- `trading.html` — agricultural inputs, stationery and construction materials
- `contact.html` — business inquiry form that prepares an email
- `data/products.js` — verified/partially verified product inventory used by catalogue
- `styles.css` / `script.js` — shared design system and interactions

## Brand

Primary green: `#126433`  
Primary orange: `#f06721`

The company logo is stored in `assets/kkgt-logo.svg`.

## Data handling

The site is intentionally conservative with claims:

- It does **not** include the old site's unverified statistics or testimonials.
- Agrochemical application rates, crop uses, registration details and safety instructions are not invented.
- Product names and category information are taken from KKGT's currently published website where available.
- The contact form is static and does not store user data; it opens the visitor's email app.

## Company information represented

Based on KKGT's current published website:

- Established: 1999 EC
- Export: Ethiopian Arabica coffee, sesame, soybeans, beans and pulses
- Coffee origins listed: Yirgacheffe, Sidama, Limmu, Jimma/Djimmah, Lekempti
- Import/distribution: agrochemicals/agricultural inputs, stationery and construction materials
- Guiding principle: Quality, Integrity, Innovation
- Motto: We Cultivate Ideas for Growth

## Important pre-launch verification

Before replacing the production website, KKGT should confirm:

1. Exact legal spelling of company and leadership names
2. Current phone numbers and office address
3. Current product list, approved product images, labels and technical sheets
4. Current pesticide registration details and permitted label claims
5. Any certifications/awards to be published
6. Social media URLs

## SEO and accessibility

The repository includes:

- page-specific titles and meta descriptions
- canonical URLs
- organization structured data on the homepage
- `robots.txt`
- `sitemap.xml`
- keyboard focus states
- skip navigation
- reduced-motion support
- responsive mobile navigation

## Deployment

No deployment workflow is included. Changes are kept in this GitHub repository only unless deployment is explicitly requested.
