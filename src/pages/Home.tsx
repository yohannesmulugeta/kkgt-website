import { useEffect, useRef, useState } from 'react';
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

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function ScrollBusinessHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewport = Math.max(window.innerHeight, 1);
      const travel = Math.max(section.offsetHeight - viewport, 1);
      const scrolled = Math.min(travel, Math.max(0, -rect.top));
      const nextProgress = clamp01(scrolled / travel);
      const nextIndex = Math.min(
        homeBusinessAreas.length - 1,
        Math.max(0, Math.floor((scrolled + viewport * 0.46) / viewport)),
      );

      setProgress(nextProgress);
      setActiveIndex(nextIndex);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const activeArea = homeBusinessAreas[activeIndex];

  return (
    <section ref={sectionRef} className="scroll-business-hero" aria-label="KKGT businesses from Ethiopia to market">
      <div className="scroll-business-hero__sticky" aria-hidden="true">
        <div className="scroll-business-hero__media">
          {homeBusinessAreas.map((area, index) => (
            <div
              key={area.to}
              className={`scroll-business-hero__scene${index === activeIndex ? ' is-active' : ''}`}
              style={{ backgroundImage: `url(${area.image})` }}
            />
          ))}
        </div>
        <div className="scroll-business-hero__veil" />
        <div className="scroll-business-hero__texture" />

        <div className="scroll-business-hero__visual">
          <div className="scroll-business-hero__orbit scroll-business-hero__orbit--outer" />
          <div className="scroll-business-hero__orbit scroll-business-hero__orbit--inner" />
          <div className="scroll-business-hero__portal">
            {homeBusinessAreas.map((area, index) => (
              <div
                key={area.to}
                className={`scroll-business-hero__portal-image${index === activeIndex ? ' is-active' : ''}`}
                style={{ backgroundImage: `url(${area.image})` }}
              />
            ))}
            <div className="scroll-business-hero__portal-shade" />
            <div className="scroll-business-hero__portal-copy">
              <span>KKGT · 0{activeIndex + 1}</span>
              <strong>{activeArea.heroTitle}</strong>
            </div>
          </div>
        </div>

        <div className="scroll-business-hero__rail">
          <div className="container scroll-business-hero__rail-inner">
            {homeBusinessAreas.map((area, index) => (
              <div key={area.to} className={index === activeIndex ? 'is-active' : ''}>
                <span>0{index + 1}</span>
                <strong>{area.heroTitle}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-business-hero__progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
      </div>

      <div className="scroll-business-hero__chapters">
        {homeBusinessAreas.map((area, index) => (
          <article key={area.to} className={`scroll-business-hero__chapter${index === 0 ? ' scroll-business-hero__chapter--intro' : ''}`}>
            <div className="container scroll-business-hero__chapter-layout">
              {index === 0 ? (
                <motion.div
                  className="scroll-business-hero__chapter-copy scroll-business-hero__chapter-copy--intro"
                  initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: .72, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="eyebrow eyebrow--light">ETHIOPIA · IMPORT · EXPORT</span>
                  <h1><span>Rooted in Ethiopia.</span><br /><em>Trading with the world.</em></h1>
                  <p className="scroll-business-hero__lead">KKGT connects Ethiopian agricultural value with domestic and international markets through export, agricultural supply and diversified trading.</p>

                  <div className="scroll-business-hero__chapter-card">
                    <div className="scroll-business-hero__stage-meta"><span>01</span><span>{area.heroEyebrow}</span></div>
                    <strong>{area.heroTitle}</strong>
                    <p>{area.description}</p>
                    <Link to={area.to}>Explore coffee export <ArrowUpRight size={16} aria-hidden="true" /></Link>
                  </div>

                  <div className="hero-actions">
                    <Link to="/contact" className="button button--orange">Start an inquiry <ArrowUpRight size={17} aria-hidden="true" /></Link>
                    <span className="scroll-business-hero__hint">Scroll to discover the business <ArrowDownRight size={17} aria-hidden="true" /></span>
                  </div>
                </motion.div>
              ) : (
                <div className="scroll-business-hero__chapter-copy">
                  <div className="scroll-business-hero__stage-meta"><span>0{index + 1}</span><span>{area.heroEyebrow}</span></div>
                  <h2>{area.heroTitle}</h2>
                  <p className="scroll-business-hero__chapter-description">{area.description}</p>
                  <Link to={area.to} className="scroll-business-hero__chapter-link">Explore {area.title.toLowerCase()} <ArrowUpRight size={17} aria-hidden="true" /></Link>
                  <span className="scroll-business-hero__chapter-count">0{index + 1} / 04</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
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

      <div className="market-story__steps" role="list" aria-label="KKGT source to market process">
        {processSteps.map(([no, stepTitle, stepCopy], index) => (
          <button
            key={no}
            type="button"
            role="listitem"
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

      <ScrollBusinessHero />

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
