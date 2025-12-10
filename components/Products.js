"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { trackEvent } from '@/lib/posthog';
import { BsArrowRight } from 'react-icons/bs';
import * as PiIcons from 'react-icons/pi';
import * as BsIcons from 'react-icons/bs';

// Function to get icon component based on categoryIcon string
const getIconComponent = (iconName) => {
    try {
        // First check BsIcons (since API uses Bs icons)
        if (iconName && BsIcons[iconName]) {
            return BsIcons[iconName];
        }
        // Then check PiIcons
        if (iconName && PiIcons[iconName]) {
            return PiIcons[iconName];
        }
    } catch (error) {
        console.error(`Icon ${iconName} not found:`, error);
    }
    return BsIcons.BsQuestionCircle || PiIcons.PiQuestion;
};

// Extract color from categoryColorClass
const extractColorFromClass = (colorClass) => {
    if (!colorClass) return '#9b1c20'; // Default color
    
    // Extract color from class like "hover:text-red-700 hover:border-red-700"
    const match = colorClass.match(/hover:text-([\w-]+)/);
    if (match) {
        const colorName = match[1];
        // Map Tailwind color names to hex codes
        const colorMap = {
            'red-700': '#b91c1c',
            'blue-900': '#1e3a8a',
            'green-700': '#15803d',
            'blue-800': '#1e40af',
            'indigo-700': '#4338ca',
            'purple-700': '#7c3aed',
            'yellow-600': '#ca8a04',
            'gray-700': '#374151',
        };
        return colorMap[colorName] || '#9b1c20';
    }
    return '#9b1c20'; // Default color
};

// Get company background color based on company code
const getCompanyColor = (companyCode) => {
    switch (companyCode) {
        case 'ULA': return '#3d834d';
        case 'UGI': return '#286278';
        case 'UP': return '#f79620';
        default: return '#9b1c20';
    }
};

// Get company name based on company code
const getCompanyName = (companyCode) => {
    switch (companyCode) {
        case 'ULA': return 'United Life Assurance';
        case 'UGI': return 'United General Insurance';
        case 'UP': return 'United Pay';
        default: return 'United Group';
    }
};

// Sanitize URL to ensure it's valid
const sanitizeImageUrl = (url) => {
    if (!url) return '/family.jpg'; // Default fallback
    // Fix double slashes issue
    return url.replace(/https:\/\/(.*?)\/\//, 'https://$1/');
};

// Generate description based on category name (if API doesn't provide one)
const getDescription = (categoryName, companyCode, apiDescription) => {
    if (apiDescription) return apiDescription;
    const companyName = getCompanyName(companyCode);
    return `Comprehensive ${categoryName.toLowerCase()} coverage from ${companyName}. Protect what matters most with our reliable and affordable solutions.`;
};

// Generate link based on category name
const getProductLink = (categoryName) => {
    return `/products/${categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
};

const ProductCard = ({ category }) => {
    const {
        companyCode,
        categoryName,
        description,
        categoryIcon,
        categoryColorClass,
        image
    } = category;

    const IconComponent = getIconComponent(categoryIcon);
    const bgColor = getCompanyColor(companyCode);
    const textColor = extractColorFromClass(categoryColorClass);
    
    // Use image URL from API or fallback
    const imageUrl = image?.asset?.url 
        ? sanitizeImageUrl(image.asset.url)
        : `/products/${categoryName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    
    const displayDescription = getDescription(categoryName, companyCode, description);
    const link = getProductLink(categoryName);

    return (
        <Link
            href={link}
            className="block group h-full px-2"
            onClick={() => trackEvent('featured_product_learn_more_clicked', {
                product_clicked: categoryName,
                product_company: companyCode,
                destination_link: link,
                location: 'featured_products_section'
            })}
        >
            <div
                className="hover:-2xl rounded-2xl relative flex flex-col h-full cursor-pointer transition-all duration-500 overflow-hidden"
                style={{ backgroundColor: bgColor }}
            >
                {/* Image Container with Overlay */}
                <div className="h-[800px] relative overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={categoryName}
                        fill
                        priority={true}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                            // Fallback to a default image if the specified image doesn't exist
                            e.target.src = '/family.jpg';
                        }}
                    />

                    {/* Icon Overlay - EXACT SAME AS BEFORE */}
                    <div 
                        style={{ backgroundColor: bgColor }} 
                        className="absolute rounded-full flex items-center justify-center px-6 top-4 -left-4 text-white"
                    >
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg backdrop-blur-sm">
                                <IconComponent className="text-2xl" />
                            </div>
                            <h3 className="text-xl text-center font-semibold font-outfit group-hover:text-white transition-colors">
                                {categoryName}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Content - EXACT SAME AS BEFORE */}
                <div className="flex flex- pb-0 flex-grow items-center justify-between text-white" style={{ backgroundColor: bgColor }}>
                    <div className="px-2 line-clamp-2 h-11 text-sm space-y-4">
                        <p>{displayDescription}</p>
                    </div>
                    {/* CTA - EXACT SAME AS BEFORE */}
                    <div
                        className="flex items-center min-w-[10rem] justify-center hover:bg-white py-6 space-x-2 text-white hover:text-current border-t border-white/30 transition-all duration-300 group-hover:border-transparent"
                        style={{
                            '--hover-text-color': bgColor
                        }}
                    >
                        <span className="text-sm font-semibold group-hover:text-[var(--hover-text-color)]">
                            Learn More
                        </span>
                        <BsArrowRight
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--hover-text-color)]"
                        />
                    </div>
                </div>

                {/* Hover Effect Overlay - EXACT SAME AS BEFORE */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl pointer-events-none" />
            </div>
        </Link>
    );
};

// Custom arrow components - EXACT SAME AS BEFORE
const CustomLeftArrow = ({ onClick, ...rest }) => {
    return (
        <button
            onClick={() => onClick()}
            className="absolute left-10 top z-10 p-3 rounded-xl bg-[#9b1c20] text-white hover:bg-[#9b1c20] hover:text-white transition-all duration-300 -lg hover:-xl"
            aria-label="Previous products"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    );
};

const CustomRightArrow = ({ onClick, ...rest }) => {
    return (
        <button
            onClick={() => onClick()}
            className="absolute right-10 z-10 p-3 rounded-xl bg-[#9b1c20] text-white hover:bg-[#9b1c20] hover:text-white transition-all duration-300 -lg hover:-xl"
            aria-label="Next products"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
};

function Products() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://website.api.united.co.sz/api/product-categories');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.success) {
                    // Remove isActive filter since API doesn't include it
                    // Sort by displayOrder
                    const sortedCategories = data.data
                        .sort((a, b) => a.displayOrder - b.displayOrder);
                    setCategories(sortedCategories);
                } else {
                    throw new Error(data.message || 'Failed to fetch categories');
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Responsive configuration for react-multi-carousel - EXACT SAME AS BEFORE
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1400 },
            items: 3,
            partialVisibilityGutter: 20
        },
        desktop: {
            breakpoint: { max: 1400, min: 1024 },
            items: 3,
            partialVisibilityGutter: 20
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2,
            partialVisibilityGutter: 0
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
            partialVisibilityGutter: 30
        }
    };

    // Custom dot component - EXACT SAME AS BEFORE
    const CustomDot = ({ onClick, ...rest }) => {
        const { active } = rest;

        return (
            <button
                className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${active ? 'bg-[#9b1c20] w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                onClick={() => onClick()}
            />
        );
    };

    if (loading) {
        return (
            <div className="font-outfit max-w-[1400px] mx-auto px-4 lg:p-0 w-full space-y-12">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#9b1c20] mb-2 font-outfit">
                                Featured Products
                            </h3>
                            <p className="text-gray-600 max-w-2xl text-lg lg:text-xl">
                                Explore our range of innovative solutions from United General Insurance,
                                United Life Assurance, and United Pay.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-pulse text-lg">Loading products...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="font-outfit max-w-[1400px] mx-auto px-4 lg:p-0 w-full space-y-12">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#9b1c20] mb-2 font-outfit">
                                Featured Products
                            </h3>
                            <p className="text-gray-600 max-w-2xl text-lg lg:text-xl">
                                Explore our range of innovative solutions from United General Insurance,
                                United Life Assurance, and United Pay.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-96">
                        <div className="text-red-600">Error loading products: {error}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=''>
            <div className="font-outfit max-w-[1400px] mx-auto px-4 lg:p-0 w-full space-y-12 ">
                {/* Carousel Section - EXACT SAME AS BEFORE */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#9b1c20] mb-2 font-outfit">
                                Featured Products
                            </h3>
                            <p className="text-gray-600 max-w-2xl text-lg lg:text-xl">
                                Explore our range of innovative solutions from United General Insurance,
                                United Life Assurance, and United Pay.
                            </p>
                        </div>
                    </div>

                    {/* React Multi Carousel - EXACT SAME AS BEFORE */}
                    <div className="relative py-2 gap-4">
                        {categories.length > 0 ? (
                            <Carousel
                                responsive={responsive}
                                infinite={true}
                                autoPlaySpeed={5000}
                                keyBoardControl={true}
                                customTransition="transform 500ms ease-in-out"
                                transitionDuration={500}
                                containerClass="carousel-container"
                                itemClass="carousel-item-padding-80-px"
                                arrows={true}
                                customLeftArrow={<CustomLeftArrow />}
                                customRightArrow={<CustomRightArrow />}
                                autoPlay={true}
                                customDot={<CustomDot />}
                                dotListClass="custom-dot-list"
                                partialVisible={true}
                                removeArrowOnDeviceType={['mobile']}
                                rewind={false}
                                rewindWithAnimation={false}
                                rtl={false}
                                shouldResetAutoplay={true}
                                slidesToSlide={1}
                                swipeable={true}
                                draggable={true}
                            >
                                {categories.map((category, index) => (
                                    <div key={`${category.companyCode}-${category.categoryName}-${index}`} className="h-[520px]">
                                        <ProductCard category={category} />
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <div className="flex justify-center items-center h-96">
                                <div className="text-gray-500">No products available at the moment.</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;