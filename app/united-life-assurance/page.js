"use client";
import React, { useState, useMemo, useRef } from 'react';
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
import UnitedLifeAssuranceData from '@/components/ULA_ProductsData';
import Image from 'next/image';

// Department colors
const DEPARTMENT_COLORS = {
  'Life Assurance': '#3d834d', // Green
  'General Insurance': '#286278', // Blue
  'United Pay': '#f79620', // Orange
};

// Icon mapping for product categories
const categoryIcons = {
  'Family Funeral Plan': PiUsersThree,
  'Individual Funeral Plan': PiUser,
  'Tinkhundla Funeral Cover': PiMapPin,
  'Group Life': PiUsers,
  'Credit Life': PiBank,
};

const categoryColors = {
  'Family Funeral Plan': 'bg-blue-100 text-blue-600',
  'Individual Funeral Plan': 'bg-green-100 text-green-600',
  'Tinkhundla Funeral Cover': 'bg-purple-100 text-purple-600',
  'Group Life': 'bg-orange-100 text-orange-600',
  'Credit Life': 'bg-teal-100 text-teal-600',
};

export default function UnitedLifeAssurance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const productsSectionRef = useRef(null);

  // Get unique categories
  const categories = ['All', ...new Set(UnitedLifeAssuranceData.map(product => product.name))];

  // Scroll to products section
  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return UnitedLifeAssuranceData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.overview.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || product.name === selectedCategory;

      const matchesPrice = priceFilter === 'All' ||
        (priceFilter === 'Under E50' && (product.stats[0].includes('E11') || product.stats[0].includes('E25') || product.stats[0].includes('E30'))) ||
        (priceFilter === 'E50 - E100' && (product.stats[0].includes('E40') || product.stats[0].includes('E50'))) ||
        (priceFilter === 'Over E100' && product.stats[0].includes('E100'));

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceFilter]);

  const ProductCard = ({ product }) => {
    const IconComponent = categoryIcons[product.name];
    const colorClass = categoryColors[product.name];

    return (
      <div className="bg-white  rounded-xl hover:-xl transition-all duration-300 overflow-hidden group hover:transform hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {/* Product Image */}
          <Image
            src={product.heroImage} // make sure product.image is a valid URL or imported asset
            alt={product.name}
            fill
            className="object-cover"
            priority={true}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

          {/* Top-right Icon */}


          {/* Bottom-left Stat */}

        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#3d834d] transition-colors">
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
                  <PiCheckCircle className="text-green-600 text-xs lg:text-base" />
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
            className="w-full bg-[#3d834d] text-white py-3 px-4 rounded-full font-semibold hover:bg-[#2f6b3d] transition-colors text-center block group/btn"
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

  return (
    <div className="min-h-screen bg-gray-100 font-outfit">
      {/* Header with Background Image */}
      <div className='bg-[#2f6b3d] h-2 w-full' />
      <div className='relative bg-[#3d834d] py-16 md:py-24 min-h-[500px] flex items-center'>
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/life.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left text-white flex-1">
              <h1 className="text-4xl text-[#3d834d] sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                United Life Assurance
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                Comprehensive life assurance and funeral cover for families and businesses across Eswatini
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToProducts}
                  className="bg-white text-[#3d834d] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg text-center"
                >
                  Get Covered Today
                </button>
                <button
                  onClick={scrollToProducts}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#3d834d] transition-colors text-lg text-center"
                >
                  View Products
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="py-8 bg-white ">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className='text-xl font-semibold mb-4'>
            <p className='text-[#3d834d] text-2xl'>What financial needs do you have?</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <PiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search life assurance products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d834d] focus:border-transparent"
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
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d834d] focus:border-transparent appearance-none bg-white"
                >
                  <option value="All">All Categories</option>
                  {categories.filter(cat => cat !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d834d] focus:border-transparent bg-white"
              >
                <option value="All">All Prices</option>
                <option value="Under E50">Under E50/month</option>
                <option value="E50 - E100">E50 - E100/month</option>
                <option value="Over E100">Over E100/month</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {UnitedLifeAssuranceData.length} products
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
                  <ProductCard key={index} product={product} />
                ))}
              </div>

              {/* Load More (if needed in future) */}
              {filteredProducts.length > 8 && (
                <div className="text-center mt-12">
                  <button className="border-2 border-[#3d834d] text-[#3d834d] py-3 px-8 rounded-full font-semibold hover:bg-[#3d834d] hover:text-white transition-colors">
                    Load More Products
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose ULA Section */}


      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Secure Your Family&apos;s Future?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied families who trust United Life Assurance for their protection needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToProducts}
              className="bg-[#3d834d] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#2f6b3d] transition-colors text-lg"
            >
              Get Covered Today
            </button>
            <Link
              href="/contact"
              className="border-2 border-[#3d834d] text-[#3d834d] px-8 py-4 rounded-full font-semibold hover:bg-[#3d834d] hover:text-white transition-colors text-lg"
            >
              Find a Branch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}