"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { trackEvent, trackPageDuration } from '@/lib/posthog';
import {
  PiGavel,
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
  PiUserSwitch,
  PiUsersThree,
  PiBank,
  PiMoney,
  PiFunnel,
  PiUser,
  PiShield // Add this as a fallback icon
} from 'react-icons/pi';

// Company configurations
const COMPANY_CONFIG = {
  UGI: {
    companyCode: 'UGI',
    fetchData: () => import('@/components/UGI_ProductsData').then(module => module.fetchUnitedGeneralInsuranceData()),
    brandColor: '#1e3a8a',
    darkBrandColor: '#1a3366',
    icons: {
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
    },
    priceFilters: [
      { label: 'All', value: 'All' },
      { label: 'Under E100', value: 'Under E100' },
      { label: 'E100 - E300', value: 'E100 - E300' },
      { label: 'Over E300', value: 'Over E300' }
    ],
    ctaText: 'Learn More',
    hasCategoryFilter: true
  },
  ULA: {
    companyCode: 'ULA',
    fetchData: () => import('@/components/ULA_ProductsData').then(module => module.fetchUnitedLifeAssuranceData()),
    brandColor: '#9b1c20',
    darkBrandColor: '#7a1619',
    icons: {
      'Sinawe Funeral Plan': PiUsersThree,
      'Individual Funeral Plan': PiUser,
      'Tinkhundla Funeral Cover': PiMapPin,
      'Group Life': PiUsers,
      'Credit Life': PiBank,
    },
    priceFilters: [
      { label: 'All', value: 'All' },
      { label: 'Under E50', value: 'Under E50' },
      { label: 'E50 - E100', value: 'E50 - E100' },
      { label: 'Over E100', value: 'Over E100' }
    ],
    ctaText: 'Learn More',
    hasCategoryFilter: false
  },
  UP: {
    companyCode: 'UP',
    fetchData: () => import('@/components/UP_ProductData').then(module => module.fetchUnitedPayData()),
    brandColor: '#15803d',
    darkBrandColor: '#0f6b2d',
    icons: {
      'Micro Loan': PiMoney,
      'Umlamleli Loan': PiUser,
    },
    priceFilters: [
      { label: 'All', value: 'All' },
      { label: 'Under E150', value: 'Under E150' },
      { label: 'E150 - E300', value: 'E150 - E300' },
      { label: 'Over E300', value: 'Over E300' }
    ],
    ctaText: 'Apply Now',
    hasCategoryFilter: false,
    externalLink: 'https://uploans.united.co.sz/'
  }
};

// Skeleton Loader Components
export const HeroSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-outfit">
      <div className='bg-gray-300 h-2 w-full animate-pulse' />
      <div className='relative bg-gray-200 py-16 md:py-24 min-h-[500px] flex items-center'>
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left flex-1 space-y-6">
              <div className="h-12 bg-gray-400 rounded w-72 mx-auto lg:mx-0 animate-pulse"></div>
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

      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="h-6 bg-gray-300 rounded w-64 mb-4 animate-pulse"></div>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="h-12 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-32 mt-4 animate-pulse"></div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 bg-gray-300 rounded-full w-36 animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded-full w-32 animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="relative h-48 bg-gray-300 overflow-hidden">
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="h-7 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="space-y-2">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="w-5 h-5 bg-gray-200 rounded-full mr-2"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-8">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-12 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default function CompanyProductsPage({ companyCode }) {
  const config = COMPANY_CONFIG[companyCode];
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
    const stopTracking = trackPageDuration(`${companyCode.toLowerCase()}_page`);
    return () => stopTracking();
  }, [companyCode]);

  // Fetch data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch products data
        const productsData = await config.fetchData();
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
          const company = result.data.find(comp => comp.companyCode === companyCode);
          if (company) {
            setCompanyData(company);
          } else {
            throw new Error(`${companyCode} company not found in API response`);
          }
        } else {
          throw new Error(result.message || 'Failed to fetch company data');
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [companyCode, config]);

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

      // Price filter logic based on company
      let matchesPrice = true;
      if (priceFilter !== 'All') {
        const price = product.stats[0]?.toLowerCase();
        switch (companyCode) {
          case 'UGI':
            matchesPrice = 
              (priceFilter === 'Under E100' && price?.includes('e50')) ||
              (priceFilter === 'E100 - E300' && (price?.includes('e100') || price?.includes('e200') || price?.includes('e250'))) ||
              (priceFilter === 'Over E300' && (price?.includes('e300') || price?.includes('e350') || price?.includes('e400') || price?.includes('e450') || price?.includes('e500') || price?.includes('e600')));
            break;
          case 'ULA':
            matchesPrice = 
              (priceFilter === 'Under E50' && (price?.includes('e11') || price?.includes('e25') || price?.includes('e30'))) ||
              (priceFilter === 'E50 - E100' && (price?.includes('e40') || price?.includes('e50'))) ||
              (priceFilter === 'Over E100' && price?.includes('e100'));
            break;
          case 'UP':
            matchesPrice = 
              (priceFilter === 'Under E150' && price?.includes('e100')) ||
              (priceFilter === 'E150 - E300' && price?.includes('e200')) ||
              (priceFilter === 'Over E300' && price?.includes('e300'));
            break;
          default:
            matchesPrice = true;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceFilter, products, companyCode]);

  const ProductCard = ({ product }) => {
    
    // Safe icon selection with fallback
    const IconComponent = config.icons[product.name] || PiShield;
    const brandColor = companyData?.brandColorPrimary || config.brandColor;

    // Debug: Check if icon is found
    if (!config.icons[product.name]) {
    }

    const CTAButton = () => {
      const baseProps = {
        style: { backgroundColor: brandColor },
        className: "w-full text-white py-3 px-4 rounded-full font-semibold hover:opacity-90 transition-colors text-center block group/btn",
        onClick: () => trackEvent(`${companyCode.toLowerCase()}_product_cta_clicked`, {
          product_name: product.name,
          location: `${companyCode.toLowerCase()}_products_grid`,
          product_page: companyCode
        })
      };

      if (config.externalLink) {
        return (
          <a
            href={config.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            {...baseProps}
          >
            <span className="flex items-center justify-center">
              {config.ctaText}
            </span>
          </a>
        );
      }

      return (
        <Link
          href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
          {...baseProps}
        >
          <span className="flex items-center justify-center">
            {config.ctaText}
          </span>
        </Link>
      );
    };

    return (
      <div className="bg-white rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden group hover:transform hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br overflow-hidden">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            className="object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          
          {/* Top-right Icon */}
          <div className="absolute top-4 right-4">
            <div
              style={{ backgroundColor: brandColor }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <IconComponent className="text-xl" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2  group-hover:text-[#9b1c20] transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-lg mb-4 line-clamp-2">
            {product.tagline}
          </p>

          {/* Key Benefits */}
          <div className="space-y-2 mb-4">
            {product.benefits?.slice(0, 2).map((benefit, index) => (
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
              {product.stats?.[1] || 'N/A'}
            </span>
            <span className="flex items-center">
              <PiMapPin className="mr-1" />
              {product.stats?.[2] || 'N/A'}
            </span>
          </div>

          {/* CTA Button */}
          <CTAButton />
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
            style={{ backgroundColor: companyData?.brandColorPrimary || config.brandColor }}
            className="text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!companyData) {
    return null;
  }

  const brandColor = companyData.brandColorPrimary || config.brandColor;
  const darkBrandColor = companyData.brandColorSecondary || config.darkBrandColor;

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
  const ctaSecondaryUrl = companyData.ctaSecondaryUrl || '/contact';

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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
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
                    trackEvent(`${companyCode.toLowerCase()}_banner_cta_clicked`, {
                      cta_text: heroCTAText,
                      location: `${companyCode.toLowerCase()}_hero_banner`,
                      product_page: companyCode
                    });
                    if (heroCTAAction === 'scroll') {
                      scrollToProducts();
                    }
                  }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors text-lg text-center"
                >
                  {heroCTAText}
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {config.hasCategoryFilter && (
                <div className="relative">
                  <PiFunnel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="All">All Products</option>
                    {categories.filter(cat => cat !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="relative">
                <PiFunnel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none bg-white"
                >
                  {config.priceFilters.map(filter => (
                    <option key={filter.value} value={filter.value}>{filter.label}</option>
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
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {noProductsMessage}
              </h3>
              <p className="text-gray-500">
                {noProductsDescription}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.name + index} product={product} />
              ))}
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
                trackEvent(`${companyCode.toLowerCase()}_request_callback_clicked`, {
                  product_name: companyName,
                  location: `${companyCode.toLowerCase()}_cta_section`,
                  button_text: ctaPrimaryText
                });
                scrollToProducts();
              }}
              style={{ backgroundColor: brandColor }}
              className="text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-colors text-lg"
            >
              {ctaPrimaryText}
            </button>
            
            {ctaSecondaryText && ctaSecondaryUrl && (
              <Link
                href={ctaSecondaryUrl}
                style={{ borderColor: brandColor, color: brandColor }}
                className="border-2 px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors text-lg"
                onClick={() => trackEvent(`${companyCode.toLowerCase()}_request_callback_clicked`, {
                  product_name: companyName,
                  location: `${companyCode.toLowerCase()}_cta_section`,
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