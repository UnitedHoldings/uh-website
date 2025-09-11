"use client"
import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import {
    SlSocialFacebook,
    SlSocialInstagram,
    SlSocialTwitter,
    SlSocialYoutube,
    SlSocialLinkedin,
    SlLocationPin,
    SlPhone,
    SlEnvolope,
    SlMenu,
    SlClose,
    SlArrowDown,
    SlArrowUp
} from 'react-icons/sl';

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleMobileDropdown = (item) => {
        setMobileActiveDropdown(mobileActiveDropdown === item ? null : item);
    };

    // Memoized dropdown data
    const dropdownItems = useMemo(() => ({
        about: [
            { name: "Our Team", link: "#" },
            { name: "Careers", link: "#" },
            { name: "Upcoming Events", link: "#" },
            { name: "Know your Insurer", link: "#" },
            { name: "Gallery", link: "#" },
            { name: "In the news", link: "#" }
        ],
        insurance: [
            { name: "Motor Insurance", link: "#" },
            { name: "Legal Insurance", link: "#" },
            { name: "Home Insurance", link: "#" },
            { name: "Medical Malpractice Insurance", link: "#" },
            { name: "Professional Indemnity and Fidelity Guarantee Insurance", link: "#" }
        ],
        pay: [
            { name: "Micro Loans", link: "#" },
            { name: "Shesha Loans", link: "#" },
            { name: "Umlamleli", link: "#" }
        ],
        life: [
            { name: "Dignified Funeral Plan Cover", link: "#" },
            { name: "Dignified Senior Citizen Cover", link: "#" },
            { name: "Credit Line Insurance", link: "#" },
            { name: "Dignified Homelink Cover", link: "#" }
        ]
    }), []);

    return (
        <div className="w-full">
            {/* Mobile Drawer Overlay */}
            {isDrawerOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
                    onClick={toggleDrawer}
                />
            )}

            {/* Mobile Drawer */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-60 transform transition-transform duration-300 ease-in-out lg:hidden ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <Image src={'/logo.svg'} alt="Logo" width={110} height={100} />
                        <button onClick={toggleDrawer} className="p-2">
                            <SlClose className="text-2xl" />
                        </button>
                    </div>
                    
                    <ul className='space-y-2 text-lg'>
                        <li className='font-semibold cursor-pointer hover:text-[#D72423] transition duration-150 ease-in-out py-2 border-b border-gray-100'>
                            <p>HOME</p>
                        </li>
                        
                        {/* About with dropdown */}
                        <li className='border-b border-gray-100'>
                            <div 
                                className="flex justify-between items-center font-semibold cursor-pointer py-2 hover:text-[#D72423] transition duration-150 ease-in-out"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMobileDropdown('about');
                                }}
                            >
                                <p>ABOUT</p>
                                {mobileActiveDropdown === 'about' ? <SlArrowUp /> : <SlArrowDown />}
                            </div>
                            {mobileActiveDropdown === 'about' && (
                                <ul className="pl-4 pb-2 space-y-2">
                                    {dropdownItems.about.map((item, index) => (
                                        <li key={index} className="text-sm py-1 hover:text-[#D72423] transition duration-150 ease-in-out">
                                            <a href={item.link}>{item.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        
                        <li className='font-semibold cursor-pointer hover:text-[#D72423] transition duration-150 ease-in-out py-2 border-b border-gray-100'>
                            <p>UNITED GENERAL INSURANCE</p>
                        </li>
                        
                        {/* United Pay with dropdown */}
                        <li className='border-b border-gray-100'>
                            <div 
                                className="flex justify-between items-center font-semibold cursor-pointer py-2 hover:text-[#D72423] transition duration-150 ease-in-out"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMobileDropdown('pay');
                                }}
                            >
                                <p>UNITED PAY</p>
                                {mobileActiveDropdown === 'pay' ? <SlArrowUp /> : <SlArrowDown />}
                            </div>
                            {mobileActiveDropdown === 'pay' && (
                                <ul className="pl-4 pb-2 space-y-2">
                                    {dropdownItems.pay.map((item, index) => (
                                        <li key={index} className="text-sm py-1 hover:text-[#D72423] transition duration-150 ease-in-out">
                                            <a href={item.link}>{item.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        
                        {/* United Life Assurance with dropdown */}
                        <li className='border-b border-gray-100'>
                            <div 
                                className="flex justify-between items-center font-semibold cursor-pointer py-2 hover:text-[#D72423] transition duration-150 ease-in-out"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMobileDropdown('life');
                                }}
                            >
                                <p>UNITED LIFE ASSURANCE</p>
                                {mobileActiveDropdown === 'life' ? <SlArrowUp /> : <SlArrowDown />}
                            </div>
                            {mobileActiveDropdown === 'life' && (
                                <ul className="pl-4 pb-2 space-y-2">
                                    {dropdownItems.life.map((item, index) => (
                                        <li key={index} className="text-sm py-1 hover:text-[#D72423] transition duration-150 ease-in-out">
                                            <a href={item.link}>{item.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        
                        <li className='font-semibold cursor-pointer hover:text-[#D72423] transition duration-150 ease-in-out py-2 border-b border-gray-100'>
                            <p>DOCUMENTS</p>
                        </li>
                    </ul>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2 text-gray-800">
                                <SlLocationPin />
                                <p className="font-semibold">Address</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <SlPhone />
                                <a href="tel:8001010" className="font-semibold text-[#F7941D]">
                                    800 1010
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <SlPhone />
                                <a href="tel:+26825086000" className="font-semibold text-[#F7941D]">
                                    (+268) 2508 6000
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <SlEnvolope />
                                <a href="mailto:info@united.co.sz" className="font-semibold text-[#F7941D]">
                                    info@united.co.sz
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-width white background */}
            <div className="max-w-[1400px] mx-auto flex flex-col overflow-visible">
                {/* Top Section - Hidden on mobile */}
                <div className="hidden lg:flex max-w-[1400px] bg-white lg:border-b border-gray-200 w-full rounded-t-2xl mx-auto flex-wrap items-center justify-between px-6 py-2 gap-y-4">
                    {/* Social Icons */}
                    <ul className="flex space-x-4 text-base text-gray-600">
                        {[SlSocialFacebook, SlSocialInstagram, SlSocialTwitter, SlSocialYoutube, SlSocialLinkedin].map((Icon, index) => (
                            <li key={index} className="cursor-pointer hover:text-black hover:scale-105 transition duration-150 ease-in-out">
                                <Icon />
                            </li>
                        ))}
                    </ul>

                    {/* Location */}
                    <div className="flex items-center space-x-2 text-base text-gray-800 cursor-pointer hover:text-black">
                        <SlLocationPin className="hover:scale-105 transition duration-150 ease-in-out" />
                        <p className="font-semibold border-b border-dotted border-gray-600 hover:scale-105 transition duration-150 ease-in-out">
                            Address
                        </p>
                    </div>

                    {/* Contact Info + Button */}
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
                        <button className="bg-[#D72423] cursor-pointer text-white font-semibold px-4 rounded-full hover:bg-[#921717] transition">
                            Find Us
                        </button>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="max-w-[1400px] bg-white w-full lg:rounded-b-2xl rounded-2xl lg:rounded-t-none mx-auto flex flex-wrap items-center justify-between lg:px-6 py-1 gap-y-4">
                    {/* Logo and Mobile Menu Button */}
                    <div className="flex items-center">
                        <Image src={'/Logo.svg'} alt="Logo" width={110} height={100} />
                    </div>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <div className='hidden lg:block pr-14'>
                        <ul className='flex items-center gap-8 text-sm'>
                            <li className='font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out'>
                                <p>HOME</p>
                            </li>
                            
                            {/* About with dropdown */}
                            <li className="font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out relative group">
                                <div className="flex items-center">
                                    <p>ABOUT</p>
                                    <SlArrowDown className="ml-2 text-[8px] text-gray-600" />
                                </div>
                                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 hidden group-hover:block">
                                    {dropdownItems.about.map((item, index) => (
                                        <a 
                                            key={index} 
                                            href={item.link} 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#D72423]"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </li>
                            
                            {/* United General Insurance with dropdown */}
                            <li className="font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out relative group">
                                <div className="flex items-center">
                                    <p>UNITED GENERAL INSURANCE</p>
                                    <SlArrowDown className="ml-2 text-[8px] text-gray-600" />
                                </div>
                                <div className="absolute left-0 mt-2 w-72 bg-white rounded-md shadow-lg py-2 z-50 hidden group-hover:block">
                                    {dropdownItems.insurance.map((item, index) => (
                                        <a 
                                            key={index} 
                                            href={item.link} 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#D72423]"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </li>
                            
                            {/* United Pay with dropdown */}
                            <li className="font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out relative group">
                                <div className="flex items-center">
                                    <p>UNITED PAY</p>
                                    <SlArrowDown className="ml-2 text-[8px] text-gray-600" />
                                </div>
                                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 hidden group-hover:block">
                                    {dropdownItems.pay.map((item, index) => (
                                        <a 
                                            key={index} 
                                            href={item.link} 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#D72423]"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </li>
                            
                            {/* United Life Assurance with dropdown */}
                            <li className="font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out relative group">
                                <div className="flex items-center">
                                    <p>UNITED LIFE ASSURANCE</p>
                                    <SlArrowDown className="ml-2 text-[8px] text-gray-600" />
                                </div>
                                <div className="absolute left-0 mt-2 w-60 bg-white rounded-md shadow-lg py-2 z-50 hidden group-hover:block">
                                    {dropdownItems.life.map((item, index) => (
                                        <a 
                                            key={index} 
                                            href={item.link} 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#D72423]"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </li>
                            
                            <li className='font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out'>
                                <p>DOCUMENTS</p>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Contact Button - Visible only on mobile */}
                    <button 
                        onClick={toggleDrawer}
                        className="lg:hidden p-2 mr-4"
                    >
                        <SlMenu className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
}