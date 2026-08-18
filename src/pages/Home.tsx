import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryBand, ImageLinkCard, Reveal, SectionHeading, Seo } from '../components/UI';
import { businessAreas, company, processSteps } from '../data/company';
import { coffeeOrigins } from '../data/catalog';

export function Home() {
  return (
    <>
      <Seo title="KKGT Import Export | Ethiopia" description="KKGT connects Ethiopian coffee, agricultural commodities, crop-protection products and diversified trading opportunities with local and international markets." />
      <section className="home-hero">
        <div className="home-hero__media" />
        <div className="home-hero__overlay" />
        <div className="container home-hero__content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>
            <span className="eyebrow eyebrow--light">ETHIOPIA · IMPORT · EXPORT</span>
            <h1>Rooted in Ethiopia.<br /><em>Trading with the world.</em></h1>
            <p>KKGT connects Ethiopian agricultural value with domestic and international markets through coffee and commodity exports, agrochemical distribution, and diversified import trading.</p>
            <div className="hero-actions">
              <Link to="/coffee" className="button button--orange">Explore our businesses <ArrowUpRight size={17} /></Link>
              <Link to="/contact" className="text-action">Talk to KKGT <ArrowDownRight size={18} /></Link>
            </div>
          </motion.div>
        </div>
        <div className="home-hero__rail">
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
              <p>The new website is designed around the way customers actually explore the business: by coffee origin, commodity, crop-protection need and trading opportunity.</p>
            </div>
            <Link className="inline-arrow" to="/about">Learn about KKGT <ArrowUpRight size={17} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <Reveal><SectionHeading eyebrow="OUR BUSINESSES" title="One company." accent="Four connected businesses." copy="Export, import and agricultural distribution are presented as clear business lines rather than one generic catalogue." /></Reveal>
          <div className="business-card-grid">
            {businessAreas.map((area, index) => <Reveal key={area.to} delay={index * .05}><ImageLinkCard {...area} index={`0${index + 1}`} /></Reveal>)}
          </div>
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
                <Link to={`/coffee/${origin.slug}`} key={origin.slug}><span>0{index + 1}</span><strong>{origin.name}</strong><ArrowUpRight size={16} /></Link>
              ))}
            </div>
            <Link to="/coffee" className="button button--outline">Explore coffee export <ArrowUpRight size={17} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="HOW KKGT WORKS" title="From source" accent="to market." copy="A simple operating story helps customers understand how sourcing, quality and trade fit together." /></Reveal>
          <div className="process-grid">
            {processSteps.map(([no, title, copy], index) => (
              <Reveal key={no} delay={index * .05} className="process-card"><span>{no}</span><strong>{title}</strong><p>{copy}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rooted-section">
        <div className="rooted-section__media" />
        <div className="container rooted-section__content">
          <Reveal>
            <span className="eyebrow eyebrow--light">ROOTED IN ETHIOPIA</span>
            <h2>Local understanding.<br /><em>International ambition.</em></h2>
            <p>KKGT’s business starts with relationships on the ground: producers, suppliers, customers and communities.</p>
            <Link to="/quality" className="button button--light">See quality & operations <ArrowUpRight size={17} /></Link>
          </Reveal>
        </div>
      </section>

      <InquiryBand />
    </>
  );
}
