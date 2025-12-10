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
        // Check in BsIcons first (since API uses Bs icons)
        if (iconName && BsIcons[iconName]) {
            return BsIcons[iconName];
        }
        // Then check in PiIcons
        if (iconName && PiIcons[iconName]) {
            return PiIcons[iconName];
        }
    } catch (error) {
        console.error(`Icon ${iconName} not found:`, error);
    }
    // Default icon
    return BsIcons.BsQuestionCircle || PiIcons.PiQuestion;
};

// Extract color from categoryColorClass
const extractColorFromClass = (colorClass) => {
    if (!colorClass) return '#9b1c20';
    
    const match = colorClass.match(/hover:text-([\w-]+)/);
    if (match) {
        const colorName = match[1];
        const colorMap = {
            'red-700': '#b91c1c',
            'blue-900': '#1e3a8a',
            'green-700': '#15803d',
            'blue-800': '#1e40af',
        };
        return colorMap[colorName] || '#9b1c20';
    }
    return '#9b1c20';
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
    if (!url) return '/default-product.jpg';
    return url.replace(/\/\//g, '/').replace('https:/', 'https://');
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
    
    // Use description from API or generate one
    const displayDescription = description || `Comprehensive ${categoryName.toLowerCase()} coverage from ${getCompanyName(companyCode)}.`;
    
    // Generate link
    const link = `/products/${categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

    return (
        <Link
            href={link}
            className="block group h-full "
            onClick={() => trackEvent('featured_product_learn_more_clicked', {
                product_clicked: categoryName,
                product_company: companyCode,
                destination_link: link,
                location: 'featured_products_section'
            })}
        >
            <div
                className="rounded-2xl relative flex flex-col h-full cursor-pointer transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl"
                style={{ backgroundColor: bgColor }}
            >
                {/* Image Container */}
                <div className="h-64 md:h-72 relative overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={categoryName}
                        fill
                        priority={true}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                            e.target.src = '/default-product.jpg';
                        }}
                    />
                    
                    {/* Dark overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Icon and Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                            <IconComponent className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-semibold font-outfit text-white">
                            {categoryName}
                        </h3>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col p-4 flex-grow">
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold px-2 py-1 rounded-full text-white bg-black/20">
                                {companyCode}
                            </span>
                            <span className="text-xs text-white/80">
                                {getCompanyName(companyCode)}
                            </span>
                        </div>
                        <p className="text-white text-sm line-clamp-3 h-16">
                            {displayDescription}
                        </p>
                    </div>
                    
                    {/* CTA */}
                    <div className="mt-auto">
                        <div
                            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#9b1c20]"
                        >
                            <span className="text-sm font-semibold">
                                Learn More
                            </span>
                            <BsArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl pointer-events-none" />
            </div>
        </Link>
    );
};

// Custom arrow components (keep as is)
const CustomLeftArrow = ({ onClick, ...rest }) => {
    return (
        <button
            onClick={() => onClick()}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-xl bg-[#9b1c20] text-white hover:bg-[#7a1518] transition-all duration-300 shadow-lg"
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
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-xl bg-[#9b1c20] text-white hover:bg-[#7a1518] transition-all duration-300 shadow-lg"
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
                    // REMOVED isActive filter since API doesn't include it
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

    // Responsive configuration
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1400 },
            items: 3,
            partialVisibilityGutter: 30
        },
        desktop: {
            breakpoint: { max: 1400, min: 1024 },
            items: 3,
            partialVisibilityGutter: 30
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2,
            partialVisibilityGutter: 20
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
            partialVisibilityGutter: 30
        }
    };

    // Custom dot component
    const CustomDot = ({ onClick, ...rest }) => {
        const { active } = rest;

        return (
            <button
                className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${active ? 'bg-[#9b1c20] w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                onClick={() => onClick()}
                aria-label={`Go to slide ${rest.index + 1}`}
            />
        );
    };

    if (loading) {
        return (
            <div className="font-outfit max-w-[1400px] mx-auto px-4 py-12">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#9b1c20] mb-2 font-outfit">
                            Featured Products
                        </h3>
                        <p className="text-gray-600 max-w-2xl text-lg">
                            Explore our range of innovative solutions from United General Insurance,
                            United Life Assurance, and United Pay.
                        </p>
                    </div>
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-pulse text-lg text-gray-500">Loading products...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="font-outfit max-w-[1400px] mx-auto px-4 py-12">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#9b1c20] mb-2 font-outfit">
                            Featured Products
                        </h3>
                        <p className="text-gray-600 max-w-2xl text-lg">
                            Explore our range of innovative solutions from United General Insurance,
                            United Life Assurance, and United Pay.
                        </p>
                    </div>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-red-600 p-4 bg-red-50 rounded-lg">
                            <p className="font-semibold">Error loading products</p>
                            <p className="text-sm mt-1">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-3 text-sm bg-[#9b1c20] text-white px-4 py-2 rounded hover:bg-[#7a1518] transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 bg-gray-50">
            <div className="font-outfit max-w-[1400px] mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="flex flex-col gap-8 mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#9b1c20] mb-2 font-outfit">
                                Featured Products
                            </h3>
                            <p className="text-gray-600 max-w-2xl text-lg">
                                Explore our range of innovative solutions from United General Insurance,
                                United Life Assurance, and United Pay.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {categories.length > 0 ? (
                        <>
                            <Carousel
                                responsive={responsive}
                                infinite={true}
                                autoPlaySpeed={5000}
                                keyBoardControl={true}
                                customTransition="transform 500ms ease-in-out"
                                transitionDuration={500}
                                containerClass="carousel-container pb-12"
                                itemClass="px-2"
                                arrows={true}
                                customLeftArrow={<CustomLeftArrow />}
                                customRightArrow={<CustomRightArrow />}
                                autoPlay={true}
                                customDot={<CustomDot />}
                                showDots={true}
                                dotListClass="custom-dot-list mt-8"
                                partialVisible={false}
                                removeArrowOnDeviceType={['mobile']}
                                rewind={false}
                                rtl={false}
                                shouldResetAutoplay={true}
                                slidesToSlide={1}
                                swipeable={true}
                                draggable={true}
                            >
                                {categories.map((category, index) => (
                                    <div key={`${category.companyCode}-${category.categoryName}-${index}`} className="h-full">
                                        <ProductCard category={category} />
                                    </div>
                                ))}
                            </Carousel>
                            
                            {/* View All Button */}
                           
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500 text-center">
                                <p className="text-lg mb-2">No products available</p>
                                <p className="text-sm">Please check back later</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;