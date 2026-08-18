import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryBand, PageHero, Reveal, SectionHeading, Seo } from '../components/UI';
import { businessAreas, company } from '../data/company';

export function About() {
  return (
    <>
      <Seo title="About KKGT | KKGT Import Export" description="Learn about KKGT Import Export, an Ethiopian company operating across coffee and agricultural exports, agrochemicals, agricultural inputs and diversified trading." />
      <PageHero eyebrow="ABOUT KKGT" title="Built around agriculture." accent="Connected to markets." copy="KKGT brings export, import and agricultural distribution together under one Ethiopian trading company." image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=88" />

      <section className="section section--paper">
        <div className="container editorial-grid">
          <Reveal><span className="eyebrow">OUR COMPANY</span></Reveal>
          <Reveal delay={.08}>
            <p className="overline">{company.motto}</p>
            <h2>{company.legalName} connects <em>origin, products and markets.</em></h2>
            <div className="two-copy">
              <p>KKGT’s public business portfolio includes Ethiopian Arabica coffee, agricultural commodities, crop-protection products, agricultural inputs, stationery and construction materials.</p>
              <p>The company works across sourcing, commercial coordination, quality handling, distribution and export preparation, with a focus on building durable relationships around real market needs.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <Reveal><SectionHeading eyebrow="MISSION & VISION" title="Growth should be practical," accent="responsible and shared." /></Reveal>
          <div className="statement-grid">
            <Reveal className="statement-card"><span>01 / MISSION</span><h3>Work with the market and community.</h3><p>Identify agricultural problems and commercial needs, then connect them with appropriate products, technologies and market opportunities in a sustainable way.</p></Reveal>
            <Reveal className="statement-card" delay={.08}><span>02 / VISION</span><h3>Build an admired Ethiopian trading company.</h3><p>Grow through innovation, quality, cost-conscious execution, strong relationships and long-term mutual prosperity.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal><SectionHeading dark eyebrow="BUSINESS MODEL" title="Different markets." accent="One operating platform." copy="KKGT’s structure is clearer when each business line has its own customer journey, while the company story remains connected." /></Reveal>
          <div className="dark-business-list">
            {businessAreas.map((area, index) => (
              <Reveal key={area.to} delay={index * .04}>
                <Link to={area.to} className="dark-business-row"><span>0{index + 1}</span><strong>{area.title}</strong><p>{area.description}</p><ArrowUpRight size={19} /></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container values-layout">
          <Reveal>
            <span className="eyebrow">HOW WE WANT TO BE KNOWN</span>
            <h2>Quality.<br />Integrity.<br /><em>Innovation.</em></h2>
          </Reveal>
          <Reveal className="values-copy" delay={.08}>
            <p>The new KKGT website intentionally avoids unsupported statistics, generic testimonials and unverifiable certification claims. Trust is stronger when the information shown can be backed by current company records.</p>
            <p>Leadership names, certifications, market lists and other proof points can be added once KKGT confirms the exact current data.</p>
            <Link to="/quality" className="inline-arrow">See quality & operations <ArrowUpRight size={17} /></Link>
          </Reveal>
        </div>
      </section>

      <InquiryBand title="Looking for a reliable Ethiopian trading partner?" />
    </>
  );
}
