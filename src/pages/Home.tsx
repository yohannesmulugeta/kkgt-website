import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryBand, Reveal, SectionHeading, Seo } from '../components/UI';
import { businessAreas, company, processSteps } from '../data/company';
import { coffeeOrigins } from '../data/catalog';

const RAW_COFFEE_IMAGE = 'https://images.pexels.com/photos/7125601/pexels-photo-7125601.jpeg?auto=compress&cs=tinysrgb&w=2200';

const homeBusinessAreas = businessAreas.map((area, index) => ({
  ...area,
  image: index === 0 ? RAW_COFFEE_IMAGE : area.image,
  heroTitle: index === 0 ? 'Ethiopian Green Coffee' : area.title,
  heroEyebrow: index === 0 ? 'RAW COFFEE · EXPORT' : area.eyebrow,
}));

function BusinessStory() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="business-story" aria-label="KKGT businesses from Ethiopia to market">
      {homeBusinessAreas.map((area, index) => (
        <article
          key={area.to}
          className={`business-story__chapter business-story__chapter--${index + 1}`}
          style={{ backgroundImage: `url(${area.image})` }}
        >
          <div className="business-story__veil" aria-hidden="true" />
          <div className="business-story__texture" aria-hidden="true" />

          <div className="container business-story__layout">
            <motion.div
              className="business-story__copy"
              initial={reduceMotion ? false : { opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.48 }}
              transition={reduceMotion ? { duration: 0 } : { duration: .64, ease: [0.22, 1, 0.36, 1] }}
            >
              {index === 0 ? (
                <>
                  <span className="eyebrow eyebrow--light">ETHIOPIA · IMPORT · EXPORT</span>
                  <h1><span>Rooted in Ethiopia.</span><br /><em>Trading with the world.</em></h1>
                  <p className="business-story__lead">KKGT connects Ethiopian agricultural value with domestic and international markets through export, agricultural supply and diversified trading.</p>
                </>
              ) : (
                <>
                  <span className="business-story__chapter-number">0{index + 1} / 04</span>
                  <span className="eyebrow eyebrow--light">{area.heroEyebrow}</span>
                  <h2>{area.heroTitle}</h2>
                </>
              )}

              <div className="business-story__card">
                <div className="business-story__meta">
                  <span>0{index + 1}</span>
                  <span>{area.heroEyebrow}</span>
                </div>
                {index === 0 && <strong>{area.heroTitle}</strong>}
                <p>{area.description}</p>
                <Link to={area.to} className="business-story__link">
                  Explore {index === 0 ? 'coffee export' : area.title.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>

              {index === 0 && (
                <div className="hero-actions">
                  <Link to="/contact" className="button button--orange">Start an inquiry <ArrowUpRight size={17} aria-hidden="true" /></Link>
                  <span className="business-story__hint">Scroll to discover our businesses <ArrowDownRight size={17} aria-hidden="true" /></span>
                </div>
              )}
            </motion.div>

            <motion.div
              className="business-story__visual"
              initial={reduceMotion ? false : { opacity: 0, scale: .9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.45 }}
              transition={reduceMotion ? { duration: 0 } : { duration: .8, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              <div className="business-story__orbit business-story__orbit--outer" />
              <div className="business-story__orbit business-story__orbit--inner" />
              <div className="business-story__portal" style={{ backgroundImage: `url(${area.image})` }}>
                <div className="business-story__portal-shade" />
                <div className="business-story__portal-copy">
                  <span>KKGT · 0{index + 1}</span>
                  <strong>{area.heroTitle}</strong>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="business-story__rail" aria-hidden="true">
            <div className="container business-story__rail-inner">
              {homeBusinessAreas.map((railArea, railIndex) => (
                <div key={railArea.to} className={railIndex === index ? 'is-active' : ''}>
                  <span>0{railIndex + 1}</span>
                  <strong>{railArea.heroTitle}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

const processVisuals = [
  RAW_COFFEE_IMAGE,
  businessAreas[1].image,
  businessAreas[2].image,
  businessAreas[3].image,
  RAW_COFFEE_IMAGE,
];

function SourceToMarketStory() {
  const [activeStep, setActiveStep] = useState(0);
  const [number, title, copy] = processSteps[activeStep];

  return (
    <div className="market-story">
      <div className="market-story__visual" aria-hidden="true">
        {processVisuals.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={`market-story__image${index === activeStep ? ' is-active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="market-story__shade" />
        <div className="market-story__visual-copy">
          <span>{number} · KKGT WORKFLOW</span>
          <strong>{title}</strong>
          <p>{copy}</p>
        </div>
      </div>

      <div className="market-story__steps" aria-label="KKGT source to market process">
        {processSteps.map(([no, stepTitle, stepCopy], index) => (
          <button
            key={no}
            type="button"
            aria-pressed={index === activeStep}
            className={index === activeStep ? 'is-active' : ''}
            onFocus={() => setActiveStep(index)}
            onClick={() => setActiveStep(index)}
          >
            <span>{no}</span>
            <div><strong>{stepTitle}</strong><p>{stepCopy}</p></div>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function Home() {
  return (
    <>
      <Seo title="KKGT Import Export | Ethiopia" description="KKGT connects Ethiopian coffee, agricultural commodities, crop-protection products and diversified trading opportunities with local and international markets." />

      <BusinessStory />

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

      <section className="section section--paper market-story-section">
        <div className="container">
          <Reveal><SectionHeading eyebrow="HOW KKGT WORKS" title="From source" accent="to market." copy="Select each stage to see how sourcing, preparation, quality, trade and delivery connect." /></Reveal>
          <Reveal delay={.08}><SourceToMarketStory /></Reveal>
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
