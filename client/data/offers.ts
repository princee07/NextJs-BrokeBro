export interface Offer {
  title: string;
  brand: string;
  description: string;
  image: string;
  logo: string;
  badge?: string | null;
  discount?: string;
  coupon?: string;
  terms?: string[];
}

export const offers: Offer[] = [
  {
    title: "15% off on nail services • 20% off on other services",
    brand: "Nail Gallery",
    description: "Special discounts on nail and beauty services • In-Store • Nails & Beauty",
    image: "/assets/newarrivals/nailgallery.png",
    logo: "/assets/newarrivals/nails.png",
    badge: "New Arrival",
    discount: "15% off on nail services • 20% off on other services",
    coupon: "NAILGALLERY2024",
    terms: [
      "Offer valid for a limited time only.",
      "15% off applies to all nail services.",
      "20% off applies to other beauty services.",
      "Cannot be combined with other ongoing promotions.",
      "Visit Nail Gallery for full terms and services."
    ]
  },

  {
    "title": "15% Off on Tees for BrokeBro Students",
    "brand": "NOIR & LIN",
    "description": "Exclusive 15% off on T-shirts, oversized T-shirts, and polos for students • Fashion • Online",
    "image": "/assets/newarrivals/noir.png",
    "logo": "/assets/newarrivals/noirs.png",
    "badge": "Student Exclusive",
    "discount": "15% off",
    "coupon": "NOIRBROKE15",
    "terms": [
      "Valid on selected products: T-shirts, oversized T-shirts, and polos.",
      "Coupon code: NOIRBROKE15 must be applied at checkout.",
      "Future access to sweatshirts and hoodies under same offer based on student traction.",
      "Offer valid for a limited time and cannot be combined with other promotions.",
      "Check NOIR's website for eligible products and full terms."
    ]
  },

  {
    title: "Desert free for Couple on bill 3k",
    brand: "one8",
    description: "Exclusive discount for couples • Online • Food & Drinks",
    image: "/assets/newarrivals/one.jpg",
    logo: "/assets/newarrivals/one.png",
    badge: "New Arrival",
    discount: "Special Intro Offer",
    coupon: "ONE8LAUNCH",
    terms: [
      "Coupon valid for a limited time only.",
      "Applicable only on select products/categories.",
      "Cannot be combined with other offers.",
      "See brand website for full details."
    ]
  },
  {
    title: "Book an appointment 1000 for any nail services 20% for other services",
    brand: "Minou Nails",
    description: "Exclusive offer for beauty lovers • In-Store • Nails & Beauty",
    image: "/assets/newarrivals/minousnails.png",
    logo: "/assets/newarrivals/nails.png",
    badge: "New Arrival",
    discount: "Special Launch Offer",
    coupon: "MINOUS2000",
    terms: [
      "Offer valid for a limited time only.",

      "Applicable only on nail services.",
      "Cannot be combined with other discounts.",
      "Visit Minous Nails for full offer details."
    ]
  },

  {
    title: "Rikhi Ram Instrument Offers",
    brand: "Rikhi Ram",
    description: "Indian musical instruments • In-store & Online • Music & Accessories",
    image: "/assets/newarrivals/rikhiram.png",
    logo: "/assets/newarrivals/rikhiram-card.png",
    badge: "Only on brokeBro",
    discount: "Up to 15% off + Free Accessories",
    coupon: "RIKHI15",
    terms: [
      "Get 10% off on purchases above ₹3000.",
      "Get 15% off on Indian instruments purchase above ₹5000.",
      "Free guitar accessories with every guitar purchase.",
      "Offer valid for a limited time only.",
      "Cannot be combined with other ongoing offers."
    ]
  },

  {
    title: "Lakme Salon Discount",
    brand: "Lakme Salon",
    description: "salon services • Online • Beauty & Personal Care",
    image: "/assets/newarrivals/lakmelogos.png",
    logo: "/assets/newarrivals/lakme.png",
    badge: "Only on brokeBro",
    discount: "12% off",
    coupon: "LAKME12",
    terms: [
      "Coupon valid for a limited time only.",
      "Applicable only on select products/categories.",
      "Cannot be combined with other offers.",
      "See brand website for full details."
    ]
  },
  {
    title: "soxytoes Discount",
    brand: "soxytoes",
    description: "For students only ",
    image: "/assets/newarrivals/soxytoeslogo.png",
    logo: "/assets/newarrivals/soxytoes.jpg",
    badge: null,
    discount: "10% off",
    coupon: "SOXY10",
    terms: [
      "Coupon valid for a limited time only.",
      "Applicable only on select products/categories.",
      "Cannot be combined with other offers.",
      "See brand website for full details."
    ]
  },

  {
    title: "salty Discount",
    brand: "Salty",
    description: "For students & educators • Online • Fashion",
    image: "/assets/newarrivals/salty.png",
    logo: "/assets/newarrivals/salty-card.png",
    badge: null,
    discount: "18% off",
    coupon: "SALTY18",
    terms: [
      "Coupon valid for a limited time only.",
      "Applicable only on select products/categories.",
      "Cannot be combined with other offers.",
      "See brand website for full details."
    ]
  },
  {
    title: "Nike Discount",
    brand: "Nike",
    description: "For students only • Online • Fashion",
    image: "/assets/newarrivals/nike.png",
    logo: "/assets/newarrivals/nike-card.png",
    badge: "Limited Time",
    discount: "20% off",
    coupon: "NIKE20",
    terms: [
      "Coupon valid for a limited time only.",
      "Applicable only on select products/categories.",
      "Cannot be combined with other offers.",
      "See brand website for full details."
    ]
  },

  {
    title: "glued Discount",
    brand: "glued",
    description: "For gamers • Online • Gaming",
    image: "/assets/mostviewed/gllued.png",
    logo: "/assets/newarrivals/gluedimage.png",
    badge: "Top Rated",
    discount: "15% off",
    coupon: "GLUED15",
    terms: [
      "Coupon valid for a limited time only.",
      "Applicable only on select products/categories.",
      "Cannot be combined with other offers.",
      "See brand website for full details."
    ]
  },
  {
    title: "muscle junkie Discount",
    brand: "muscle junkie",
    description: "For students gym-goers • Online • Fitness",
    image: "/assets/mostviewed/musclejunkie.png",
    logo: "/assets/mostviewed/musclejunkielogo.png",
    badge: null,
    discount: "8% off",
    coupon: "MUSCLE8",
    terms: [
      "Coupon valid for a limited time only.",
      "Applicable only on select products/categories.",
      "Cannot be combined with other offers.",
      "See brand website for full details."
    ]
  },
  {
    title: "soxytoes Discount",
    brand: "soxytoes",
    description: "For students only • Online • Music",
    image: "/assets/newarrivals/soxytoeslogo.png",
    logo: "/assets/newarrivals/soxytoes.jpg",
    badge: null,
    discount: "10% off",
    coupon: "SOXY10",
    terms: [
      "Coupon valid for a limited time only.",
      "Applicable only on select products/categories.",
      "Cannot be combined with other offers.",
      "See brand website for full details."
    ]
  },

  // Add more offers as needed
];
