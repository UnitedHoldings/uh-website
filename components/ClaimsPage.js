"use client";

import React, { useState } from 'react';
import ClaimForm from './ClaimForm';
import ClaimTracker from './ClaimTracker';
import Image from 'next/image';
import Link from 'next/link';

export default function ClaimsPage() {
    const [tab, setTab] = useState('file');

    return (
        <div className="min-h-screen font-outfit  mx-auto  ">
            <div className='bg-[#881a1e] h-8 w-full' />
            <div className='bg-[#9b1c20] py-4'>
                <header className=" max-w-[1400px] mx-auto">
                    <h1 className="text-2xl md:text-4xl font-semibold text-white">File & Track a Claim</h1>
                    <p className="text-sm text-white ">Submit a claim or check the status of an existing claim quickly and securely.</p>
                </header>
            </div>
            <div className='relative'>
                <div className='bg-gradient-to-r absolute from-[#9b1c20]/60 to-[#9b1c20]/20 h-full w-full' />
                <Image src={'/claims.png'} alt="Claims" width={1920} height={400} className="w-full h-[320px] object-cover" />

                <div className="absolute right-[10%] top-[20%]   flex items-center">
                    <div className="max-w-[1100px] mx-auto px-4 w-full">
                        <div className="bg-[#9b1c20]  px-8 flex flex-col  mx-auto text-white py-8">
                            <div className=' left-[13%] space-y-4 top-[30%] text-white '>
                                <p className='text-4xl max-w-96 font-semibold'>get hassle-free help for all types of claims</p>
                                <p className='text-sm font-light'>We’ll share everything you need to know about filing and tracking claims.</p>
                            </div>
                        
                            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                                <label className="sr-only">Action</label>
                                <select
                                    value={tab}
                                    onChange={(e) => setTab(e.target.value)}
                                    className="rounded-full px-4 py-2 min-w-[100px] bg-white border  text-gray-800"
                                >
                                    <option value="file">File a Claim</option>
                                    <option value="track">Track a Claim</option>
                                </select>

                                <label className="sr-only">Claim type</label>
                                <select className="rounded-full px-4 py-2 min-w-[300px] bg-white border text-gray-800">
                                    <option>General / Motor</option>
                                    <option>Funeral / Life</option>
                                    <option>Home</option>
                                    <option>Business</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-[1400px] px-4 mt-8 mb-16 space-y-6 mx-auto'>
                <div className="flex  justify-between items-center md:flex-row md:items-center gap-4 md:gap-8">
                    <p className='max-w-[800px] text-2xl'>Most claims, including home, life, funeral, vehicles can be taken care of in <span className="text-[#9b1c20] font-semibold">My Account</span> . Check out the information below for other claims that are handled a little differently.</p>
                    <div>
                        <button className='border-[#9b1c20] border  text-[#9b1c20] py-2 px-8 rounded-full' >
                            Client Area
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-white  overflow-hidden">
                <div className='max-w-[1400px] px-4 mt-8 mb-16 space-y-6 mx-auto flex'>
                    <div className='min-w-4/12'>
                        <p className='font-semibold text-3xl'>File or track a claim</p>
                        <div className="flex flex-col  w-full justify-between py-6 ">
                            <nav className="flex gap-2">
                                <button
                                    onClick={() => setTab('file')}
                                    className={`px-4 py-2 rounded-full transition ${tab === 'file' ? 'bg-[#9b1c20] text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    File a Claim
                                </button>
                                <button
                                    onClick={() => setTab('track')}
                                    className={`px-4 py-2 rounded-full transition ${tab === 'track' ? 'bg-[#9b1c20] text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Track a Claim
                                </button>
                            </nav>
                            <div className="text-sm text-gray-600 mt-3 md:mt-0">
                                <span className="font-semibold">Need help?</span> Call 800 1010 or email <a href="mailto:info@united.co.sz" className="text-[#9b1c20] underline">info@united.co.sz</a>
                            </div>
                        </div>
                    </div>

                    <div className='w-full border-l border-gray-400 pl-6'>
                        <div className="grid grid-row-1 grid-flow-col md:grid-cols-2 gap-6 py-4">
                            {(
                                [
                                    {
                                        key: 'file',
                                        title: 'File a claim',
                                        subtitle: "Start a new claim quickly. We'll guide you through the required information and documents.",
                                        primary: { href: '/client-area', label: 'Log in', style: 'primary' },
                                        secondary: { href: '/client-area', label: 'Register for My Account' },
                                        help: { text: 'Or call us at', phone: '800 1010' }
                                    },
                                    {
                                        key: 'track',
                                        title: 'Track a claim',
                                        subtitle: 'Check the status of an existing claim using your claim reference number.',
                                        primary: { href: '/claims', label: 'Open tracker', style: 'outline' },
                                        secondary: { href: '/client-area', label: 'Log in to My Account' },
                                        help: { text: "If you can't find your reference, call", phone: '(+268) 2508 6000' }
                                    }
                                ]
                            ).map((card) => (
                                <div key={card.key} className="p-6   bg-gray-50">
                                    <h4 className="text-2xl font-semibold mb-2">{card.title}</h4>
                                    <p className="text-lg text-gray-700 mb-4">{card.subtitle}</p>

                                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                                        <Link href={card.primary.href} className={`inline-block px-5 py-2 rounded-full ${card.primary.style === 'primary' ? 'bg-[#9b1c20] text-white' : 'bg-white border border-gray-300 text-gray-800'} font-semibold`}>{card.primary.label}</Link>

                                        <Link href={card.secondary.href} className="text-md text-[#9b1c20] underline">{card.secondary.label}</Link>
                                    </div>

                                    <p className="text-lg text-gray-500 mt-4">{card.help.text} <a href={`tel:${card.help.phone.replace(/[^0-9\+]/g, '')}`} className="text-[#9b1c20]">{card.help.phone}</a> for assistance.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
