import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { InquiryBand, PageHero, Reveal, SectionHeading, Seo } from '../components/UI';
import { coffeeOrigins } from '../data/catalog';

export function Coffee() {
  return (
    <>
      <Seo title="Ethiopian Coffee Export | KKGT" description="Explore KKGT’s Ethiopian coffee export offering across Yirgacheffe, Sidama, Limmu, Jimma/Djimmah and Lekempti origins." />
      <PageHero eyebrow="COFFEE EXPORT" title="Born in Ethiopia." accent="Presented by origin." copy="KKGT’s coffee experience is structured around Ethiopian producing origins, clear buyer inquiries and verified commercial information." image="https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=2000&q=88" />

      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="COFFEE ORIGINS" title="Five origins in KKGT’s" accent="public coffee offering." copy="Each origin has a dedicated route so current grades, crop year, processing method and availability can be added later without rebuilding the site." /></Reveal>
          <div className="origin-card-grid">
            {coffeeOrigins.map((origin, index) => (
              <Reveal key={origin.slug} delay={index * .05}>
                <Link className="origin-card" to={`/coffee/${origin.slug}`}>
                  <div className="origin-card__media" style={{ backgroundImage: `url(${origin.image})` }} />
                  <div className="origin-card__content"><span>0{index + 1} / ETHIOPIA</span><h3>{origin.name}</h3><p>{origin.summary}</p><div>Explore origin <ArrowUpRight size={17} /></div></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal><SectionHeading dark eyebrow="FROM ORIGIN TO EXPORT" title="A buyer-facing" accent="coffee journey." /></Reveal>
          <div className="process-grid process-grid--dark">
            {[
              ['01', 'Source', 'Coordinate origin and supplier relationships.'],
              ['02', 'Prepare', 'Align processing and preparation with the commercial requirement.'],
              ['03', 'Quality', 'Verify the information and controls that matter to the shipment.'],
              ['04', 'Offer', 'Present confirmed availability and commercial details to buyers.'],
              ['05', 'Export', 'Coordinate documentation and shipment requirements.'],
            ].map(([no, title, copy]) => <Reveal className="process-card" key={no}><span>{no}</span><strong>{title}</strong><p>{copy}</p></Reveal>)}
          </div>
        </div>
      </section>

      <InquiryBand title="Looking for Ethiopian green coffee?" copy="Send the origin, grade, processing method, volume and destination you are looking for. KKGT can respond with current confirmed availability." />
    </>
  );
}

export function CoffeeOrigin() {
  const { slug } = useParams();
  const origin = coffeeOrigins.find((item) => item.slug === slug);

  if (!origin) {
    return <div className="section container"><h1>Origin not found.</h1><Link to="/coffee">Back to coffee</Link></div>;
  }

  return (
    <>
      <Seo title={`${origin.name} Coffee | KKGT`} description={`${origin.name} is one of the Ethiopian coffee origins represented in KKGT’s public export offering.`} />
      <PageHero eyebrow="ETHIOPIAN COFFEE ORIGIN" title={origin.name} accent="Coffee" copy={origin.summary} image={origin.image} />
      <section className="section section--paper">
        <div className="container detail-layout">
          <Reveal className="detail-sidebar"><Link to="/coffee" className="back-link"><ArrowLeft size={16} /> All coffee origins</Link><span className="eyebrow">BUYER INFORMATION</span></Reveal>
          <Reveal className="detail-copy" delay={.08}>
            <h2>Commercial details should be <em>current, not assumed.</em></h2>
            <p>KKGT’s previous public website identifies {origin.name} as part of its coffee offering. This React page is ready for current buyer-facing data once KKGT confirms it.</p>
            <div className="spec-placeholder-grid">
              {['Current grade', 'Processing method', 'Crop year', 'Available volume', 'Packing', 'Certifications'].map((label) => <div key={label}><span>{label}</span><strong>Confirm with KKGT</strong></div>)}
            </div>
            <p className="data-note">This intentionally avoids publishing flavor notes, altitude, grade, moisture, screen size or certification details that have not been verified from current company records.</p>
            <Link to={`/contact?interest=coffee&origin=${encodeURIComponent(origin.name)}`} className="button button--green">Request current availability <ArrowUpRight size={17} /></Link>
          </Reveal>
        </div>
      </section>
      <InquiryBand title={`Ask KKGT about ${origin.name}.`} />
    </>
  );
}
