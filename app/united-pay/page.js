"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  PiMoney,
  PiUser,
  PiCurrencyCircleDollar,
  PiShieldCheck,
  PiCheckCircle,
  PiMapPin,
  PiMagnifyingGlass,
  PiShield,
  PiOfficeBuilding,
  PiUserSwitch,
  PiGlobe,
  PiClock,
  PiChartLineUp,
  PiBank,
  PiTrendUp,
} from 'react-icons/pi';
import { PiFunnel } from "react-icons/pi";
import Image from 'next/image';
import { fetchUnitedPayData } from '@/components/UP_ProductData';
import { trackEvent, trackPageDuration } from '@/lib/posthog';

// Icon mapping for product categories
const categoryIcons = {
  'Micro Loan': PiMoney,
  'Umlamleli Loan': PiUser,
};

const categoryColors = {
  'Micro Loan': 'bg-orange-100 text-orange-600',
  'Umlamleli Loan': 'bg-amber-100 text-amber-600',
};

// Skeleton Loader Components
const HeroSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-outfit">
      {/* Header Skeleton */}
      <div className='bg-gray-300 h-2 w-full animate-pulse' />
      <div className='relative bg-gray-200 py-16 md:py-24 min-h-[500px] flex items-center'>
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left flex-1 space-y-6">
              <div className="h-12 bg-gray-400 rounded w-48 mx-auto lg:mx-0 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-8 bg-gray-400 rounded w-3/4 mx-auto lg:mx-0 animate-pulse"></div>
                <div className="h-8 bg-gray-400 rounded w-2/3 mx-auto lg:mx-0 animate-pulse"></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="h-12 bg-gray-400 rounded-full w-32 animate-pulse"></div>
                <div className="h-12 bg-gray-400 rounded-full w-40 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section Skeleton */}
      <section className="py-8 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="h-6 bg-gray-300 rounded w-64 mb-4 animate-pulse"></div>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-32 mt-4 animate-pulse"></div>
        </div>
      </section>

      {/* Products Grid Skeleton */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 bg-gray-300 rounded-full w-32 animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded-full w-40 animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      {/* Image Section Skeleton */}
      <div className="relative h-48 bg-gray-300 overflow-hidden">
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Benefits Skeleton */}
        <div className="space-y-2">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="w-5 h-5 bg-gray-200 rounded-full mr-2"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
            </div>
          ))}
        </div>

        {/* Stats Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-12 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default function UnitedPay() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsSectionRef = useRef(null);

  // Track page duration
  useEffect(() => {
    const stopTracking = trackPageDuration('up_page');
    return () => stopTracking();
  }, []);

  // Fetch data from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchUnitedPayData();
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
        (priceFilter === 'Under E150' && product.stats[0]?.includes('E100')) ||
        (priceFilter === 'E150 - E300' && product.stats[0]?.includes('E200')) ||
        (priceFilter === 'Over E300' && product.stats[0]?.includes('E300'));

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceFilter, products]);

  const ProductCard = ({ product }) => {
    const IconComponent = categoryIcons[product.name];
    const colorClass = categoryColors[product.name];

    return (
      <div className="bg-white rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden group hover:transform hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
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
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#f79620] shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <IconComponent className="text-xl" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#f79620] transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.tagline}
          </p>

          {/* Key Benefits */}
          <div className="space-y-2 mb-4">
            {product.benefits.slice(0, 2).map((benefit, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <PiCheckCircle className="text-green-600 text-xs" />
                </div>
                <span className="line-clamp-1">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
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
          <a
            href="https://uploans.united.co.sz/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#f79620] text-white py-3 px-4 rounded-full font-semibold hover:bg-[#2f6b3d] transition-colors text-center block group/btn"
            onClick={() => trackEvent('up_product_cta_clicked', {
              product_name: product.name,
              location: 'up_products_grid',
              product_page: 'UP',
              destination_url: 'https://uploans.united.co.sz/'
            })}
          >
            <span className="flex items-center justify-center">
              Apply Now
              <PiCurrencyCircleDollar className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    );
  };

  if (loading) {
    return <HeroSkeleton />;
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
            className="bg-[#f79620] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#e0861c] transition-colors"
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
      <div className='bg-[#e0861c] h-2 w-full' />
      <div className='relative bg-[#f79620] py-16 md:py-24 min-h-[500px] flex items-center'>
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/loan.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left text-white flex-1">
              <h1 className="text-4xl text-[#f79620] sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                United Pay
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                Flexible financial solutions and micro loans for employed individuals across Eswatini
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    trackEvent('up_banner_cta_clicked', {
                      cta_text: 'Apply Now',
                      location: 'up_hero_banner',
                      product_page: 'UP'
                    });
                    scrollToProducts();
                  }}
                  className="bg-white text-[#f79620] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg text-center"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => {
                    trackEvent('up_banner_cta_clicked', {
                      cta_text: 'View Loan Products',
                      location: 'up_hero_banner',
                      product_page: 'UP'
                    });
                    scrollToProducts();
                  }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#f79620] transition-colors text-lg text-center"
                >
                  View Loan Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="py-8 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className='text-xl font-semibold mb-4'>
            <p className='text-[#f79620] text-2xl'>What financial needs do you have?</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <PiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search loan products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f79620] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} loan products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section ref={productsSectionRef} className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <PiUserSwitch className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No loan products found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.name + index} product={product} />
                ))}
              </div>

              {/* Load More (if needed in future) */}
              {filteredProducts.length > 8 && (
                <div className="text-center mt-12">
                  <button className="border-2 border-[#f79620] text-[#f79620] py-3 px-8 rounded-full font-semibold hover:bg-[#f79620] hover:text-white transition-colors">
                    Load More Products
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Access Funds?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of employed individuals who trust United Pay for their financial needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                trackEvent('up_request_callback_clicked', {
                  product_name: 'United Pay',
                  location: 'up_cta_section',
                  button_text: 'Apply Now'
                });
                scrollToProducts();
              }}
              className="bg-[#f79620] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#e0861c] transition-colors text-lg"
            >
              Apply Now
            </button>
            <Link
              href="/contact"
              className="border-2 border-[#f79620] text-[#f79620] px-8 py-4 rounded-full font-semibold hover:bg-[#f79620] hover:text-white transition-colors text-lg"
              onClick={() => trackEvent('up_request_callback_clicked', {
                product_name: 'United Pay',
                location: 'up_cta_section',
                button_text: 'Find a Branch'
              })}
            >
              Find a Branch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}