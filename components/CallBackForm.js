'use client'
import React from 'react'
import { useForm, ValidationError } from '@formspree/react';
import Link from 'next/link';

// All available products across departments
const ALL_PRODUCTS = [
  'Funeral Plan',
  'Family Protection',
  'Life Insurance',
  'Education Plan',
  'Retirement Plan',
  'Home Insurance',
  'Motor Insurance',
  'Business Insurance',
  'Travel Insurance',
  'Asset Insurance',
  'Umlamleli - Salary Advance',
  'Personal Loan',
  'Business Loan',
  'Not Sure - Need Advice'
];

const CallBackForm = ({ onClose }) => {
  const [activeTab, setActiveTab] = React.useState('personal');
  const [state, handleSubmit] = useForm("xvgwylea");
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    product: '',
    date: '',
    time: '',
    companyName: '',
    businessType: '',
    agreeTerms: false,
    agreeData: false,
    agreeEmails: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if required checkboxes are checked
    if (!formData.agreeTerms) {
      alert('Please agree to the terms of service and privacy policy.');
      return;
    }

    if (!formData.agreeData) {
      alert('Please agree to the data processing terms.');
      return;
    }

    // Handle form submission with Formspree
    handleSubmit(e);

    // Only show alert and reset if submission is successful
    if (state.succeeded) {
      alert('Thank you! We will call you back soon.');
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        product: '',
        date: '',
        time: '',
        companyName: '',
        businessType: '',
        agreeTerms: false,
        agreeData: false,
        agreeEmails: false
      });
      if (onClose) onClose();
    }
  };

  // Show success message when form is successfully submitted
  if (state.succeeded) {
    return (
      <div className="lg:bg-white/90 bg-white rounded-2xl absolute top-20 z-40 lg:right-[10%] right-0 p-6 w-full max-w-md lg:max-w-xl mx-4">
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold font-outfit text-[#9b1c20] mb-4">Thank You!</h3>
          <p className="text-gray-600">We&apos;ll get back to you shortly.</p>
          <Link href="/contact">
            <button
              onClick={onClose}
              className="w-full py-4 px-6 mt-6 text-lg font-semibold rounded-full hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-outfit text-white"
              style={{ backgroundColor: '#9b1c20' }}
            >
              Locate Nearest Branch?
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:bg-white/90 bg-white rounded-2xl absolute top-20 z-40 lg:right-[10%] right-0 p-6 w-full max-w-md lg:max-w-xl mx-4">
      {/* Tabs */}
      <div className="flex mb-6 border-b pb-4 border-gray-300">
        <button
          type="button"
          className={`flex-1 py-3 font-outfit rounded-full font-semibold text-center transition-colors ${activeTab === 'personal'
            ? 'text-gray-100'
            : 'text-gray-500 hover:text-gray-700'
            }`}
          style={{ backgroundColor: activeTab === 'personal' ? '#9b1c20' : 'transparent' }}
          onClick={() => setActiveTab('personal')}
        >
          Personal
        </button>
        <button
          type="button"
          className={`flex-1 py-3 font-outfit rounded-full font-semibold text-center transition-colors ${activeTab === 'business'
            ? 'text-gray-100'
            : 'text-gray-500 hover:text-gray-700'
            }`}
          style={{ backgroundColor: activeTab === 'business' ? '#9b1c20' : 'transparent' }}
          onClick={() => setActiveTab('business')}
        >
          For My Business
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold font-outfit text-[#9b1c20]">Need a Call Back?</h3>
        <p className="text-gray-600 mt-2">We&apos;ll get back to you shortly</p>
      </div>

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Common Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 font-outfit">
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full py-2 outline-none bg-transparent border-gray-300 border-b placeholder-gray-500"
              placeholder="Enter your full name"
            />
            <ValidationError
              prefix="Full Name"
              field="fullName"
              errors={state.errors}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 font-outfit">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full py-2 outline-none bg-transparent border-gray-300 border-b placeholder-gray-500"
              placeholder="Enter your phone number"
            />
            <ValidationError
              prefix="Phone"
              field="phone"
              errors={state.errors}
            />
          </div>
        </div>

        {/* Email Field */}


        {/* Add hidden field for form type */}
        <input type="hidden" name="formType" value={activeTab} />

        {/* Business-specific Fields */}
    

        {/* Product Selection */}
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1 font-outfit">
            Product Interest *
          </label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            required
            className="w-full py-2 outline-none bg-transparent border-gray-300 border-b placeholder-gray-500"
          >
            <option value="">Select a product</option>
            {ALL_PRODUCTS.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
          <ValidationError
            prefix="Product"
            field="product"
            errors={state.errors}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-2">
          {/* Terms of Service Checkbox */}
          <div className="flex items-start">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="mt-1 mr-3"
              required
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-700">
              I agree to the <a href="/terms-of-service" className="text-[#9b1c20] hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-[#9b1c20] hover:underline">Privacy Policy</a> *
            </label>
          </div>

          {/* Data Processing Checkbox */}
          <div className="flex items-start">
            <input
              id="agreeData"
              name="agreeData"
              type="checkbox"
              checked={formData.agreeData}
              onChange={handleInputChange}
              className="mt-1 mr-3"
              required
            />
            <label htmlFor="agreeData" className="text-sm text-gray-700">
              I agree to the processing of my personal data for the purpose of receiving a callback and related services *
            </label>
          </div>

          {/* Marketing Emails Checkbox */}

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state.submitting}
          className="w-full py-4 px-6 mt-4 text-lg font-semibold rounded-full hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-outfit text-white disabled:opacity-50"
          style={{
            backgroundColor: '#9b1c20',
          }}
        >
          {state.submitting ? 'Submitting...' : 'Request Call Back'}
        </button>


      </form>
    </div>
  );
};

export default CallBackForm;