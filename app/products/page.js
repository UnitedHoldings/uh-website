"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PiArrowRight, PiMagnifyingGlass } from 'react-icons/pi';
import SeoHead from '@/components/SEOhead';
import { trackEvent, trackPageDuration } from '@/lib/posthog';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('All');

  // Track page duration
  useEffect(() => {
    const stopTracking = trackPageDuration('products_main_page');
    return () => stopTracking();
  }, []);

  // Company offerings data
  const companies = [
    {
      id: 'ula',
      name: 'United Life Assurance',
      color: '#3d834d',
      icon: '❤️',
      description: 'Comprehensive life assurance and funeral cover for families and businesses',
      link: '/united-life-assurance',
      products: [
        { name: 'Sinawe Funeral Plan', category: 'Life' },
        { name: 'Individual Funeral Plan', category: 'Life' },
        { name: 'Tinkhundla Funeral Cover', category: 'Life' },
        { name: 'Group Life', category: 'Life' },
        { name: 'Credit Life', category: 'Life' },
      ]
    },
    {
      id: 'ugi',
      name: 'United General Insurance',
      color: '#286278',
      icon: '🛡️',
      description: 'Short-term insurance solutions for your home, motor, and business',
      link: '/united-general-insurance',
      products: [
        { name: 'Motor Insurance', category: 'Personal' },
        { name: 'Home Contents Insurance', category: 'Personal' },
        { name: 'Home Insurance', category: 'Personal' },
        { name: 'Legal Insurance', category: 'Personal' },
        { name: 'Personal Accident Insurance', category: 'Personal' },
        { name: 'Multimark Policy', category: 'Business' },
        { name: 'Medical Malpractice', category: 'Business' },
        { name: 'Professional Indemnity', category: 'Business' },
        { name: 'Bonds and Guarantees', category: 'Business' },
        { name: 'Engineering Policies', category: 'Business' },
        { name: 'Fidelity Guarantee', category: 'Business' },
        { name: 'Political Violence and Terrorism', category: 'Business' },
      ]
    },
    {
      id: 'up',
      name: 'United Pay',
      color: '#f79620',
      icon: '💰',
      description: 'Flexible financial solutions and micro loans for employed individuals',
      link: '/united-pay',
      products: [
        { name: 'Micro Loans', category: 'Loans' },
        { name: 'Umlamleli Loan (Salary Advance)', category: 'Loans' },
      ]
    }
  ];

  // Filter companies based on search
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCompany = selectedCompany === 'All' || company.id === selectedCompany;
    
    return matchesSearch && matchesCompany;
  });

  const handleCompanyClick = (companyId) => {
    trackEvent('products_page_company_clicked', {
      company_id: companyId,
      location: 'products_main_page'
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    trackEvent('products_page_search', {
      search_query: e.target.value,
      location: 'products_main_page'
    });
  };

  return (
    <>
      <SeoHead
        title="All Products | United Holdings"
        description="Explore all insurance and financial products from United Holdings. Life Assurance, General Insurance, and Loans."
        keywords="Insurance Products, Life Assurance, General Insurance, Loans, Eswatini"
        image="/logo.png"
        url="https://www.unitedholdings.co.sz/products"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All United Holdings Products
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Explore our complete range of insurance and financial solutions designed to protect and support you and your business.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <PiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Company Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  setSelectedCompany('All');
                  trackEvent('products_page_filter_clicked', {
                    filter: 'All',
                    location: 'products_main_page'
                  });
                }}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCompany === 'All'
                    ? 'bg-white text-[#9b1c20] shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                All Companies
              </button>
              {companies.map(company => (
                <button
                  key={company.id}
                  onClick={() => {
                    setSelectedCompany(company.id);
                    trackEvent('products_page_filter_clicked', {
                      filter: company.name,
                      location: 'products_main_page'
                    });
                  }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCompany === company.id
                      ? 'bg-white text-[#9b1c20] shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {company.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 mb-4">No products found</p>
              <p className="text-gray-500 mb-8">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCompany('All');
                  trackEvent('products_page_reset_filters', {
                    location: 'products_main_page'
                  });
                }}
                className="bg-[#9b1c20] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#7a1619] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompanies.map(company => (
                <div
                  key={company.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Company Header */}
                  <div
                    className="p-8 text-white relative overflow-hidden"
                    style={{ backgroundColor: company.color }}
                  >
                    <div className="absolute top-0 right-0 text-6xl opacity-20 transform translate-x-4 -translate-y-4">
                      {company.icon}
                    </div>
                    
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold mb-3">{company.name}</h2>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {company.description}
                      </p>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Featured Products
                    </h3>
                    
                    <ul className="space-y-3 mb-6">
                      {company.products.slice(0, 5).map((product, index) => (
                        <li key={index} className="flex items-start">
                          <span
                            className="inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                            style={{ backgroundColor: company.color }}
                          />
                          <span className="text-gray-700 text-sm">{product.name}</span>
                        </li>
                      ))}
                      {company.products.length > 5 && (
                        <li className="text-gray-500 italic text-sm pt-2">
                          ...and {company.products.length - 5} more
                        </li>
                      )}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      href={company.link}
                      onClick={() => handleCompanyClick(company.id)}
                      className="inline-flex items-center justify-center w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 text-white group/btn"
                      style={{ backgroundColor: company.color }}
                    >
                      Explore All Products
                      <PiArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Why Choose Section */}
        <div className="bg-gray-100 py-16 md:py-24 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Why Choose United Holdings?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Trusted Since Day One
                </h3>
                <p className="text-gray-600">
                  Over years of providing reliable insurance and financial solutions to families and businesses across Eswatini.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Tailored Solutions
                </h3>
                <p className="text-gray-600">
                  Whether you need life assurance, business coverage, or financial support, we have a product designed for you.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Easy Access
                </h3>
                <p className="text-gray-600">
                  Get quotes, manage policies, and contact our team easily through our digital platforms and branches.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Protected?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Start with a free quote or contact us to learn more about our products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-[#9b1c20] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                onClick={() => trackEvent('products_page_contact_cta_clicked', {
                  location: 'products_main_page_cta'
                })}
              >
                Contact Us
              </Link>
              <a
                href="tel:8001010"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#9b1c20] transition-colors"
                onClick={() => trackEvent('products_page_phone_cta_clicked', {
                  location: 'products_main_page_cta'
                })}
              >
                Call 800 1010
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
