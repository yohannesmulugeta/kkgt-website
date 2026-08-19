import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { AgroProduct } from '../data/productCatalog';

export function Seo({ title, description }: { title: string; description: string }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </>
  );
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function PageHero({ eyebrow, title, accent, copy, image }: { eyebrow: string; title: string; accent?: string; copy: string; image: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero__image" aria-hidden="true">
        <img src={image} alt="" loading="eager" decoding="async" fetchPriority="high" />
        <div className="page-hero__scrim" />
      </div>
      <div className="container page-hero__content">
        <Reveal>
          <span className="eyebrow eyebrow--light">{eyebrow}</span>
          <h1>{title}{accent ? <><br /><em>{accent}</em></> : null}</h1>
          <p>{copy}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, accent, copy, dark = false }: { eyebrow: string; title: string; accent?: string; copy?: string; dark?: boolean }) {
  return (
    <div className={`section-heading ${dark ? 'section-heading--dark' : ''}`}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}{accent ? <><br /><em>{accent}</em></> : null}</h2>
      </div>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

type ImageLinkCardProps = {
  to: string;
  eyebrow: string;
  title: string;
  image: string;
  index?: string;
  copy?: string;
  description?: string;
};

export function ImageLinkCard({ to, eyebrow, title, copy, description, image, index }: ImageLinkCardProps) {
  const cardCopy = copy ?? description ?? '';
  return (
    <Link to={to} className="image-link-card">
      <div className="image-link-card__media" aria-hidden="true">
        <img src={image} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="image-link-card__shade" />
      <span className="image-link-card__index">{index}</span>
      <div className="image-link-card__content">
        <span>{eyebrow}</span>
        <h3>{title}</h3>
        {cardCopy ? <p>{cardCopy}</p> : null}
        <div className="image-link-card__action">Explore <ArrowUpRight size={18} aria-hidden="true" /></div>
      </div>
    </Link>
  );
}

export function InquiryBand({ title = 'Let’s build the right trade conversation.', copy = 'Tell KKGT what you are looking for and the inquiry can be routed to the relevant business area.' }: { title?: string; copy?: string }) {
  return (
    <section className="inquiry-band">
      <div className="container inquiry-band__grid">
        <div><span>START A CONVERSATION</span><h2>{title}</h2><p>{copy}</p></div>
        <Link to="/contact" className="button button--light inquiry-band__cta">Start an inquiry <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

export function getAgroProductImageStyle(product: AgroProduct) {
  const base = import.meta.env.BASE_URL;
  const position = product.imageCount === 1 ? 0 : (product.imageSlot / (product.imageCount - 1)) * 100;

  return {
    backgroundImage: `url(${base}assets/products/product-sprite-${product.imageSprite}.jpg)`,
    backgroundSize: `100% ${product.imageCount * 100}%`,
    backgroundPosition: `center ${position}%`,
    backgroundRepeat: 'no-repeat',
  };
}

export function ProductCard({ product }: { product: AgroProduct }) {
  return (
    <Link to={`/agrochemicals/product/${product.slug}`} className="product-card product-card--catalogue">
      <div className="product-card__top">
        <span className="category-chip verified">{product.category}</span>
        <span className="product-card__catalog-number">#{String(product.catalogNumber).padStart(2, '0')}</span>
        <ArrowUpRight size={17} aria-hidden="true" />
      </div>
      <div
        className="product-card__visual product-card__visual--photo"
        style={getAgroProductImageStyle(product)}
        role="img"
        aria-label={`${product.name} product image from the KKGT 2026 catalogue`}
      />
      <div className="product-card__body">
        <h3>{product.name}</h3>
        <span className="product-card__ingredient">{product.activeIngredient}</span>
        <p>{product.description}</p>
        <div className="product-card__status"><ShieldCheck size={15} aria-hidden="true" /> Product image and description verified in the 2026 catalogue</div>
      </div>
    </Link>
  );
}
