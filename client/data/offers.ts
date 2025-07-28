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
    title: "Lakme Salon Discount",
    brand: "Lakme Salon",
    description: "For anyone to use • Online • Study & Stationery",
    image: "/assets/newarrivals/lakmesalon.jpg",
    logo: "/assets/newarrivals/lakmelogo.png",
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
    image: "/assets/newarrivals/soxytoes.jpg",
    logo: "/assets/newarrivals/soxytoes-logo.png",
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
    title: "lakme Discount",
    brand: "Lakme",
    description: "For students • Online • Beauty & Personal Care",
    image: "/assets/newarrivals/lakme.png",
    logo: "/assets/newarrivals/lakmelogo.png",
    badge: "Student Exclusive",
    discount: "15% off",
    coupon: "LAKME15",
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
    image: "/assets/newarrivals/salty-card.png",
    logo: "/assets/newarrivals/salty-logo.png",
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
    image: "/assets/newarrivals/nike-card.png",
    logo: "/assets/newarrivals/nike-logo.png",
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
  // Add more offers as needed
];
