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

export function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Seo title="KKGT Import Export | Ethiopia" description="KKGT connects Ethiopian coffee, agricultural commodities, crop-protection products and diversified trading opportunities with local and international markets." />
      <section className="home-hero">
        <div className="home-hero__media" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=88" alt="" fetchPriority="high" decoding="async" />
        </div>
        <div className="home-hero__overlay" />
        <div className="container home-hero__content">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: .72, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow eyebrow--light">ETHIOPIA · IMPORT · EXPORT</span>
            <h1>Rooted in Ethiopia.<br /><em>Trading with the world.</em></h1>
            <p>KKGT connects Ethiopian agricultural value with domestic and international markets through coffee and commodity exports, agrochemical distribution, and diversified import trading.</p>
            <div className="hero-actions">
              <Link to="/contact" className="button button--orange">Start an inquiry <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <Link to="/coffee" className="text-action">Explore our businesses <ArrowDownRight size={18} aria-hidden="true" /></Link>
            </div>
          </motion.div>
        </div>
        <div className="home-hero__rail" aria-hidden="true">
          <span>COFFEE</span><span>COMMODITIES</span><span>AGROCHEMICALS</span><span>TRADING</span>
        </div>
      </section>

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

      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="HOW KKGT WORKS" title="From source" accent="to market." copy="A simple operating story helps customers understand how sourcing, quality and trade fit together." /></Reveal>
          <div className="process-grid">
            {processSteps.map(([no, title, copy], index) => (
              <Reveal key={no} delay={index * .04} className="process-card"><span>{no}</span><strong>{title}</strong><p>{copy}</p></Reveal>
            ))}
          </div>
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
