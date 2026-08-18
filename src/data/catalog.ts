export type CoffeeOrigin = {
  slug: string;
  name: string;
  summary: string;
  image: string;
};

export const coffeeOrigins: CoffeeOrigin[] = [
  { slug: 'yirgacheffe', name: 'Yirgacheffe', summary: 'One of the Ethiopian origins represented in KKGT’s public coffee offering.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=88' },
  { slug: 'sidama', name: 'Sidama', summary: 'An Ethiopian coffee origin included in KKGT’s export portfolio.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=88' },
  { slug: 'limmu', name: 'Limmu', summary: 'A coffee origin represented in KKGT’s existing export materials.', image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=1600&q=88' },
  { slug: 'jimma', name: 'Jimma / Djimmah', summary: 'An origin referenced in KKGT’s current coffee export offering.', image: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=1600&q=88' },
  { slug: 'lekempti', name: 'Lekempti', summary: 'An Ethiopian origin included in KKGT’s public coffee portfolio.', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=88' },
];

export type Commodity = {
  slug: string;
  name: string;
  family: string;
  summary: string;
  image: string;
};

export const commodities: Commodity[] = [
  { slug: 'sesame', name: 'Sesame', family: 'Oilseed', summary: 'Part of KKGT’s agricultural export offering.', image: 'https://images.unsplash.com/photo-1599909533730-f58c4f27285d?auto=format&fit=crop&w=1600&q=86' },
  { slug: 'soybeans', name: 'Soybeans', family: 'Oilseed / pulse', summary: 'Agricultural commodity represented in KKGT’s export portfolio.', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1600&q=86' },
  { slug: 'mung-beans', name: 'Green Mung Beans', family: 'Pulse', summary: 'One of the pulses referenced in KKGT’s public materials.', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1600&q=86' },
  { slug: 'chickpeas', name: 'Chickpeas', family: 'Pulse', summary: 'A pulse commodity included in KKGT’s export activity.', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1600&q=86' },
  { slug: 'white-beans', name: 'White Beans', family: 'Bean', summary: 'A bean commodity referenced in KKGT’s export materials.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=86' },
  { slug: 'red-kidney-beans', name: 'Red Kidney Beans', family: 'Bean', summary: 'A bean commodity included in KKGT’s public export offering.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=86' },
];

export type ProductCategory = 'Fungicide' | 'Herbicide' | 'Insecticide' | 'To confirm';

export type AgroProduct = {
  slug: string;
  name: string;
  category: ProductCategory;
  verification: 'category-verified' | 'name-only';
};

export const agroProducts: AgroProduct[] = [
  { slug: 'harmony', name: 'HARMONY', category: 'Fungicide', verification: 'category-verified' },
  { slug: 'horozeb', name: 'Horozeb', category: 'Fungicide', verification: 'category-verified' },
  { slug: 'metazin', name: 'Metazin', category: 'Fungicide', verification: 'category-verified' },
  { slug: 'ok-bright', name: 'OK Bright', category: 'Fungicide', verification: 'category-verified' },
  { slug: 'k-zole', name: 'K-Zole', category: 'Fungicide', verification: 'category-verified' },
  { slug: 'kk-top', name: 'KK Top', category: 'Fungicide', verification: 'category-verified' },
  { slug: 'linko-up', name: 'Linko Up', category: 'To confirm', verification: 'name-only' },
  { slug: 'range', name: 'Range', category: 'To confirm', verification: 'name-only' },
  { slug: 'agroban', name: 'AGROBAN', category: 'To confirm', verification: 'name-only' },
  { slug: 'dedu-star', name: 'Dedu Star', category: 'To confirm', verification: 'name-only' },
  { slug: 'klodin-gold-20-ac', name: 'Klodin Gold 20% AC', category: 'To confirm', verification: 'name-only' },
  { slug: 'gelyfel-48-ac-al', name: 'Gelyfel 48% AC AL', category: 'To confirm', verification: 'name-only' },
  { slug: 'zhora-24d-72', name: 'Zhora 2,4D 72%', category: 'To confirm', verification: 'name-only' },
  { slug: 'fast-10', name: 'Fast 10%', category: 'To confirm', verification: 'name-only' },
];
