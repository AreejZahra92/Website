// Centralised mock catalogue. Photography: Unsplash (free to use under the Unsplash License).
export const img = (id, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// Backup pool used by <Img/> if any primary photo fails to load.
export const FALLBACK_POOL = [
  '1490481651871-ab68de25d43d',
  '1445205170230-053b83016050',
  '1483985988355-763728e1935b',
  '1515886657613-9f3515b0c78f',
  '1469334031218-e382a71b716b',
  '1441984904996-e0b6ba687e04',
]

const COLORS = {
  ivory: { name: 'Ivory', hex: '#EDE6D9' },
  black: { name: 'Black', hex: '#141414' },
  camel: { name: 'Camel', hex: '#B48A5E' },
  navy: { name: 'Navy', hex: '#1F2A44' },
  olive: { name: 'Olive', hex: '#5B5E3F' },
  oxblood: { name: 'Oxblood', hex: '#6B2420' },
  stone: { name: 'Stone', hex: '#B9B1A4' },
  denim: { name: 'Washed Indigo', hex: '#41597A' },
  blush: { name: 'Blush', hex: '#D9B3A6' },
  charcoal: { name: 'Charcoal', hex: '#3A3A3A' },
  white: { name: 'Optic White', hex: '#FAFAF7' },
  sage: { name: 'Sage', hex: '#9AA58C' },
}

const APPAREL = ['XS', 'S', 'M', 'L', 'XL']
const MENS = ['S', 'M', 'L', 'XL', 'XXL']
const WAIST = ['28', '30', '32', '34', '36']
const SHOES = ['39', '40', '41', '42', '43', '44']
const ONE = ['One Size']

export const products = [
  {
    id: 'p01', name: 'Sculpted Wool Overcoat', category: 'women', type: 'Outerwear',
    price: 24990, salePrice: 19990,
    description: 'A softly structured overcoat cut from a brushed wool blend. Dropped shoulders, a long lean line and hidden snap closure for an effortless winter silhouette.',
    details: ['70% wool, 30% polyamide', 'Fully lined', 'Relaxed fit — true to size', 'Dry clean only'],
    colors: [COLORS.camel, COLORS.black, COLORS.stone], sizes: APPAREL,
    images: [img('1539533018447-63fcce2678e3'), img('1544022613-e87ca75a784a'), img('1520975954732-35dd22299614')],
    tags: ['new', 'featured', 'seasonal'], rating: 4.8, reviews: 126,
  },
  {
    id: 'p02', name: 'Atelier Tailored Suit', category: 'men', type: 'Tailoring',
    price: 34990,
    description: 'Our signature two-piece in a fluid Italian-milled suiting. Soft shoulder, half-canvas construction and a slim tapered trouser.',
    details: ['98% wool, 2% elastane', 'Half-canvas jacket', 'Slim fit', 'Dry clean only'],
    colors: [COLORS.navy, COLORS.charcoal, COLORS.black], sizes: MENS,
    images: [img('1617137968427-85924c800a22'), img('1507679799987-c73779587ccf'), img('1516826957135-700dedea698c')],
    tags: ['featured', 'bestseller'], rating: 4.9, reviews: 212,
  },
  {
    id: 'p03', name: 'Silk Slip Midi Dress', category: 'women', type: 'Dresses',
    price: 15990, salePrice: 11990,
    description: 'Bias-cut from fluid washed silk with delicate spaghetti straps. Skims the body and moves beautifully from day to evening.',
    details: ['100% mulberry silk', 'Adjustable straps', 'Midi length', 'Hand wash cold'],
    colors: [COLORS.blush, COLORS.black, COLORS.ivory], sizes: APPAREL,
    images: [img('1595777457583-95e059d581b8'), img('1594633312681-425c7b97ccd1'), img('1496747611176-843222e1e57c')],
    tags: ['new', 'bestseller'], rating: 4.7, reviews: 89,
  },
  {
    id: 'p04', name: 'Heavyweight Essential Tee', category: 'men', type: 'T-Shirts',
    price: 3490,
    description: 'Built on 240gsm combed cotton jersey with a boxy, slightly cropped shape and a dense ribbed neckline that holds its form wash after wash.',
    details: ['100% combed cotton, 240gsm', 'Boxy fit', 'Pre-shrunk', 'Machine wash 30°'],
    colors: [COLORS.white, COLORS.black, COLORS.stone, COLORS.olive], sizes: MENS,
    images: [img('1521572163474-6864f9cf17ab'), img('1503342217505-b0a15ec3261c'), img('1576566588028-4147f3842f27')],
    tags: ['bestseller', 'new'], rating: 4.6, reviews: 540,
  },
  {
    id: 'p05', name: 'Vintage Leather Biker', category: 'men', type: 'Outerwear',
    price: 39990, salePrice: 31990,
    description: 'Hand-finished lambskin with an aged patina. Asymmetric zip, quilted shoulders and a lived-in feel from the very first wear.',
    details: ['100% lambskin leather', 'Cupro lining', 'Regular fit', 'Specialist leather clean'],
    colors: [COLORS.black, COLORS.oxblood], sizes: MENS,
    images: [img('1551028719-00167b16eac5'), img('1591047139829-d91aecb6caea'), img('1488161628813-04466f872be2')],
    tags: ['featured', 'seasonal', 'bestseller'], rating: 4.9, reviews: 174,
  },
  {
    id: 'p06', name: 'Straight Selvedge Denim', category: 'men', type: 'Denim',
    price: 8990,
    description: 'Japanese selvedge denim in a timeless straight leg. Rinse-washed for softness, finished with copper hardware.',
    details: ['100% cotton, 13.5oz', 'Straight leg, mid rise', 'Button fly', 'Wash inside out'],
    colors: [COLORS.denim, COLORS.black], sizes: WAIST,
    images: [img('1542272604-787c3835535d'), img('1475180098004-ca77a66827be'), img('1552374196-1ab2a1c593e8')],
    tags: ['bestseller'], rating: 4.7, reviews: 301,
  },
  {
    id: 'p07', name: 'Draped Wrap Dress', category: 'women', type: 'Dresses',
    price: 12490,
    description: 'A fluid crepe wrap with a self-tie waist and fluttering sleeve. Flattering, easy and endlessly re-wearable.',
    details: ['100% viscose crepe', 'Self-tie waist', 'Midi length', 'Machine wash delicate'],
    colors: [COLORS.oxblood, COLORS.sage, COLORS.black], sizes: APPAREL,
    images: [img('1539008835657-9e8e9680c956'), img('1515886657613-9f3515b0c78f'), img('1485968579580-b6d095142e6e')],
    tags: ['new', 'featured'], rating: 4.6, reviews: 67,
  },
  {
    id: 'p08', name: 'Oxford Poplin Shirt', category: 'men', type: 'Shirts',
    price: 5990, salePrice: 4490,
    description: 'Crisp cotton poplin with a soft button-down collar. A wardrobe foundation that looks sharp tucked or loose.',
    details: ['100% cotton poplin', 'Button-down collar', 'Regular fit', 'Machine wash 40°'],
    colors: [COLORS.white, COLORS.navy, COLORS.stone], sizes: MENS,
    images: [img('1596755094514-f87e34085b2c'), img('1618354691373-d851c5c3a990'), img('1479064555552-3ef4979f8908')],
    tags: ['new'], rating: 4.5, reviews: 148,
  },
  {
    id: 'p09', name: 'Cloud Fleece Hoodie', category: 'men', type: 'Sweats',
    price: 6990,
    description: 'Brushed-back fleece with a double-layer hood and dropped shoulder. Garment-dyed for a softly faded tone.',
    details: ['80% cotton, 20% polyester', 'Oversized fit', 'Garment dyed', 'Machine wash 30°'],
    colors: [COLORS.stone, COLORS.charcoal, COLORS.sage], sizes: MENS,
    images: [img('1556905055-8f358a7a47b2'), img('1620799140408-edc6dcb6d633'), img('1503342217505-b0a15ec3261c')],
    tags: ['bestseller', 'seasonal'], rating: 4.8, reviews: 412,
  },
  {
    id: 'p10', name: 'Pointed Satin Heels', category: 'accessories', type: 'Footwear',
    price: 11990, salePrice: 8990,
    description: 'A sleek pointed-toe pump in liquid satin, balanced on an 85mm sculpted heel with a cushioned leather footbed.',
    details: ['Satin upper, leather lining', '85mm heel', 'Cushioned footbed', 'Made in Portugal'],
    colors: [COLORS.black, COLORS.blush], sizes: SHOES,
    images: [img('1543163521-1bf539c55dd2'), img('1515886657613-9f3515b0c78f'), img('1483985988355-763728e1935b')],
    tags: ['featured'], rating: 4.6, reviews: 58,
  },
  {
    id: 'p11', name: 'Minimal Leather Tote', category: 'accessories', type: 'Bags',
    price: 18990,
    description: 'Unlined vegetable-tanned leather that softens and deepens with every use. Fits a 14" laptop with room to spare.',
    details: ['Vegetable-tanned leather', 'Interior zip pocket', '38 × 30 × 14 cm', 'Condition with leather balm'],
    colors: [COLORS.camel, COLORS.black, COLORS.oxblood], sizes: ONE,
    images: [img('1548036328-c9fa89d128fa'), img('1584917865442-de89df76afd3'), img('1445205170230-053b83016050')],
    tags: ['bestseller', 'featured'], rating: 4.9, reviews: 233,
  },
  {
    id: 'p12', name: 'Court Leather Sneaker', category: 'accessories', type: 'Footwear',
    price: 13990,
    description: 'A clean low-top in full-grain leather, stitched to a natural rubber cupsole. The everyday sneaker, perfected.',
    details: ['Full-grain leather upper', 'Rubber cupsole', 'Removable insole', 'Wipe clean'],
    colors: [COLORS.white, COLORS.black], sizes: SHOES,
    images: [img('1549298916-b41d501d3772'), img('1552374196-1ab2a1c593e8'), img('1488161628813-04466f872be2')],
    tags: ['new', 'bestseller'], rating: 4.7, reviews: 389,
  },
  {
    id: 'p13', name: 'Belted Trench Coat', category: 'women', type: 'Outerwear',
    price: 22990,
    description: 'A modern take on the classic trench in water-repellent cotton gabardine, with storm flap, raglan sleeve and a removable belt.',
    details: ['100% cotton gabardine', 'Water repellent', 'Relaxed fit', 'Dry clean only'],
    colors: [COLORS.stone, COLORS.black], sizes: APPAREL,
    images: [img('1520975954732-35dd22299614'), img('1509631179647-0177331693ae'), img('1539533018447-63fcce2678e3')],
    tags: ['seasonal', 'featured'], rating: 4.8, reviews: 144,
  },
  {
    id: 'p14', name: 'Editorial Knit Set', category: 'women', type: 'Knitwear',
    price: 14990, salePrice: 10990,
    description: 'A fine-gauge ribbed knit top and matching wide trouser — a polished co-ord that dresses up or down.',
    details: ['60% viscose, 40% nylon', 'Two-piece set', 'Relaxed fit', 'Hand wash cold'],
    colors: [COLORS.ivory, COLORS.camel, COLORS.black], sizes: APPAREL,
    images: [img('1529139574466-a303027c1d8b'), img('1487222477894-8943e31ef7b2'), img('1469334031218-e382a71b716b')],
    tags: ['new', 'seasonal'], rating: 4.5, reviews: 41,
  },
  {
    id: 'p15', name: 'Studio Statement Blazer', category: 'women', type: 'Tailoring',
    price: 17990,
    description: 'Strong-shouldered and softly oversized, cut from a crepe suiting with a single-button front and jetted pockets.',
    details: ['63% polyester, 33% viscose, 4% elastane', 'Oversized fit', 'Half lined', 'Dry clean only'],
    colors: [COLORS.black, COLORS.ivory], sizes: APPAREL,
    images: [img('1509631179647-0177331693ae'), img('1581044777550-4cfa60707c03'), img('1505022610485-0249ba5b3675')],
    tags: ['featured', 'bestseller'], rating: 4.8, reviews: 97,
  },
  {
    id: 'p16', name: 'Weekend Linen Shirt', category: 'men', type: 'Shirts',
    price: 6490,
    description: 'Breathable stone-washed linen with a camp collar and relaxed drape. Built for warm days and slow evenings.',
    details: ['100% European linen', 'Camp collar', 'Relaxed fit', 'Machine wash 30°'],
    colors: [COLORS.ivory, COLORS.sage, COLORS.navy], sizes: MENS,
    images: [img('1618354691373-d851c5c3a990'), img('1596755094514-f87e34085b2c'), img('1516826957135-700dedea698c')],
    tags: ['new'], rating: 4.4, reviews: 72,
  },
  {
    id: 'p17', name: 'Pleated Wide Trouser', category: 'women', type: 'Trousers',
    price: 9490, salePrice: 7490,
    description: 'High-rise, double-pleated and fluid through the leg — a tailored essential that elongates every silhouette.',
    details: ['70% polyester, 30% viscose', 'High rise', 'Wide leg', 'Machine wash 30°'],
    colors: [COLORS.stone, COLORS.black, COLORS.camel], sizes: APPAREL,
    images: [img('1487222477894-8943e31ef7b2'), img('1505022610485-0249ba5b3675'), img('1529139574466-a303027c1d8b')],
    tags: ['bestseller'], rating: 4.6, reviews: 158,
  },
  {
    id: 'p18', name: 'Merino Crew Sweater', category: 'men', type: 'Knitwear',
    price: 9990,
    description: 'Extra-fine merino knitted to a clean crew neck. Temperature regulating, light enough to layer, warm enough on its own.',
    details: ['100% extra-fine merino', 'Regular fit', 'Ribbed trims', 'Hand wash cold'],
    colors: [COLORS.camel, COLORS.navy, COLORS.charcoal], sizes: MENS,
    images: [img('1479064555552-3ef4979f8908'), img('1488161628813-04466f872be2'), img('1475180098004-ca77a66827be')],
    tags: ['seasonal', 'new'], rating: 4.7, reviews: 203,
  },
  {
    id: 'p19', name: 'Pleated Evening Gown', category: 'women', type: 'Dresses',
    price: 27990,
    description: 'Floor-sweeping micro-pleats in a weightless chiffon, cinched at the waist with an open back. Made to be remembered.',
    details: ['100% polyester chiffon', 'Concealed side zip', 'Floor length', 'Dry clean only'],
    colors: [COLORS.black, COLORS.oxblood], sizes: APPAREL,
    images: [img('1496747611176-843222e1e57c'), img('1594633312681-425c7b97ccd1'), img('1485968579580-b6d095142e6e')],
    tags: ['featured', 'seasonal'], rating: 4.9, reviews: 36,
  },
  {
    id: 'p20', name: 'Structured Mini Bag', category: 'accessories', type: 'Bags',
    price: 12990, salePrice: 9990,
    description: 'A compact top-handle bag in smooth calf leather with a detachable strap and a sculptural gold clasp.',
    details: ['Smooth calf leather', 'Detachable strap', '22 × 15 × 8 cm', 'Dust bag included'],
    colors: [COLORS.black, COLORS.ivory, COLORS.oxblood], sizes: ONE,
    images: [img('1584917865442-de89df76afd3'), img('1548036328-c9fa89d128fa'), img('1483985988355-763728e1935b')],
    tags: ['new', 'bestseller'], rating: 4.8, reviews: 118,
  },
]

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'accessories', label: 'Accessories' },
]

export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

export const heroSlides = [
  {
    image: img('1469334031218-e382a71b716b', 2000),
    kicker: 'Autumn / Winter 2026',
    title: ['Quiet', 'Luxury'],
    copy: 'Considered silhouettes in wool, silk and leather — designed to be lived in.',
    cta: { label: 'Shop Women', to: '/shop?cat=women' },
  },
  {
    image: img('1617137968427-85924c800a22', 2000),
    kicker: 'The Tailoring Edit',
    title: ['Sharp', 'Lines'],
    copy: 'Half-canvas suits and soft-shouldered jackets for the modern man.',
    cta: { label: 'Shop Men', to: '/shop?cat=men' },
  },
  {
    image: img('1509631179647-0177331693ae', 2000),
    kicker: 'Evening Collection',
    title: ['After', 'Dark'],
    copy: 'Liquid silks, micro-pleats and statement tailoring for every occasion.',
    cta: { label: 'Explore Edit', to: '/shop?tag=featured' },
  },
]

export const collections = {
  men: {
    title: 'Men',
    subtitle: 'Tailoring, denim & everyday essentials',
    image: img('1516826957135-700dedea698c', 1600),
    detail: img('1552374196-1ab2a1c593e8', 900),
  },
  women: {
    title: 'Women',
    subtitle: 'Fluid dresses, sculpted coats & knitwear',
    image: img('1515886657613-9f3515b0c78f', 1600),
    detail: img('1487222477894-8943e31ef7b2', 900),
  },
}

export const seasonal = [
  { title: 'The Winter Coat', label: 'Outerwear', image: img('1544022613-e87ca75a784a', 1200), to: '/shop?type=Outerwear' },
  { title: 'Soft Knits', label: 'Knitwear', image: img('1479064555552-3ef4979f8908', 1200), to: '/shop?type=Knitwear' },
  { title: 'Evening Silks', label: 'Dresses', image: img('1496747611176-843222e1e57c', 1200), to: '/shop?type=Dresses' },
  { title: 'Leather Goods', label: 'Bags', image: img('1548036328-c9fa89d128fa', 1200), to: '/shop?type=Bags' },
]

export const editorial = {
  image: img('1558769132-cb1aea458c5e', 2200),
  inset: img('1529139574466-a303027c1d8b', 900),
}

export const formatPrice = (n) => `Rs. ${n.toLocaleString('en-PK')}`
export const discountPct = (p) => (p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0)
export const finalPrice = (p) => p.salePrice ?? p.price
export const getProduct = (id) => products.find((p) => p.id === id)
