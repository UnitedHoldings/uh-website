"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  PiHeart,
  PiUsers,
  PiCurrencyCircleDollar,
  PiShieldCheck,
  PiCheckCircle,
  PiMapPin,
  PiMagnifyingGlass,
  PiShield,
  PiBuildings as PiOfficeBuilding,
  PiUserSwitch,
  PiGlobe,
  PiUser,
  PiUsersThree,
  PiBank,
  PiHouse,
  PiFileText,
} from 'react-icons/pi';
import { PiFunnel } from "react-icons/pi";
import { fetchUnitedLifeAssuranceData } from '@/components/ULA_ProductsData';
import Image from 'next/image';
import { trackEvent, trackPageDuration } from '@/lib/posthog';
// Department colors
const DEPARTMENT_COLORS = {
  'Life Assurance': '#3d834d',
  'General Insurance': '#286278',
  'United Pay': '#f79620',
};

// Icon mapping for product categories
const categoryIcons = {
  'Sinawe Funeral Plan': PiUsersThree,
  'Individual Funeral Plan': PiUser,
  'Tinkhundla Funeral Cover': PiMapPin,
  'Group Life': PiUsers,
  'Credit Life': PiBank,
};

const categoryColors = {
  'Sinawe Funeral Plan': 'bg-blue-100 text-[#9b1c20]',
  'Individual Funeral Plan': 'bg-green-100 text-[#9b1c20]',
  'Tinkhundla Funeral Cover': 'bg-purple-100 text-[#9b1c20]',
  'Group Life': 'bg-orange-100 text-orange-600',
  'Credit Life': 'bg-teal-100 text-teal-600',
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
              <div className="h-12 bg-gray-400 rounded w-64 mx-auto lg:mx-0 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-8 bg-gray-400 rounded w-3/4 mx-auto lg:mx-0 animate-pulse"></div>
                <div className="h-8 bg-gray-400 rounded w-2/3 mx-auto lg:mx-0 animate-pulse"></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="h-12 bg-gray-400 rounded-full w-32 animate-pulse"></div>
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
          <div className="h-8 bg-gray-300 rounded w-80 mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 bg-gray-300 rounded-full w-40 animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded-full w-36 animate-pulse"></div>
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
      <div className="relative h-48 bg-gray-300 overflow-hidden"></div>

      {/* Content Section Skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-7 bg-gray-300 rounded w-3/4"></div>
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
        <div className="flex items-center space-x-8">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-12 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default function UnitedLifeAssurance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsSectionRef = useRef(null);

  // Track page duration
  useEffect(() => {
    const stopTracking = trackPageDuration('ula_page');
    return () => stopTracking();
  }, []);

  // Fetch data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch products data
        const productsData = await fetchUnitedLifeAssuranceData();
        setProducts(productsData);

        // Fetch company data from our proxy API endpoint
        const response = await fetch('/api/company-pages');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          const ulaCompany = result.data.find(company => company.companyCode === 'ULA');
          if (ulaCompany) {
            setCompanyData(ulaCompany);
          } else {
            throw new Error('ULA company not found in API response');
          }
        } else {
          throw new Error(result.message || 'Failed to fetch company data');
        }

      } catch (err) {
        setError(err.message);
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get unique categories from API data
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
        (priceFilter === 'Under E50' && (product.stats[0]?.includes('E11') || product.stats[0]?.includes('E25') || product.stats[0]?.includes('E30'))) ||
        (priceFilter === 'E50 - E100' && (product.stats[0]?.includes('E40') || product.stats[0]?.includes('E50'))) ||
        (priceFilter === 'Over E100' && product.stats[0]?.includes('E100'));

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceFilter, products]);

  const ProductCard = ({ product }) => {
    const IconComponent = categoryIcons[product.name];
    const colorClass = categoryColors[product.name];
    const brandColor = companyData?.brandColorPrimary;

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
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#9b1c20] transition-colors">
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
                  <PiCheckCircle className="text-[#9b1c20] text-xs lg:text-base" />
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
            style={{ backgroundColor: brandColor }}
            className="w-full text-white py-3 px-4 rounded-full font-semibold hover:bg-[#7a1619] transition-colors text-center block group/btn"
            onClick={() => trackEvent('ula_product_cta_clicked', {
              product_name: product.name,
              location: 'ula_products_grid',
              product_page: 'ULA'
            })}
          >
            <span className="flex items-center justify-center">
              Learn More
            </span>
          </Link>
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
            className="bg-[#9b1c20] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#7a1619] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If no company data, don't render anything
  if (!companyData) {
    return null;
  }

  const brandColor = companyData.brandColorPrimary;
  const brandColorSecondary = companyData.brandColorSecondary;
  const darkBrandColor = '#7a1619';

  // Safe data access with validation
  const companyName = companyData.companyName || '';
  const heroHeading = companyData.heroHeading || '';
  const heroSubheading = companyData.heroSubheading || '';
  const heroCTAText = companyData.heroCTAText || '';
  const heroCTAAction = companyData.heroCTAAction || '';
  const ctaPrimaryText = companyData.ctaPrimaryText || '';
  const searchSectionLabel = companyData.searchSectionLabel || '';
  const searchPlaceholder = companyData.searchPlaceholder || '';
  const noProductsMessage = companyData.noProductsMessage || '';
  const noProductsDescription = companyData.noProductsDescription || '';
  const ctaHeading = companyData.ctaHeading || '';
  const ctaDescription = companyData.ctaDescription || '';
  const ctaSecondaryText = companyData.ctaSecondaryText || '';
  const ctaSecondaryUrl = companyData.ctaSecondaryUrl || '/contact'; // Default fallback for URL

  return (
    <div className="min-h-screen bg-gray-100 font-outfit">
      {/* Header with Background Image */}
      <div style={{ backgroundColor: darkBrandColor }} className='h-2 w-full' />
      <div style={{ backgroundColor: brandColor }} className='relative py-16 md:py-24 min-h-[500px] flex items-center'>
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: companyData.heroBackgroundImage?.asset?.url 
              ? `url("${companyData.heroBackgroundImage.asset.url}")`
              : 'none',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left text-white flex-1">
              <h1 className="text-4xl text-white sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {companyName}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                {heroHeading}
              </p>
              <p className="text-lg text-white/80 mb-8 max-w-2xl">
                {heroSubheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    trackEvent('ula_banner_cta_clicked', {
                      cta_text: heroCTAText,
                      location: 'ula_hero_banner',
                      product_page: 'ULA'
                    });
                    if (heroCTAAction === 'scroll') {
                      scrollToProducts();
                    }
                  }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#9b1c20] transition-colors text-lg text-center"
                >
                  {heroCTAText}
                </button>
                <button
                  onClick={() => {
                    trackEvent('ula_banner_cta_clicked', {
                      cta_text: ctaPrimaryText,
                      location: 'ula_hero_banner',
                      product_page: 'ULA'
                    });
                  }}
                  className="bg-white text-[#9b1c20] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg text-center"
                >
                  {ctaPrimaryText}
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
            <p style={{ color: brandColor }} className='text-2xl'>
              {searchSectionLabel}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <PiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                />
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
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {noProductsMessage}
              </h3>
              <p className="text-gray-500">
                {noProductsDescription}
              </p>
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
                  <button 
                    style={{ borderColor: brandColor, color: brandColor }}
                    className="border-2 py-3 px-8 rounded-full font-semibold hover:bg-[#9b1c20] hover:text-white transition-colors"
                  >
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
            {ctaHeading}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                trackEvent('ula_request_callback_clicked', {
                  product_name: 'United Life Assurance',
                  location: 'ula_cta_section',
                  button_text: ctaPrimaryText
                });
              }}
              style={{ backgroundColor: brandColor }}
              className="text-white px-8 py-4 rounded-full font-semibold hover:bg-[#7a1619] transition-colors text-lg"
            >
              {ctaPrimaryText}
            </button>
            
            {/* Only render secondary CTA if both text and URL exist */}
            {ctaSecondaryText && ctaSecondaryUrl && (
              <Link
                href={ctaSecondaryUrl}
                style={{ borderColor: brandColor, color: brandColor }}
                className="border-2 px-8 py-4 rounded-full font-semibold hover:bg-[#9b1c20] hover:text-white transition-colors text-lg"
                onClick={() => trackEvent('ula_request_callback_clicked', {
                  product_name: 'United Life Assurance',
                  location: 'ula_cta_section',
                  button_text: ctaSecondaryText
                })}
              >
                {ctaSecondaryText}
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}