export const company = {
  name: 'KKGT Import Export',
  legalName: 'Kelbesa Kekeba General Trading',
  motto: 'We Cultivate Ideas for Growth',
  tagline: 'Rooted in Ethiopia. Trading with the world.',
  email: 'info@kkgtimportexport.com',
  phones: ['+251 99 182 8202', '+251 91 103 6990'],
  address: ['Addis Ababa, Lideta, Sengatera', 'Yobek Commercial Center, 7th Floor', 'Office 703A'],
  hours: ['Mon–Fri · 09:00–19:00', 'Saturday · Half day'],
};

export const businessAreas = [
  {
    title: 'Ethiopian Coffee',
    eyebrow: 'Export',
    description: 'Origin-led coffee sourcing, processing, quality handling and export coordination.',
    to: '/coffee',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=88',
  },
  {
    title: 'Agricultural Commodities',
    eyebrow: 'Export',
    description: 'Sesame, soybeans, pulses and beans for local and international trading opportunities.',
    to: '/commodities',
    image: 'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=1600&q=86',
  },
  {
    title: 'Agrochemicals',
    eyebrow: 'Import & Distribution',
    description: 'A clearer product-discovery experience for crop-protection categories and verified product information.',
    to: '/agrochemicals',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=86',
  },
  {
    title: 'Import & Trading',
    eyebrow: 'Trading',
    description: 'Agricultural inputs, stationery and construction materials supported by local market knowledge.',
    to: '/trading',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=86',
  },
];

export const processSteps = [
  ['01', 'Source', 'Build relationships with suppliers, producers and customers.'],
  ['02', 'Prepare', 'Coordinate processing, documentation and market requirements.'],
  ['03', 'Quality', 'Protect product integrity with controlled quality checks.'],
  ['04', 'Trade', 'Manage commercial requirements and buyer communication.'],
  ['05', 'Deliver', 'Coordinate movement to local or international customers.'],
] as const;
