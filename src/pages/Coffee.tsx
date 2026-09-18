import { ArrowLeft, ArrowUpRight, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Reveal, Seo } from '../components/UI';
import { coffeeOrigins } from '../data/catalog';

const COFFEE_FOREST_IMAGE = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2200&q=90';
const COFFEE_CHERRIES_IMAGE = 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&w=2200&q=90';
const COFFEE_GREEN_IMAGE = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=90';
const COFFEE_DRYING_IMAGE = 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=2200&q=90';

const originStories = {
  yirgacheffe: {
    number: '01',
    region: 'Gedeo area · Southern Ethiopia',
    short: 'A globally recognized Ethiopian coffee name with a story rooted in the highlands around Yirgacheffe.',
    title: 'A highland coffee story from southern Ethiopia.',
    landscape: 'Yirgacheffe is associated with the coffee-growing landscapes of the Gedeo area in southern Ethiopia. Its name has become one of the best-known references in Ethiopian specialty coffee.',
    people: 'The origin story is inseparable from producing communities, local processing and the careful movement of coffee from cherry to prepared green coffee.',
    trade: 'For KKGT buyers, origin is the beginning of the conversation. Current grade, processing method, crop year, available volume, packing and certification status are confirmed for the specific lot being offered.',
    secondaryImage: COFFEE_DRYING_IMAGE,
    mapLabel: 'South',
  },
  sidama: {
    number: '02',
    region: 'Sidama · Southern Ethiopia',
    short: 'A major coffee-producing area in southern Ethiopia with a deep connection between coffee, agriculture and community.',
    title: 'Coffee woven into the landscape of Sidama.',
    landscape: 'Sidama is one of Ethiopia’s important coffee-producing areas. Coffee grows within a diverse agricultural landscape where household farming and long-standing local knowledge shape production.',
    people: 'The story of Sidama coffee is also a story of families, communities and local trade networks that connect farms to processing and market channels.',
    trade: 'KKGT presents Sidama as an origin, while commercial specifications remain lot-specific. Buyers can request current information instead of relying on generic assumptions.',
    secondaryImage: COFFEE_CHERRIES_IMAGE,
    mapLabel: 'South',
  },
  limmu: {
    number: '03',
    region: 'Limmu · Western Ethiopia',
    short: 'A western Ethiopian coffee origin presented through place, preparation and buyer requirements.',
    title: 'From western Ethiopia to a buyer-ready coffee lot.',
    landscape: 'Limmu is associated with the green coffee-producing landscapes of western Ethiopia. The origin belongs to a broader western coffee belt with long agricultural and trading traditions.',
    people: 'Coffee moves through a chain of producers, local collection and preparation before it becomes an export-ready commercial lot.',
    trade: 'KKGT’s role is to connect that origin story with verified current information: what is available now, how it was prepared, and what the buyer requires for shipment.',
    secondaryImage: COFFEE_FOREST_IMAGE,
    mapLabel: 'West',
  },
  jimma: {
    number: '04',
    region: 'Jimma · Southwestern Ethiopia',
    short: 'A historic coffee-producing area in southwestern Ethiopia and part of KKGT’s public origin portfolio.',
    title: 'A coffee landscape with deep roots in southwestern Ethiopia.',
    landscape: 'Jimma is widely associated with Ethiopia’s southwestern coffee country. Coffee production and trade have long been part of the identity and economy of the area.',
    people: 'The coffee story here is not a single farm or single profile. It is a broad regional story built from producers, local handling, processing and trade.',
    trade: 'For commercial offers, KKGT keeps the distinction clear: the origin name tells where the conversation starts; the actual lot data tells the buyer what is being offered.',
    secondaryImage: COFFEE_GREEN_IMAGE,
    mapLabel: 'Southwest',
  },
  lekempti: {
    number: '05',
    region: 'Western Oromia · Ethiopia',
    short: 'A western Ethiopian coffee origin connected with the Nekemte/Lekempti trading area.',
    title: 'Western Ethiopia, presented through an origin-first story.',
    landscape: 'Lekempti is a coffee trade name associated with western Ethiopia and the wider Nekemte area. It represents another distinct geographical route within Ethiopia’s coffee landscape.',
    people: 'Coffee from western areas moves through relationships among producers, suppliers, processors and traders before reaching export channels.',
    trade: 'KKGT can present current lots by origin while verifying the commercial details that matter to a buyer before an offer is treated as final.',
    secondaryImage: COFFEE_DRYING_IMAGE,
    mapLabel: 'West',
  },
} as const;

export function CoffeeOrigin() {
  const { slug } = useParams();
  const origin = coffeeOrigins.find((item) => item.slug === slug);
  const story = origin ? originStories[origin.slug as keyof typeof originStories] : undefined;

  if (!origin || !story) {
    return (
      <div className="section container">
        <h1>Origin not found.</h1>
        <Link to="/coffee" className="button button--orange" style={{ marginTop: '20px' }}>Back to Coffee Export</Link>
      </div>
    );
  }

  const currentIndex = coffeeOrigins.findIndex((item) => item.slug === origin.slug);
  const nextOrigin = coffeeOrigins[(currentIndex + 1) % coffeeOrigins.length];
  const nextStory = originStories[nextOrigin.slug as keyof typeof originStories];

  return (
    <>
      <Seo
        title={`${origin.name} Coffee | Ethiopian Green Coffee Export | KKGT`}
        description={`Source verified ${origin.name} Ethiopian Arabica green coffee. ${origin.summary} Altitude: ${origin.altitude}, Grades: ${origin.grades}.`}
      />

      <section className="coffee-origin-hero">
        <div className="coffee-origin-hero__media" aria-hidden="true">
          <img src={origin.image} alt="" loading="eager" decoding="async" fetchPriority="high" />
          <div className="coffee-origin-hero__scrim" />
        </div>
        <div className="container coffee-origin-hero__content">
          <Link to="/coffee#origins" className="coffee-origin-hero__back"><ArrowLeft size={16} /> All coffee origins</Link>
          <div>
            <span>{story.number} / ETHIOPIAN ORIGIN</span>
            <h1>{origin.name}</h1>
            <p>{story.title}</p>
          </div>
          <div className="coffee-origin-hero__place"><MapPin size={17} aria-hidden="true" /><span>{story.region} · {origin.altitude}</span></div>
        </div>
      </section>

      {/* Origin Profile & Cupping Notes */}
      <section className="coffee-origin-intro">
        <div className="container coffee-origin-intro__layout">
          <Reveal>
            <span>CUP PROFILE &amp; ORIGIN TRAITS</span>
            <h2>Sensory character.<br /><em>Highland terroir.</em></h2>
            <div className="cup-tags" style={{ marginTop: '20px' }}>
              {origin.cupProfile.map((tag) => <span key={tag} className="cup-tag">{tag}</span>)}
            </div>
          </Reveal>
          <Reveal className="coffee-origin-intro__copy" delay={.08}>
            <p className="coffee-origin-intro__lead">{origin.summary}</p>
            <p>{story.landscape}</p>

            <div className="origin-stat-row" style={{ marginTop: '24px' }}>
              <div><span>Altitude</span><strong>{origin.altitude}</strong></div>
              <div><span>Processing</span><strong>{origin.processing}</strong></div>
              <div><span>Available Grades</span><strong>{origin.grades}</strong></div>
              <div><span>Harvest Season</span><strong>{origin.harvestPeriod}</strong></div>
              <div><span>Acidity</span><strong>{origin.acidity}</strong></div>
              <div><span>Body</span><strong>{origin.body}</strong></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* People & Origin Culture */}
      <section className="coffee-origin-editorial">
        <div className="container coffee-origin-editorial__grid">
          <Reveal className="coffee-origin-editorial__media"><img src={story.secondaryImage} alt="" loading="lazy" decoding="async" /></Reveal>
          <Reveal className="coffee-origin-editorial__copy" delay={.08}>
            <span>COFFEE &amp; COMMUNITY</span>
            <h2>The origin is also a <em>human story.</em></h2>
            <p>{story.people}</p>
            <div className="coffee-origin-editorial__marker"><i /><span>{story.mapLabel} · Ethiopia</span></div>
          </Reveal>
        </div>
      </section>

      {/* Commercial Export Specifications */}
      <section className="coffee-origin-trade">
        <div className="container coffee-origin-trade__layout">
          <Reveal className="coffee-origin-trade__copy">
            <span>EXPORT SPECIFICATIONS</span>
            <h2>Trade-ready lots.<br /><em>Verified commercial parameters.</em></h2>
            <p>Every commercial contract for {origin.name} green coffee is backed by clear physical parameters and certified export documentation.</p>
          </Reveal>

          <Reveal className="coffee-origin-specs" delay={.08}>
            <div><span>Packaging</span><strong>60kg Jute with GrainPro liner</strong></div>
            <div><span>FCL Capacity</span><strong>320 Bags / 19.2 MT (20ft FCL)</strong></div>
            <div><span>Moisture Content</span><strong>10.5% – 11.5% at dispatch</strong></div>
            <div><span>Water Activity</span><strong>&lt; 0.70 a_w</strong></div>
            <div><span>Incoterms</span><strong>FOB Djibouti / CIF Global Ports</strong></div>
            <div><span>Certifications</span><strong>ECTA Origin, Phytosanitary, ICO</strong></div>
          </Reveal>
        </div>
      </section>

      {/* Buyer CTA */}
      <section className="coffee-origin-inquiry">
        <div className="container coffee-origin-inquiry__layout">
          <Reveal>
            <span>BUYER INQUIRY · {origin.name.toUpperCase()}</span>
            <h2>Request a sample or <em>commercial quotation.</em></h2>
            <p>Tell KKGT your target grade (Specialty Grade 1/2 or Commercial Grade 4/5), processing method, bag quantity, and destination port. Pre-shipment samples (PSS) can be dispatched via air courier.</p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '24px' }}>
              <Link to={`/contact?interest=sample&origin=${encodeURIComponent(origin.name)}`} className="button button--orange">Request Coffee Sample (PSS) <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <Link to={`/contact?interest=coffee&origin=${encodeURIComponent(origin.name)}`} className="button button--outline">Request Commercial Quotation <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next Origin */}
      <Link to={`/coffee/${nextOrigin.slug}`} className="coffee-origin-next">
        <div className="coffee-origin-next__media" aria-hidden="true"><img src={nextOrigin.image} alt="" loading="lazy" decoding="async" /></div>
        <div className="coffee-origin-next__scrim" />
        <div className="container coffee-origin-next__content">
          <span>NEXT ORIGIN · {nextStory.number}</span>
          <h2>{nextOrigin.name}</h2>
          <div>Continue the coffee story <ArrowUpRight size={20} aria-hidden="true" /></div>
        </div>
      </Link>
    </>
  );
}
