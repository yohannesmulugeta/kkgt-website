import { Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { company } from '../data/company';

const navGroups = [
  { label: 'About', to: '/about' },
  {
    label: 'Businesses',
    children: [
      ['Coffee Export', '/coffee'],
      ['Agricultural Commodities', '/commodities'],
      ['Agrochemicals', '/agrochemicals'],
      ['Import & Trading', '/trading'],
      ['Quality & Operations', '/quality'],
    ],
  },
  { label: 'Agrochemicals', to: '/agrochemicals' },
  { label: 'Contact', to: '/contact' },
] as const;

function Logo({ inverted = false }: { inverted?: boolean }) {
  const base = import.meta.env.BASE_URL;
  return <span className={`logo-lockup ${inverted ? 'logo-lockup--inverted' : ''}`}><img src={`${base}assets/kkgt-logo.svg`} alt="KKGT Import Export" width="320" height="108" decoding="async" /></span>;
}

function RouteFallback() {
  return <div className="route-loading" role="status" aria-live="polite"><span className="route-loading__mark" aria-hidden="true" /><span>Loading KKGT</span></div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); setBusinessOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); setBusinessOpen(false); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-bar">
        <Link to="/" aria-label="KKGT home" className="brand-link"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navGroups.map((item) => {
            if ('children' in item) {
              return (
                <div className="nav-dropdown" key={item.label} onMouseEnter={() => setBusinessOpen(true)} onMouseLeave={() => setBusinessOpen(false)} onFocus={() => setBusinessOpen(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setBusinessOpen(false); }}>
                  <button className="nav-link nav-link--button" type="button" aria-haspopup="true" aria-expanded={businessOpen} aria-controls="business-mega-menu" onClick={() => setBusinessOpen((value) => !value)}>{item.label}<ChevronDown size={14} aria-hidden="true" /></button>
                  <AnimatePresence>
                    {businessOpen && (
                      <motion.div id="business-mega-menu" className="mega-menu" aria-label="KKGT business areas" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.16 }}>
                        <div className="mega-menu__intro"><span>KKGT BUSINESSES</span><strong>From Ethiopian origin to market.</strong><p>Explore the company’s export, import and agricultural business areas.</p></div>
                        <div className="mega-menu__links">{item.children.map(([label, to], index) => <Link to={to} key={to}><span>0{index + 1}</span><strong>{label}</strong><ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{item.label}</NavLink>;
          })}
        </nav>
        <Link to="/contact" className="nav-cta desktop-only">Start an inquiry <ArrowUpRight size={15} aria-hidden="true" /></Link>
        <button className="menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-navigation" className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }}>
            <nav className="container mobile-menu__inner" aria-label="Mobile navigation">
              <Link to="/about">About</Link><span className="mobile-menu__label">BUSINESSES</span><Link to="/coffee">Coffee Export</Link><Link to="/commodities">Agricultural Commodities</Link><Link to="/agrochemicals">Agrochemicals</Link><Link to="/trading">Import & Trading</Link><Link to="/quality">Quality & Operations</Link><Link to="/contact" className="mobile-menu__cta">Start an inquiry <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Logo inverted /><p>{company.tagline}</p></div>
        <div><span className="footer-label">BUSINESSES</span><Link to="/coffee">Coffee Export</Link><Link to="/commodities">Agricultural Commodities</Link><Link to="/agrochemicals">Agrochemicals</Link><Link to="/trading">Import & Trading</Link></div>
        <div><span className="footer-label">COMPANY</span><Link to="/about">About KKGT</Link><Link to="/quality">Quality & Operations</Link><Link to="/contact">Contact</Link></div>
        <div><span className="footer-label">CONTACT</span><a href={`mailto:${company.email}`}>{company.email}</a><a href="tel:+251991828202">{company.phones[0]}</a><p>{company.address[0]}<br />{company.address[1]}</p></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} KKGT Import Export</span><span>Quality · Integrity · Innovation</span></div>
    </footer>
  );
}

export function SiteShell() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" tabIndex={-1}><Suspense fallback={<RouteFallback />}><Outlet /></Suspense></main><Footer /></>;
}
