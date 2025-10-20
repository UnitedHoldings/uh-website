'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { SlDoc, SlEnvolope, SlInfo, SlLink, SlPhone, SlTarget } from 'react-icons/sl';
import VideoPlayer from './VideoPlayer';

function Agent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendCallback = async (e) => {
    e.preventDefault();

    if (!firstName || !mobileNumber || !reason) {
      setMessage('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const emailData = {
        product_name: "Callback Request - " + reason,
        product_company: "United Holdings",
        product_email: "jay.rego.14@gmail.com",
        product_contact: mobileNumber,
        customer_name: `${firstName} ${lastName}`.trim(),
        reason: reason
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
    <div className="py-4 relative ">
      <div className="flex flex-col gap-2  mb-8  max-w-[1400px] mx-auto px-4 lg:px-0 w-full">
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
      <div className='h-[600px]'>
        <VideoPlayer src="https://res.cloudinary.com/loooktrial/video/upload/v1760930701/Agent_wce4fn.mp4" />
      </div>
      <div className="font-outfit max-w-[1400px]   px-2 mx-auto  lg:px-0 w-full space-y-6 sm:space-y-8 text-white">
        <div className=" mx-auto rounded-2xl">
          <div className="bg-white absolute top-[60%] w-full max-w-[1200px] xxl:max-w-[1400px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-3xl items-center flex flex-col lg:flex-row justify-between">
            <div className="space-y-6 flex flex-col py-6 sm:pt-8 px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex flex-col  md:gap-8 font-bold text-[#9b1c20] text-2xl sm:text-2xl">
                <p>Request a Callback</p>
                <p className='text-lg font-light'>From Our Insurance Officers</p>
              </div>

              <form onSubmit={handleSendCallback}>
                <div className="flex flex-col sm:flex-row gap-2 mb-2 sm:gap-2 w-full">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-[#9b1c20]/20 p-2 sm:p-3 px-4 rounded-full border  text-sm sm:text-base w-full sm:w-auto text-[#9b1c20] "
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-[#9b1c20]/20 p-2 sm:p-3 px-4 rounded-full border  text-sm sm:text-base w-full sm:w-auto text-[#9b1c20] "
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:gap-2 w-full">
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number *"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="border-[#9b1c20]/20 p-2 sm:p-3 px-4 rounded-full border  text-sm sm:text-base w-full sm:w-auto text-[#9b1c20] "
                    required
                  />
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="border-[#9b1c20]/20 p-2 sm:p-3 px-4 rounded-full border  text-sm sm:text-base w-full sm:w-auto text-[#9b1c20]"
                    required
                  >
                    <option value="">Select Reason *</option>
                    <option value="Get A Quote">Get A Quote</option>
                    <option value="File A Claim">File A Claim</option>
                    <option value="Ask Questions">Ask Questions</option>
                    <option value="Account Statement">Account Statement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#9b1c20] space-x-2 text-white px-4 sm:px-6 lg:px-16 py-2 sm:py-3 rounded-full h-12 -md flex items-center justify-center text-sm sm:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SlPhone />
                  <p className="whitespace-nowrap">
                    {isLoading ? 'Sending...' : 'Send Callback'}
                  </p>
                </button>
              </form>

              {message && (
                <div className={`text-sm font-semibold ${message.includes('successfully') ? 'text-green-600' : 'text-yellow-600'}`}>
                  {message}
                </div>
              )}

              <div className="space-y-4">
                <p className="font-bold text-gray-600 text-sm">Quick Links</p>
                <ul className="flex flex-wrap gap-4 sm:gap-6">
                  <Link href="/claims">
                    <li className="font-semibold text-[#9b1c20] cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                      <SlDoc />
                      <p>File a Claim</p>
                    </li>
                  </Link>
                  <li className="font-semibold text-[#9b1c20] cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                    <SlTarget />
                    <p>Track a Claim</p>
                  </li>
                  <li className="font-semibold text-[#9b1c20] cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                    <SlInfo />
                    <p>Get Proof of Insurance</p>
                  </li>
                  <li className="font-semibold text-[#9b1c20] cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                    <SlLink />
                    <p>Make Payment</p>
                  </li>
                </ul>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex sm:flex-col lg:flex-row  items-center gap-4">
                    <div className="flex  justify-start items-center gap-2">
                      <SlPhone className="text-sm sm:text-base hover:underline transition duration-150 ease-in-out text-[#9b1c20]" />
                      <a
                        href="tel:8001010"
                        className="font-semibold text-sm sm:text-base text-[#9b1c20] hover:underline transition hover:text-[#F7941D]"
                      >
                        800 1010
                      </a>
                      <span className="text-[#9b1c20] hidden sm:inline">|</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <SlEnvolope className="text-sm sm:text-base hover:underline transition duration-150 ease-in-out text-[#9b1c20]" />
                      <a
                        href="mailto:info@united.co.sz"
                        className="font-semibold text-sm sm:text-base text-[#9b1c20] hover:underline transition hover:text-[#F7941D]"
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