import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SiteShell } from './components/SiteShell';

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const Coffee = lazy(() => import('./pages/CoffeeLanding').then((module) => ({ default: module.CoffeeLanding })));
const CoffeeOrigin = lazy(() => import('./pages/Coffee').then((module) => ({ default: module.CoffeeOrigin })));
const Commodities = lazy(() => import('./pages/Commodities').then((module) => ({ default: module.Commodities })));
const CommodityDetail = lazy(() => import('./pages/Commodities').then((module) => ({ default: module.CommodityDetail })));
const Agrochemicals = lazy(() => import('./pages/Agrochemicals').then((module) => ({ default: module.Agrochemicals })));
const ProductDetail = lazy(() => import('./pages/Agrochemicals').then((module) => ({ default: module.ProductDetail })));
const Trading = lazy(() => import('./pages/Trading').then((module) => ({ default: module.Trading })));
const Quality = lazy(() => import('./pages/Quality').then((module) => ({ default: module.Quality })));
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })));

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
