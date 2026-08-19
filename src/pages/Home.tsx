import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageLinkCard, InquiryBand, Reveal, SectionHeading, Seo } from '../components/UI';
import { businessAreas, company, processSteps } from '../data/company';
import { coffeeOrigins } from '../data/catalog';

const RAW_COFFEE_IMAGE = 'https://images.pexels.com/photos/7125601/pexels-photo-7125601.jpeg?auto=compress&cs=tinysrgb&w=2200';

const scrollBusinesses = businessAreas.map((area, index) => ({
  ...area,
  image: index === 0 ? RAW_COFFEE_IMAGE : area.image,
  scrollTitle: index === 0 ? 'Ethiopian Green Coffee' : area.title,
  scrollEyebrow: index === 0 ? 'RAW COFFEE · EXPORT' : area.eyebrow,
  scrollCopy: [
    'From Ethiopian origin and green coffee preparation to a current buyer conversation built around verified commercial requirements.',
    'Sesame, soybeans, pulses and beans move from Ethiopian supply relationships toward clear buyer specifications and market requirements.',
    'Crop-protection discovery starts with the farming need, then connects customers with verified product information and local distribution.',
    'Selected import and trading requirements connect sourcing, commercial coordination, logistics and delivery for the Ethiopian market.',
  ][index],
}));

type FrameMode = 'before' | 'active' | 'after';

function CinematicBusinessScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [frameMode, setFrameMode] = useState<FrameMode>('before');
  const [sceneProgress, setSceneProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);
      const travel = Math.max(track.offsetHeight - viewportHeight, 1);
      const travelled = Math.min(Math.max(-rect.top, 0), travel);
      const progress = travelled / travel;

      // Four equal story windows. The shorter track makes each business feel
      // like roughly two deliberate scroll movements instead of a long hold.
      const nextTarget = Math.min(3, Math.floor(Math.min(progress, 0.999999) * 4));
      const localProgress = Math.min(1, Math.max(0, (progress * 4) - nextTarget));

      setTargetIndex((current) => (current === nextTarget ? current : nextTarget));
      setSceneProgress((current) => Math.abs(current - localProgress) < 0.015 ? current : localProgress);

      const nextMode: FrameMode = rect.top > 0
        ? 'before'
        : rect.bottom <= viewportHeight
          ? 'after'
          : 'active';

      setFrameMode((current) => (current === nextMode ? current : nextMode));
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || activeIndex === targetIndex) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => {
        if (current === targetIndex) return current;
        return current + (targetIndex > current ? 1 : -1);
      });
    }, 260);

    return () => window.clearTimeout(timer);
  }, [activeIndex, targetIndex, reduceMotion]);

  if (reduceMotion) {
    return (
      <section className="home-scroll home-scroll--static" aria-label="KKGT business portfolio">
        <div className="container">
          <SectionHeading
            eyebrow="ONE COMPANY · FOUR BUSINESS LINES"
            title="From Ethiopia"
            accent="to opportunity."
            copy="Coffee, commodities, crop protection and trading are different customer journeys connected by one KKGT operating platform."
            dark
          />
          <div className="home-scroll__static-grid">
            {scrollBusinesses.map((area, index) => (
              <ImageLinkCard key={area.to} {...area} title={area.scrollTitle} index={`0${index + 1}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const sceneMotion = [
    {
      x: `${-1.8 + sceneProgress * 3.6}%`,
      y: `${0.4 - sceneProgress * 0.8}%`,
      scale: 1.075 - sceneProgress * 0.035,
    },
    {
      x: `${1.9 - sceneProgress * 3.8}%`,
      y: `${-0.5 + sceneProgress * 0.9}%`,
      scale: 1.055 + sceneProgress * 0.012,
    },
    {
      x: `${-0.7 + sceneProgress * 1.4}%`,
      y: `${1.8 - sceneProgress * 3.6}%`,
      scale: 1.08 - sceneProgress * 0.03,
    },
    {
      x: `${-1.5 + sceneProgress * 3}%`,
      y: `${0.6 - sceneProgress * 0.9}%`,
      scale: 1.045 + sceneProgress * 0.025,
    },
  ];

  return (
    <section className="home-scroll" aria-label="Scroll through KKGT business lines">
      <div className="home-scroll__section-intro">
        <div className="container home-scroll__section-intro-inner">
          <div>
            <span>ONE CINEMATIC MOMENT</span>
            <strong>Four businesses. One connected view.</strong>
          </div>
          <p>Scroll once to move through the scene. Scroll again to reveal the next KKGT business.</p>
        </div>
      </div>

      <div ref={trackRef} className="home-scroll__track" style={{ height: '390vh' }}>
        <div className="home-scroll__fallback" aria-hidden="true">
          {scrollBusinesses.map((area) => (
            <div key={area.to} className="home-scroll__fallback-panel" style={{ backgroundImage: `url(${area.image})` }} />
          ))}
        </div>

        <div className={`home-scroll__frame home-scroll__frame--${frameMode}`}>
          <div className="home-scroll__media" aria-hidden="true">
            {scrollBusinesses.map((area, index) => (
              <motion.div
                key={area.to}
                className="home-scroll__scene"
                style={{ backgroundImage: `url(${area.image})` }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? sceneMotion[index].x : '0%',
                  y: activeIndex === index ? sceneMotion[index].y : '0%',
                  scale: activeIndex === index ? sceneMotion[index].scale : 1.055,
                }}
                transition={{
                  opacity: { duration: .56, ease: [0.22, 1, 0.36, 1] },
                  x: { duration: .16, ease: 'linear' },
                  y: { duration: .16, ease: 'linear' },
                  scale: { duration: .16, ease: 'linear' },
                }}
              />
            ))}
            <div className="home-scroll__veil" />
            <div className="home-scroll__grain" />
          </div>

          <div className="container home-scroll__layout">
            <div className="home-scroll__copy-stack" aria-live="polite">
              {scrollBusinesses.map((area, index) => (
                <motion.div
                  key={area.to}
                  className={`home-scroll__copy${activeIndex === index ? ' is-active' : ''}`}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    y: activeIndex === index ? 0 : 20,
                  }}
                  transition={{ duration: .36, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden={activeIndex !== index}
                >
                  <span className="home-scroll__kicker">KKGT BUSINESS JOURNEY</span>
                  <span className="home-scroll__number">0{index + 1} / 04 · {area.scrollEyebrow}</span>
                  <h2>{area.scrollTitle}</h2>
                  <p>{area.scrollCopy}</p>
                  <Link
                    to={area.to}
                    className="button button--orange home-scroll__action"
                    tabIndex={activeIndex === index ? 0 : -1}
                  >
                    Explore {index === 0 ? 'coffee export' : area.title.toLowerCase()} <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="home-scroll__rail" aria-hidden="true">
              {scrollBusinesses.map((railArea, railIndex) => (
                <div key={railArea.to} className={railIndex === activeIndex ? 'is-active' : ''}>
                  <span>0{railIndex + 1}</span>
                  <strong>{railArea.scrollTitle}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="home-scroll__hint" aria-hidden="true">
            <ArrowDownRight size={15} /> Scroll to move the scene · scroll again to change business
          </div>

          <div className="home-scroll__progress" aria-hidden="true">
            <span style={{ width: `${((activeIndex + 1) / scrollBusinesses.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Seo title="KKGT Import Export | Ethiopia" description="KKGT connects Ethiopian coffee, agricultural commodities, crop-protection products and diversified trading opportunities with local and international markets." />

      <section className="home-hero home-hero--normal">
        <div className="home-hero__media home-hero__media--raw-coffee" aria-hidden="true" />
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="container home-hero__content">
          <Reveal>
            <span className="eyebrow eyebrow--light">ETHIOPIA · IMPORT · EXPORT</span>
            <h1><span>Rooted in Ethiopia.</span><br /><em>Trading with the world.</em></h1>
            <p>KKGT connects Ethiopian agricultural value with domestic and international markets through coffee, commodities, crop-protection distribution and diversified trading.</p>
            <div className="hero-actions">
              <Link to="/contact" className="button button--orange">Start an inquiry <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <Link to="/about" className="text-action">Discover KKGT <ArrowDownRight size={17} aria-hidden="true" /></Link>
            </div>
          </Reveal>
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
              <p>Each business line has a clear customer journey while remaining connected through one Ethiopian trading platform.</p>
            </div>
            <Link className="inline-arrow" to="/about">Learn about KKGT <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="WHAT WE DO"
              title="Four business lines."
              accent="One KKGT platform."
              copy="Explore the part of KKGT that matches your requirement."
            />
          </Reveal>
          <div className="business-card-grid">
            {scrollBusinesses.map((area, index) => (
              <Reveal key={area.to} delay={(index % 2) * .06}>
                <ImageLinkCard
                  to={area.to}
                  eyebrow={area.scrollEyebrow}
                  title={area.scrollTitle}
                  description={area.description}
                  image={area.image}
                  index={`0${index + 1}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CinematicBusinessScroll />

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
          <Reveal><SectionHeading eyebrow="HOW KKGT WORKS" title="From source" accent="to market." copy="A simple operating flow connects relationships, preparation, quality, trade and delivery." /></Reveal>
          <div className="process-grid">
            {processSteps.map(([no, title, copy], index) => (
              <Reveal className="process-card" key={no} delay={index * .04}><span>{no}</span><strong>{title}</strong><p>{copy}</p></Reveal>
            ))}
          </div>
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
