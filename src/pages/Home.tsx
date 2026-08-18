import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryBand, Reveal, Seo } from '../components/UI';
import { businessAreas, company } from '../data/company';
import { coffeeOrigins, commodities } from '../data/catalog';
import '../journey.css';

const RAW_COFFEE_IMAGE = 'https://images.pexels.com/photos/7125601/pexels-photo-7125601.jpeg?auto=compress&cs=tinysrgb&w=2200';
const QUALITY_IMAGE = 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1800&q=86';

const businessStories = [
  {
    index: '01',
    eyebrow: 'RAW COFFEE · EXPORT',
    title: 'Ethiopian Green Coffee',
    intro: 'The journey begins at origin and moves toward a buyer conversation built on current, confirmed commercial information.',
    to: '/coffee',
    bridge: 'The same sourcing discipline continues beyond coffee.',
    stages: [
      {
        number: '01.1',
        eyebrow: 'ORIGIN',
        title: 'It starts at origin.',
        copy: 'KKGT’s coffee story begins with Ethiopian producing origins, supplier relationships and a clear understanding of what the buyer is looking for.',
        image: RAW_COFFEE_IMAGE,
        position: 'center',
        label: 'Ethiopia · Green coffee',
      },
      {
        number: '01.2',
        eyebrow: 'PREPARE & VERIFY',
        title: 'Prepared around the requirement.',
        copy: 'Processing, handling and commercial details are coordinated around the actual requirement rather than a generic specification sheet.',
        image: coffeeOrigins[3].image,
        position: 'center',
        label: 'Preparation · Quality handling',
      },
      {
        number: '01.3',
        eyebrow: 'MARKET',
        title: 'Then the conversation moves to market.',
        copy: 'Origin, grade, processing method, volume and destination become the basis for a current export inquiry and buyer discussion.',
        image: coffeeOrigins[0].image,
        position: 'center',
        label: 'Buyer inquiry · Export',
      },
    ],
  },
  {
    index: '02',
    eyebrow: 'AGRICULTURAL COMMODITIES · EXPORT',
    title: 'Agricultural Commodities',
    intro: 'The same source-to-market thinking expands from coffee into sesame, soybeans, pulses and beans.',
    to: '/commodities',
    bridge: 'From what Ethiopia produces to what farmers and distributors need.',
    stages: [
      {
        number: '02.1',
        eyebrow: 'SOURCE',
        title: 'Start with the product and source.',
        copy: 'Commodity trading begins with the product, supplier relationships and the commercial requirement that needs to be met.',
        image: businessAreas[1].image,
        position: 'center',
        label: 'Agricultural sourcing',
      },
      {
        number: '02.2',
        eyebrow: 'AGGREGATE & HANDLE',
        title: 'Bring supply into a clear commercial lot.',
        copy: 'Product identity, quality expectations, crop year, volume and packing are brought together into information a buyer can actually evaluate.',
        image: commodities[0].image,
        position: 'center',
        label: 'Sesame · Commodity handling',
      },
      {
        number: '02.3',
        eyebrow: 'BUYER REQUIREMENT',
        title: 'Match the lot to the market need.',
        copy: 'The useful next step is a buyer-specific discussion around target specification, quantity, packing, destination and timing.',
        image: commodities[1].image,
        position: 'center',
        label: 'Commodity · Market requirement',
      },
    ],
  },
  {
    index: '03',
    eyebrow: 'IMPORT & DISTRIBUTION',
    title: 'Agrochemicals',
    intro: 'The story shifts from exporting agricultural value to supplying crop-protection products into the Ethiopian market.',
    to: '/agrochemicals',
    bridge: 'Distribution naturally connects to a broader import and trading capability.',
    stages: [
      {
        number: '03.1',
        eyebrow: 'FARMING NEED',
        title: 'Begin with the farming problem.',
        copy: 'The useful starting point is the crop, the problem being addressed and the exact product or category the customer is trying to identify.',
        image: businessAreas[2].image,
        position: 'center',
        label: 'Crop protection · Farming need',
      },
      {
        number: '03.2',
        eyebrow: 'VERIFY',
        title: 'Product information must be verified.',
        copy: 'Technical claims, application rates, targets and safety information should come from current approved labels and qualified guidance—not assumptions.',
        image: QUALITY_IMAGE,
        position: 'center',
        label: 'Verification · Product information',
      },
      {
        number: '03.3',
        eyebrow: 'DISTRIBUTE',
        title: 'Then move the right information with the product.',
        copy: 'A strong distribution experience connects product discovery, verified information, commercial availability and the customer’s local requirement.',
        image: businessAreas[3].image,
        position: 'center',
        label: 'Distribution · Local market',
      },
    ],
  },
  {
    index: '04',
    eyebrow: 'IMPORT · TRADING',
    title: 'Import & Trading',
    intro: 'The final part of the journey widens into selected agricultural inputs, stationery, construction materials and practical local trading requirements.',
    to: '/trading',
    bridge: '',
    stages: [
      {
        number: '04.1',
        eyebrow: 'REQUIREMENT',
        title: 'Trading starts with a real requirement.',
        copy: 'Product, quantity, target specification, delivery location and timing define the opportunity before sourcing begins.',
        image: businessAreas[3].image,
        position: 'left center',
        label: 'Requirement · Commercial need',
      },
      {
        number: '04.2',
        eyebrow: 'COORDINATE',
        title: 'Connect sourcing with commercial coordination.',
        copy: 'The trading role is to connect the requirement with sourcing, commercial communication, documentation and practical execution.',
        image: businessAreas[3].image,
        position: 'center',
        label: 'Sourcing · Coordination',
      },
      {
        number: '04.3',
        eyebrow: 'DELIVER',
        title: 'Complete the journey with delivery.',
        copy: 'The same connected operating mindset carries through to logistics and delivery for the customer in the Ethiopian market.',
        image: businessAreas[3].image,
        position: 'right center',
        label: 'Logistics · Delivery',
      },
    ],
  },
] as const;

function ConnectedBusinessJourney() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="connected-journey" aria-label="KKGT connected business journey">
      <div className="connected-journey__opening" style={{ backgroundImage: `url(${RAW_COFFEE_IMAGE})` }}>
        <div className="connected-journey__opening-veil" aria-hidden="true" />
        <div className="connected-journey__opening-texture" aria-hidden="true" />
        <div className="container connected-journey__opening-content">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: .7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow eyebrow--light">ETHIOPIA · IMPORT · EXPORT</span>
            <h1><span>Rooted in Ethiopia.</span><br /><em>Trading with the world.</em></h1>
            <p>Follow one connected KKGT journey from Ethiopian coffee and agricultural commodities to crop-protection distribution and diversified trading.</p>
            <div className="hero-actions">
              <Link to="/contact" className="button button--orange">Start an inquiry <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <span className="connected-journey__scroll-hint">Scroll through the story <ArrowDownRight size={17} aria-hidden="true" /></span>
            </div>
          </motion.div>

          <div className="connected-journey__index" aria-hidden="true">
            {businessStories.map((story) => (
              <div key={story.index}><span>{story.index}</span><strong>{story.title}</strong></div>
            ))}
          </div>
        </div>
      </div>

      <div className="connected-journey__flow">
        {businessStories.map((story, businessIndex) => (
          <section
            className={`journey-business journey-business--${businessIndex + 1}`}
            key={story.index}
            aria-labelledby={`journey-business-${story.index}`}
          >
            <div className="container journey-business__shell">
              <aside className="journey-business__sticky">
                <div className="journey-business__identity">
                  <span className="journey-business__number">{story.index}</span>
                  <span className="journey-business__eyebrow">{story.eyebrow}</span>
                </div>
                <h2 id={`journey-business-${story.index}`}>{story.title}</h2>
                <p>{story.intro}</p>
                <div className="journey-business__story-count" aria-hidden="true">
                  <span>03 PART STORY</span>
                  <i /><i /><i />
                </div>
                <Link to={story.to} className="journey-business__explore">
                  Explore this business <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </aside>

              <div className="journey-business__stages">
                {story.stages.map((stage, stageIndex) => (
                  <motion.article
                    className="journey-stage"
                    key={stage.number}
                    initial={reduceMotion ? false : { opacity: 0, y: 36, scale: .985 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: .3 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: .68, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="journey-stage__image"
                      style={{ backgroundImage: `url(${stage.image})`, backgroundPosition: stage.position }}
                      aria-hidden="true"
                    />
                    <div className="journey-stage__shade" aria-hidden="true" />

                    <div className="journey-stage__topline">
                      <div className="journey-stage__meta"><span>{stage.number}</span><span>{stage.eyebrow}</span></div>
                      <span>{String(stageIndex + 1).padStart(2, '0')} / 03</span>
                    </div>

                    <div className="journey-stage__copy">
                      <h3>{stage.title}</h3>
                      <p>{stage.copy}</p>
                    </div>

                    <div className="journey-stage__caption" aria-hidden="true">
                      <span>KKGT · {story.index}</span>
                      <strong>{stage.label}</strong>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {story.bridge ? (
              <div className="container journey-bridge" aria-hidden="true">
                <span>{story.index} → 0{businessIndex + 2}</span>
                <strong>{story.bridge}</strong>
                <i />
              </div>
            ) : (
              <div className="container journey-bridge journey-bridge--final" aria-hidden="true">
                <span>04 · COMPLETE</span>
                <strong>One company. One connected operating story.</strong>
                <i />
              </div>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Seo title="KKGT Import Export | Ethiopia" description="KKGT connects Ethiopian coffee, agricultural commodities, crop-protection products and diversified trading opportunities with local and international markets." />

      <ConnectedBusinessJourney />

      <section className="section section--paper">
        <div className="container split-intro">
          <Reveal><span className="eyebrow">WHO WE ARE</span></Reveal>
          <Reveal delay={.08}>
            <p className="overline">{company.motto}</p>
            <h2>An Ethiopian trading company built around <em>agriculture, quality and long-term relationships.</em></h2>
            <div className="two-copy">
              <p>{company.legalName} operates across export, import and agricultural supply. KKGT’s role is to understand market needs, source responsibly, protect quality and move products efficiently from origin to customer.</p>
              <p>The website is designed around the way customers actually explore the business: by coffee origin, commodity, crop-protection need and trading opportunity.</p>
            </div>
            <Link className="inline-arrow" to="/about">Learn about KKGT <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark coffee-feature">
        <div className="container feature-grid">
          <Reveal className="feature-grid__media"><div className="feature-photo coffee-feature__photo"><span>ETHIOPIA / ORIGIN</span></div></Reveal>
          <Reveal className="feature-grid__copy" delay={.08}>
            <span className="eyebrow eyebrow--light">ETHIOPIAN COFFEE</span>
            <p className="overline overline--orange">Born at origin.</p>
            <h2>Coffee with a place, a story and a market.</h2>
            <p>KKGT’s coffee presentation is built around Ethiopian origins and a buyer-first inquiry experience. Technical details remain conservative until current commercial specifications are confirmed.</p>
            <div className="origin-stack">
              {coffeeOrigins.map((origin, index) => (
                <Link to={`/coffee/${origin.slug}`} key={origin.slug}><span>0{index + 1}</span><strong>{origin.name}</strong><ArrowUpRight size={16} aria-hidden="true" /></Link>
              ))}
            </div>
            <Link to="/coffee" className="button button--outline">Explore coffee export <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="rooted-section rooted-section--contrast">
        <div className="rooted-section__media" aria-hidden="true" />
        <div className="container rooted-section__content">
          <Reveal>
            <span className="eyebrow eyebrow--light">ROOTED IN ETHIOPIA</span>
            <h2>Local understanding.<br /><em>International ambition.</em></h2>
            <p>KKGT’s business starts with relationships on the ground: producers, suppliers, customers and communities.</p>
            <Link to="/quality" className="button button--light">See quality & operations <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <InquiryBand />
    </>
  );
}
