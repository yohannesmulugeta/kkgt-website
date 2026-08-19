export type ProductCategory = 'Herbicide' | 'Fungicide' | 'Insecticide';

export type AgroProduct = {
  slug: string;
  catalogNumber: number;
  name: string;
  category: ProductCategory;
  activeIngredient: string;
  description: string;
  imageSprite: number;
  imageSlot: number;
  imageCount: number;
  subcategory?: string;
  provisional?: boolean;
};

const product = (
  catalogNumber: number,
  slug: string,
  name: string,
  category: ProductCategory,
  activeIngredient: string,
  description: string,
  index: number,
  options: Pick<AgroProduct, 'subcategory' | 'provisional'> = {},
): AgroProduct => {
  const imageSprite = Math.floor(index / 5) + 1;
  const imageSlot = index % 5;
  const imageCount = imageSprite === 6 ? 2 : 5;

  return {
    catalogNumber,
    slug,
    name,
    category,
    activeIngredient,
    description,
    imageSprite,
    imageSlot,
    imageCount,
    ...options,
  };
};

// Publication rule: only products that have BOTH a visible product image and an
// English description in the supplied KKGT 2026 Product Catalogue are included.
export const agroProducts: AgroProduct[] = [
  product(1, 'glynan-48-sl', 'GLYNAN 48% SL', 'Herbicide', 'Glyphosate 480 g/L', 'Glyphosate SL herbicide for weed control in the crop and use situations listed on the approved label.', 0),
  product(2, 'zhora-24d-72-sl', 'ZHORA 2,4-D 72% SL', 'Herbicide', '2,4-D amine salt 720 g/L', '2,4-D amine SL herbicide for broad-leaved weed control in teff, wheat and maize.', 1),
  product(3, 'clodina-gold-20-ec', 'CLODINA GOLD 20% EC', 'Herbicide', 'Clodinafop-propargyl 180 g/L + fluroxypyr 120 g/L', 'Combination EC herbicide for grass and broad-leaved weed control in wheat.', 2),
  product(4, 'glycan-48-sl', 'GLYCAN 48% SL', 'Herbicide', 'Glyphosate 480 g/L', 'Glyphosate SL herbicide for weed control in the crop and use situations listed on the approved label.', 3),
  product(5, 'glyfull-48-sl', 'GLYFULL 48% SL', 'Herbicide', 'Glyphosate 480 g/L', 'Glyphosate SL herbicide for weed control in the crop and use situations listed on the approved label.', 4),
  product(6, 'linko-up-757-sg', 'LINKO UP 75.7% SG', 'Herbicide', 'Glyphosate ammonium 757 g/kg', 'Glyphosate ammonium SG herbicide for weed control in the use situations listed on the approved label.', 5),
  product(7, 'ok-bright-24d-72-sl', 'OK BRIGHT 2,4-D 72% SL', 'Herbicide', '2,4-D amine salt 720 g/L', '2,4-D amine SL herbicide for broad-leaved weed control in wheat, teff and barley.', 6),
  product(8, 'metazin-66-sc', 'METAZIN 66% SC', 'Herbicide', 'S-metolachlor 290 g/L + atrazine 370 g/L', 'Combination SC herbicide for grass and broad-leaved weed control in maize and sorghum.', 7),
  product(9, 'harmony-36-wdg', 'HARMONY 3.6% WDG', 'Herbicide', 'Mesosulfuron-methyl 3% + iodosulfuron-methyl-sodium 0.6%', 'WDG herbicide for grass and broad-leaved weed control in teff and wheat.', 8),

  product(15, 'k-zole-25-ec', 'K-ZOLE 25% EC', 'Fungicide', 'Propiconazole 250 g/L', 'Propiconazole EC fungicide for listed rust diseases in wheat and chocolate spot in faba bean.', 9),
  product(16, 'copmate-50-wp', 'COPMATE 50% WP', 'Fungicide', 'Copper oxychloride 350 g/kg + metalaxyl 150 g/kg', 'Combination WP fungicide for listed blight, downy mildew and anthracnose diseases in vegetable and fruit crops.', 10),
  product(17, 'dimentozeb-69-wp', 'DIMENTOZEB 69% WP', 'Fungicide', 'Mancozeb 600 g/kg + dimethomorph 90 g/kg', 'Combination WP fungicide for late and early blight management in listed vegetable and fruit crops.', 11),
  product(18, 'kk-top-40-sc', 'KK-TOP 40% SC', 'Fungicide', 'Azoxystrobin 250 g/L + difenoconazole 150 g/L', 'Combination SC fungicide for the listed fungal diseases in pepper, onion, faba bean and wheat.', 12),
  product(19, 'horozeb-80-wp', 'HOROZEB 80% WP', 'Fungicide', 'Mancozeb 800 g/kg', 'Mancozeb WP fungicide for listed blight and downy mildew diseases in vegetable and fruit crops.', 13),
  product(20, 'pyrac-extra-45-sc', 'PYRAC-EXTRA 45% SC', 'Fungicide', 'Dimethomorph 300 g/L + pyraclostrobin 150 g/L — provisional', 'Combination SC fungicide for listed blight and mildew diseases in vegetable and fruit crops.', 14, { provisional: true }),
  product(21, 'copro-77-wp', 'COPRO 77% WP', 'Fungicide', 'Copper hydroxide 770 g/kg — provisional unit correction', 'Copper hydroxide WP fungicide for listed blight, downy mildew and anthracnose diseases.', 15, { provisional: true }),
  product(22, 'vital-293-sc', 'VITAL 29.3% SC', 'Fungicide', 'Azoxystrobin 11% + tebuconazole 18.3%', 'Combination SC fungicide for the listed fungal diseases in vegetable crops, fruit crops and wheat.', 16),
  product(23, 'sulfvet-80-wdg', 'SULFVET 80% WDG', 'Fungicide', 'Sulfur 80%', 'Sulfur WDG fungicide for powdery mildew and downy mildew management in listed vegetable crops.', 17),
  product(24, 'komazeb-80-wdg', 'KOMAZEB 80% WDG', 'Fungicide', 'Mancozeb 800 g/kg', 'Mancozeb WDG fungicide for listed blight and downy mildew diseases in vegetable and fruit crops.', 18),

  product(26, 'agroban-50-ec', 'AGROBAN 50% EC', 'Insecticide', 'Chlorpyrifos 500 g/L', 'Chlorpyrifos EC insecticide for the listed insect pests in chickpea, pepper, cotton and cereal crops.', 19),
  product(27, 'dedu-star-35-sc', 'DEDU STAR 35% SC', 'Insecticide', 'Imidacloprid 350 g/L', 'Imidacloprid SC insecticide for aphids, thrips and whiteflies in listed crops.', 20),
  product(28, 'drone-40-ec', 'DRONE 40% EC', 'Insecticide', 'Dimethoate 400 g/L', 'Dimethoate EC insecticide for aphid control in cabbage, pea and cotton.', 21),
  product(29, 'fast-10-ec', 'FAST 10% EC', 'Insecticide', 'Alpha-cypermethrin 100 g/L', 'Alpha-cypermethrin EC insecticide for African bollworm control in listed vegetable, fruit, pulse, cotton and cereal crops.', 22),
  product(30, 'range-5-ec', 'RANGE 5% EC', 'Insecticide', 'Lambda-cyhalothrin 50 g/L', 'Lambda-cyhalothrin EC insecticide for aphid control in listed crops.', 23),
  product(31, 'protex-72-ec', 'PROTEX 72% EC', 'Insecticide', 'Profenofos 720 g/L', 'Profenofos EC insecticide for aphids, thrips and whiteflies in onion.', 24),
  product(32, 'fenpron-50-sc', 'FENPRON 50 SC', 'Insecticide', 'Fipronil 50 g/L', 'Fipronil SC insecticide for the listed sucking pests in onion.', 25),
  product(33, 'k-phos-567-tablets', 'K-PHOS 56.7% w/w TABLETS', 'Insecticide', 'Aluminium phosphide 56.7% w/w — provisional', 'Aluminium phosphide tablet product for weevil control in stored maize and other cereal grains.', 26, { subcategory: 'Stored-grain treatment', provisional: true }),
];

export const excludedCatalogueProducts = [
  'CUREPLUS 30% OD',
  'GLUSATE 20% SL',
  'TABAN 80% WP',
  'AZADON 24% EC',
  'BASECOR 80% WDG',
  'PROLIGHT 45% SC',
  'INSIDER 27% FS',
] as const;
