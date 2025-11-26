'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { SlDoc, SlEnvolope, SlInfo, SlLink, SlPhone, SlTarget } from 'react-icons/sl';
import VideoPlayer from './VideoPlayer';

function Agent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [callbackReasons, setCallbackReasons] = useState([]);
  const [loadingReasons, setLoadingReasons] = useState(true);
  const [reasonsError, setReasonsError] = useState(null);
  const [officersData, setOfficersData] = useState(null);
  const [loadingOfficersData, setLoadingOfficersData] = useState(true);

  // Fetch officers page data and callback reasons from API
  useEffect(() => {
    const fetchOfficersData = async () => {
      try {
        const response = await fetch('https://website.api.united.co.sz/api/home');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }

        const result = await response.json();

        if (result.success && result.data) {
          // Set officers page data
          setOfficersData(result.data.officersPage);
          
          // Set callback reasons from API
          if (result.data.callbackReasons && Array.isArray(result.data.callbackReasons)) {
            console.log('Raw callback reasons from API:', result.data.callbackReasons);
            
            // Include all reasons and sort by displayOrder
            const allReasons = result.data.callbackReasons
              .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            
            console.log('All callback reasons:', allReasons);
            setCallbackReasons(allReasons);
          } else {
            console.warn('No callback reasons found in API response');
            setCallbackReasons([]);
          }
        } else {
          throw new Error(result.message || 'Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching officers data:', error);
        setReasonsError(error.message);
        setCallbackReasons([]);
      } finally {
        setLoadingReasons(false);
        setLoadingOfficersData(false);
      }
    };

    fetchOfficersData();
  }, []);

  // Get email based on selected reason value from API data
  const getEmailByReason = (selectedReasonValue) => {
    if (!selectedReasonValue) return officersData?.contactEmail?.display || 'info@united.co.sz';

    const foundReason = callbackReasons.find(reasonItem => reasonItem.value === selectedReasonValue);
    return foundReason ? foundReason.targetEmail : (officersData?.contactEmail?.display || 'info@united.co.sz');
  };

  // Get description for selected reason
  const getReasonDescription = (selectedReasonValue) => {
    if (!selectedReasonValue) return '';

    const foundReason = callbackReasons.find(reasonItem => reasonItem.value === selectedReasonValue);
    return foundReason ? foundReason.description : '';
  };

  // Get department for selected reason
  const getReasonDepartment = (selectedReasonValue) => {
    if (!selectedReasonValue) return 'General';

    const foundReason = callbackReasons.find(reasonItem => reasonItem.value === selectedReasonValue);
    return foundReason ? foundReason.targetDepartment : 'General';
  };

  const handleSendCallback = async (e) => {
    e.preventDefault();

    if (!firstName || !mobileNumber || !reason) {
      setMessage(officersData?.messages?.validation?.requiredFields || 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const recipientEmail = getEmailByReason(reason);
      const reasonDescription = getReasonDescription(reason);
      const selectedReasonLabel = callbackReasons.find(r => r.value === reason)?.label || reason;

      const emailData = {
        product_name: "Callback Request - " + selectedReasonLabel,
        product_company: "United Holdings",
        product_email: recipientEmail,
        product_contact: mobileNumber,
        customer_name: `${firstName} ${lastName}`.trim(),
        reason: selectedReasonLabel,
        reason_description: reasonDescription
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(officersData?.messages?.api?.success || 'Callback request sent successfully! We will contact you shortly.');
        setFirstName('');
        setLastName('');
        setMobileNumber('');
        setReason('');
      } else {
        setMessage(officersData?.messages?.api?.error || 'Failed to send callback request. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage(officersData?.messages?.api?.error || 'Failed to send callback request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while fetching data
  if (loadingOfficersData) {
    return (
      <div className="py-4 relative">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error state if API fails
  if (!officersData) {
    return (
      <div className="py-4 relative">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Failed to load data. Please try again later.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 relative">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-6 md:mb-8 max-w-[1400px] mx-auto px-4 lg:px-0 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col gap-3 md:gap-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#9b1c20] mb-1 md:mb-2 font-outfit">
              {officersData.headerTitle}
            </h3>
            <p className="text-gray-600 max-w-2xl text-base md:text-lg lg:text-xl">
              {officersData.headerSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Video Section - Desktop Only */}
      <div className='h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] lg:block hidden'>
        <VideoPlayer src={officersData.videoUrl} alt={officersData.videoAltText} />
      </div>

      {/* Main Form Container */}
      <div className="font-outfit max-w-[1400px] px-2 mx-auto lg:px-0 w-full">
        <div className="mx-auto rounded-2xl">
          {/* Responsive positioning - normal flow on mobile, absolute on desktop */}
          <div className="bg-white w-full max-w-[1200px] xxl:max-w-[1400px] mx-auto 
                         lg:absolute lg:top-[55%] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 
                         p-3 sm:p-4 md:p-6 rounded-xl lg:rounded-3xl 
                         flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 md:gap-8">

            {/* Form Section */}
            <div className="space-y-4 sm:space-y-6 flex flex-col py-4 sm:py-6 lg:py-8 px-2 sm:px-4 md:px-6 lg:px-8 w-full">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <p className="font-bold text-[#9b1c20] text-xl sm:text-2xl md:text-2xl">
                  {officersData.formTitle}
                </p>
                <p className='text-base md:text-lg text-[#9b1c20] font-light'>
                  {officersData.formSubtitle}
                </p>
              </div>

              {/* API Error Warning */}
              {reasonsError && (
                <div className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                  <strong>Note:</strong> {reasonsError}
                </div>
              )}


              {/* Form */}
              <form onSubmit={handleSendCallback} className="w-full">
                {/* Name Fields */}
                <div className="flex flex-col sm:flex-row gap-3 mb-3 w-full">
                  <input
                    type="text"
                    placeholder={officersData.formLabels.firstName.placeholder}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                    required={officersData.formLabels.firstName.required}
                  />
                  <input
                    type="text"
                    placeholder={officersData.formLabels.lastName.placeholder}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                    required={officersData.formLabels.lastName.required}
                  />
                </div>

                {/* Contact Fields */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full">
                  <input
                    type="tel"
                    placeholder={officersData.formLabels.mobileNumber.placeholder}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                    required={officersData.formLabels.mobileNumber.required}
                  />
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30 bg-white"
                    required={officersData.formLabels.reason.required}
                    disabled={loadingReasons}
                  >
                    <option value="">
                      {loadingReasons ? officersData.formLabels.reason.loadingText : officersData.formLabels.reason.placeholder}
                    </option>
                    {callbackReasons.map((reasonItem) => (
                      <option 
                        key={reasonItem.value} 
                        value={reasonItem.value}
                      >
                        {reasonItem.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reason Description */}
                {reason && (
                  <div className="text-xs text-gray-600 mb-2 p-2 bg-gray-50 rounded-lg">
                    <div className="font-semibold">{getReasonDescription(reason)}</div>
                    <div className="mt-1">
                      Your request will be sent to: <strong>{getEmailByReason(reason)}</strong>
                      <br />
                      <span className="text-gray-500">
                        Department: {getReasonDepartment(reason)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || loadingReasons}
                  className="bg-[#9b1c20] space-x-2 text-white px-6 md:px-8 lg:px-16 py-3 sm:py-4 rounded-full w-full sm:w-auto flex items-center justify-center text-sm sm:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#8a191d] transition-colors duration-200 min-h-[48px]"
                >
                  <SlPhone className="text-sm" />
                  <span className="whitespace-nowrap">
                    {isLoading ? officersData.buttonText.loading : officersData.buttonText.default}
                  </span>
                </button>
              </form>

              {/* Message */}
              {message && (
                <div className={`text-sm font-semibold ${message.includes('successfully') ? 'text-green-600' : 'text-yellow-600'}`}>
                  {message}
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-2">
                <div className="pt-4 border-t border-gray-200">
                  <p className="font-bold text-gray-600 text-sm md:text-base mb-2">
                    {officersData.contactTitle}
                  </p>
                  <div className="flex flex-col lg:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
                    <div className="flex items-center gap-2">
                      <SlPhone className="text-sm md:text-base text-[#9b1c20] flex-shrink-0" />
                      <a
                        href={officersData.contactPhone.href}
                        className="font-semibold text-sm md:text-base text-[#9b1c20] hover:underline transition hover:text-[#F7941D]"
                      >
                        {officersData.contactPhone.display}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <SlEnvolope className="text-sm md:text-base text-[#9b1c20] flex-shrink-0" />
                      <a
                        href={officersData.contactEmail.href}
                        className="font-semibold text-sm md:text-base text-[#9b1c20] hover:underline transition hover:text-[#F7941D]"
                      >
                        {officersData.contactEmail.display}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-auto lg:flex-1 md:min-w-[500px] lg:min-w-[700px]">
              <Image
                src={officersData.adImage.asset.url}
                alt={officersData.adAltText}
                height={500}
                width={1000}
                className="w-full h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px] object-cover rounded-xl lg:rounded-2xl border shadow-sm"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agent;