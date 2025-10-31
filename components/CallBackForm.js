'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { trackEvent } from '@/lib/posthog';

// Updated products according to your actual offerings
const ALL_PRODUCTS = [
  // United Life Assurance Products
  'Dignified Tribute Cover',
  'Dignified Funeral Plan Cover',
  'Dignified Family Support Cover',
  'Dignified Homelink Cover',
  'Dignified Senior Citizen Cover',
  'Tinkhundla Funeral Cover',
  'Credit Life Insurance',
  
  // United General Insurance Products
  'Home Insurance',
  'Professional Indemnity and Fidelity Guarantee Insurance',
  'Engineering Policies and Guarantees',
  'Political Violence and Terrorism',
  'Multimark Policy',
  'Legal Insurance',
  'Motor Insurance',
  'Personal Accident Insurance',
  'Medical Malpractice Insurance',
  
  // United Pay Products
  'Micro Loans',
  'Umlamleli',
  
  // General option
  'Not Sure - Need Advice'
];

const CallBackForm = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formState, setFormState] = useState({
    loading: false,
    error: null,
    success: false
  });

  const [formData, setFormData] = useState({
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormState({ loading: true, error: null, success: false });

    // Check if required checkboxes are checked
    if (!formData.agreeTerms) {
      alert('Please agree to the terms of service and privacy policy.');
      setFormState({ loading: false, error: null, success: false });
      return;
    }

    if (!formData.agreeData) {
      alert('Please agree to the data processing terms.');
      setFormState({ loading: false, error: null, success: false });
      return;
    }

    try {
      // Prepare email data according to your API structure
      const emailData = {
        product_name: "Callback Request - " + formData.product,
        product_company: "United Holdings",
        product_email: formData.email || "info@united.co.sz", // Use provided email or fallback
        product_contact: formData.phone,
        customer_name: formData.fullName.trim(),
        reason: formData.product || "General Inquiry"
      };

      // Send email using your API
      const response = await fetch('http://website.api.united.co.sz/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setFormState({ loading: false, error: null, success: true });

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

        alert('Thank you! We will call you back soon.');

        // Close modal if provided
        if (onClose) {
          setTimeout(() => onClose(), 2000);
        }
      } else {
        throw new Error(result.message || 'Failed to send email');
      }

    } catch (error) {
      console.error('Error sending email:', error);
      setFormState({
        loading: false,
        error: error.message || 'Failed to submit form. Please try again.',
        success: false
      });
      alert('Sorry, there was an error submitting your request. Please try again.');
    }
  };

  // Show success message when form is successfully submitted
  if (formState.success) {
    return (
      <div className="lg:bg-white/80 bg-white rounded-2xl absolute top-20 z-30 lg:right-[10%] right-0 p-6 w-full max-w-md lg:max-w-xl mx-4">
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
    <div className="lg:bg-white/90 bg-white rounded-2xl absolute top-40 z-20 lg:right-[10%] right-0 p-6 w-full max-w-md lg:max-w-xl mx-4">
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-outfit text-[#9b1c20]">Need a Call Back?</h3>
        <p className="text-gray-600 mt-2">We&apos;ll get back to you shortly</p>
      </div>

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Common Fields */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
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
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-outfit">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full py-2 outline-none bg-transparent border-gray-300 border-b placeholder-gray-500"
              placeholder="Enter your email address"
            />
          </div>
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
              
              {/* United Life Assurance Products */}
              <optgroup label="United Life Assurance">
                <option value="Dignified Tribute Cover">Dignified Tribute Cover</option>
                <option value="Dignified Funeral Plan Cover">Dignified Funeral Plan Cover</option>
                <option value="Dignified Family Support Cover">Dignified Family Support Cover</option>
                <option value="Dignified Homelink Cover">Dignified Homelink Cover</option>
                <option value="Dignified Senior Citizen Cover">Dignified Senior Citizen Cover</option>
                <option value="Tinkhundla Funeral Cover">Tinkhundla Funeral Cover</option>
                <option value="Credit Life Insurance">Credit Life Insurance</option>
              </optgroup>
              
              {/* United General Insurance Products */}
              <optgroup label="United General Insurance">
                <option value="Home Insurance">Home Insurance</option>
                <option value="Professional Indemnity and Fidelity Guarantee Insurance">Professional Indemnity & Fidelity Guarantee</option>
                <option value="Engineering Policies and Guarantees">Engineering Policies & Guarantees</option>
                <option value="Political Violence and Terrorism">Political Violence & Terrorism</option>
                <option value="Multimark Policy">Multimark Policy</option>
                <option value="Legal Insurance">Legal Insurance</option>
                <option value="Motor Insurance">Motor Insurance</option>
                <option value="Personal Accident Insurance">Personal Accident Insurance</option>
                <option value="Medical Malpractice Insurance">Medical Malpractice Insurance</option>
              </optgroup>
              
              {/* United Pay Products */}
              <optgroup label="United Pay">
                <option value="Micro Loans">Micro Loans</option>
                <option value="Umlamleli">Umlamleli</option>
              </optgroup>
              
              {/* General Option */}
              <option value="Not Sure - Need Advice">Not Sure - Need Advice</option>
              <option value="Other">Other</option>

            </select>
          </div>
        </div>
        
        {/* Add hidden field for form type */}
        <input type="hidden" name="formType" value={activeTab} />

        {/* Checkboxes */}
        <div className="space-y-3 pt-2">
          {/* Terms of Service Checkbox */}
          <div className="flex items-start">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) => {
                trackEvent('agree_terms_checkbox_clicked', {
                  checked: e.target.checked,
                  location: 'callback_form',
                  form_type: activeTab
                });
                handleInputChange(e);
              }}
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
              onChange={(e) => {
                trackEvent('agree_data_processing_checkbox_clicked', {
                  checked: e.target.checked,
                  location: 'callback_form',
                  form_type: activeTab
                });
                handleInputChange(e);
              }}
              className="mt-1 mr-3"
              required
            />
            <label htmlFor="agreeData" className="text-sm text-gray-700">
              I agree to the processing of my personal data for the purpose of receiving a callback and related services *
            </label>
          </div>
        </div>

        {/* Error Message */}
        {formState.error && (
          <div className="text-red-600 text-sm mt-2">
            {formState.error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formState.loading}
          className="w-full py-4 px-6 mt-4 text-lg font-semibold rounded-full hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-outfit text-white disabled:opacity-50"
          style={{
            backgroundColor: '#9b1c20',
          }}
          onClick={() => {
            if (!formState.loading) {
              trackEvent('request_callback_form_submitted', {
                form_type: activeTab,
                product_interest: formData.product,
                location: 'callback_form'
              });
            }
          }}
        >
          {formState.loading ? 'Submitting...' : 'Request Call Back'}
        </button>
      </form>
    </div>
  );
};

export default CallBackForm;