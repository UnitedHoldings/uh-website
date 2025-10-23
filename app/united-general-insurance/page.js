"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    PiGavel,
    PiCurrencyCircleDollar,
    PiCar,
    PiShieldCheck,
    PiUsers,
    PiFirstAidKit,
    PiBriefcase,
    PiHouse,
    PiCheckCircle,
    PiStethoscope,
    PiMapPin,
    PiHandshake,
    PiGear,
    PiLock,
    PiShieldWarning,
    PiBuildings,
    PiMagnifyingGlass,
    PiShield,
    PiBuildings as PiOfficeBuilding,
    PiUserSwitch,
    PiGlobe
} from 'react-icons/pi';
import { fetchUnitedGeneralInsuranceData } from '@/components/UGI_ProductsData';
import { PiFunnel } from "react-icons/pi";
import Image from 'next/image';

// Icon mapping for product categories
const categoryIcons = {
    'Legal Insurance': PiGavel,
    'Motor Insurance': PiCar,
    'Personal Accident Insurance': PiFirstAidKit,
    'Home Contents Insurance': PiHouse,
    'Home Insurance': PiCheckCircle,
    'Multimark Policy': PiBuildings,
    'Medical Malpractice': PiStethoscope,
    'Professional Indemnity': PiBriefcase,
    'Bonds and Guarantees': PiHandshake,
    'Engineering Policies': PiGear,
    'Fidelity Guarantee': PiLock,
    'Political Violence and Terrorism': PiShieldWarning
};

const categoryColors = {
    'Legal Insurance': 'bg-blue-100 text-blue-600',
    'Motor Insurance': 'bg-green-100 text-green-600',
    'Personal Accident Insurance': 'bg-red-100 text-red-600',
    'Home Contents Insurance': 'bg-purple-100 text-purple-600',
    'Home Insurance': 'bg-orange-100 text-orange-600',
    'Multimark Policy': 'bg-indigo-100 text-indigo-600',
    'Medical Malpractice': 'bg-pink-100 text-pink-600',
    'Professional Indemnity': 'bg-teal-100 text-teal-600',
    'Bonds and Guarantees': 'bg-amber-100 text-amber-600',
    'Engineering Policies': 'bg-cyan-100 text-cyan-600',
    'Fidelity Guarantee': 'bg-lime-100 text-lime-600',
    'Political Violence and Terrorism': 'bg-rose-100 text-rose-600'
};

export default function UnitedGeneralInsurance() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceFilter, setPriceFilter] = useState('All');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productsSectionRef = useRef(null);

    // Fetch data from API
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchUnitedGeneralInsuranceData();
                setProducts(data);
            } catch (err) {
                setError(err.message);
                console.error('Failed to load products:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Get unique categories
    const categories = ['All', ...new Set(products.map(product => product.name))];

    // Scroll to products section
    const scrollToProducts = () => {
        productsSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Filter products based on search and filters
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.overview.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === 'All' || product.name === selectedCategory;

            const matchesPrice = priceFilter === 'All' ||
                (priceFilter === 'Under E100' && product.stats[0]?.includes('E50')) ||
                (priceFilter === 'E100 - E300' && (product.stats[0]?.includes('E100') || product.stats[0]?.includes('E200') || product.stats[0]?.includes('E250'))) ||
                (priceFilter === 'Over E300' && (product.stats[0]?.includes('E300') || product.stats[0]?.includes('E350') || product.stats[0]?.includes('E400') || product.stats[0]?.includes('E450') || product.stats[0]?.includes('E500') || product.stats[0]?.includes('E600')));

            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [searchQuery, selectedCategory, priceFilter, products]);

    const ProductCard = ({ product }) => {
        const IconComponent = categoryIcons[product.name];
        const colorClass = categoryColors[product.name];

        return (
            <div className="bg-white rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden group hover:transform hover:-translate-y-2">
                {/* Image Section */}
                <div className="relative h-48 bg-gradient-to-br overflow-hidden">
                    {/* Product Image */}
                    <Image
                        src={product.heroImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority={true}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                    {/* Top-right Icon */}
                    <div className="absolute top-4 right-4">
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#286278] shadow-lg hover:shadow-xl transition-all duration-300`}
                        >
                            <IconComponent className="text-xl" />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#286278] transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 line-clamp-2">
                        {product.tagline}
                    </p>

                    {/* Key Benefits */}
                    <div className="space-y-2 mb-4">
                        {product.benefits.slice(0, 2).map((benefit, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                    <PiCheckCircle className="text-green-600" />
                                </div>
                                <span className="line-clamp-1">{benefit.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-8 text-xs text-gray-500 mb-4">
                        <span className="flex items-center">
                            <PiShieldCheck className="mr-1" />
                            {product.stats[1]}
                        </span>
                        <span className="flex items-center">
                            <PiMapPin className="mr-1" />
                            {product.stats[2]}
                        </span>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="w-full bg-[#286278] text-white py-3 px-4 rounded-full font-semibold hover:bg-[#24576b] transition-colors text-center block group/btn"
                    >
                        <span className="flex items-center justify-center">
                            Learn More
                            <PiCurrencyCircleDollar className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#286278] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading insurance products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <PiUserSwitch className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Failed to load products</h3>
                    <p className="text-gray-500 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-[#286278] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#24576b] transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 font-outfit">
            {/* Header with Background Image */}
            <div className='bg-[#204f61] h-2 w-full' />
            <div className='relative bg-[#286278] py-16 md:py-24 min-h-[500px] flex items-center'>
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("/car.jpg")',
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 w-full">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left text-white flex-1">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                United General Insurance
                            </h1>
                            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                                Comprehensive short-term insurance solutions for individuals and businesses across Eswatini
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                               
                                <button
                                    onClick={scrollToProducts}
                                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#286278] transition-colors text-lg text-center"
                                >
                                    View Products
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className='text-xl font-semibold mb-4'>
                        <p className='text-[#286278] text-2xl'>What do you want to cover?</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="flex-1 w-full lg:max-w-md">
                            <div className="relative">
                                <PiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    placeholder="Search insurance products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#286278] focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <div className="relative">
                                <PiFunnel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#286278] focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="All">All Products</option>
                                    {categories.filter(cat => cat !== 'All').map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-sm text-gray-600">
                        Showing {filteredProducts.length} of {products.length} products
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section ref={productsSectionRef} className="py-12">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <PiUserSwitch className="text-6xl text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={product.name + index} product={product} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Ready to Get Protected?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust United General Insurance for their protection needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={scrollToProducts}
                            className="bg-[#286278] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#24576b] transition-colors text-lg"
                        >
                            Get Free Quote
                        </button>
                        <Link
                            href="/contact"
                            className="border-2 border-[#286278] text-[#286278] px-8 py-4 rounded-full font-semibold hover:bg-[#286278] hover:text-white transition-colors text-lg"
                        >
                            Find a Branch
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}