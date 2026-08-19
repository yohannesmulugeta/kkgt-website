import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Search, ShieldAlert } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getAgroProductImageStyle, InquiryBand, PageHero, ProductCard, Reveal, SectionHeading, Seo } from '../components/UI';
import { agroProducts, type ProductCategory } from '../data/productCatalog';

const filters: Array<'All' | ProductCategory> = ['All', 'Herbicide', 'Fungicide', 'Insecticide'];

export function Agrochemicals({ initialCategory = 'All' }: { initialCategory?: 'All' | ProductCategory }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>(initialCategory);

  const products = useMemo(() => agroProducts.filter((product) => {
    const searchText = `${product.name} ${product.activeIngredient} ${product.description}`.toLowerCase();
    const matchesText = searchText.includes(query.toLowerCase());
    const matchesCategory = filter === 'All' || product.category === filter;
    return matchesText && matchesCategory;
  }), [query, filter]);

  const pageTitle = initialCategory === 'All' ? 'Crop protection' : `${initialCategory}s`;
  const pageAccent = initialCategory === 'All' ? 'from the 2026 catalogue.' : 'with verified catalogue content.';

  return (
    <>
      <Seo title={`${initialCategory === 'All' ? 'Agrochemicals & Crop Protection' : `${initialCategory}s`} | KKGT`} description="Browse KKGT crop-protection products that have both a visible product image and an English product description in the supplied 2026 catalogue." />
      <PageHero eyebrow="AGROCHEMICALS" title={pageTitle} accent={pageAccent} copy="This catalogue publishes only products supported by both a visible product image and an English description in KKGT’s supplied 2026 Product Catalogue." image="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2000&q=88" />

      <section className="section section--paper">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="2026 PRODUCT CATALOGUE"
              title={`${agroProducts.length} products with real catalogue images.`}
              accent="No image, no listing."
              copy="Products with a blank image area in the supplied catalogue are intentionally excluded. Search by product name, active ingredient or description."
            />
          </Reveal>
          <Reveal className="catalog-tools">
            <label className="catalog-search"><Search size={18} aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, active ingredient or use" aria-label="Search agrochemical products" /></label>
            <div className="filter-tabs" role="group" aria-label="Product category filters">
              {filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}
            </div>
          </Reveal>
          <div className="product-grid">
            {products.map((product, index) => <Reveal key={product.slug} delay={(index % 4) * .03}><ProductCard product={product} /></Reveal>)}
          </div>
          {products.length === 0 ? <div className="empty-state"><strong>No matching catalogue product.</strong><p>Try another product name, active ingredient or category.</p></div> : null}
        </div>
      </section>

      <section className="section section--cream">
        <div className="container solution-grid">
          <Reveal><span className="eyebrow">FIND BY FARMING NEED</span><h2>Start with the <em>product category.</em></h2><p>Use the catalogue descriptions as a discovery guide. Application instructions, rates and safety requirements must still be checked against the current approved label.</p></Reveal>
          <Reveal className="solution-list" delay={.08}>
            <Link to="/agrochemicals/herbicides"><span>01</span><strong>Weed control</strong><p>Herbicides</p><ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link to="/agrochemicals/fungicides"><span>02</span><strong>Disease control</strong><p>Fungicides</p><ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link to="/agrochemicals/insecticides"><span>03</span><strong>Insect control</strong><p>Insecticides</p><ArrowUpRight size={18} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <InquiryBand title="Need current information about a KKGT product?" copy="Choose a product and send your inquiry. Application rates, registration details and safety instructions should always be confirmed from the current approved label." />
    </>
  );
}

export function ProductDetail() {
  const { slug } = useParams();
  const product = agroProducts.find((item) => item.slug === slug);
  if (!product) return <div className="section container"><h1>Product not found.</h1><Link to="/agrochemicals">Back to catalogue</Link></div>;

  return (
    <>
      <Seo title={`${product.name} | KKGT Agrochemicals`} description={product.description} />
      <section className="product-hero product-hero--catalogue">
        <div className="container product-hero__grid">
          <Reveal className="product-hero__visual product-hero__visual--catalogue">
            <div className="product-hero__catalog-image" style={getAgroProductImageStyle(product)} role="img" aria-label={`${product.name} product image from KKGT 2026 catalogue`} />
            <span>KKGT 2026 PRODUCT CATALOGUE · #{String(product.catalogNumber).padStart(2, '0')}</span>
          </Reveal>
          <Reveal className="product-hero__copy" delay={.08}>
            <Link to="/agrochemicals" className="back-link back-link--light"><ArrowLeft size={16} aria-hidden="true" /> All agrochemicals</Link>
            <div className="product-hero__chips">
              <span className="category-chip verified">{product.category}</span>
              {product.subcategory ? <span className="category-chip product-subcategory">{product.subcategory}</span> : null}
            </div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="product-hero__ingredient"><span>Active ingredient</span><strong>{product.activeIngredient}</strong></div>
            {product.provisional ? <div className="product-provisional-note">The supplied catalogue marks part of this active-ingredient statement as provisional. Confirm it against the current approved label.</div> : null}
            <Link to={`/contact?interest=agrochemical&product=${encodeURIComponent(product.name)}`} className="button button--orange">Ask about this product <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container detail-layout">
          <Reveal className="detail-sidebar"><span className="eyebrow">CATALOGUE INFORMATION</span></Reveal>
          <Reveal className="detail-copy" delay={.08}>
            <h2>Published from the supplied <em>2026 catalogue.</em></h2>
            <p>The product image, category, active ingredient and English description below are taken from the supplied KKGT catalogue. Information not shown there is not invented.</p>
            <div className="spec-placeholder-grid product-spec-grid">
              <div><span>Catalogue number</span><strong>#{String(product.catalogNumber).padStart(2, '0')}</strong></div>
              <div><span>Category</span><strong>{product.subcategory ?? product.category}</strong></div>
              <div className="product-spec-grid__wide"><span>Active ingredient</span><strong>{product.activeIngredient}</strong></div>
              <div><span>Application rate</span><strong>Confirm approved label</strong></div>
              <div><span>Registration details</span><strong>Confirm approved label</strong></div>
              <div><span>PPE / safety</span><strong>Confirm approved label</strong></div>
              <div><span>PHI / REI</span><strong>Confirm approved label</strong></div>
            </div>
            <div className="safety-note"><ShieldAlert size={22} aria-hidden="true" /><div><strong>Product safety rule</strong><p>Do not use this page as a complete application instruction. Rates, crops, targets, PPE, PHI/REI and other safety requirements must be confirmed from the current approved product label and applicable Ethiopian requirements.</p></div></div>
          </Reveal>
        </div>
      </section>
      <InquiryBand title={`Request current information for ${product.name}.`} />
    </>
  );
}
