import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageHero, Reveal, Seo } from '../components/UI';
import { company } from '../data/company';

export function Contact() {
  const [params] = useSearchParams();
  const initialInterest = useMemo(() => {
    const value = params.get('interest');
    if (value === 'coffee') return 'Coffee export';
    if (value === 'commodity') return 'Agricultural commodities';
    if (value === 'agrochemical') return 'Agrochemicals';
    return 'General inquiry';
  }, [params]);
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = `KKGT website inquiry — ${form.get('interest')}`;
    const body = [
      `Name: ${form.get('name')}`,
      `Company: ${form.get('company')}`,
      `Email: ${form.get('email')}`,
      `Phone: ${form.get('phone')}`,
      `Interest: ${form.get('interest')}`,
      '',
      String(form.get('message') || ''),
    ].join('\n');
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <Seo title="Contact KKGT | Business Inquiry" description="Contact KKGT Import Export in Addis Ababa for Ethiopian coffee, agricultural commodities, agrochemicals, import and trading inquiries." />
      <PageHero eyebrow="CONTACT KKGT" title="Tell us what" accent="you need." copy="A useful inquiry starts with the product, requirement, volume and destination. KKGT can then route the conversation to the right business area." image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=88" />
      <section className="section section--paper">
        <div className="container contact-layout">
          <Reveal className="contact-details">
            <span className="eyebrow">ADDIS ABABA / ETHIOPIA</span>
            <h2>Start a <em>business conversation.</em></h2>
            <p>Use the form for a structured inquiry, or contact KKGT directly.</p>
            <div className="contact-detail-list">
              <a href={`mailto:${company.email}`}><Mail size={20} /><div><span>Email</span><strong>{company.email}</strong></div></a>
              <a href="tel:+251991828202"><Phone size={20} /><div><span>Phone</span><strong>{company.phones[0]}</strong></div></a>
              <div><MapPin size={20} /><div><span>Office</span><strong>{company.address[0]}<br />{company.address[1]}<br />{company.address[2]}</strong></div></div>
            </div>
          </Reveal>
          <Reveal delay={.08}>
            <form className="inquiry-form" onSubmit={submit}>
              <div className="field-grid">
                <label><span>Name *</span><input required name="name" autoComplete="name" /></label>
                <label><span>Company</span><input name="company" autoComplete="organization" /></label>
                <label><span>Email *</span><input required type="email" name="email" autoComplete="email" /></label>
                <label><span>Phone</span><input name="phone" autoComplete="tel" /></label>
              </div>
              <label><span>Business area</span><select name="interest" defaultValue={initialInterest}><option>General inquiry</option><option>Coffee export</option><option>Agricultural commodities</option><option>Agrochemicals</option><option>Import & Trading</option></select></label>
              <label><span>What do you need? *</span><textarea required name="message" rows={7} defaultValue={params.get('product') ? `I would like current information about ${params.get('product')}.` : params.get('origin') ? `I would like current availability for ${params.get('origin')} coffee.` : ''} placeholder="Product, specification, volume, destination, timing..." /></label>
              <button className="button button--green" type="submit">Prepare email inquiry <ArrowUpRight size={17} /></button>
              <small>{sent ? 'Your email app should open with the inquiry prepared.' : 'Submitting prepares an email to KKGT; no form data is stored by this static website.'}</small>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
