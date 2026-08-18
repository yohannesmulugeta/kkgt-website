import { Route, Routes } from 'react-router-dom';
import { SiteShell } from './components/SiteShell';
import { About } from './pages/About';
import { Agrochemicals, ProductDetail } from './pages/Agrochemicals';
import { Coffee, CoffeeOrigin } from './pages/Coffee';
import { Commodities, CommodityDetail } from './pages/Commodities';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Quality } from './pages/Quality';
import { Trading } from './pages/Trading';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="coffee" element={<Coffee />} />
        <Route path="coffee/:slug" element={<CoffeeOrigin />} />
        <Route path="commodities" element={<Commodities />} />
        <Route path="commodities/:slug" element={<CommodityDetail />} />
        <Route path="agrochemicals" element={<Agrochemicals />} />
        <Route path="agrochemicals/fungicides" element={<Agrochemicals initialCategory="Fungicide" />} />
        <Route path="agrochemicals/herbicides" element={<Agrochemicals initialCategory="Herbicide" />} />
        <Route path="agrochemicals/insecticides" element={<Agrochemicals initialCategory="Insecticide" />} />
        <Route path="agrochemicals/product/:slug" element={<ProductDetail />} />
        <Route path="trading" element={<Trading />} />
        <Route path="quality" element={<Quality />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
