import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/UI';

export function NotFound() {
  return (
    <section className="not-found">
      <Seo title="Page Not Found | KKGT" description="The requested KKGT page could not be found." />
      <div className="container not-found__content">
        <span>404 / PAGE NOT FOUND</span>
        <h1>This route doesn’t<br /><em>lead to market.</em></h1>
        <p>The page may have moved or the address may be incorrect.</p>
        <div className="hero-actions"><Link className="button button--orange" to="/"><ArrowLeft size={17} /> Return home</Link><Link className="button button--outline" to="/contact">Contact KKGT <ArrowUpRight size={17} /></Link></div>
      </div>
    </section>
  );
}
