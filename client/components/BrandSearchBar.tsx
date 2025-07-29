import React, { useState, useRef, useEffect } from 'react';
import { offers } from '../data/offers';
import { mostViewed } from '../data/mostViewed';
import { mensFashion } from '../app/(categories)/fashion/data/mensFashionData';
import { womensFashion } from '@/app/(categories)/fashion/data/womensFashionData';
import { beauty } from '@/app/(categories)/fashion/data/beautyData';
import featuredProducts from '../app/(categories)/technology/featuredProducts';
import AnimatedEyes from './ui/AnimatedEyes';
// Extract unique brands from offers, mostViewed, and mensFashion
type Brand = string;
const getUniqueBrands = (): Brand[] => {
    const offerBrands = offers.map((offer) => offer.brand.trim());
    const mostViewedBrands = mostViewed.map((item) => item.brand.trim());
    const mensFashionBrands = mensFashion.map((item) => item.brand.trim());
    const womensFashionBrands = womensFashion.map((item) => item.brand.trim());
    const beautyBrands = beauty.map((item) => item.brand.trim());
    const featuredProductBrands = featuredProducts.map((item) => (item.name || '').trim());
    return Array.from(new Set([
        ...offerBrands,
        ...mostViewedBrands,
        ...mensFashionBrands,
        ...womensFashionBrands,
        ...beautyBrands,
        ...featuredProductBrands
    ])).sort((a, b) => a.localeCompare(b));
};

const BrandSearchBar: React.FC<{ onSelect?: (brand: Brand) => void }> = ({ onSelect }) => {
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredBrands, setFilteredBrands] = useState<Brand[]>(getUniqueBrands());
    const inputRef = useRef<HTMLInputElement>(null);
    const allBrands = getUniqueBrands();

    useEffect(() => {
        if (input === '') {
            setFilteredBrands(allBrands);
        } else {
            setFilteredBrands(
                allBrands.filter((brand) =>
                    brand.toLowerCase().includes(input.toLowerCase())
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (brand: Brand) => {
        setInput(brand);
        setShowSuggestions(false);
        if (onSelect) onSelect(brand);
    };

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
            <div style={{ position: 'relative', width: '100%' }}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search brands..."
                    value={input}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    style={{
                        width: '100%',
                        padding: '8px 44px 8px 12px',
                        borderRadius: 32,
                        border: '1px solid #ccc',
                        fontSize: 16,
                        boxSizing: 'border-box',
                        background: '#fff',
                    }}
                />
                <div style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    zIndex: 2
                }}>
                    {/* AnimatedEyes on the right side of the input */}
                    <AnimatedEyes />
                </div>
            </div>
            {showSuggestions && filteredBrands.length > 0 && (
                <ul
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: '#fff',
                        border: '1px solid #ccc',
                        borderTop: 'none',
                        zIndex: 10,
                        maxHeight: 200,
                        overflowY: 'auto',
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                    }}
                >
                    {filteredBrands.map((brand) => (
                        <li
                            key={brand}
                            onClick={() => handleSuggestionClick(brand)}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee',
                                background: input === brand ? '#f0f0f0' : '#fff',
                            }}
                        >
                            {brand}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BrandSearchBar;
