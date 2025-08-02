import React, { useState, useRef, useEffect } from 'react';
import { getAllBrands, getBrandCategory } from '../data/allBrands';
import AnimatedEyes from './ui/AnimatedEyes';

// Extract unique brands from all data sources
type Brand = string;

const getUniqueBrands = (): Brand[] => {
    return getAllBrands();
};

interface BrandSearchBarProps {
    onSelect?: (brand: Brand) => void;
    inputClassName?: string;
    placeholder?: string;
}

const BrandSearchBar: React.FC<BrandSearchBarProps> = ({ onSelect, inputClassName = '', placeholder = 'Search brands...' }) => {
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
                    placeholder={placeholder}
                    value={input}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    className={inputClassName}
                    style={{
                        width: '100%',
                        padding: '8px 44px 8px 42px',
                        borderRadius: 32,
                        border: '1px solid #ccc',
                        fontSize: 16,
                        boxSizing: 'border-box',
                        background: '#fff',
                        color: 'black',
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
                    {filteredBrands.map((brand) => {
                        const category = getBrandCategory(brand);
                        return (
                            <li
                                key={brand}
                                onClick={() => handleSuggestionClick(brand)}
                                style={{
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #eee',
                                    background: input === brand ? '#f0f0f0' : '#fff',
                                    color: 'black',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{brand}</span>
                                    {category && (
                                        <span style={{ 
                                            fontSize: '12px', 
                                            color: '#666', 
                                            backgroundColor: '#f5f5f5',
                                            padding: '2px 6px',
                                            borderRadius: '4px'
                                        }}>
                                            {category.name}
                                        </span>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default BrandSearchBar;
