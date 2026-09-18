import type { FocusEvent, FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, Coffee, Copy, FileText, Globe, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageHero, Reveal, Seo } from '../components/UI';
import { company } from '../data/company';

type InquiryMode = 'sample' | 'quote' | 'general';
type ErrorField = 'name' | 'email' | 'message';
type FormErrors = Partial<Record<ErrorField, string>>;

function validateField(field: ErrorField, value: string) {
  const cleanValue = value.trim();
  if (field === 'name' && !cleanValue) return 'Please enter your name.';
  if (field === 'email') {
    if (!cleanValue) return 'Please enter your corporate email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanValue)) return 'Enter a valid email address.';
  }
  if (field === 'message' && !cleanValue) return 'Please provide requirements or specifications.';
  return '';
}

export function Contact() {
  const [params] = useSearchParams();

  const defaultMode: InquiryMode = useMemo(() => {
    const m = params.get('mode');
    if (m === 'sample') return 'sample';
    if (m === 'quote') return 'quote';
    const interest = params.get('interest');
    if (interest === 'coffee') return 'quote';
    if (interest === 'commodity') return 'quote';
    if (interest === 'agrochemical') return 'general';
    return 'quote';
  }, [params]);

  const [mode, setMode] = useState<InquiryMode>(defaultMode);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const initialOrigin = params.get('origin') || 'Yirgacheffe';
  const initialProduct = params.get('product') || '';

  function updateFieldError(field: ErrorField, value: string) {
    const message = validateField(field, value);
    setErrors((current) => {
      const next = { ...current };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget.name as ErrorField;
    if (field === 'name' || field === 'email' || field === 'message') updateFieldError(field, event.currentTarget.value);
  }

  function generateInquiryText(form: HTMLFormElement): { subject: string; body: string } {
    const data = new FormData(form);
    const name = data.get('name') || '';
    const companyName = data.get('company') || '';
    const email = data.get('email') || '';
    const phone = data.get('phone') || '';

    if (mode === 'sample') {
      const origin = data.get('coffeeOrigin') || '';
      const process = data.get('coffeeProcess') || '';
      const courier = data.get('courier') || '';
      const message = data.get('message') || '';
      const subject = `KKGT Coffee Sample Request (PSS) — ${origin} [${companyName || name}]`;
      const body = [
        '========================================',
        'KKGT COFFEE PRE-SHIPMENT SAMPLE (PSS) REQUEST',
        '========================================',
        `Contact Name: ${name}`,
        `Company: ${companyName}`,
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone}`,
        '',
        `Target Coffee Origin: ${origin}`,
        `Preparation / Grade: ${process}`,
        `Courier Account / Delivery Address: ${courier}`,
        '',
        'Cupping Profile / Evaluation Requirements:',
        String(message),
      ].join('\n');
      return { subject, body };
    }

    if (mode === 'quote') {
      const product = data.get('product') || '';
      const volume = data.get('volume') || '';
      const incoterm = data.get('incoterm') || '';
      const port = data.get('destinationPort') || '';
      const message = data.get('message') || '';
      const subject = `KKGT Export Quotation Request — ${product} [${incoterm} ${port}]`;
      const body = [
        '========================================',
        'KKGT COMMERCIAL EXPORT QUOTATION REQUEST',
        '========================================',
        `Contact Name: ${name}`,
        `Company: ${companyName}`,
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone}`,
        '',
        `Product / Commodity: ${product}`,
        `Target Volume: ${volume}`,
        `Incoterm: ${incoterm}`,
        `Destination Port: ${port}`,
        '',
        'Quality Specifications & Commercial Notes:',
        String(message),
      ].join('\n');
      return { subject, body };
    }

    const interest = data.get('interest') || 'General Inquiry';
    const message = data.get('message') || '';
    const subject = `KKGT Business Inquiry — ${interest} [${companyName || name}]`;
    const body = [
      '========================================',
      'KKGT BUSINESS INQUIRY',
      '========================================',
      `Contact Name: ${name}`,
      `Company: ${companyName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Business Area: ${interest}`,
      '',
      'Inquiry Details:',
      String(message),
    ].join('\n');
    return { subject, body };
  }

  function copyDetails(formElement: HTMLFormElement) {
    const { subject, body } = generateInquiryText(formElement);
    const fullText = `Subject: ${subject}\n\n${body}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3500);
      });
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(false);

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const requiredFields: ErrorField[] = ['name', 'email', 'message'];
    const nextErrors: FormErrors = {};

    requiredFields.forEach((field) => {
      const message = validateField(field, String(form.get(field) || ''));
      if (message) nextErrors[field] = message;
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstField = Object.keys(nextErrors)[0] as ErrorField;
      const control = formElement.elements.namedItem(firstField);
      if (control instanceof HTMLElement) control.focus();
      return;
    }

    setErrors({});
    const { subject, body } = generateInquiryText(formElement);
    setSent(true);
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const whatsappMessage = useMemo(() => {
    if (mode === 'sample') {
      return 'Hello KKGT Coffee Export, I would like to request a pre-shipment sample (PSS) for cupping evaluation.';
    }
    if (mode === 'quote') {
      return 'Hello KKGT Trade Desk, I would like to request an export quotation for container loads (FOB Djibouti / CIF).';
    }
    return 'Hello KKGT, I have a commercial trade inquiry regarding your products.';
  }, [mode]);

  return (
    <>
      <Seo title="B2B Trade Inquiries & Coffee Samples | KKGT" description="Connect directly with KKGT Import Export in Addis Ababa. Request pre-shipment green coffee samples (PSS), container-load export quotations, and commercial trade information." />
      <PageHero eyebrow="TRADE DESK & INQUIRIES" title="Connect directly with" accent="KKGT Addis Ababa." copy="Whether requesting specialty coffee cupping samples, negotiating containerized commodity shipments, or sourcing agrochemical distribution, our team coordinates prompt commercial follow-up." image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=88" />

      <section className="section section--paper">
        <div className="container contact-layout">
          <Reveal className="contact-details">
            <span className="eyebrow">ADDIS ABABA / HEADQUARTERS</span>
            <h2>Start a <em>business conversation.</em></h2>
            <p>Use the structured trade portal to prepare your specification, or contact KKGT directly via corporate email or WhatsApp Business.</p>
            
            <div className="contact-detail-list">
              <a href={`mailto:${company.email}`}><Mail size={20} aria-hidden="true" /><div><span>Corporate Email</span><strong>{company.email}</strong></div></a>
              <a href="https://wa.me/251991828202" target="_blank" rel="noreferrer"><MessageSquare size={20} aria-hidden="true" /><div><span>WhatsApp Business (24/7)</span><strong>{company.phones[0]}</strong></div></a>
              <a href="tel:+251991828202"><Phone size={20} aria-hidden="true" /><div><span>Direct Desk</span><strong>{company.phones[0]}</strong></div></a>
              <div><MapPin size={20} aria-hidden="true" /><div><span>Office Location</span><strong>{company.address[0]}<br />{company.address[1]}<br />{company.address[2]}</strong></div></div>
            </div>

            <a href={`https://wa.me/251991828202?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noreferrer" className="whatsapp-direct-card">
              <span>Chat directly on WhatsApp Business</span>
              <ArrowUpRight size={18} />
            </a>

            <div style={{ background: 'var(--cream)', padding: '18px 20px', borderRadius: '16px', marginTop: '20px', borderLeft: '3px solid var(--green)' }}>
              <strong style={{ fontSize: '13px', display: 'block', marginBottom: '6px', color: 'var(--green-deep)' }}>Export Logistics Desk</strong>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>All coffee and commodity shipments are coordinated via the Addis Ababa – Djibouti rail and road corridor. Export shipments undergo mandatory ECTA cupping verification and pre-shipment phytosanitary clearance.</p>
            </div>
          </Reveal>

          <Reveal delay={.08}>
            <form className="inquiry-form" onSubmit={submit} noValidate id="trade-inquiry-form">
              <div className="inquiry-mode-tabs" role="tablist" aria-label="Inquiry purpose">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'quote'}
                  className={`inquiry-mode-btn ${mode === 'quote' ? 'active' : ''}`}
                  onClick={() => setMode('quote')}
                >
                  <FileText size={15} /> Commercial Quotation
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'sample'}
                  className={`inquiry-mode-btn ${mode === 'sample' ? 'active' : ''}`}
                  onClick={() => setMode('sample')}
                >
                  <Coffee size={15} /> Request Coffee Sample (PSS)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'general'}
                  className={`inquiry-mode-btn ${mode === 'general' ? 'active' : ''}`}
                  onClick={() => setMode('general')}
                >
                  <Globe size={15} /> General / Agrochemicals
                </button>
              </div>

              {mode === 'sample' && (
                <div style={{ background: '#f0f7f3', border: '1px solid #d0e7da', borderRadius: '12px', padding: '12px 16px', fontSize: '12px', color: '#165b32' }}>
                  <strong>Pre-Shipment Coffee Samples (PSS):</strong> 200g – 500g green coffee sample pouches prepared to SCAA cupping standards and dispatched internationally via DHL or FedEx.
                </div>
              )}

              {mode === 'quote' && (
                <div style={{ background: '#f4f6f8', border: '1px solid #e1e6eb', borderRadius: '12px', padding: '12px 16px', fontSize: '12px', color: '#2b4436' }}>
                  <strong>Export Quotation (FCL):</strong> Proforma pricing available under FOB Port of Djibouti or CIF worldwide destination ports for 20ft and 40ft containers.
                </div>
              )}

              <div className="field-grid">
                <label>
                  <span>Full Name <b aria-hidden="true">*</b></span>
                  <input required name="name" autoComplete="name" onBlur={handleBlur} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Your name" />
                  {errors.name ? <small className="field-error" id="name-error" role="alert">{errors.name}</small> : null}
                </label>
                <label>
                  <span>Company / Roastery <b aria-hidden="true">*</b></span>
                  <input name="company" autoComplete="organization" placeholder="Company or Roastery name" />
                </label>
                <label>
                  <span>Corporate Email <b aria-hidden="true">*</b></span>
                  <input required type="email" name="email" autoComplete="email" inputMode="email" onBlur={handleBlur} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="buyer@domain.com" />
                  {errors.email ? <small className="field-error" id="email-error" role="alert">{errors.email}</small> : null}
                </label>
                <label>
                  <span>Phone / WhatsApp</span>
                  <input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="+1 ... or +44 ..." />
                </label>
              </div>

              {mode === 'sample' && (
                <>
                  <div className="field-grid">
                    <label>
                      <span>Coffee Origin Interested In</span>
                      <select name="coffeeOrigin" defaultValue={initialOrigin}>
                        <option value="Yirgacheffe">Yirgacheffe (Gedeo Zone)</option>
                        <option value="Sidama">Sidama (Bensa, Aleta Wondo)</option>
                        <option value="Guji">Guji (Shakiso, Uraga)</option>
                        <option value="Limu">Limu (Jimma Highlands)</option>
                        <option value="Djimmah">Djimmah (Natural Commercial)</option>
                        <option value="Multiple Origins">Multiple Origins Sample Kit</option>
                      </select>
                    </label>
                    <label>
                      <span>Target Preparation & Grade</span>
                      <select name="coffeeProcess" defaultValue="Washed Grade 1 / 2">
                        <option value="Washed Grade 1 / 2">Washed (Grade 1 or Grade 2)</option>
                        <option value="Natural Grade 1 / 3">Natural / Sun-Dried (Grade 1 or Grade 3)</option>
                        <option value="Anaerobic / Experimental">Anaerobic / Specialty Microlot</option>
                        <option value="Commercial Grade 4 / 5">Commercial Grade 4 / 5</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    <span>Courier Account or Sample Delivery Address</span>
                    <input name="courier" placeholder="DHL / FedEx account number or recipient shipping address" />
                  </label>
                </>
              )}

              {mode === 'quote' && (
                <>
                  <div className="field-grid">
                    <label>
                      <span>Product / Commodity</span>
                      <input name="product" defaultValue={initialProduct || (params.get('interest') === 'coffee' ? `${initialOrigin} Coffee` : '')} placeholder="e.g. Sidama Gr. 2 Washed, Humera Sesame Seed, Soybeans..." />
                    </label>
                    <label>
                      <span>Target Volume</span>
                      <select name="volume" defaultValue="1 x 20ft FCL (19.2 MT)">
                        <option value="1 x 20ft FCL (19.2 MT / ~320 Bags)">1 x 20ft FCL (~19.2 MT / 320 Bags)</option>
                        <option value="2 x 20ft FCL (38.4 MT)">2 x 20ft FCL (38.4 MT)</option>
                        <option value="Multi-Container Contract (5+ FCL)">Multi-Container Contract (5+ FCL)</option>
                        <option value="Partial / LCL (50 - 150 Bags)">Partial / LCL (50 - 150 Bags)</option>
                      </select>
                    </label>
                  </div>
                  <div className="field-grid">
                    <label>
                      <span>Incoterm Terms</span>
                      <select name="incoterm" defaultValue="FOB Djibouti">
                        <option value="FOB Djibouti">FOB Port of Djibouti</option>
                        <option value="CIF Destination Port">CIF (Cost, Insurance & Freight)</option>
                        <option value="CFR Destination Port">CFR (Cost & Freight)</option>
                      </select>
                    </label>
                    <label>
                      <span>Destination Port / Country</span>
                      <input name="destinationPort" placeholder="e.g. Hamburg, Genoa, Rotterdam, Kobe, Houston, Jebel Ali" />
                    </label>
                  </div>
                </>
              )}

              {mode === 'general' && (
                <label>
                  <span>Business Sector</span>
                  <select name="interest" defaultValue={params.get('interest') === 'agrochemical' ? 'Agrochemicals' : 'General inquiry'}>
                    <option>Agrochemicals (Distribution & Registration)</option>
                    <option>Import & Trading Materials</option>
                    <option>Agricultural Commodities</option>
                    <option>Coffee Export</option>
                    <option>General Corporate Inquiry</option>
                  </select>
                </label>
              )}

              <label>
                <span>{mode === 'sample' ? 'Evaluation Notes / Cupping Targets' : mode === 'quote' ? 'Specification Requirements & Timing' : 'Inquiry Message'} <b aria-hidden="true">*</b></span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-help message-error' : 'message-help'}
                  defaultValue={
                    mode === 'sample'
                      ? 'Please dispatch cupping samples for evaluation. We are planning container purchasing for the current harvest crop.'
                      : mode === 'quote' && initialProduct
                      ? `Please send proforma pricing and availability for ${initialProduct}.`
                      : ''
                  }
                  placeholder={mode === 'sample' ? 'Target score (84+), flavor notes, roast style preference, shipment timeline...' : 'Target grade, crop year, packing specifications (GrainPro / Jute), shipment schedule...'}
                />
                <small className="field-help" id="message-help">Specific volume, quality standard, and destination port enable an immediate commercial quote.</small>
                {errors.message ? <small className="field-error" id="message-error" role="alert">{errors.message}</small> : null}
              </label>

              <div className="inquiry-actions-row">
                <button className="button button--green button--submit" type="submit">
                  <Send size={16} aria-hidden="true" /> Prepare Email Inquiry <ArrowUpRight size={17} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="button button--outline"
                  onClick={() => {
                    const formEl = document.getElementById('trade-inquiry-form') as HTMLFormElement;
                    if (formEl) copyDetails(formEl);
                  }}
                >
                  {copied ? <Check size={16} aria-hidden="true" style={{ color: 'var(--green)' }} /> : <Copy size={16} aria-hidden="true" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Inquiry Details'}
                </button>
              </div>

              <div className="form-status" role="status" aria-live="polite">
                {sent ? (
                  <span style={{ color: 'var(--green)', fontWeight: 700 }}>Your default email client should open with your formatted inquiry.</span>
                ) : copied ? (
                  <span style={{ color: 'var(--green)', fontWeight: 700 }}>Inquiry details copied to clipboard. You can paste into your email or messaging client.</span>
                ) : (
                  'Submitting launches your email app addressed to info@kkgtimportexport.com. No personal data is stored on this static site.'
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
