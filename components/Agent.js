'use client';

import Image from 'next/image';
import React from 'react';
import { SlDoc, SlEnvolope, SlInfo, SlLink, SlPhone, SlTarget } from 'react-icons/sl';

function Agent() {
  return (
    <div className="bg-gray-100 py-4 ">
      <div className="font-outfit max-w-[1400px] mx-auto  px-2 lg:px-0  w-full space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="text-xl sm:text-2xl min-w-xs font-semibold text-gray-500">
                <p>Speak to an Agent</p>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl max-w-3xl">
                <p>
                  <span className="text-[#8B8B8B] font-light">Connect</span> with one of our agents to explore tailored solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mx-auto">
          <div className="bg-white rounded-xl flex flex-col lg:flex-row justify-between">
            <div className="space-y-6 py-6 sm:pt-8 px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 font-semibold text-[#D72423] text-xl sm:text-2xl">
                <p>Request a Quote</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  className="bg-white p-2 sm:p-3 px-4 rounded-full border border-red-200 text-sm sm:text-base w-full sm:w-auto"
                />
                <select className="bg-white p-2 sm:p-3 px-4 rounded-full border border-red-200 text-sm sm:text-base w-full sm:w-auto">
                  <option value="">Select Product</option>
                  <option value="legal-insurance">Legal Insurance</option>
                  <option value="funeral-assurance">Funeral Assurance</option>
                  <option value="motor-insurance">Motor Insurance</option>
                  <option value="dignified-family-support">Dignified Family Support Cover</option>
                  <option value="micro-loans">Micro Loans</option>
                  <option value="united-pay">United Pay</option>
                  <option value="life-assurance">Life Assurance</option>
                  <option value="general-insurance">General Insurance</option>
                </select>
                <button className="bg-[#D72423] space-x-2 text-white px-4 sm:px-6 lg:px-16 py-2 sm:py-3 rounded-full h-12 shadow-md flex items-center justify-center text-sm sm:text-base">
                  <SlPhone />
                  <p className="whitespace-nowrap">Send Callback</p>
                </button>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-gray-500 text-sm">Quick Links</p>
                <ul className="flex flex-wrap gap-4 sm:gap-6">
                  <li className="font-semibold text-gray-700 cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                    <SlDoc />
                    <p>File a Claim</p>
                  </li>
                  <li className="font-semibold text-gray-700 cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                    <SlTarget />
                    <p>Track a Claim</p>
                  </li>
                  <li className="font-semibold text-gray-700 cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                    <SlInfo />
                    <p>Get Proof of Insurance</p>
                  </li>
                  <li className="font-semibold text-gray-700 cursor-pointer hover:underline flex items-center space-x-2 text-sm sm:text-base">
                    <SlLink />
                    <p>Make Payment</p>
                  </li>
                </ul>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex sm:flex-col lg:flex-row  items-center gap-4">
                    <div className="flex items-center gap-2">
                      <SlPhone className="text-sm sm:text-base hover:underline transition duration-150 ease-in-out" />
                      <a
                        href="tel:8001010"
                        className="font-semibold text-sm sm:text-base text-[#F7941D] hover:underline transition hover:text-[#F7941D]"
                      >
                        800 1010
                      </a>
                      <span className="text-[#F7941D] hidden sm:inline">|</span>
                      <a
                        href="tel:+26825086000"
                        className="font-semibold text-sm sm:text-base text-[#F7941D] hover:underline transition hover:text-[#F7941D]"
                      >
                        (+268) 2508 6000
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <SlEnvolope className="text-sm sm:text-base hover:underline transition duration-150 ease-in-out" />
                      <a
                        href="mailto:info@united.co.sz"
                        className="font-semibold text-sm sm:text-base text-[#F7941D] hover:underline transition hover:text-[#F7941D]"
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
                height={200}
                width={700}
                className="rounded-b-xl lg:rounded-r-xl w-full h-auto max-h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agent;
