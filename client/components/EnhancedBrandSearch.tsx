import React, { useState, useRef, useEffect } from 'react';
import { allBrands } from '../app/(categories)/fashion/brand/brandData';
import { offers } from '../data/offers';
import { mostViewed } from '../data/mostViewed';
import featuredProducts from '../app/(categories)/technology/featuredProducts';
// Gym data
import gymDetails from '../app/gym-partner/[gymSlug]/page';
// Travel data
// Flight deals object from flight page
import flightDeals from '../app/(categories)/lifestyle/flight/[flightSlug]/page';
import AnimatedEyes from './ui/AnimatedEyes';


interface BrandOffer {
  brand: string;
  offer: string;
  category: string;
  slug: string;
  image?: string;
  isPromoted?: boolean;
  logo?: string;
}


// Helper to flatten gymDetails object
const getGymOffers = () => {
  return Object.entries(gymDetails).map(([slug, gym]) => ({
    brand: gym.name,
    offer: gym.discount || 'Special Student Rates',
    category: 'Gym',
    slug,
    image: gym.image
  }));
};

// Helper to flatten flightDeals object
const getFlightOffers = () => {
  // flightDeals is an object: { [slug]: { brand, discount, img, ... } }
  return Object.entries(flightDeals).map(([slug, dealRaw]) => {
    const deal = dealRaw as { brand: string; discount: string; img: string };
    return {
      brand: deal.brand,
      offer: deal.discount,
      category: 'Travel',
      slug,
      image: deal.img
    };
  });
};

const getBrandOffers = (): BrandOffer[] => {
  // Fashion brands
  const fashion = allBrands.map(b => ({
    brand: b.brand,
    offer: b.offer || b.discount,
    category: 'Fashion',
    slug: b.slug,
    image: b.image
  }));

  // Technology
  const technology = featuredProducts.map(p => ({
    brand: p.name,
    offer: p.description || 'Student Offer',
    category: 'Technology',
    slug: p.slug || p.name.toLowerCase().replace(/\s+/g, '-'),
    image: p.image
  }));

  // Gym
  const gym = getGymOffers();

  // Travel
  const travel = getFlightOffers();

  // New Arrivals & Most Viewed/Discount
  const newArrivals = offers.filter(o => o.badge && o.badge.toLowerCase().includes('new')).map(o => ({
    brand: o.brand,
    offer: o.title || o.discount,
    category: 'New Arrival',
    slug: o.brand.toLowerCase().replace(/\s+/g, '-'),
    image: o.image
  }));
  const mostViewedDiscount = mostViewed.map(o => ({
    brand: o.brand,
    offer: o.title || o.discount,
    category: 'Most Viewed',
    slug: o.brand.toLowerCase().replace(/\s+/g, '-'),
    image: o.image
  }));

  // Combine all
  return [
    ...fashion,
    ...technology,
    ...gym,
    ...travel,
    ...newArrivals,
    ...mostViewedDiscount
  ];
};

interface EnhancedBrandSearchProps {
  onSelect?: (brand: string) => void;
  inputClassName?: string;
  placeholder?: string;
}

const EnhancedBrandSearch: React.FC<EnhancedBrandSearchProps> = ({
  onSelect,
  inputClassName = '',
  placeholder = 'Search brands, items or categories...'
}) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState<BrandOffer[]>(getBrandOffers());
  const inputRef = useRef<HTMLInputElement>(null);
  const allBrandOffers = getBrandOffers();

  useEffect(() => {
    if (input === '') {
      setFilteredBrands(allBrandOffers);
    } else {
      setFilteredBrands(
        allBrandOffers.filter((brandOffer) =>
          brandOffer.brand.toLowerCase().includes(input.toLowerCase()) ||
          brandOffer.category.toLowerCase().includes(input.toLowerCase()) ||
          brandOffer.offer.toLowerCase().includes(input.toLowerCase())
        )
      );
    }
  }, [input]);

  // Hide suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Hide suggestions on window scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowSuggestions(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setShowSuggestions(true);
  };


  // Route user to correct slug page based on category
  const handleSuggestionClick = (brand: string, slug: string, category: string) => {
    setInput(brand);
    setShowSuggestions(false);
    if (onSelect) onSelect(brand);
    // Routing logic
    let url = '/';
    if (category === 'Fashion') {
      url = `/fashion/brand/${slug}`;
    } else if (category === 'Technology') {
      url = `/technology/featured/${slug}`;
    } else if (category === 'Gym') {
      url = `/gym-partner/${slug}`;
    } else if (category === 'Travel') {
      url = `/lifestyle/flight/${slug}`;
    } else if (category === 'New Arrival' || category === 'Most Viewed') {
      url = `/fashion/brand/${slug}`;
    }
    window.location.href = url;
  };

  // Separate promoted and recommended brands

  const promotedOffers = filteredBrands.filter(brand => brand.isPromoted).slice(0, 3);
  const recommendedOffers = filteredBrands.filter(brand => !brand.isPromoted).slice(0, 9);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 600 }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          className={inputClassName}
          style={{
            width: '100%',
            padding: '12px 44px 12px 16px',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            fontSize: 16,
            boxSizing: 'border-box',
            background: '#fff',
            color: '#1f2937',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            ...(inputClassName?.includes('pl-12') ? { paddingLeft: '48px' } : {})
          }}
        />
        <div style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 2
        }}>
          <AnimatedEyes />
        </div>
      </div>

      {showSuggestions && filteredBrands.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            zIndex: 10,
            maxHeight: 500,
            overflowY: 'auto',
            margin: 0,
            padding: 0,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Promoted Offers Section */}
          {promotedOffers.length > 0 && (
            <div style={{ padding: '16px 0' }}>
              <h3 style={{
                margin: '0 16px 12px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#374151',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Promoted Offers
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {promotedOffers.map((brandOffer) => (
                  <button
                    key={brandOffer.brand}
                    type="button"
                    tabIndex={0}
                    onMouseDown={e => { e.preventDefault(); handleSuggestionClick(brandOffer.brand, brandOffer.slug, brandOffer.category); }}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      borderBottom: '1px solid #f3f4f6',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f9fafb'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; }}
                  >
                    {/* Brand Logo Placeholder */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#6b7280',
                      flexShrink: 0
                    }}>
                      {brandOffer.brand.charAt(0)}
                    </div>

                    {/* Brand Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#111827',
                        marginBottom: '2px'
                      }}>
                        {brandOffer.brand}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        marginBottom: '2px'
                      }}>
                        {brandOffer.offer}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#9ca3af',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Online
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recommended For You Section */}
          {recommendedOffers.length > 0 && (
            <div style={{ padding: '16px 0' }}>
              <h3 style={{
                margin: '0 16px 12px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#374151',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Recommended For You
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recommendedOffers.map((brandOffer) => (
                  <button
                    key={brandOffer.brand}
                    type="button"
                    tabIndex={0}
                    onMouseDown={e => { e.preventDefault(); handleSuggestionClick(brandOffer.brand, brandOffer.slug, brandOffer.category); }}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      borderBottom: '1px solid #f3f4f6',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f9fafb'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; }}
                  >
                    {/* Brand Logo Placeholder */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#6b7280',
                      flexShrink: 0
                    }}>
                      {brandOffer.brand.charAt(0)}
                    </div>

                    {/* Brand Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#111827',
                        marginBottom: '2px'
                      }}>
                        {brandOffer.brand}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        marginBottom: '2px'
                      }}>
                        {brandOffer.offer}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#9ca3af',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Online
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedBrandSearch; 