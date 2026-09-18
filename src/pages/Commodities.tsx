import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { InquiryBand, PageHero, Reveal, SectionHeading, Seo } from '../components/UI';
import { commodities } from '../data/catalog';

export function Commodities() {
  return (
    <>
      <Seo title="Agricultural Commodities Export | KKGT" description="Explore KKGT’s agricultural commodity export offering including sesame, soybeans, mung beans, chickpeas, white beans and red kidney beans from Ethiopia." />
      <PageHero eyebrow="AGRICULTURAL COMMODITIES" title="From Ethiopian producers" accent="to demanding markets." copy="KKGT’s commodity portfolio is presented with clear export specifications so international buyers can procure with confidence on purity, moisture, and container packing." image="https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=2000&q=88" />

      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="EXPORT PORTFOLIO" title="Verified specifications." accent="Reliable container shipments." copy="Export-ready Ethiopian oilseeds and pulses sorted, cleaned, and packed to international commercial standards." /></Reveal>
          <div className="commodity-card-grid">
            {commodities.map((commodity, index) => (
              <Reveal key={commodity.slug} delay={index * .04}>
                <Link className="commodity-card" to={`/commodities/${commodity.slug}`}>
                  <div className="commodity-card__media" style={{ backgroundImage: `url(${commodity.image})` }} />
                  <div className="commodity-card__body">
                    <span>0{index + 1} / {commodity.family.toUpperCase()}</span>
                    <h3>{commodity.name}</h3>
                    <p>{commodity.summary}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px', fontSize: '12px', color: 'var(--muted)', marginTop: '12px' }}>
                      <span><strong>Origin:</strong> {commodity.origin}</span>
                      <span><strong>Purity:</strong> {commodity.purity}</span>
                    </div>
                    <div>View commodity specs <ArrowUpRight size={17} /></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container buyer-checklist">
          <Reveal><span className="eyebrow">BUYER-FIRST SPECIFICATIONS</span><h2>The essential trade parameters <em>every importer requires.</em></h2></Reveal>
          <Reveal delay={.08} className="buyer-checklist__items">
            {['Product & crop year', 'Required purity & Sortex standard', 'Target volume (MT / FCL)', 'Packing (50kg PP / bulk bags)', 'Destination port & Incoterm (FOB/CIF)', 'Inspection certificates (SGS / Phytosanitary)'].map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}
          </Reveal>
        </div>
      </section>

      <InquiryBand title="Send KKGT your commodity requirement." copy="Include the target commodity, volume, packing, and destination port. KKGT responds promptly with current market availability and proforma pricing." />
    </>
  );
}

export function CommodityDetail() {
  const { slug } = useParams();
  const commodity = commodities.find((item) => item.slug === slug);
  if (!commodity) return <div className="section container"><h1>Commodity not found.</h1><Link to="/commodities">Back to commodities</Link></div>;

  return (
    <>
      <Seo title={`${commodity.name} Export Specifications | KKGT`} description={`${commodity.name} export specifications from Ethiopia: origin, purity, moisture, and container packaging.`} />
      <PageHero eyebrow={commodity.family.toUpperCase()} title={commodity.name} accent="Export Specs" copy={commodity.summary} image={commodity.image} />
      <section className="section section--paper">
        <div className="container detail-layout">
          <Reveal className="detail-sidebar">
            <Link to="/commodities" className="back-link"><ArrowLeft size={16} /> All commodities</Link>
            <span className="eyebrow">COMMERCIAL EXPORT DATA</span>
            <div style={{ background: 'var(--cream)', padding: '16px', borderRadius: '12px', marginTop: '16px' }}>
              <strong style={{ fontSize: '13px', display: 'block', marginBottom: '6px' }}>Standard Logistics</strong>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>FOB Djibouti or CIF worldwide. Shipped in 20ft (approx. 18–19 MT) or 40ft containers with moisture-barrier protection.</p>
            </div>
          </Reveal>
          <Reveal className="detail-copy" delay={.08}>
            <h2>Export Grade <em>Commercial Specifications.</em></h2>
            <p>Export-ready Ethiopian agricultural commodities cleaned, graded, and packed to international buyer requirements with strict SGS / ECTA quality supervision.</p>
            <div className="spec-placeholder-grid">
              <div><span>Origin / Growing Region</span><strong>{commodity.origin}</strong></div>
              <div><span>Purity Standard</span><strong>{commodity.purity}</strong></div>
              <div><span>Moisture Content</span><strong>{commodity.moisture}</strong></div>
              <div><span>Packaging Standard</span><strong>{commodity.packaging}</strong></div>
              <div><span>Physical Specifications</span><strong>{commodity.specification}</strong></div>
              <div><span>Quality Assurance & Inspection</span><strong>SGS / ECTA / Phytosanitary Certified</strong></div>
            </div>
            <div className="detail-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <Link to={`/contact?interest=commodity&product=${encodeURIComponent(commodity.name)}`} className="button button--green">Request Commercial Quotation <ArrowUpRight size={17} /></Link>
              <a href={`https://wa.me/251991828202?text=${encodeURIComponent(`Hello KKGT, I am inquiring about export quotation and specs for ${commodity.name}.`)}`} target="_blank" rel="noreferrer" className="button button--outline">WhatsApp Trade Desk <ArrowUpRight size={17} /></a>
            </div>
          </Reveal>
        </div>
      </section>
      <InquiryBand title={`Request formal quotation for ${commodity.name}.`} copy="Specify target volume, required Incoterms (FOB Djibouti / CIF), target packing and destination port for an expedited proforma quotation." />
    </>
  );
}
