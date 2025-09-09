import Image from 'next/image'
import React from 'react'
import { SlDoc, SlEnvolope, SlInfo, SlLink, SlPhone, SlTarget } from 'react-icons/sl'

function Agent() {
    return (
        <div className='bg-gray-100 py-16'>
            <div className="font-outfit max-w-[1400px]  mx-auto  w-full space-y-8  overflow-hidden">
                <div className="flex flex-col gap-8 md:gap-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                            <div className="text-2xl min-w-xs font-semibold text-gray-500">
                                <p>Speak to an Agent </p>
                            </div>
                            <div className="text-2xl md:text-3xl max-w-3xl">
                                <p>
                                    <span className="text-[#8B8B8B]">Connect</span>  with one of our agents to explore tailored solutions.{' '}

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='max-w-7xl mx-auto'>
                    <div className='bg-white rounded-xl  space-y-8 flex justify-between'>
                        <div className='space-y-6 pt-8 px-8  w-full'>
                            <div className="flex flex-col gap-4 md:gap-8 font-semibold text-[#D72423] text-2xl">
                                <p>Request a Qoute</p>
                            </div>
                            <div className='flex gap-2 w-full'>
                                <input type="text" placeholder="Enter your email" className='bg-white p-2 px-4  rounded-full border border-red-200' />
                                <select className="bg-white p-2 px-4 rounded-full border border-red-200">
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

                                <div>
                                    <button className='bg-[#D72423] space-x-2 text-white px-16 py-0 rounded-full h-12 shadow-md max-h-24 flex items-center justify-center'>
                                        <SlPhone />
                                        <p className='whitespace-nowrap'>Send Callback</p>
                                    </button>
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <p className='font-bold text-gray-500 text-sm'>Quick Links</p>
                                <ul className='flex space-x-6'>
                                    <li className='font-semibold boder rounded-full text-gray-700 cursor-pointer hover:underline flex items-center space-x-2'>
                                        <SlDoc />
                                        <p>File a Claim</p>
                                    </li>
                                    <li className='font-semibold boder rounded-full text-gray-700 cursor-pointer hover:underline flex items-center space-x-2'>
                                        <SlTarget />
                                        <p>Track a Claim</p>
                                    </li>
                                    <li className='font-semibold boder rounded-full text-gray-700 cursor-pointer hover:underline flex items-center space-x-2'>
                                        <SlInfo />
                                        <p>Get Proof of Insurance</p>
                                    </li>
                                    <li className='font-semibold boder rounded-full text-gray-700 cursor-pointer hover:underline flex items-center space-x-2'>
                                        <SlLink />
                                        <p>Make Payment</p>
                                    </li>
                                </ul>
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <SlPhone className="text-base hover:underline transition duration-150 ease-in-out" />
                                            <a href="tel:8001010" className="font-semibold text-base text-[#F7941D] hover:underline transition hover:text-[#F7941D]">
                                                800 1010
                                            </a>
                                            <span className="text-[#F7941D]">|</span>
                                            <a href="tel:+26825086000" className="font-semibold text-base text-[#F7941D] hover:underline transition hover:text-[#F7941D]">
                                                (+268) 2508 6000
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <SlEnvolope className="text-base hover:underline transition duration-150 ease-in-out" />
                                            <a href="mailto:info@united.co.sz" className="font-semibold text-base text-[#F7941D] hover:underline transition hover:text-[#F7941D]">
                                                info@united.co.sz
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                        <div>
                            <Image src={'/ad.jpg'} alt='image' height={200} width={700} className='rounded-r-xl' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Agent