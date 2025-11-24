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

  // Fallback callback reasons in case API fails
  const FALLBACK_REASONS = [
    {
      _id: 'fallback-1',
      label: 'Get A Quote',
      value: 'get_quote',
      description: 'Request a personalized insurance quote',
      targetDepartment: 'Sales',
      targetEmail: 'sales@unitedholdings.co.sz',
      isActive: true,
      displayOrder: 1
    },
    {
      _id: 'fallback-2',
      label: 'File A Claim',
      value: 'file_claim',
      description: 'Submit a new insurance claim',
      targetDepartment: 'Claims',
      targetEmail: 'claims@unitedholdings.co.sz',
      isActive: true,
      displayOrder: 2
    },
    {
      _id: 'fallback-3',
      label: 'Ask Questions',
      value: 'general_inquiry',
      description: 'General questions about our products and services',
      targetDepartment: 'Customer Service',
      targetEmail: 'info@unitedholdings.co.sz',
      isActive: true,
      displayOrder: 3
    },
    {
      _id: 'fallback-4',
      label: 'Account Statement',
      value: 'account_statement',
      description: 'Request account statement or policy information',
      targetDepartment: 'Accounts',
      targetEmail: 'accounts@unitedholdings.co.sz',
      isActive: true,
      displayOrder: 4
    },
    {
      _id: 'fallback-5',
      label: 'Other',
      value: 'other',
      description: 'Other inquiries or concerns',
      targetDepartment: 'General',
      targetEmail: 'info@unitedholdings.co.sz',
      isActive: true,
      displayOrder: 5
    }
  ];

  // Fetch callback reasons from API
  useEffect(() => {
    const fetchCallbackReasons = async () => {
      try {
        const response = await fetch('/api/callback-reasons');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }

        const result = await response.json();

        if (result.success && result.data) {
          // Filter only active reasons and sort by displayOrder
          const activeReasons = result.data
            .filter(reason => reason.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder);

          setCallbackReasons(activeReasons);
        } else {
          throw new Error(result.message || 'Failed to fetch callback reasons');
        }
      } catch (error) {
        console.error('Error fetching callback reasons:', error);
        setReasonsError(error.message);
        // Use fallback data if API fails
      } finally {
        setLoadingReasons(false);
      }
    };

    fetchCallbackReasons();
  }, []);

  // Get email based on selected reason from API data
  const getEmailByReason = (selectedReason) => {
    if (!selectedReason) return 'info@unitedholdings.co.sz';

    const foundReason = callbackReasons.find(reason => reason.label === selectedReason);
    return foundReason ? foundReason.targetEmail : 'info@unitedholdings.co.sz';
  };

  // Get description for selected reason
  const getReasonDescription = (selectedReason) => {
    if (!selectedReason) return '';

    const foundReason = callbackReasons.find(reason => reason.label === selectedReason);
    return foundReason ? foundReason.description : '';
  };

  const handleSendCallback = async (e) => {
    e.preventDefault();

    if (!firstName || !mobileNumber || !reason) {
      setMessage('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const recipientEmail = getEmailByReason(reason);
      const reasonDescription = getReasonDescription(reason);

      const emailData = {
        product_name: "Callback Request - " + reason,
        product_company: "United Holdings",
        product_email: recipientEmail,
        product_contact: mobileNumber,
        customer_name: `${firstName} ${lastName}`.trim(),
        reason: reason,
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
        setMessage('Callback request sent successfully! We will contact you shortly.');
        setFirstName('');
        setLastName('');
        setMobileNumber('');
        setReason('');
      } else {
        setMessage('Failed to send callback request. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('Failed to send callback request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-4 relative">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-6 md:mb-8 max-w-[1400px] mx-auto px-4 lg:px-0 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col gap-3 md:gap-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#9b1c20] mb-1 md:mb-2 font-outfit">
              Speak to an Officer
            </h3>
            <p className="text-gray-600 max-w-2xl text-base md:text-lg lg:text-xl">
              Connect with one of our officers to explore tailored solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Video Section - Desktop Only */}
      <div className='h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] lg:block hidden'>
        <VideoPlayer src="https://res.cloudinary.com/loooktrial/video/upload/v1760930701/Agent_wce4fn.mp4" />
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
                  Request a Callback
                </p>
                <p className='text-base md:text-lg text-[#9b1c20] font-light'>
                  From Our Insurance Officers
                </p>
              </div>

              {/* API Error Warning */}
              {reasonsError && (
                <div className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                  <strong>Note:</strong> Using fallback data. {reasonsError}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSendCallback} className="w-full">
                {/* Name Fields */}
                <div className="flex flex-col sm:flex-row gap-3 mb-3 w-full">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                  />
                </div>

                {/* Contact Fields */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full">
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number *"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30"
                    required
                  />
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="border-[#9b1c20]/20 p-3 sm:p-4 px-4 rounded-full border text-sm sm:text-base w-full text-[#9b1c20] focus:outline-none focus:ring-2 focus:ring-[#9b1c20]/30 bg-white"
                    required
                    disabled={loadingReasons}
                  >
                    <option value="">{loadingReasons ? 'Loading reasons...' : 'Select Reason *'}</option>
                    {callbackReasons.map((reasonItem) => (
                      <option key={reasonItem._id} value={reasonItem.label}>
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
                        Department: {callbackReasons.find(r => r.label === reason)?.targetDepartment || 'General'}
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
                    {isLoading ? 'Sending...' : 'Send Callback'}
                  </span>
                </button>
              </form>

              {/* Message */}
              {message && (
                <div className={`text-sm font-semibold ${message.includes('successfully') ? 'text-green-600' : 'text-yellow-600'}`}>
                  {message}
                </div>
              )}

              {/* Quick Links & Contact */}
              <div className="space-y-2">


                {/* Contact Information */}
                <div className="flex flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">

                </div>

                {/* Business Unit Emails from API */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="font-bold text-gray-600 text-sm md:text-base mb-2">or Contact us vai:</p>
                  <div className="flex flex-col lg:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
                    <div className="flex items-center gap-2">
                      <SlPhone className="text-sm md:text-base text-[#9b1c20] flex-shrink-0" />
                      <a
                        href="tel:8001010"
                        className="font-semibold text-sm md:text-base text-[#9b1c20] hover:underline transition hover:text-[#F7941D]"
                      >
                        800 1010
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <SlEnvolope className="text-sm md:text-base text-[#9b1c20] flex-shrink-0" />
                      <a
                        href="mailto:info@unitedholdings.co.sz"
                        className="font-semibold text-sm md:text-base text-[#9b1c20] hover:underline transition hover:text-[#F7941D]"
                      >
                        info@united.co.sz
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-auto lg:flex-1 md:min-w-[500px] lg:min-w-[700px]">
              <Image
                src={'/ad.jpg'}
                alt="Advertisement"
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