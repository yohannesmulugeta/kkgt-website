import { CheckCircle2 } from 'lucide-react';
import { InquiryBand, PageHero, Reveal, SectionHeading, Seo } from '../components/UI';

export function Quality() {
  return (
    <>
      <Seo title="Quality & Operations | KKGT" description="See how KKGT presents sourcing, preparation, quality control, trade coordination and delivery as one connected operating flow." />
      <PageHero eyebrow="QUALITY & OPERATIONS" title="Quality should be visible" accent="through the whole flow." copy="A professional trading company website should show how sourcing, preparation, verification and delivery connect—not just list products." image="https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=2000&q=88" />
      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="OPERATING PRINCIPLE" title="Source. Prepare. Verify." accent="Trade. Deliver." /></Reveal>
          <div className="quality-flow">
            {[
              ['01', 'Source', 'Work with suppliers, producers and customers around a defined requirement.'],
              ['02', 'Prepare', 'Coordinate product preparation, handling and documentation needs.'],
              ['03', 'Verify', 'Confirm the information and quality controls relevant to the transaction.'],
              ['04', 'Trade', 'Manage commercial communication and market requirements.'],
              ['05', 'Deliver', 'Coordinate the final movement of products to the customer.'],
            ].map(([no, title, copy]) => <Reveal className="quality-step" key={no}><span>{no}</span><div><strong>{title}</strong><p>{copy}</p></div><CheckCircle2 size={22} /></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container values-layout">
          <Reveal><span className="eyebrow eyebrow--light">TRUST & PROOF</span><h2>Credibility is stronger when <em>every claim can be verified.</em></h2></Reveal>
          <Reveal className="values-copy" delay={.08}><p>Certifications, licenses, market lists, partner logos, awards and facility details should be published only after KKGT confirms the current documents and exact wording.</p><p>The React architecture is already prepared to add those proof points later without redesigning the site.</p></Reveal>
        </div>
      </section>
      <InquiryBand title="Need operational or quality information for a transaction?" />
    </>
  );
}
