import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { InquiryBand, PageHero, Reveal, SectionHeading, Seo } from '../components/UI';
import { commodities } from '../data/catalog';

export function Commodities() {
  return (
    <>
      <Seo title="Agricultural Commodities | KKGT" description="Explore KKGT’s agricultural commodity export offering including sesame, soybeans, mung beans, chickpeas, white beans and red kidney beans." />
      <PageHero eyebrow="AGRICULTURAL COMMODITIES" title="From Ethiopian producers" accent="to demanding markets." copy="KKGT’s commodity portfolio is presented by product so buyers can ask for current specifications, volume and packing without relying on generic claims." image="https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=2000&q=88" />

      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="EXPORT PORTFOLIO" title="Clear products." accent="Clear inquiry paths." copy="The catalogue below reflects commodity names already represented in KKGT’s public materials. Technical specifications remain buyer-request driven until current data is confirmed." /></Reveal>
          <div className="commodity-card-grid">
            {commodities.map((commodity, index) => (
              <Reveal key={commodity.slug} delay={index * .04}>
                <Link className="commodity-card" to={`/commodities/${commodity.slug}`}>
                  <div className="commodity-card__media" style={{ backgroundImage: `url(${commodity.image})` }} />
                  <div className="commodity-card__body"><span>0{index + 1} / {commodity.family.toUpperCase()}</span><h3>{commodity.name}</h3><p>{commodity.summary}</p><div>View commodity <ArrowUpRight size={17} /></div></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container buyer-checklist">
          <Reveal><span className="eyebrow">BUYER-FIRST INFORMATION</span><h2>The next useful detail is the one the <em>buyer actually needs.</em></h2></Reveal>
          <Reveal delay={.08} className="buyer-checklist__items">
            {['Product & crop year', 'Required grade / quality standard', 'Target volume', 'Packing requirement', 'Destination / incoterm', 'Required certificates'].map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}
          </Reveal>
        </div>
      </section>

      <InquiryBand title="Send KKGT your commodity requirement." copy="Include the product, target specification, volume, packing and destination. The website is structured to support a commercial response rather than a generic product brochure." />
    </>
  );
}

export function CommodityDetail() {
  const { slug } = useParams();
  const commodity = commodities.find((item) => item.slug === slug);
  if (!commodity) return <div className="section container"><h1>Commodity not found.</h1><Link to="/commodities">Back to commodities</Link></div>;

  return (
    <>
      <Seo title={`${commodity.name} Export | KKGT`} description={`${commodity.name} is part of KKGT’s agricultural commodity export offering from Ethiopia.`} />
      <PageHero eyebrow={commodity.family.toUpperCase()} title={commodity.name} accent="Export" copy={commodity.summary} image={commodity.image} />
      <section className="section section--paper">
        <div className="container detail-layout">
          <Reveal className="detail-sidebar"><Link to="/commodities" className="back-link"><ArrowLeft size={16} /> All commodities</Link><span className="eyebrow">COMMERCIAL DATA</span></Reveal>
          <Reveal className="detail-copy" delay={.08}>
            <h2>Built for current <em>commercial specifications.</em></h2>
            <p>This product page is ready for KKGT’s confirmed quality and shipment data. No purity, moisture, grade, crop-year or packing claims are invented.</p>
            <div className="spec-placeholder-grid">
              {['Grade / standard', 'Purity', 'Moisture', 'Crop year', 'Packing', 'Available volume'].map((label) => <div key={label}><span>{label}</span><strong>Confirm with KKGT</strong></div>)}
            </div>
            <Link to={`/contact?interest=commodity&product=${encodeURIComponent(commodity.name)}`} className="button button--green">Request a quotation <ArrowUpRight size={17} /></Link>
          </Reveal>
        </div>
      </section>
      <InquiryBand title={`Ask KKGT about ${commodity.name}.`} />
    </>
  );
}
