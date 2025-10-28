"use client"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RenderForm from '@/components/RenderForm';
import ProductBenefits from '@/components/ProductBenefits';
import ProductCoverage from '@/components/ProductCoverage';
import ProductExclusions from '@/components/ProductExclusions';
import ProductEligibility from '@/components/ProductEligibility';
import ProductHowToApply from '@/components/ProductHowToApply';
import ProductFAQs from '@/components/ProductFAQs';
import RelatedProducts from '@/components/RelatedProducts';
import { notFound } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Agent from '@/components/Agent';
import { fetchUnitedGeneralInsuranceData } from '@/components/UGI_ProductsData';
import { fetchUnitedLifeAssuranceData } from '@/components/ULA_ProductsData';
import { fetchUnitedPayData } from '@/components/UP_ProductData';

// Company color mapping
const COMPANY_COLORS = {
  'UGI': '#286278', // Blue for United General Insurance
  'ULA': '#3d834d', // Green for United Life Assurance
  'UP': '#f79620',  // Orange for United Pay
};

// Company names mapping
const COMPANY_NAMES = {
  'UGI': 'United General Insurance',
  'ULA': 'United Life Assurance',
  'UP': 'United Pay'
};

// Determine company based on product name or characteristics
const getProductCompany = (product) => {
  // Check if product has explicit company field
  if (product.company) return product.company;

  // Determine by product characteristics
  const productName = product.name.toLowerCase();

  // United Life Assurance products
  if (productName.includes('funeral') ||
    productName.includes('family') ||
    productName.includes('life') ||
    productName.includes('credit life') ||
    productName.includes('dignified') ||
    productName.includes('group life')) {
    return 'ULA';
  }

  // United Pay products
  if (productName.includes('loan') ||
    productName.includes('micro') ||
    productName.includes('salary') ||
    productName.includes('umlamleli')) {
    return 'UP';
  }

  // United General Insurance products (default)
  return 'UGI';
};

export default function ProductPage({ params }) {
  const [tab, setTab] = useState('file');
  const [submitted, setSubmitted] = useState(false);
  const [allProductsData, setAllProductsData] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    dob: '',
    vehicle: '',
    address: '',
  });

  const unwrappedParams = typeof params.then === 'function' ? React.use(params) : params;

  // Fetch product data on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Call the functions to get the data
        const ugiData = await fetchUnitedGeneralInsuranceData();
        const ulaData = await fetchUnitedLifeAssuranceData();
        const upData = await fetchUnitedPayData();

        // Combine all product data
        const combinedData = [
          ...ugiData,
          ...ulaData,
          ...upData
        ];

        setAllProductsData(combinedData);

        // Find the current product
        const foundProduct = combinedData.find(
          p => {
            const productSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return productSlug === unwrappedParams.slug;
          }
        );

        setProduct(foundProduct);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [unwrappedParams.slug]);

  // Send quote function
  const sendQuote = async (formDataToSubmit) => {
    if (!product) return false;

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      // Prepare the request body
      const requestBody = {
        name: formDataToSubmit.name,
        surname: formDataToSubmit.name.split(' ').slice(1).join(' ') || formDataToSubmit.name,
        email: formDataToSubmit.email,
        mobileNumber: formDataToSubmit.phone,
        productData: Object.entries(formDataToSubmit)
          .filter(([key, value]) => value && value.toString().trim() !== '')
          .map(([key, value]) => ({ field: key, value: value.toString().trim() }))
          .concat([
            { field: 'product', value: product.name },
            { field: 'company', value: getProductCompany(product) },
            { field: 'timestamp', value: new Date().toISOString() }
          ])
      };

      console.log('Sending quote request:', JSON.stringify(requestBody, null, 2));

      const response = await fetch('https://uh-server.onrender.com/api/get-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status, response.statusText);

      // Handle different response types
      if (response.status === 204) {
        // No content - that's fine
        console.log('Request successful (204 No Content)');
      } else if (response.ok) {
        // Try to parse JSON, but don't fail if it's empty
        const responseText = await response.text();
        if (responseText.trim()) {
          try {
            const result = JSON.parse(responseText);
            console.log('Response JSON:', result);
          } catch (parseError) {
            console.warn('Response is not valid JSON:', responseText);
          }
        } else {
          console.log('Response is empty (expected)');
        }
      } else {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(`Server returned ${response.status}: ${errorText || response.statusText}`);
      }

      // If we get here, the request was successful
      setSubmitMessage(companyText.successMessage);
      setSubmitted(true);

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        amount: '',
        dob: '',
        vehicle: '',
        address: '',
      });

      return true;

    } catch (error) {
      console.error('Error sending quote:', error);
      const errorMessage = error.message.includes('Failed to fetch')
        ? 'Network error. Please check your connection and try again.'
        : `Failed to submit your request: ${error.message}`;
      setSubmitError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission from RenderForm
  const handleFormSubmit = async (submittedFormData) => {
    console.log('Form submitted with data:', submittedFormData);

    // Basic validation
    if (!submittedFormData.name || !submittedFormData.email || !submittedFormData.phone) {
      setSubmitError('Please fill in all required fields (name, email, and phone)');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(submittedFormData.email)) {
      setSubmitError('Please enter a valid email address');
      return false;
    }

    // Update the form data state
    setFormData(submittedFormData);

    // Send the quote
    return await sendQuote(submittedFormData);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9b1c20] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Show not found if product doesn't exist
  if (!product) {
    return notFound();
  }

  // Get company and color
  const company = getProductCompany(product);
  const departmentColor = COMPANY_COLORS[company] || '#9b1c20';
  const isLightColor = departmentColor === '#f79620'; // United Pay is orange
  const companyName = COMPANY_NAMES[company] || company;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when user starts typing
    if (submitError) setSubmitError('');
  };

  // Dynamic text based on company type
  const getCompanySpecificText = () => {
    switch (company) {
      case 'UP':
        return {
          mainHeading: 'Get hassle-free financing for all your needs',
          actionText: 'Apply Now',
          successMessage: 'Application submitted successfully! We\'ll contact you soon.',
          formTitle: 'Please complete the details for your loan application',
          submitButtonText: 'Request Loan Quote'
        };
      case 'ULA':
        return {
          mainHeading: 'Get peace of mind with life assurance protection',
          actionText: 'Get Covered Today',
          successMessage: 'Quote request submitted successfully! We\'ll contact you soon.',
          formTitle: 'Please complete the details for your life assurance quote',
          submitButtonText: 'Request Quote'
        };
      default: // UGI
        return {
          mainHeading: 'Get hassle-free cover for all your insurance needs',
          actionText: 'Sign Me Up Today',
          successMessage: 'Quote request submitted successfully! We\'ll contact you soon.',
          formTitle: 'Please complete the details for your insurance quote',
          submitButtonText: 'Request Quote'
        };
    }
  };

  const companyText = getCompanySpecificText();

  return (
    <div className="min-h-screen font-outfit mx-auto">
      {/* Company Header Bar */}
      <div
        className='h-8 w-full'
        style={{ backgroundColor: departmentColor }}
      />

      {/* Main Header */}
      <div
        className='py-4'
        style={{ backgroundColor: departmentColor }}
      >
        <header className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center sm:text-left">
              {product.tagline}
            </h1>
            <div className="text-white text-sm sm:text-base bg-black/20 px-3 py-1 rounded-full">
              {companyName}
            </div>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <div className='relative'>
        <div className='absolute w-full -z-10'>
          <div
            className='h-full w-full absolute opacity-20'
            style={{ backgroundColor: departmentColor }}
          />
          <img
            src={product.heroImage}
            alt={product.name}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[720px] object-cover"
          />
        </div>

        <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 w-full gap-8 sm:gap-12 md:gap-16 lg:gap-24 flex flex-col">
            {/* Product Name */}
            <div className='flex items-center justify-center text-center'>
              <h1 className='font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight'>
                {product.name}
              </h1>
            </div>

            {/* Quote Form Section */}
            <div
              className="w-full px-4 sm:px-6 md:px-8 flex flex-col rounded-xl sm:rounded-2xl -xl mx-auto text-white py-6 sm:py-8"
              style={{ backgroundColor: departmentColor }}
            >
              <div className='space-y-3 sm:space-y-4 text-center sm:text-left'>
                <p className='text-2xl sm:text-3xl md:text-4xl font-semibold max-w-lg mx-auto sm:mx-0'>
                  {companyText.mainHeading}
                </p>
                <p className='text-sm sm:text-base font-light max-w-md mx-auto sm:mx-0'>
                  {product.tagline}
                </p>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="bg-white w-full rounded-lg sm:rounded-xl -lg p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 items-center mx-auto text-black">
                  <div className='w-full flex flex-col text-center sm:text-left'>
                    <p className='text-xl sm:text-2xl md:text-3xl font-light mb-2'>
                      Let&apos;s get started
                    </p>
                    <p className='font-semibold text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8'>
                      {companyText.formTitle}
                    </p>
                  </div>

                  {/* RenderForm with proper event handling */}
                  <RenderForm
                    product={product}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    company={company}
                    onFormSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                    submitMessage={submitMessage}
                    submitError={submitError}
                    companyText={companyText}
                  />
                </div>
              </div>

              {/* Success and Error Messages */}
              {(submitMessage || submitError) && (
                <div className={`mt-4 p-4 rounded-lg ${submitMessage ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {submitMessage || submitError}
                </div>
              )}

              {/* Disclaimer */}
              <div className={`text-xs mt-4 sm:mt-6 space-y-2 ${isLightColor ? 'text-gray-700' : 'text-gray-200'}`}>
                <p className={`font-bold text-lg sm:text-xl ${isLightColor ? 'text-gray-800' : 'text-gray-100'}`}>
                  Disclaimer
                </p>
                <p className='text-justify'>
                  {company === 'UP'
                    ? `We value your privacy and are committed to safeguarding your personal information. By submitting your details, you consent to us processing them for the purpose of providing you with a personalized loan offer. Loan approval is subject to credit assessment and affordability criteria. Interest rates and terms vary based on individual circumstances. It is essential that all information provided is accurate, as discrepancies may impact the validity of your application.`
                    : `We value your privacy and are committed to safeguarding your personal information. By submitting your details, you consent to us processing them for the purpose of providing you with a personalized quote. Please note that some of our advisors operate under supervision to ensure consistently excellent service. Quoted premiums are based on your individual risk profile and are subject to annual review in line with economic conditions and underwriting criteria. Terms, conditions, and benefit limits apply. It is essential that all information provided is accurate, as discrepancies may impact the validity or outcome of any future claims.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className='max-w-[1400px] px-4 my-8 sm:my-12 md:my-16 space-y-6 mx-auto flex flex-col lg:flex-row'>
        <div className='lg:min-w-3/12 w-full lg:w-auto'>
          <h2 className='font-semibold text-2xl sm:text-3xl lg:text-4xl text-center lg:text-left'>
            {product.name}
          </h2>
          <p className='font-light text-gray-600 text-center lg:text-left mt-2'>
            {product.tagline}
          </p>
          <div className="flex flex-col w-full justify-between py-4 lg:py-6"></div>
        </div>

        <div className='w-full lg:border-l lg:border-gray-400 lg:pl-6'>
          <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <p className="text-gray-500 max-w-4xl text-base sm:text-lg leading-relaxed">
                {product.overview}
              </p>
            </div>
            <div>
              <div className="flex gap-3 sm:gap-4 mt-4 flex-wrap justify-center md:justify-start">
                {product.stats && product.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="text-white px-3 sm:px-4 py-2 rounded-full font-bold text-sm sm:text-base whitespace-nowrap"
                      style={{ backgroundColor: departmentColor }}
                    >
                      {stat}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className='max-w-[1400px] mb-8 sm:mb-12 md:mb-16 mx-auto space-y-12'>
        {product.benefits && <ProductBenefits benefits={product.benefits} company={company} />}
        {product.eligibility && <ProductEligibility eligibility={product.eligibility} />}
      </div>
      <Agent />
    </div>
  );
}