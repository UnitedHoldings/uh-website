"use client"
import Image from 'next/image';
import Link from 'next/link';
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
            { name: "Our Team", link: "/about#team" },
            { name: "Careers", link: "/about#careers" },
            { name: "Upcoming Events", link: "/about#events" },
            { name: "Know your Insurer", link: "/about#insurer" },
            { name: "Gallery", link: "/about#gallery" },
            { name: "In the news", link: "/news" }
        ],
        insurance: [
            { name: "Motor Insurance", link: "/services#motor" },
            { name: "Legal Insurance", link: "/services#legal" },
            { name: "Home Insurance", link: "/services#home" },
            { name: "Medical Malpractice Insurance", link: "/services#medical-malpractice" },
            { name: "Professional Indemnity and Fidelity Guarantee Insurance", link: "/services#indemnity" }
        ],
        pay: [
            { name: "Micro Loans", link: "/services#micro-loans" },
            { name: "Shesha Loans", link: "/services#shesha-loans" },
            { name: "Umlamleli", link: "/services#umlamleli" }
        ],
        life: [
            { name: "Dignified Funeral Plan Cover", link: "/services#funeral" },
            { name: "Dignified Senior Citizen Cover", link: "/services#senior" },
            { name: "Credit Line Insurance", link: "/services#credit-line" },
            { name: "Dignified Homelink Cover", link: "/services#homelink" }
        ]
    }), []);

    return (
        <div className="w-full sticky top-0 z-50">
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
                        <Image src={'/logo.svg'} alt="Logo" width={110} height={100} priority />
                        <button onClick={toggleDrawer} className="p-2">
                            <SlClose className="text-2xl" />
                        </button>
                    </div>

                    <ul className='space-y-2 '>
                        <li className='font-semibold cursor-pointer hover:text-[#9b1c20] transition duration-150 ease-in-out py-2 border-b border-gray-100'>
                            <Link href="/">HOME</Link>
                        </li>

                        {/* About with dropdown */}
                        <li className='border-b border-gray-100'>
                            <Link href="/about">PROJECTS</Link>

                        </li>

                        <li className='font-semibold cursor-pointer hover:text-[#9b1c20] transition duration-150 ease-in-out py-2 border-b border-gray-100'>
                            <Link href="/services">SERVICES</Link>
                        </li>

                        {/* United Pay with dropdown */}
                        <li className='border-b border-gray-100'>
                            <div
                                className="flex justify-between items-center font-semibold cursor-pointer py-2 hover:text-[#9b1c20] transition duration-150 ease-in-out"
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
                                        <li key={index} className="text-sm py-1 hover:text-[#9b1c20] transition duration-150 ease-in-out">
                                            <Link href={item.link}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        {/* United Life Assurance with dropdown */}
                        <li className='border-b border-gray-100'>
                            <div
                                className="flex justify-between items-center font-semibold cursor-pointer py-2 hover:text-[#9b1c20] transition duration-150 ease-in-out"
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
                                        <li key={index} className="text-sm py-1 hover:text-[#9b1c20] transition duration-150 ease-in-out">
                                            <Link href={item.link}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        <li className='font-semibold cursor-pointer hover:text-[#9b1c20] transition duration-150 ease-in-out py-2 border-b border-gray-100'>
                            <Link href="/projects">PROJECTS</Link>
                        </li>
                        <li className='font-semibold cursor-pointer hover:text-[#9b1c20] transition duration-150 ease-in-out py-2 border-b border-gray-100'>
                            <Link href="/news">NEWS</Link>
                        </li>
                        <li className='font-semibold cursor-pointer hover:text-[#9b1c20] transition duration-150 ease-in-out py-2 border-b border-gray-100'>
                            <Link href="/contact">CONTACT</Link>
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

            {/* Full-width white background - static without scroll animation */}
            <div className="mx-auto flex bg-[#9b1c20] flex-col overflow-visible">
                {/* Top Section - Always visible */}
                <div className="hidden lg:flex px-12 w-full rounded-2xl mx-auto flex-wrap items-center justify-between py-2 gap-y-4">
                    {/* Social Icons */}
                    <ul className="flex space-x-4 text-base text-gray-100">
                        {[SlSocialFacebook, SlSocialInstagram, SlSocialTwitter, SlSocialYoutube, SlSocialLinkedin].map((Icon, index) => (
                            <li key={index} className="cursor-pointer hover:text-black hover:scale-105 transition duration-150 ease-in-out">
                                <Icon />
                            </li>
                        ))}
                    </ul>

                    {/* Location */}
                    <div className="flex items-center space-x-2 text-base text-gray-100 cursor-pointer hover:text-black">
                        <SlLocationPin className="hover:scale-105 transition duration-150 ease-in-out" />
                        <p className="font-semibold border-b border-dotted border-gray-600 hover:scale-105 transition duration-150 ease-in-out">
                            Address
                        </p>
                    </div>

                    {/* Contact Info + Button */}
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className='bg-white rounded-full p-2 text-gray-600'>
                                    <SlPhone className="text-base hover:underline transition duration-150 ease-in-out" />
                                </div>
                                <a href="tel:8001010" className="font-normal text-base text-white hover:underline transition hover:text-gray-200">
                                    800 1010
                                </a>
                                <span className="text-white">|</span>
                                <a href="tel:+26825086000" className="font-normal text-base text-white hover:underline transition hover:text-gray-200">
                                    (+268) 2508 6000
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className='bg-white rounded-full p-2 text-gray-600'>
                                    <SlEnvolope className="text-base hover:underline transition duration-150 ease-in-out" />
                                </div>
                                <a href="mailto:info@united.co.sz" className="font-normal text-base text-white hover:underline transition hover:text-gray-200">
                                    info@united.co.sz
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Static without scroll changes */}
                <div className="w-full mx-auto flex flex-wrap items-center justify-between lg:px-6 gap-y-4 py-1 bg-white border-b-4 border-[#9b1c20]">
                    {/* Logo */}
                    <div className="flex items-center ml-4">
                        <div className="w-28">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width={110}
                                height={100}
                                className="transition-all duration-300 cursor-pointer hover:scale-105 delay-100 ease-in-out"
                            />
                        </div>
                    </div>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <div className="hidden lg:block pr-14 -translate-x-44 transition-all duration-300 opacity-100">
                        <ul className='flex items-center gap-8 text-sm'>
                            <li className='font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out'>
                                <Link href="/">HOME</Link>
                            </li>

                            {/* About with dropdown */}
                            <li className="font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out relative group">
                                <Link href="/about">ABOUT US</Link>
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
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#9b1c20]"
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
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#9b1c20]"
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
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#9b1c20]"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </li>

                            <li className='font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out'>
                                <Link href="/projects">PROJECTS</Link>
                            </li>
                            <li className='font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out'>
                                <Link href="/news">NEWS</Link>
                            </li>
                            <li className='font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out'>
                                <Link href="/contact">CONTACT</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Contact Button - Visible only on mobile */}
                    <div className="flex items-center gap-4 mr-4">
                        <a href="/client-area" className="hidden lg:inline-block px-4 py-2 bg-[#9b1c20] text-white rounded font-semibold">Client Area</a>
                        <button
                            onClick={toggleDrawer}
                            className="lg:hidden p-2 mr-4"
                        >
                            <SlMenu className="text-lg text-[#9b1c20]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}