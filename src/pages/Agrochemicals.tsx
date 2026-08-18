import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Search, ShieldAlert } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { InquiryBand, PageHero, ProductCard, Reveal, SectionHeading, Seo } from '../components/UI';
import { agroProducts, type ProductCategory } from '../data/catalog';

const filters: Array<'All' | ProductCategory> = ['All', 'Fungicide', 'Herbicide', 'Insecticide', 'To confirm'];

export function Agrochemicals({ initialCategory = 'All' }: { initialCategory?: 'All' | ProductCategory }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>(initialCategory);

  const products = useMemo(() => agroProducts.filter((product) => {
    const matchesText = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = filter === 'All' || product.category === filter;
    return matchesText && matchesCategory;
  }), [query, filter]);

  const pageTitle = initialCategory === 'All' ? 'Crop protection' : `${initialCategory}s`;
  const pageAccent = initialCategory === 'All' ? 'without guesswork.' : 'from KKGT.';

  return (
    <>
      <Seo title={`${initialCategory === 'All' ? 'Agrochemicals & Crop Protection' : `${initialCategory}s`} | KKGT`} description="Browse KKGT’s crop-protection catalogue with search and category filters. Technical claims are displayed only when verified from current product labels." />
      <PageHero eyebrow="AGROCHEMICALS" title={pageTitle} accent={pageAccent} copy="A professional catalogue should help customers find products quickly while keeping regulated product claims tied to verified labels and current company records." image="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2000&q=88" />

      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="PRODUCT DISCOVERY" title="Search the catalogue." accent="Filter by verified category." copy="Names below were recovered from KKGT’s existing public catalogue. Six products were also publicly grouped under fungicides; other categories remain unassigned until labels are confirmed." /></Reveal>
          <Reveal className="catalog-tools">
            <label className="catalog-search"><Search size={18} aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search product name" aria-label="Search agrochemical products" /></label>
            <div className="filter-tabs" role="group" aria-label="Product category filters">
              {filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}
            </div>
          </Reveal>
          <div className="product-grid">
            {products.map((product, index) => <Reveal key={product.slug} delay={(index % 4) * .03}><ProductCard product={product} /></Reveal>)}
          </div>
          {products.length === 0 ? <div className="empty-state"><strong>No safely verified products in this category yet.</strong><p>KKGT can assign products here as soon as current labels and category information are confirmed.</p></div> : null}
        </div>
      </section>

      <section className="section section--cream">
        <div className="container solution-grid">
          <Reveal><span className="eyebrow">FIND BY FARMING NEED</span><h2>A catalogue designed around <em>the problem being solved.</em></h2><p>Once label data is confirmed, products can also be filtered by crop, weed, disease, insect, active ingredient and formulation.</p></Reveal>
          <Reveal className="solution-list" delay={.08}>
            <Link to="/agrochemicals/herbicides"><span>01</span><strong>Weed control</strong><p>Herbicides</p><ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link to="/agrochemicals/fungicides"><span>02</span><strong>Disease control</strong><p>Fungicides</p><ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link to="/agrochemicals/insecticides"><span>03</span><strong>Insect control</strong><p>Insecticides</p><ArrowUpRight size={18} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <InquiryBand title="Need help identifying the right KKGT product?" copy="Send the crop, problem and product name if known. Technical recommendations should always be confirmed against the approved label and qualified local guidance." />
    </>
  );
}

export function ProductDetail() {
  const { slug } = useParams();
  const product = agroProducts.find((item) => item.slug === slug);
  if (!product) return <div className="section container"><h1>Product not found.</h1><Link to="/agrochemicals">Back to catalogue</Link></div>;

  const verified = product.verification === 'category-verified';
  return (
    <>
      <Seo title={`${product.name} | KKGT Agrochemicals`} description={`${product.name} is listed in KKGT’s public agrochemical catalogue. Technical product details are published only after verification from approved labels.`} />
      <section className="product-hero">
        <div className="container product-hero__grid">
          <Reveal className="product-hero__visual"><div className="product-monogram">{product.name.slice(0, 2).toUpperCase()}</div><span>KKGT PRODUCT CATALOGUE</span></Reveal>
          <Reveal className="product-hero__copy" delay={.08}>
            <Link to="/agrochemicals" className="back-link back-link--light"><ArrowLeft size={16} aria-hidden="true" /> All agrochemicals</Link>
            <span className={`category-chip ${verified ? 'verified' : 'pending'}`}>{product.category}</span>
            <h1>{product.name}</h1>
            <p>{verified ? 'The product name and fungicide category are represented on KKGT’s existing public site. Technical details still require current label confirmation.' : 'The product name is represented in KKGT’s existing public catalogue. Category and technical details require current label confirmation.'}</p>
            <Link to={`/contact?interest=agrochemical&product=${encodeURIComponent(product.name)}`} className="button button--orange">Ask about this product <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container detail-layout">
          <Reveal className="detail-sidebar"><span className="eyebrow">TECHNICAL INFORMATION</span></Reveal>
          <Reveal className="detail-copy" delay={.08}>
            <h2>Technical claims stay hidden until <em>the label is verified.</em></h2>
            <div className="spec-placeholder-grid">
              {['Active ingredient', 'Formulation', 'Registered crop', 'Target pest / weed / disease', 'Application rate', 'Registration details', 'PPE / safety', 'PHI / REI'].map((label) => <div key={label}><span>{label}</span><strong>Awaiting approved label</strong></div>)}
            </div>
            <div className="safety-note"><ShieldAlert size={22} aria-hidden="true" /><div><strong>Product safety rule</strong><p>Do not use this page as an application instruction. Rates, crops, targets and safety requirements must come from the current approved product label and applicable Ethiopian requirements.</p></div></div>
          </Reveal>
        </div>
      </section>
      <InquiryBand title={`Request current information for ${product.name}.`} />
    </>
  );
}
