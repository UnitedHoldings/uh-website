// app/product/[slug]/page.jsx
"use client"
import { notFound } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Agent from '@/components/Agent';
import { fetchUnitedGeneralInsuranceData } from '@/components/UGI_ProductsData';
import { fetchUnitedLifeAssuranceData } from '@/components/ULA_ProductsData';
import { fetchUnitedPayData } from '@/components/UP_ProductData';

// Components
import { CompanyHeader } from '@/components/Product/CompanyHeader';
import { HeroSection } from '@/components/Product/HeroSection';
import { ProductOverview } from '@/components/Product/ProductOverview';
import { LoadingState } from '@/components/Product/LoadingState';
import ProductEligibility from '@/components/Product/ProductEligibility';
import ProductBenefits from '@/components/Product/ProductBenefits';

// Utils
const getProductCompany = (product) => {
  if (product.company) return product.company;

  const productName = product.name.toLowerCase();

  if (productName.includes('funeral') ||
    productName.includes('family') ||
    productName.includes('life') ||
    productName.includes('credit life') ||
    productName.includes('dignified') ||
    productName.includes('individual funeral') ||
    productName.includes('dignified senior citizen cover') ||
    productName.includes('group life')) {
    return 'ULA';
  }

  if (productName.includes('loan') ||
    productName.includes('micro') ||
    productName.includes('salary') ||
    productName.includes('umlamleli')) {
    return 'UP';
  }

  return 'UGI';
};

const getCompanySpecificText = (company) => {
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
    default:
      return {
        mainHeading: 'Get hassle-free cover for all your insurance needs',
        actionText: 'Sign Me Up Today',
        successMessage: 'Quote request submitted successfully! We\'ll contact you soon.',
        formTitle: 'Please complete the details for your insurance quote',
        submitButtonText: 'Request Quote'
      };
  }
};

export default function ProductPage({ params }) {
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
        const [ugiData, ulaData, upData] = await Promise.all([
          fetchUnitedGeneralInsuranceData(),
          fetchUnitedLifeAssuranceData(),
          fetchUnitedPayData()
        ]);

        const combinedData = [...ugiData, ...ulaData, ...upData];
        setAllProductsData(combinedData);

        const foundProduct = combinedData.find(p => {
          const productSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return productSlug === unwrappedParams.slug;
        });

        setProduct(foundProduct);
      } catch (error) {
        
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
      const requestBody = {...formDataToSubmit};

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 204) {
      } else if (response.ok) {
        const responseText = await response.text();
        if (responseText.trim()) {
          try {
            const result = JSON.parse(responseText);
          } catch (parseError) {
          }
        } else {
        }
      } else {
        const errorText = await response.text();
        throw new Error(`Server returned ${response.status}: ${errorText || response.statusText}`);
      }

      const companyText = getCompanySpecificText(getProductCompany(product));
      setSubmitMessage(companyText.successMessage);

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

    

 

    setFormData(submittedFormData);
    console.log(submittedFormData);
    
    return await sendQuote(submittedFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (submitError) setSubmitError('');
  };

  // Show loading state
  if (loading) {
    return <LoadingState />;
  }

  // Show not found if product doesn't exist
  if (!product) {
    return notFound();
  }

  const company = getProductCompany(product);
  const companyText = getCompanySpecificText(company);

  return (
    <div className="min-h-screen font-outfit mx-auto">
      <CompanyHeader product={product} company={company} />
      
      <HeroSection
        product={product}
        company={company}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        submitError={submitError}
      />

      <ProductOverview product={product} company={company} />

      <div className='max-w-[1400px] mb-8 sm:mb-12 md:mb-16 mx-auto space-y-12'>
        {product.benefits && <ProductBenefits benefits={product.benefits} company={company} />}
        {product.eligibility && <ProductEligibility eligibility={product.eligibility} />}
      </div>
      
      <Agent />
    </div>
  );
}