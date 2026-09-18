export type CoffeeOrigin = {
  slug: string;
  name: string;
  summary: string;
  image: string;
  altitude: string;
  processing: string;
  grades: string;
  harvestPeriod: string;
  cupProfile: string[];
  acidity: string;
  body: string;
};

export const coffeeOrigins: CoffeeOrigin[] = [
  {
    slug: 'yirgacheffe',
    name: 'Yirgacheffe',
    summary: 'Celebrated worldwide for vibrant floral aromatics, bright citrus acidity, and delicate bergamot and jasmine notes.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=88',
    altitude: '1,750 – 2,200m',
    processing: 'Fully Washed & Natural Sundried',
    grades: 'Grade 1 & Grade 2 (Specialty)',
    harvestPeriod: 'October – January',
    cupProfile: ['Jasmine Floral', 'Bergamot', 'Lemon Meyer', 'Peach Sweetness'],
    acidity: 'Bright & Crisp Citrus',
    body: 'Silky & Tea-like',
  },
  {
    slug: 'sidama',
    name: 'Sidama',
    summary: 'A benchmark southern Ethiopian origin boasting rich berry sweetness, red currant notes, and a harmonious chocolate finish.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=88',
    altitude: '1,600 – 2,100m',
    processing: 'Fully Washed & Natural Sundried',
    grades: 'Grade 1, Grade 2 & Grade 3',
    harvestPeriod: 'October – January',
    cupProfile: ['Blueberry', 'Red Currant', 'Milk Chocolate', 'Cane Sugar'],
    acidity: 'Vibrant Malic & Citric',
    body: 'Medium to Full, Creamy',
  },
  {
    slug: 'limmu',
    name: 'Limmu',
    summary: 'Highland washed Arabica from western Ethiopia delivering a well-balanced profile with sweet stone fruit and cocoa elegance.',
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=1600&q=88',
    altitude: '1,500 – 1,900m',
    processing: 'Fully Washed',
    grades: 'Grade 1 & Grade 2',
    harvestPeriod: 'November – February',
    cupProfile: ['Apricot', 'Jasmine', 'Spice Notes', 'Cocoa Nibs'],
    acidity: 'Balanced & Winey',
    body: 'Smooth & Round',
  },
  {
    slug: 'jimma',
    name: 'Jimma / Djimmah',
    summary: 'The historical cradle of natural Ethiopian coffee, offering intense body, spicy undertones, and outstanding espresso blending depth.',
    image: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=1600&q=88',
    altitude: '1,400 – 1,850m',
    processing: 'Natural (Sundried on Raised Beds)',
    grades: 'Grade 4 & Grade 5 (Commercial)',
    harvestPeriod: 'November – January',
    cupProfile: ['Dark Chocolate', 'Earthy Spice', 'Caramelized Sugar', 'Nutty'],
    acidity: 'Low to Mild',
    body: 'Heavy, Bold & Syrupy',
  },
  {
    slug: 'lekempti',
    name: 'Lekempti / Nekemte',
    summary: 'Western Ethiopian coffee celebrated for its pronounced fruity sweetness, pleasant winey acidity, and rich golden crema.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=88',
    altitude: '1,500 – 2,000m',
    processing: 'Natural & Washed',
    grades: 'Grade 3, Grade 4 & Grade 5',
    harvestPeriod: 'November – February',
    cupProfile: ['Ripe Berry', 'Winey Fruit', 'Sweet Orange', 'Dark Cocoa'],
    acidity: 'Pleasant Winey',
    body: 'Medium to Heavy',
  },
];

export type Commodity = {
  slug: string;
  name: string;
  family: string;
  summary: string;
  image: string;
  purity: string;
  moisture: string;
  origin: string;
  packaging: string;
  specification: string;
};

export const commodities: Commodity[] = [
  {
    slug: 'sesame',
    name: 'Sesame Seed',
    family: 'Oilseed',
    summary: 'Premium Ethiopian Whitish Humera and Wollega sesame seeds renowned for high oil content, sweet aroma, and uniform seeds.',
    image: 'https://images.unsplash.com/photo-1599909533730-f58c4f27285d?auto=format&fit=crop&w=1600&q=86',
    purity: 'Min. 99.0% (Machine Cleaned / Sortex)',
    moisture: 'Max. 6.0%',
    origin: 'Humera & Wollega, Ethiopia',
    packaging: '50kg new PP bags or multi-wall paper bags',
    specification: 'Oil content: Min. 50% – 52%, Admixture max 1%, FFA max 1.5%',
  },
  {
    slug: 'soybeans',
    name: 'Soybeans',
    family: 'Oilseed / Pulse',
    summary: 'Non-GMO Ethiopian soybeans cultivated under organic conditions, ideal for edible oil extraction, animal feed, and food processing.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1600&q=86',
    purity: 'Min. 98.0%',
    moisture: 'Max. 11.0%',
    origin: 'Oromia & Benishangul-Gumuz, Ethiopia',
    packaging: '50kg PP bags / 1MT bulk bags',
    specification: 'Protein content: Min. 38% – 40%, Oil content: Min. 18%, Non-GMO',
  },
  {
    slug: 'mung-beans',
    name: 'Green Mung Beans',
    family: 'Pulse',
    summary: 'Machine cleaned, uniformly sized green mung beans harvested for high germination capacity, sprout cultivation, and culinary use.',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1600&q=86',
    purity: 'Min. 98.5% (Sortex Cleaned)',
    moisture: 'Max. 11.0%',
    origin: 'Shoa & Amhara, Ethiopia',
    packaging: '50kg woven polypropylene bags',
    specification: 'Size: 3.0mm+ / 3.5mm+, Damaged seeds max 1.5%, Foreign matter max 0.5%',
  },
  {
    slug: 'chickpeas',
    name: 'Chickpeas (Desi & Kabuli)',
    family: 'Pulse',
    summary: 'Ethiopian chickpeas grown in highland black soils, providing excellent nutritional value, high protein, and clean export sizing.',
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=1600&q=86',
    purity: 'Min. 99.0%',
    moisture: 'Max. 10.0%',
    origin: 'Gondar & Central Highlands, Ethiopia',
    packaging: '50kg new PP bags',
    specification: 'Desi (6-7mm) and Kabuli (7-9mm) caliber, Split max 1%, Defect max 2%',
  },
  {
    slug: 'white-beans',
    name: 'White Pea Beans (Haricot)',
    family: 'Bean',
    summary: 'White pea beans (Great Northern / Haricot style) extensively exported for international canning and wholesale food service.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=86',
    purity: 'Min. 98.5% (HPS - Hand Picked Selected)',
    moisture: 'Max. 12.0%',
    origin: 'Rift Valley & Oromia, Ethiopia',
    packaging: '50kg PP bags with inner liner',
    specification: 'Count: 500-550 seeds/100g, Foreign matter max 0.5%, Discolored max 1%',
  },
  {
    slug: 'red-kidney-beans',
    name: 'Red Kidney Beans',
    family: 'Bean',
    summary: 'Dark red kidney beans graded to export specifications with rich coloration, consistent grain size, and superior cooking quality.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=86',
    purity: 'Min. 99.0% (Machine Cleaned & Hand Picked)',
    moisture: 'Max. 13.0%',
    origin: 'Southern & Western Highlands, Ethiopia',
    packaging: '50kg new PP bags',
    specification: 'Caliber: 180-220 seeds/100g, Damaged max 1.5%, Admixture max 0.5%',
  },
];

export type { AgroProduct, ProductCategory } from './productCatalog';
export { agroProducts } from './productCatalog';
