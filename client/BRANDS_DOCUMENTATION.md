# BrokeBro Brands Documentation

This document contains a comprehensive list of all brands found across the BrokeBro application, organized by category and data source.

## 📊 Brand Statistics

- **Total Unique Brands**: 50+ brands
- **Categories**: 7 main categories
- **Data Sources**: 8 different data files

## 🏷️ Brand Categories

### 1. Offers & Deals (12 brands)
Brands from the main offers data (`data/offers.ts`)

- **Nail Gallery** - Nail and beauty services
- **NOIR & LIN** - Fashion and apparel
- **Salon Azure** - Beauty and personal care
- **one8** - Food and drinks
- **Minou Nails** - Nail services
- **Rikhi Ram** - Musical instruments
- **Lakme Salon** - Beauty services
- **soxytoes** - Fashion accessories
- **Salty** - Fashion and lifestyle
- **Nike** - Sports and footwear
- **glued** - Gaming and entertainment
- **muscle junkie** - Fitness and supplements

### 2. Most Viewed (4 brands)
Popular brands from most viewed section (`data/mostViewed.ts`)

- **glued** - Gaming and entertainment
- **Ultimate RC** - Remote control car racing
- **muscle junkie** - Fitness and supplements
- **soxytoes** - Fashion accessories

### 3. Fashion & Beauty (9 brands)
Brands from fashion and beauty categories

**Men's Fashion** (`app/(categories)/fashion/data/mensFashionData.ts`):
- **LEVIS** - Denim and casual wear
- **NIKE** - Sports and athletic wear
- **AJIO** - Online fashion retail
- **FAST TRACK** - Watches and accessories

**Women's Fashion** (`app/(categories)/fashion/data/womensFashionData.ts`):
- **Salty** - Fashion and lifestyle
- **LAKME SALON** - Beauty services
- **BIBA** - Ethnic and traditional wear
- **SWISS BEAUTY** - Beauty products

**Beauty** (`app/(categories)/fashion/data/beautyData.ts`):
- **Lakmé** - Beauty products
- **SWISS BEAUTY** - Beauty products
- **LAKME SALON** - Beauty services

### 4. Technology (12 brands)
Technology brands and services (`app/(categories)/technology/featuredProducts.ts`)

- **Microsoft 365 Student Offer** - Productivity software
- **Notion for Students** - Note-taking and collaboration
- **Canva for Education** - Design tools
- **Spotify Premium Student** - Music streaming
- **Adobe Creative Cloud Student Plan** - Creative software
- **Apple Music Student Plan** - Music streaming
- **Grammarly for Students** - Writing assistance
- **Lenovo Student Store** - Laptops and computers
- **Realme Student Program** - Smartphones
- **Dell Student Offers** - Laptops and computers
- **HP Student Store** - Laptops and computers
- **GluedRC Game Student Offer** - Gaming and entertainment

### 5. Gym & Fitness (5 brands)
Gym partners and fitness brands

**Gym Partners** (`app/(categories)/gym/gym-partners.tsx`):
- **Anytime Fitness** - Gym chain
- **HR 7** - Gym and fitness
- **Muscle Junkie** - Fitness and supplements
- **Pro Ultimate** - Gym and fitness

**Gym Products** (`app/(categories)/gym/gym-products.tsx`):
- **Nutrabay** - Nutrition and supplements

### 6. Travel & Lifestyle (5 brands)
Travel and lifestyle brands (`app/(categories)/lifestyle/BrandPartnerSlider.tsx`)

- **Axon** - Travel services
- **Jetstar** - Airlines
- **Expedia** - Travel booking
- **Qantas** - Airlines
- **Atlas** - Travel services

### 7. Companies & Internships (5 brands)
Companies offering internships (`components/sections/TopCompanies.tsx`)

- **BrokeBro** - Student platform
- **Pick n Treat** - Food and beverages
- **Urban Pulse Innovation Pvt Ltd** - Technology
- **CIIS** - Education
- **BrokeBro Tech** - Technology

## 📁 Data Sources

The brands are sourced from the following files:

1. `data/offers.ts` - Main offers and deals
2. `data/mostViewed.ts` - Most viewed brands
3. `app/(categories)/fashion/data/mensFashionData.ts` - Men's fashion
4. `app/(categories)/fashion/data/womensFashionData.ts` - Women's fashion
5. `app/(categories)/fashion/data/beautyData.ts` - Beauty products
6. `app/(categories)/technology/featuredProducts.ts` - Technology products
7. `app/(categories)/gym/gym-partners.tsx` - Gym partners
8. `app/(categories)/gym/gym-products.tsx` - Gym products
9. `app/(categories)/lifestyle/BrandPartnerSlider.tsx` - Travel brands
10. `components/sections/TopCompanies.tsx` - Company listings

## 🔍 Search Implementation

The search functionality is implemented in:
- `components/BrandSearchBar.tsx` - Main search component
- `data/allBrands.ts` - Centralized brand data management

### Features:
- **Real-time search** with instant filtering
- **Category labels** showing which category each brand belongs to
- **Alphabetical sorting** for easy browsing
- **Duplicate removal** across all data sources
- **Responsive design** with mobile-friendly interface

## 🚀 Usage

The search bar can be used to:
1. Find specific brands across all categories
2. Discover new brands by browsing suggestions
3. Filter brands by category
4. Access brand-specific offers and deals

## 📈 Maintenance

To add new brands:
1. Add the brand to the appropriate data file
2. Update `data/allBrands.ts` if needed
3. The search will automatically include new brands

## 🎯 Key Benefits

- **Comprehensive coverage** of all brands in the application
- **Organized categorization** for better user experience
- **Centralized management** for easy maintenance
- **Enhanced search experience** with category labels
- **Scalable architecture** for future brand additions 