import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Coffee as CoffeeIcon,
  Leaf,
  MapPin,
  PackageCheck,
  Ship,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryBand, Reveal, Seo } from '../components/UI';
import { coffeeOrigins } from '../data/catalog';

const HERO = 'https://images.pexels.com/photos/7125601/pexels-photo-7125601.jpeg?auto=compress&cs=tinysrgb&w=2200';
const ETHIOPIA_GROWERS = 'https://upload.wikimedia.org/wikipedia/commons/7/73/Kaffeodlare_i_Etiopien.jpg';
const CHERRIES = 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&w=2200&q=90';
const CEREMONY = 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Ethiopian_coffee_ceremony_-_Addis_Ababa.jpg';
const HAWASSA_SORTING = 'https://commons.wikimedia.org/wiki/Special:FilePath/Sorting%20coffee%20beans%20for%20size%2C%20Hawassa.jpg';
const YIRGACHEFFE = 'https://commons.wikimedia.org/wiki/Special:FilePath/Irgachefe%20coffee%E3%80%81Ethiopia.jpg';
const ETHIOPIA_DRYING = 'https://commons.wikimedia.org/wiki/Special:FilePath/Coffee%20Beans%20Drying%20%2811586771164%29.jpg';
const ETHIOPIA_QUEUE = 'https://commons.wikimedia.org/wiki/Special:FilePath/Join%20the%20coffee%20queue%20-%20Ethiopia.jpg';

const history = [
  {
    no: '01',
    label: 'THE BEGINNING',
    title: 'Coffee begins in Ethiopia.',
    copy: 'Arabica coffee has its natural home in Ethiopia. The country’s highland landscapes sit at the centre of coffee’s biological and cultural story.',
    note: 'The well-known Kaldi story is treated as legend rather than proven history.',
    image: ETHIOPIA_GROWERS,
  },
  {
    no: '02',
    label: 'FROM THE LAND',
    title: 'Coffee became part of everyday life.',
    copy: 'Across generations, coffee became tied to cultivation, livelihoods, hospitality and the rhythm of communities across Ethiopia.',
    note: 'From coffee trees and ripe cherries to careful handling, the story starts long before export.',
    image: CHERRIES,
  },
  {
    no: '03',
    label: 'MORE THAN A DRINK',
    title: 'Hospitality. Conversation. Community.',
    copy: 'The Ethiopian coffee ceremony turns roasting, grinding, brewing and serving into time spent together.',
    note: 'Coffee is prepared slowly and shared socially—an important part of Ethiopian hospitality.',
    image: CEREMONY,
  },
  {
    no: '04',
    label: 'FROM ORIGIN TO WORLD',
    title: 'An Ethiopian story with global reach.',
    copy: 'Today, green coffee moves through preparation, sorting, quality control, warehousing and export before it reaches buyers around the world.',
    note: 'KKGT joins the story by connecting Ethiopian origin with current commercial requirements.',
    image: HAWASSA_SORTING,
  },
];

const process = [
  { no: '01', title: 'Tree & Cherry', copy: 'Coffee begins with the plant, the land and the harvest.', icon: Leaf },
  { no: '02', title: 'Harvest', copy: 'Ripe cherries are selected and collected for processing.', icon: Sparkles },
  { no: '03', title: 'Process', copy: 'Coffee is processed and dried according to the lot requirement.', icon: CoffeeIcon },
  { no: '04', title: 'Sort & Quality', copy: 'Preparation and quality information are checked before an offer.', icon: CheckCircle2 },
  { no: '05', title: 'Green Coffee', copy: 'Prepared coffee becomes a buyer-facing green-coffee lot.', icon: PackageCheck },
  { no: '06', title: 'Export', copy: 'Packing, documents and shipment are coordinated for destination.', icon: Ship },
];

const originMeta = {
  yirgacheffe: { number: '01', region: 'Gedeo area · Southern Ethiopia', image: YIRGACHEFFE, focus: 'A globally recognised Ethiopian coffee name with a story rooted in the highlands around Yirgacheffe.' },
  sidama: { number: '02', region: 'Sidama · Southern Ethiopia', image: HAWASSA_SORTING, focus: 'A major southern coffee-producing area where coffee, agriculture and community are closely connected.' },
  limmu: { number: '03', region: 'Limmu · Western Ethiopia', image: ETHIOPIA_GROWERS, focus: 'A western Ethiopian origin presented through place, preparation and buyer requirements.' },
  jimma: { number: '04', region: 'Jimma · Southwestern Ethiopia', image: ETHIOPIA_DRYING, focus: 'A historic southwestern coffee-producing area and part of KKGT’s public origin portfolio.' },
  lekempti: { number: '05', region: 'Western Oromia · Ethiopia', image: ETHIOPIA_QUEUE, focus: 'A western Ethiopian coffee trade origin connected with the wider Nekemte/Lekempti market area.' },
} as const;

const atlasPositions: Record<string, { left: string; top: string }> = {
  lekempti: { left: '29%', top: '42%' },
  jimma: { left: '40%', top: '61%' },
  limmu: { left: '45%', top: '53%' },
  sidama: { left: '60%', top: '69%' },
  yirgacheffe: { left: '64%', top: '78%' },
};

function HistoryPanels() {
  return (
    <section className="coffee2-history" id="coffee-story">
      <div className="container coffee2-history__intro">
        <span>CHAPTER I · THE STORY</span>
        <h2>Before coffee became a commodity, <em>it was part of Ethiopia.</em></h2>
        <p>Four visual chapters move from origin and culture to the modern export journey—without dead scroll space.</p>
      </div>

      <div className="coffee2-history__panels">
        {history.map((chapter, index) => (
          <motion.article
            key={chapter.no}
            className={`coffee2-history-panel${index % 2 ? ' coffee2-history-panel--reverse' : ''}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="coffee2-history-panel__media">
              <img src={chapter.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
              <div className="coffee2-history-panel__shade" />
              <span>{chapter.no} / 04</span>
            </div>
            <div className="coffee2-history-panel__copy">
              <span>{chapter.label}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.copy}</p>
              <small>{chapter.note}</small>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CoffeeProcess() {
  return (
    <section className="coffee2-process">
      <div className="container">
        <Reveal className="coffee2-process__heading">
          <span>CHAPTER II · FROM CHERRY TO MARKET</span>
          <h2>A coffee journey built around <em>care, preparation and proof.</em></h2>
          <p>Each stage changes what the buyer eventually receives. The website explains the flow while current lot specifications stay verified at inquiry stage.</p>
        </Reveal>
        <div className="coffee2-process__grid">
          {process.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.no} className="coffee2-process__step" delay={index * .045}>
                <div className="coffee2-process__icon"><Icon size={21} aria-hidden="true" /></div>
                <span>{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OriginAtlas() {
  return (
    <section className="coffee2-atlas" id="origins">
      <div className="container coffee2-atlas__layout">
        <Reveal className="coffee2-atlas__copy">
          <span>CHAPTER III · ORIGIN ATLAS</span>
          <h2>One country.<br /><em>Many coffee stories.</em></h2>
          <p>Explore the Ethiopian origins currently represented in KKGT’s public coffee portfolio. Choose an origin to enter its story.</p>
          <small>Map positions are an orientation aid; current commercial origin and lot details are confirmed by KKGT.</small>
        </Reveal>
        <Reveal className="coffee2-atlas__map" delay={.08}>
          <svg viewBox="0 0 520 520" role="img" aria-label="Illustrative outline of Ethiopia with KKGT coffee origins">
            <path d="M111 94 190 61 258 72 302 49 355 83 414 77 451 128 435 178 463 222 430 272 439 334 385 362 348 416 292 401 239 449 193 418 139 425 108 377 67 345 82 292 55 248 82 202 70 154Z" />
          </svg>
          {coffeeOrigins.map((origin) => (
            <Link
              key={origin.slug}
              to={`/coffee/${origin.slug}`}
              className="coffee2-atlas__pin"
              style={{ left: atlasPositions[origin.slug].left, top: atlasPositions[origin.slug].top }}
              aria-label={`Explore ${origin.name}`}
            >
              <i /><span>{origin.name}</span>
            </Link>
          ))}
          <div className="coffee2-atlas__label">ETHIOPIA</div>
        </Reveal>
      </div>
    </section>
  );
}

function OriginCards() {
  return (
    <section className="coffee2-origins">
      <div className="container">
        <Reveal className="coffee2-origins__intro">
          <span>EXPLORE BY ORIGIN</span>
          <h2>Touch an origin.<br /><em>Enter its story.</em></h2>
          <p>Each origin opens a dedicated story page, followed by current buyer information and an availability inquiry.</p>
        </Reveal>
        <div className="coffee2-origins__grid">
          {coffeeOrigins.map((origin, index) => {
            const meta = originMeta[origin.slug as keyof typeof originMeta];
            return (
              <Reveal key={origin.slug} delay={(index % 2) * .06}>
                <Link to={`/coffee/${origin.slug}`} className={`coffee2-origin-card${index % 2 ? ' coffee2-origin-card--reverse' : ''}`}>
                  <div className="coffee2-origin-card__media">
                    <img src={meta.image} alt="" loading="lazy" decoding="async" />
                    <span>{meta.number}</span>
                  </div>
                  <div className="coffee2-origin-card__body">
                    <span>{meta.region}</span>
                    <h3>{origin.name}</h3>
                    <p>{meta.focus}</p>
                    <div>Discover the story <ArrowUpRight size={18} aria-hidden="true" /></div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CoffeeLanding() {
  return (
    <>
      <Seo title="Ethiopian Coffee Story & Origins | KKGT" description="Discover Ethiopia’s coffee story and explore Yirgacheffe, Sidama, Limmu, Jimma/Djimmah and Lekempti origins represented by KKGT." />

      <section className="coffee2-hero">
        <div className="coffee2-hero__media" aria-hidden="true"><img src={HERO} alt="" loading="eager" decoding="async" fetchPriority="high" /></div>
        <div className="coffee2-hero__scrim" />
        <div className="container coffee2-hero__content">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, ease: [0.22, 1, 0.36, 1] }}>
            <span>ETHIOPIA · THE ORIGIN OF COFFEE</span>
            <h1>Where coffee<br /><em>began.</em></h1>
            <p>Discover coffee through Ethiopia first—its land, culture and journey—then enter the individual origins KKGT presents to buyers.</p>
            <a href="#coffee-story">Scroll to discover <ArrowDown size={17} aria-hidden="true" /></a>
          </motion.div>
        </div>
      </section>

      <HistoryPanels />

      <section className="coffee2-ceremony">
        <div className="coffee2-ceremony__media"><img src={CEREMONY} alt="Traditional Ethiopian coffee ceremony" loading="lazy" decoding="async" /></div>
        <div className="container coffee2-ceremony__layout">
          <Reveal className="coffee2-ceremony__copy">
            <span>THE ETHIOPIAN COFFEE CEREMONY</span>
            <p className="coffee2-ceremony__quote">Coffee is not only prepared. It is shared.</p>
            <h2>Roast. Grind.<br />Brew. <em>Gather.</em></h2>
            <p>The traditional ceremony turns coffee preparation into time spent together. Roasting, aroma, brewing and serving create space for hospitality, conversation and community.</p>
            <div className="coffee2-ceremony__facts">
              <div><strong>01</strong><span>Roast</span></div><div><strong>02</strong><span>Grind</span></div><div><strong>03</strong><span>Brew</span></div><div><strong>04</strong><span>Serve</span></div>
            </div>
            <small>Documentary image: Ethiopian coffee ceremony in Addis Ababa.</small>
          </Reveal>
        </div>
      </section>

      <CoffeeProcess />

      <section className="coffee2-transition">
        <div className="coffee2-transition__media" aria-hidden="true"><img src={ETHIOPIA_DRYING} alt="" loading="lazy" decoding="async" /></div>
        <div className="coffee2-transition__scrim" />
        <div className="container coffee2-transition__content">
          <Reveal>
            <span>THE STORY CONTINUES</span>
            <h2>ONE COUNTRY.<br /><em>MANY COFFEE STORIES.</em></h2>
            <a href="#origins">Discover the origins <ArrowDown size={18} aria-hidden="true" /></a>
          </Reveal>
        </div>
      </section>

      <OriginAtlas />
      <OriginCards />

      <section className="coffee2-buyer">
        <div className="container coffee2-buyer__layout">
          <Reveal>
            <span>FOR GREEN COFFEE BUYERS</span>
            <h2>Origin inspires the story.<br /><em>Current lot data closes the trade.</em></h2>
          </Reveal>
          <Reveal className="coffee2-buyer__copy" delay={.08}>
            <p>KKGT does not publish assumed grades, crop years, processing methods, volumes or certifications. Send the origin and commercial requirement you need so the offer can be built around current verified information.</p>
            <Link to="/contact?interest=coffee" className="button button--orange">Start a coffee inquiry <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="coffee2-credits" aria-label="Photography credits">
        <div className="container">
          <span>DOCUMENTARY PHOTO SOURCES</span>
          <p>Selected Ethiopia-specific documentary imagery is sourced from Wikimedia Commons under Creative Commons licences, including work by FairtradeSverige, Irene2005, Niels Van Iperen, Yoshi Canopus, David Stanley and DFID.</p>
        </div>
      </section>

      <InquiryBand title="Looking for Ethiopian green coffee?" copy="Tell KKGT the origin, grade, processing method, volume and destination you are looking for. The response can be based on current confirmed availability." />
    </>
  );
}
