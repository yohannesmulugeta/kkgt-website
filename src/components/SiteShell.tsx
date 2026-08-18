import { useEffect, useState } from 'react';
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
  return (
    <span className={`logo-lockup ${inverted ? 'logo-lockup--inverted' : ''}`}>
      <img src={`${base}assets/kkgt-logo.svg`} alt="KKGT Import Export" />
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setBusinessOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-bar">
        <Link to="/" aria-label="KKGT home" className="brand-link"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navGroups.map((item) => {
            if ('children' in item) {
              return (
                <div className="nav-dropdown" key={item.label} onMouseEnter={() => setBusinessOpen(true)} onMouseLeave={() => setBusinessOpen(false)}>
                  <button className="nav-link nav-link--button" onClick={() => setBusinessOpen((v) => !v)}>
                    {item.label}<ChevronDown size={14} />
                  </button>
                  <AnimatePresence>
                    {businessOpen && (
                      <motion.div className="mega-menu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }}>
                        <div className="mega-menu__intro">
                          <span>KKGT BUSINESSES</span>
                          <strong>From Ethiopian origin to market.</strong>
                          <p>Explore the company’s export, import and agricultural business areas.</p>
                        </div>
                        <div className="mega-menu__links">
                          {item.children.map(([label, to], index) => (
                            <Link to={to} key={to}><span>0{index + 1}</span><strong>{label}</strong><ArrowUpRight size={16} /></Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{item.label}</NavLink>;
          })}
        </nav>
        <Link to="/contact" className="nav-cta desktop-only">Start an inquiry <ArrowUpRight size={15} /></Link>
        <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((v) => !v)}>{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <div className="container mobile-menu__inner">
              <Link to="/about">About</Link>
              <span className="mobile-menu__label">BUSINESSES</span>
              <Link to="/coffee">Coffee Export</Link>
              <Link to="/commodities">Agricultural Commodities</Link>
              <Link to="/agrochemicals">Agrochemicals</Link>
              <Link to="/trading">Import & Trading</Link>
              <Link to="/quality">Quality & Operations</Link>
              <Link to="/contact" className="mobile-menu__cta">Start an inquiry <ArrowUpRight size={16} /></Link>
            </div>
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
        <div className="footer-brand">
          <Logo inverted />
          <p>{company.tagline}</p>
        </div>
        <div>
          <span className="footer-label">BUSINESSES</span>
          <Link to="/coffee">Coffee Export</Link>
          <Link to="/commodities">Agricultural Commodities</Link>
          <Link to="/agrochemicals">Agrochemicals</Link>
          <Link to="/trading">Import & Trading</Link>
        </div>
        <div>
          <span className="footer-label">COMPANY</span>
          <Link to="/about">About KKGT</Link>
          <Link to="/quality">Quality & Operations</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <span className="footer-label">CONTACT</span>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href="tel:+251991828202">{company.phones[0]}</a>
          <p>{company.address[0]}<br />{company.address[1]}</p>
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} KKGT Import Export</span><span>Quality · Integrity · Innovation</span></div>
    </footer>
  );
}

export function SiteShell() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
    </>
  );
}
