// All Brands across the BrokeBro application
// This file contains a comprehensive list of all brands from all data sources

export interface BrandCategory {
  name: string;
  brands: string[];
  description: string;
}

export const brandCategories: BrandCategory[] = [
  {
    name: "Offers & Deals",
    description: "Brands from the main offers data",
    brands: [
      "Nail Gallery",
      "NOIR & LIN", 
      "Salon Azure",
      "one8",
      "Minou Nails",
      "Rikhi Ram",
      "Lakme Salon",
      "soxytoes",
      "Salty",
      "Nike",
      "glued",
      "muscle junkie"
    ]
  },
  {
    name: "Most Viewed",
    description: "Popular brands from most viewed section",
    brands: [
      "glued",
      "Ultimate RC",
      "muscle junkie",
      "soxytoes"
    ]
  },
  {
    name: "Fashion & Beauty",
    description: "Brands from fashion and beauty categories",
    brands: [
      "LEVIS",
      "NIKE", 
      "AJIO",
      "FAST TRACK",
      "Salty",
      "LAKME SALON",
      "BIBA",
      "SWISS BEAUTY",
      "Lakmé"
    ]
  },
  {
    name: "Technology",
    description: "Technology brands and services",
    brands: [
      "Microsoft 365 Student Offer",
      "Notion for Students",
      "Canva for Education", 
      "Spotify Premium Student",
      "Adobe Creative Cloud Student Plan",
      "Apple Music Student Plan",
      "Grammarly for Students",
      "Lenovo Student Store",
      "Realme Student Program",
      "Dell Student Offers",
      "HP Student Store",
      "GluedRC Game Student Offer"
    ]
  },
  {
    name: "Gym & Fitness",
    description: "Gym partners and fitness brands",
    brands: [
      "Anytime Fitness",
      "HR 7",
      "Muscle Junkie", 
      "Pro Ultimate",
      "Nutrabay"
    ]
  },
  {
    name: "Travel & Lifestyle",
    description: "Travel and lifestyle brands",
    brands: [
      "Axon",
      "Jetstar",
      "Expedia",
      "Qantas", 
      "Atlas"
    ]
  },
  {
    name: "Companies & Internships",
    description: "Companies offering internships",
    brands: [
      "BrokeBro",
      "Pick n Treat",
      "Urban Pulse Innovation Pvt Ltd",
      "CIIS",
      "BrokeBro Tech"
    ]
  }
];

// Get all unique brands across all categories
export const getAllBrands = (): string[] => {
  const allBrands = brandCategories.flatMap(category => category.brands);
  return Array.from(new Set(allBrands))
    .filter(brand => brand && brand.length > 0)
    .sort((a, b) => a.localeCompare(b));
};

// Get brands by category
export const getBrandsByCategory = (categoryName: string): string[] => {
  const category = brandCategories.find(cat => cat.name === categoryName);
  return category ? category.brands : [];
};

// Search brands across all categories
export const searchBrands = (query: string): string[] => {
  const allBrands = getAllBrands();
  return allBrands.filter(brand => 
    brand.toLowerCase().includes(query.toLowerCase())
  );
};

// Get brand category info
export const getBrandCategory = (brandName: string): BrandCategory | null => {
  return brandCategories.find(category => 
    category.brands.some(brand => 
      brand.toLowerCase() === brandName.toLowerCase()
    )
  ) || null;
};

export default getAllBrands; 