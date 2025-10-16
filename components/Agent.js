'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { SlDoc, SlEnvolope, SlInfo, SlLink, SlPhone, SlTarget } from 'react-icons/sl';

function Agent() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendCallback = async (e) => {
    e.preventDefault();
    
    if (!mobileNumber || !reason) {
      setMessage('Please enter both mobile number and reason');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const emailData = {
        product_name: "Funeral Assurance",
        product_company: "United Life Assurance",
        product_email: "jay.rego.14@gmail.com",
        product_contact: mobileNumber
      };

      const response = await fetch('https://uh-server.onrender.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Callback request sent successfully!');
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
    <div className="py-4 ">
      <div className="font-outfit max-w-[1400px]  px-2 mx-auto  lg:px-0 w-full space-y-6 sm:space-y-8 text-white">
        <div className=" mx-auto">
          <div className="flex flex-col gap-2  mb-16 ">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#9b1c20] mb-2 font-outfit">
                  Speak to an Officer
                </h3>
                <p className="text-gray-600 max-w-2xl text-lg lg:text-xl">
                  Connect with one of our officers to explore tailored solutions.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#9b1c20] rounded-2xl items-center flex flex-col lg:flex-row justify-between">
            <div className="space-y-6 py-6 sm:pt-8 px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 font-semibold text-white text-xl sm:text-2xl">
                <p>Request a Callback</p>
              </div>
              
              <form onSubmit={handleSendCallback}>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="bg-[#9b1c20] p-2 sm:p-3 px-4 rounded-full border border-white text-sm sm:text-base w-full sm:w-auto text-white placeholder-white"
                    required
                  />
                  <select 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="bg-[#9b1c20] p-2 sm:p-3 px-4 rounded-full border border-white text-sm sm:text-base w-full sm:w-auto text-white"
                    required
                  >
                    <option value="">Select Reason</option>
                    <option value="Get A Quote">Get A Quote</option>
                    <option value="File A Claim">File A Claim</option>
                    <option value="Ask Questions">Ask Questions</option>
                    <option value="Account Statement">Account Statement</option>
                    <option value="Other">Other</option>
                  </select>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-white space-x-2 text-[#9b1c20] px-4 sm:px-6 lg:px-16 py-2 sm:py-3 rounded-full h-12 -md flex items-center justify-center text-sm sm:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SlPhone />
                    <p className="whitespace-nowrap">
                      {isLoading ? 'Sending...' : 'Send Callback'}
                    </p>
                  </button>
                </div>
              </form>

              {message && (
                <div className={`text-sm font-semibold ${message.includes('successfully') ? 'text-green-300' : 'text-yellow-300'}`}>
                  {message}
                </div>
              )}

              <div className="space-y-4">
                <p className="font-bold text-white text-sm">Quick Links</p>
                <ul className="flex flex-wrap gap-4 sm:gap-6">
                  <Link href="/claims">
                    <li className="font-semibold text-white cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                      <SlDoc />
                      <p>File a Claim</p>
                    </li>
                  </Link>
                  <li className="font-semibold text-white cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                    <SlTarget />
                    <p>Track a Claim</p>
                  </li>
                  <li className="font-semibold text-white cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                    <SlInfo />
                    <p>Get Proof of Insurance</p>
                  </li>
                  <li className="font-semibold text-white cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                    <SlLink />
                    <p>Make Payment</p>
                  </li>
                </ul>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex sm:flex-col lg:flex-row  items-center gap-4">
                    <div className="flex  justify-start items-center gap-2">
                      <SlPhone className="text-sm sm:text-base hover:underline transition duration-150 ease-in-out text-white" />
                      <a
                        href="tel:8001010"
                        className="font-semibold text-sm sm:text-base text-white hover:underline transition hover:text-[#F7941D]"
                      >
                        800 1010
                      </a>
                      <span className="text-white hidden sm:inline">|</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <SlEnvolope className="text-sm sm:text-base hover:underline transition duration-150 ease-in-out text-white" />
                      <a
                        href="mailto:info@united.co.sz"
                        className="font-semibold text-sm sm:text-base text-white hover:underline transition hover:text-[#F7941D]"
                      >
                        info@united.co.sz
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-auto">
              <Image
                src={'/ad.jpg'}
                alt="Advertisement"
                height={500}
                width={1000}
                className="w-full h-auto max-h-[800px] object-cover rounded-2xl  border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agent;