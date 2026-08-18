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

function CinematicBusinessScroll() {
  const reduceMotion = useReducedMotion();

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

  return (
    <section className="home-scroll" aria-label="Scroll through KKGT business lines">
      {scrollBusinesses.map((area, index) => (
        <article
          key={area.to}
          className={`home-scroll__chapter home-scroll__chapter--${index + 1}`}
          style={{ zIndex: index + 1 }}
        >
          <div className="home-scroll__media" aria-hidden="true">
            <motion.div
              className="home-scroll__scene"
              style={{ backgroundImage: `url(${area.image})` }}
              initial={{ scale: 1.055 }}
              whileInView={{ scale: 1.015 }}
              viewport={{ once: false, amount: .45 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="home-scroll__veil" />
            <div className="home-scroll__grain" />
          </div>

          <div className="container home-scroll__layout">
            <motion.div
              className="home-scroll__copy"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: .55 }}
              transition={{ duration: .58, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="home-scroll__kicker">ONE COMPANY · FOUR BUSINESS LINES</span>
              <span className="home-scroll__number">0{index + 1} / 04 · {area.scrollEyebrow}</span>
              <h2>{area.scrollTitle}</h2>
              <p>{area.scrollCopy}</p>
              <Link to={area.to} className="button button--orange home-scroll__action">
                Explore {index === 0 ? 'coffee export' : area.title.toLowerCase()} <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="home-scroll__rail" aria-hidden="true">
              {scrollBusinesses.map((railArea, railIndex) => (
                <div key={railArea.to} className={railIndex === index ? 'is-active' : ''}>
                  <span>0{railIndex + 1}</span>
                  <strong>{railArea.scrollTitle}</strong>
                </div>
              ))}
            </div>
          </div>

          {index === 0 ? (
            <div className="home-scroll__hint" aria-hidden="true">
              <ArrowDownRight size={15} /> Scroll to move through the portfolio
            </div>
          ) : null}

          <div className="home-scroll__progress" aria-hidden="true">
            <span style={{ width: `${((index + 1) / scrollBusinesses.length) * 100}%` }} />
          </div>
        </article>
      ))}
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
