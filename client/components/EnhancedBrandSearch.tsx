import React, { useState, useRef, useEffect } from 'react';
import { getAllBrands, getBrandCategory, brandCategories } from '../data/allBrands';
import AnimatedEyes from './ui/AnimatedEyes';

interface BrandOffer {
  brand: string;
  offer: string;
  category: string;
  isPromoted?: boolean;
  logo?: string;
}

// Enhanced brand data with realistic offers
const getBrandOffers = (): BrandOffer[] => {
  const allBrands = getAllBrands();
  
  return allBrands.map(brand => {
    const category = getBrandCategory(brand);
    
    // Generate realistic offers based on brand and category
    let offer = "Student Discount";
    
    // Technology offers
    if (brand.toLowerCase().includes('microsoft')) {
      offer = "Free 3-Month Trial";
    } else if (brand.toLowerCase().includes('spotify')) {
      offer = "50% Off Premium Plan";
    } else if (brand.toLowerCase().includes('adobe')) {
      offer = "60% Off Creative Cloud";
    } else if (brand.toLowerCase().includes('apple music')) {
      offer = "50% Off Student Plan";
    } else if (brand.toLowerCase().includes('notion')) {
      offer = "Free Plus Plan";
    } else if (brand.toLowerCase().includes('canva')) {
      offer = "Free Pro Access";
    } else if (brand.toLowerCase().includes('grammarly')) {
      offer = "Free Premium Features";
    }
    // Fashion offers
    else if (brand.toLowerCase().includes('nike')) {
      offer = "20% Off Student Discount";
    } else if (brand.toLowerCase().includes('levis')) {
      offer = "22% Off Denim";
    } else if (brand.toLowerCase().includes('ajio')) {
      offer = "15% Off Order Value";
    } else if (brand.toLowerCase().includes('biba')) {
      offer = "22% Off Ethnic Wear";
    } else if (brand.toLowerCase().includes('salty')) {
      offer = "18% Off Sitewide";
    } else if (brand.toLowerCase().includes('soxytoes')) {
      offer = "30% Off Socks & Accessories";
    }
    // Beauty offers
    else if (brand.toLowerCase().includes('lakme')) {
      offer = "40% Off Beauty Essentials";
    } else if (brand.toLowerCase().includes('swiss beauty')) {
      offer = "15% Off Sitewide";
    } else if (brand.toLowerCase().includes('salon azure')) {
      offer = "25% Off Salon Services";
    } else if (brand.toLowerCase().includes('nail gallery')) {
      offer = "15% Off Nail Services";
    }
    // Gym & Fitness offers
    else if (brand.toLowerCase().includes('anytime fitness')) {
      offer = "Special Student Rates";
    } else if (brand.toLowerCase().includes('muscle junkie')) {
      offer = "8% Off Supplements";
    } else if (brand.toLowerCase().includes('nutrabay')) {
      offer = "Up to 15% Off Nutrition";
    }
    // Travel offers
    else if (brand.toLowerCase().includes('jetstar')) {
      offer = "Student Travel Deals";
    } else if (brand.toLowerCase().includes('expedia')) {
      offer = "Up to 20% Off Stays";
    } else if (brand.toLowerCase().includes('qantas')) {
      offer = "Student Flight Discounts";
    }
    // Gaming & Entertainment
    else if (brand.toLowerCase().includes('glued')) {
      offer = "Exclusive Gaming Combos";
    } else if (brand.toLowerCase().includes('ultimate rc')) {
      offer = "1+1 Racing Offer";
    }
    // Default offers based on category
    else if (category?.name === "Technology") {
      offer = "Student Plan Available";
    } else if (category?.name === "Fashion & Beauty") {
      offer = "10-20% Student Discount";
    } else if (category?.name === "Gym & Fitness") {
      offer = "Special Student Rates";
    } else if (category?.name === "Travel & Lifestyle") {
      offer = "Student Travel Deals";
    } else if (category?.name === "Offers & Deals") {
      offer = "Exclusive Student Offer";
    }
    
    return {
      brand,
      offer,
      category: category?.name || "Other",
      isPromoted: Math.random() > 0.7, // 30% chance to be promoted
      logo: `/assets/logos/${brand.toLowerCase().replace(/\s+/g, '-')}.png`
    };
  });
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

  const handleSuggestionClick = (brand: string) => {
    setInput(brand);
    setShowSuggestions(false);
    if (onSelect) onSelect(brand);
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
                  <div
                    key={brandOffer.brand}
                    onClick={() => handleSuggestionClick(brandOffer.brand)}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      borderBottom: '1px solid #f3f4f6',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                    }}
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
                  </div>
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
                  <div
                    key={brandOffer.brand}
                    onClick={() => handleSuggestionClick(brandOffer.brand)}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      borderBottom: '1px solid #f3f4f6',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                    }}
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
                  </div>
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