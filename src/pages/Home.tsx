import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryBand, Reveal, SectionHeading, Seo } from '../components/UI';
import { businessAreas, company, processSteps } from '../data/company';
import { coffeeOrigins } from '../data/catalog';

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function sceneOpacity(progress: number, index: number, total: number) {
  const span = 1 / total;
  const start = index * span;
  const end = (index + 1) * span;
  const fade = span * 0.18;
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

function InteractiveHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeArea = businessAreas[activeIndex];

  return (
    <section
      ref={heroRef}
      className="home-hero home-hero--interactive"
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType === 'touch') return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = clamp01((event.clientX - rect.left) / Math.max(rect.width, 1));
        const y = clamp01((event.clientY - rect.top) / Math.max(rect.height, 1));
        event.currentTarget.style.setProperty('--hero-x', `${(x - 0.5) * 2}`);
        event.currentTarget.style.setProperty('--hero-y', `${(y - 0.5) * 2}`);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty('--hero-x', '0');
        event.currentTarget.style.setProperty('--hero-y', '0');
      }}
    >
      <div className="interactive-hero__media" aria-hidden="true">
        {businessAreas.map((area, index) => (
          <div
            key={area.to}
            className={`interactive-hero__scene${index === activeIndex ? ' is-active' : ''}`}
            style={{ backgroundImage: `url(${area.image})` }}
          />
        ))}
      </div>
      <div className="interactive-hero__veil" aria-hidden="true" />
      <div className="interactive-hero__glow" aria-hidden="true" />

      <div className="container home-hero__content interactive-hero__layout">
        <motion.div
          className="interactive-hero__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: .72, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow eyebrow--light">ETHIOPIA · IMPORT · EXPORT</span>
          <h1>Rooted in Ethiopia.<br /><em>Trading with the world.</em></h1>
          <p>KKGT connects Ethiopian agricultural value with domestic and international markets through coffee and commodity exports, agrochemical distribution, and diversified import trading.</p>
          <div className="hero-actions">
            <Link to="/contact" className="button button--orange">Start an inquiry <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link to={activeArea.to} className="text-action">Explore {activeArea.title.toLowerCase()} <ArrowDownRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className="interactive-hero__active" aria-live="polite">
            <span>0{activeIndex + 1} · {activeArea.eyebrow}</span>
            <strong>{activeArea.title}</strong>
            <p>{activeArea.description}</p>
          </div>
        </motion.div>

        <motion.div
          className="interactive-hero__portal-wrap"
          initial={reduceMotion ? false : { opacity: 0, scale: .92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: .9, delay: .14, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="interactive-hero__orbit interactive-hero__orbit--one" />
          <div className="interactive-hero__orbit interactive-hero__orbit--two" />
          <div className="interactive-hero__portal">
            {businessAreas.map((area, index) => (
              <div
                key={area.to}
                className={`interactive-hero__portal-image${index === activeIndex ? ' is-active' : ''}`}
                style={{ backgroundImage: `url(${area.image})` }}
              />
            ))}
            <div className="interactive-hero__portal-shade" />
            <div className="interactive-hero__portal-label">
              <span>KKGT</span>
              <strong>{activeArea.title}</strong>
            </div>
          </div>
        </motion.div>
      </div>

      <nav className="interactive-hero__businesses" aria-label="Explore KKGT businesses">
        <div className="container interactive-hero__businesses-inner">
          {businessAreas.map((area, index) => (
            <Link
              key={area.to}
              to={area.to}
              className={index === activeIndex ? 'is-active' : ''}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onTouchStart={() => setActiveIndex(index)}
            >
              <span>0{index + 1}</span>
              <strong>{area.title}</strong>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </nav>
    </section>
  );
}

function CinematicBusinessJourney() {
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
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(clamp01(-rect.top / distance));
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

  if (reduceMotion) {
    return (
      <section className="section cinematic-fallback">
        <div className="container">
          <SectionHeading
            eyebrow="OUR BUSINESSES"
            title="One company."
            accent="Four connected businesses."
            copy="Export, import and agricultural distribution are presented as clear business lines rather than one generic catalogue."
          />
          <div className="cinematic-fallback-grid">
            {businessAreas.map((area, index) => (
              <Link
                to={area.to}
                key={area.to}
                className="cinematic-fallback-card"
                style={{ backgroundImage: `url(${area.image})` }}
              >
                <div className="cinematic-fallback-card__content">
                  <span>0{index + 1} · {area.eyebrow}</span>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const total = businessAreas.length;
  const activeIndex = Math.min(total - 1, Math.floor(progress * total));
  const activeArea = businessAreas[activeIndex];

  return (
    <section ref={sectionRef} className="cinematic-businesses" aria-label="KKGT business areas">
      <div className="cinematic-businesses__sticky">
        <div className="cinematic-businesses__media" aria-hidden="true">
          {businessAreas.map((area, index) => {
            const span = 1 / total;
            const start = index * span;
            const localProgress = clamp01((progress - start) / span);
            const opacity = sceneOpacity(progress, index, total);
            const scale = 1.09 - localProgress * 0.055;
            const translateY = (0.5 - localProgress) * 2.2;

            return (
              <div
                key={area.to}
                className="cinematic-businesses__scene"
                style={{
                  backgroundImage: `url(${area.image})`,
                  opacity,
                  transform: `translate3d(0, ${translateY}%, 0) scale(${scale})`,
                }}
              />
            );
          })}
        </div>
        <div className="cinematic-businesses__shade" aria-hidden="true" />
        <div className="cinematic-businesses__grain" aria-hidden="true" />

        <div className="container cinematic-businesses__layout">
          <div className="cinematic-businesses__intro">
            <div className="cinematic-businesses__kicker">OUR BUSINESSES · SCROLL TO EXPLORE</div>
            <div className="cinematic-businesses__copy-stack">
              {businessAreas.map((area, index) => {
                const opacity = sceneOpacity(progress, index, total);
                const span = 1 / total;
                const start = index * span;
                const localProgress = clamp01((progress - start) / span);
                const translateY = (0.5 - localProgress) * 28;

                return (
                  <div
                    key={area.to}
                    className={`cinematic-businesses__copy${index === activeIndex ? ' is-active' : ''}`}
                    style={{ opacity, transform: `translate3d(0, ${translateY}px, 0)` }}
                    aria-hidden={index !== activeIndex}
                  >
                    <span className="cinematic-businesses__number">0{index + 1} · {area.eyebrow}</span>
                    <h2>{area.title}</h2>
                    <p>{area.description}</p>
                  </div>
                );
              })}
            </div>
            <Link className="button button--orange cinematic-businesses__action" to={activeArea.to}>
              Explore {activeArea.title.toLowerCase()} <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <nav className="cinematic-businesses__rail" aria-label="Business area pages">
            {businessAreas.map((area, index) => (
              <Link key={area.to} to={area.to} className={index === activeIndex ? 'is-active' : ''}>
                <span>0{index + 1}</span>
                <strong>{area.title}</strong>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="cinematic-businesses__scroll-hint" aria-hidden="true">SCROLL THROUGH THE JOURNEY</div>
        <div className="cinematic-businesses__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
  );
}

const processVisuals = [
  businessAreas[0].image,
  businessAreas[1].image,
  businessAreas[2].image,
  businessAreas[3].image,
  businessAreas[0].image,
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
            onMouseEnter={() => setActiveStep(index)}
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

      <InteractiveHero />

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

      <CinematicBusinessJourney />

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
          <Reveal><SectionHeading eyebrow="HOW KKGT WORKS" title="From source" accent="to market." copy="Move through the workflow to see how sourcing, preparation, quality, trade and delivery connect." /></Reveal>
          <Reveal delay={.08}><SourceToMarketStory /></Reveal>
        </div>
      </section>

      <section className="rooted-section">
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
