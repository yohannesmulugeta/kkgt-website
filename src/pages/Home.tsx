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

function sceneOpacity(progress: number, index: number, total: number) {
  const span = 1 / total;
  const start = index * span;
  const end = (index + 1) * span;
  const fade = span * 0.22;
  const fadeInStart = start - fade;
  const fadeInEnd = start + fade;
  const fadeOutStart = end - fade;
  const fadeOutEnd = end + fade;

  if (progress < fadeInStart || progress > fadeOutEnd) return 0;

  let opacity = 1;
  if (index > 0 && progress < fadeInEnd) {
    opacity = clamp01((progress - fadeInStart) / (fadeInEnd - fadeInStart));
  }
  if (index < total - 1 && progress > fadeOutStart) {
    opacity = Math.min(opacity, clamp01((fadeOutEnd - progress) / (fadeOutEnd - fadeOutStart)));
  }

  return opacity;
}

function ScrollBusinessHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(clamp01(-rect.top / travel));
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
  }, [reduceMotion]);

  const total = homeBusinessAreas.length;
  const activeIndex = Math.min(total - 1, Math.floor(progress * total));
  const activeArea = homeBusinessAreas[activeIndex];

  return (
    <section ref={sectionRef} className="scroll-business-hero" aria-label="KKGT businesses from Ethiopia to market">
      <div className="scroll-business-hero__sticky">
        <div className="scroll-business-hero__media" aria-hidden="true">
          {homeBusinessAreas.map((area, index) => {
            const span = 1 / total;
            const local = clamp01((progress - index * span) / span);
            const opacity = reduceMotion ? (index === 0 ? 1 : 0) : sceneOpacity(progress, index, total);
            const scale = 1.08 - local * 0.045;
            const translateX = (0.5 - local) * 1.8;

            return (
              <div
                key={area.to}
                className="scroll-business-hero__scene"
                style={{
                  backgroundImage: `url(${area.image})`,
                  opacity,
                  transform: `translate3d(${translateX}%, 0, 0) scale(${scale})`,
                }}
              />
            );
          })}
        </div>
        <div className="scroll-business-hero__veil" aria-hidden="true" />
        <div className="scroll-business-hero__texture" aria-hidden="true" />

        <div className="container scroll-business-hero__layout">
          <motion.div
            className="scroll-business-hero__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: .72, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow eyebrow--light">ETHIOPIA · IMPORT · EXPORT</span>
            <h1><span>Rooted in Ethiopia.</span><br /><em>Trading with the world.</em></h1>
            <p className="scroll-business-hero__lead">KKGT connects Ethiopian agricultural value with domestic and international markets through export, agricultural supply and diversified trading.</p>

            <div className="scroll-business-hero__stage" aria-live="polite">
              <div className="scroll-business-hero__stage-meta">
                <span>0{activeIndex + 1}</span>
                <span>{activeArea.heroEyebrow}</span>
              </div>
              <strong>{activeArea.heroTitle}</strong>
              <p>{activeArea.description}</p>
              <Link to={activeArea.to} className="scroll-business-hero__stage-link">
                Explore this business <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="hero-actions">
              <Link to="/contact" className="button button--orange">Start an inquiry <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <span className="scroll-business-hero__hint">Keep scrolling to explore <ArrowDownRight size={17} aria-hidden="true" /></span>
            </div>
          </motion.div>

          <div className="scroll-business-hero__visual" aria-hidden="true">
            <div className="scroll-business-hero__orbit scroll-business-hero__orbit--outer" />
            <div className="scroll-business-hero__orbit scroll-business-hero__orbit--inner" />
            <div className="scroll-business-hero__portal">
              {homeBusinessAreas.map((area, index) => (
                <div
                  key={area.to}
                  className="scroll-business-hero__portal-image"
                  style={{
                    backgroundImage: `url(${area.image})`,
                    opacity: reduceMotion ? (index === 0 ? 1 : 0) : sceneOpacity(progress, index, total),
                  }}
                />
              ))}
              <div className="scroll-business-hero__portal-shade" />
              <div className="scroll-business-hero__portal-copy">
                <span>KKGT · 0{activeIndex + 1}</span>
                <strong>{activeArea.heroTitle}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-business-hero__rail" aria-label="KKGT business pages">
          <div className="container scroll-business-hero__rail-inner">
            {homeBusinessAreas.map((area, index) => (
              <Link key={area.to} to={area.to} className={index === activeIndex ? 'is-active' : ''} aria-current={index === activeIndex ? 'step' : undefined}>
                <span>0{index + 1}</span>
                <strong>{area.heroTitle}</strong>
              </Link>
            ))}
          </div>
        </div>

        <div className="scroll-business-hero__progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
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
            <div>
              <strong>{stepTitle}</strong>
              <p>{stepCopy}</p>
            </div>
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
