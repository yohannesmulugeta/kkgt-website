import type { FocusEvent, FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageHero, Reveal, Seo } from '../components/UI';
import { company } from '../data/company';

type ErrorField = 'name' | 'email' | 'message';
type FormErrors = Partial<Record<ErrorField, string>>;

function validateField(field: ErrorField, value: string) {
  const cleanValue = value.trim();
  if (field === 'name' && !cleanValue) return 'Please enter your name.';
  if (field === 'email') {
    if (!cleanValue) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanValue)) return 'Enter a valid email address.';
  }
  if (field === 'message' && !cleanValue) return 'Please describe what you need.';
  return '';
}

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
  const [errors, setErrors] = useState<FormErrors>({});

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

    setSent(true);
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
              <a href={`mailto:${company.email}`}><Mail size={20} aria-hidden="true" /><div><span>Email</span><strong>{company.email}</strong></div></a>
              <a href="tel:+251991828202"><Phone size={20} aria-hidden="true" /><div><span>Phone</span><strong>{company.phones[0]}</strong></div></a>
              <div><MapPin size={20} aria-hidden="true" /><div><span>Office</span><strong>{company.address[0]}<br />{company.address[1]}<br />{company.address[2]}</strong></div></div>
            </div>
          </Reveal>

          <Reveal delay={.08}>
            <form className="inquiry-form" onSubmit={submit} noValidate>
              <div className="field-grid">
                <label>
                  <span>Name <b aria-hidden="true">*</b></span>
                  <input required name="name" autoComplete="name" onBlur={handleBlur} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                  {errors.name ? <small className="field-error" id="name-error" role="alert">{errors.name}</small> : null}
                </label>
                <label>
                  <span>Company</span>
                  <input name="company" autoComplete="organization" />
                </label>
                <label>
                  <span>Email <b aria-hidden="true">*</b></span>
                  <input required type="email" name="email" autoComplete="email" inputMode="email" onBlur={handleBlur} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                  {errors.email ? <small className="field-error" id="email-error" role="alert">{errors.email}</small> : null}
                </label>
                <label>
                  <span>Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" inputMode="tel" />
                </label>
              </div>

              <label>
                <span>Business area</span>
                <select name="interest" defaultValue={initialInterest}>
                  <option>General inquiry</option>
                  <option>Coffee export</option>
                  <option>Agricultural commodities</option>
                  <option>Agrochemicals</option>
                  <option>Import & Trading</option>
                </select>
              </label>

              <label>
                <span>What do you need? <b aria-hidden="true">*</b></span>
                <textarea
                  required
                  name="message"
                  rows={7}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-help message-error' : 'message-help'}
                  defaultValue={params.get('product') ? `I would like current information about ${params.get('product')}.` : params.get('origin') ? `I would like current availability for ${params.get('origin')} coffee.` : ''}
                  placeholder="Product, specification, volume, destination, timing..."
                />
                <small className="field-help" id="message-help">Including product, volume, destination and timing helps KKGT respond more efficiently.</small>
                {errors.message ? <small className="field-error" id="message-error" role="alert">{errors.message}</small> : null}
              </label>

              <button className="button button--green button--submit" type="submit">Prepare email inquiry <ArrowUpRight size={17} aria-hidden="true" /></button>
              <div className="form-status" role="status" aria-live="polite">
                {sent ? 'Your email app should open with the inquiry prepared.' : 'Submitting prepares an email to KKGT; no form data is stored by this static website.'}
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
