"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import {
    PiInstagramLogo,
    PiFacebookLogo,
    PiLinkedinLogo,
    PiYoutubeLogo,
    PiMapPin,
    PiPhone,
    PiEnvelope,
    PiList,
    PiX,
    PiCaretDown,
    PiCaretUp,
    PiHeart,
    PiHouse,
    PiCar,
    PiShieldCheck,
    PiBriefcase,
    PiMoney,
    PiUsers,
    PiScales,
    PiFileText,
    PiBuildingOffice,
    PiUser,
    PiLock,
    PiCalendar,
    PiTrendUp,
    PiWarningCircle,
    PiFire,
    PiCloud
} from 'react-icons/pi';

export default function Header() {
    const socialLinks = [
        { name: 'Instagram', url: 'https://www.instagram.com/unitedholdingseswatini', icon: <PiInstagramLogo className="inline-block mr-2 text-xl align-middle" aria-label="Instagram" /> },
        { name: 'Facebook', url: 'https://www.facebook.com/UnitedHSD/', icon: <PiFacebookLogo className="inline-block mr-2 text-xl align-middle" aria-label="Facebook" /> },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/company/united-holdings-limited-swaziland', icon: <PiLinkedinLogo className="inline-block mr-2 text-xl align-middle" aria-label="LinkedIn" /> },
        { name: 'YouTube', url: 'https://www.youtube.com/channel/UCpNKo7EddA4KhBenXb2X1fA', icon: <PiYoutubeLogo className="inline-block mr-2 text-xl align-middle" aria-label="Youtube" /> },
    ];
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleMobileDropdown = (item) => {
        setMobileActiveDropdown(mobileActiveDropdown === item ? null : item);
    };

    // Memoized products dropdown data using product slugs with icons
    const productsDropdown = useMemo(() => [
        {
            category: 'Life Assurance',
            icon: PiHeart,
            items: [
                { name: 'Life Assurance', link: '/products/life-assurance', icon: PiHeart },
                { name: 'Dignified Family Support Cover', link: '/products/dignified-family-support-cover', icon: PiUsers },
                { name: 'Funeral Assurance', link: '/products/funeral-assurance', icon: PiCalendar },
                { name: 'Dignified Tribute Cover', link: '/products/dignified-tribute-cover', icon: PiCalendar },
            ]
        },
        {
            category: 'General Insurance',
            icon: PiShieldCheck,
            items: [
                { name: 'Motor Insurance', link: '/products/motor-insurance', icon: PiCar },
                { name: 'Home Insurance', link: '/products/home-insurance', icon: PiHouse },
                { name: 'Legal Insurance', link: '/products/legal-insurance', icon: PiScales },
                { name: 'Personal Accident Insurance', link: '/products/personal-accident-insurance', icon: PiWarningCircle },
            ]
        },
        {
            category: 'Business Insurance',
            icon: PiBriefcase,
            items: [
                { name: 'Multimark Policy', link: '/products/multimark-policy', icon: PiBuildingOffice },
                { name: 'Medical Malpractice Insurance', link: '/products/medical-malpractice-insurance', icon: PiUser },
                { name: 'Professional Indemnity Insurance', link: '/products/professional-indemnity-insurance', icon: PiFileText },
                { name: 'Fidelity Guarantee Insurance', link: '/products/fidelity-guarantee-insurance', icon: PiLock },
            ]
        },
        {
            category: 'Loans & Financing',
            icon: PiMoney,
            items: [
                { name: 'Micro Loans', link: '/products/micro-loans', icon: PiMoney },
                { name: 'Umlamleli Loan (Salary Advance)', link: '/products/umlamleli-loan', icon: PiTrendUp },
                { name: 'Shesha Loans', link: '/products/shesha-loans', icon: PiWarningCircle },
            ]
        }
    ], []);

    // Memoized about dropdown data
    const aboutDropdown = useMemo(() => [
        { name: "Our Team", link: "/about#team" },
        { name: "Careers", link: "/about#careers" },
        { name: "Upcoming Events", link: "/about#events" },
        { name: "Know your Insurer", link: "/about#insurer" },
        { name: "Gallery", link: "/about#gallery" },
        { name: "In the news", link: "/news" }
    ], []);

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
                            <PiX className="text-2xl" />
                        </button>
                    </div>

                    <ul className='space-y-2 '>
                        <li className='font-semibold cursor-pointer hover:text-[#9b1c20] transition duration-150 ease-in-out py-2 border-b border-gray-100'>
                            <Link href="/">HOME</Link>
                        </li>

                        {/* About with dropdown */}
                        <li className='border-b border-gray-100'>
                            <div
                                className="flex justify-between items-center font-semibold cursor-pointer py-2 hover:text-[#9b1c20] transition duration-150 ease-in-out"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMobileDropdown('about');
                                }}
                            >
                                <Link href="/about">ABOUT US</Link>
                                {aboutDropdown.length > 0 && (
                                    mobileActiveDropdown === 'about' ? <PiCaretUp /> : <PiCaretDown />
                                )}
                            </div>
                            {mobileActiveDropdown === 'about' && aboutDropdown.length > 0 && (
                                <ul className="pl-4 pb-2 space-y-2">
                                    {aboutDropdown.map((item, index) => (
                                        <li key={index} className="text-sm py-1 hover:text-[#9b1c20] transition duration-150 ease-in-out">
                                            <Link href={item.link}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        {/* Products with dropdown */}
                        <li className='border-b border-gray-100'>
                            <div
                                className="flex justify-between items-center font-semibold cursor-pointer py-2 hover:text-[#9b1c20] transition duration-150 ease-in-out"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMobileDropdown('products');
                                }}
                            >
                                <p>PRODUCTS</p>
                                {mobileActiveDropdown === 'products' ? <PiCaretUp /> : <PiCaretDown />}
                            </div>
                            {mobileActiveDropdown === 'products' && (
                                <div className="pl-4 pb-2 space-y-6">
                                    {productsDropdown.map((category, categoryIndex) => {
                                        const CategoryIcon = category.icon;
                                        return (
                                            <div key={categoryIndex}>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <CategoryIcon className="w-4 h-4 text-[#9b1c20]" />
                                                    <p className="font-semibold text-sm text-gray-800">{category.category}</p>
                                                </div>
                                                <ul className="space-y-2 mb-4 pl-6">
                                                    {category.items.map((item, itemIndex) => {
                                                        const ItemIcon = item.icon;
                                                        return (
                                                            <li key={itemIndex} className="text-lg py-1 hover:text-[#9b1c20] transition duration-150 ease-in-out">
                                                                <Link href={item.link} className="flex items-center gap-2">
                                                                    <ItemIcon className="w-3 h-3 text-gray-500" />
                                                                   <p>{item.name}</p>
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
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
                                <PiMapPin />
                                <p className="font-semibold">Address</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <PiPhone />
                                <a href="tel:8001010" className="font-semibold text-[#F7941D]">
                                    800 1010
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <PiPhone />
                                <a href="tel:+26825086000" className="font-semibold text-[#F7941D]">
                                    (+268) 2508 6000
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <PiEnvelope />
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
                        {socialLinks.map((item, idx) => (
                            <li key={item.name} className="cursor-pointer hover:text-gray-200 hover:scale-105 transition duration-150 ease-in-out">
                                <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                                    {item.icon}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Location */}
                    <div className="flex items-center space-x-2 text-base text-gray-100 cursor-pointer hover:text-gray-200">
                        <PiMapPin className="hover:scale-105 transition duration-150 ease-in-out" />
                        <p className="font-semibold border-b border-dotted border-gray-600 hover:scale-105 transition duration-150 ease-in-out">
                            Address
                        </p>
                    </div>

                    {/* Contact Info + Button */}
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className=' rounded-full p-2 text-white'>
                                    <PiPhone className="text-base hover:underline transition duration-150 ease-in-out" />
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
                                <div className='b rounded-full p-2 text-white'>
                                    <PiEnvelope className="text-base hover:underline transition duration-150 ease-in-out" />
                                </div>
                                <a href="mailto:info@united.co.sz" className="font-normal text-base text-white hover:underline transition hover:text-gray-200">
                                    info@united.co.sz
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Static without scroll changes */}
                <div className="w-full py-4 mx-auto flex flex-wrap items-center justify-between lg:px-6 gap-y-4  bg-white border-b-4 border-[#9b1c20]">
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
                    <div className="hidden lg:block pr-14  transition-all duration-300 opacity-100">
                        <ul className='flex items-center gap-8 text-sm'>
                            <li className='font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out'>
                                <Link href="/">HOME</Link>
                            </li>

                            {/* About with dropdown - FIXED HOVER */}
                            <li className="font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out relative group">
                                <div className="flex items-center py-2">
                                    <Link href="/about">ABOUT US</Link>
                                    {aboutDropdown.length > 0 && (
                                        <PiCaretDown className="ml-2 text-[8px] text-gray-600" />
                                    )}
                                </div>
                                {aboutDropdown.length > 0 && (
                                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="w-48 bg-white rounded-md shadow-lg py-2 border border-gray-100">
                                            {aboutDropdown.map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={item.link}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#9b1c20] transition duration-150 ease-in-out"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>

                            {/* Products with mega dropdown - CENTERED ON SCREEN */}
                            <li className="font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out relative group">
                                <div className="flex items-center py-2">
                                    <p>PRODUCTS</p>
                                    <PiCaretDown className="ml-2 text-[8px] text-gray-600" />
                                </div>
                                <div className="absolute z-50 left-1/2  pt-2 top-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform -translate-x-1/2">
                                    <div className="w-[1200px] bg-white rounded-md shadow-xl py-6 border border-gray-100">
                                        <div className="grid grid-cols-4 gap-8 p-6">
                                            {productsDropdown.map((category, categoryIndex) => {
                                                const CategoryIcon = category.icon;
                                                return (
                                                    <div key={categoryIndex} className="space-y-3">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <CategoryIcon className="w-5 h-5 text-[#9b1c20]" />
                                                            <p className="font-bold text-lg text-gray-800 border-b pb-1">{category.category}</p>
                                                        </div>
                                                        <ul className="space-y-1">
                                                            {category.items.map((item, itemIndex) => {
                                                                const ItemIcon = item.icon;
                                                                return (
                                                                    <li key={itemIndex}>
                                                                        <Link
                                                                            href={item.link}
                                                                            className="flex text-base items-center gap-2  font-light text-gray-600 hover:text-[#9b1c20] hover:underline transition duration-150 ease-in-out py-1 group/item"
                                                                        >
                                                                            <ItemIcon className="w-4 h-4 text-gray-600 group-hover/item:text-[#9b1c20] transition duration-150 ease-in-out" />
                                                                            {item.name}
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className='font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out'>
                                <Link href="/projects">NEWS BLOG</Link>
                            </li>
                            <li className='font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out'>
                                <Link href="/news">DOCUMENTS</Link>
                            </li>
                            <li className='font-semibold cursor-pointer hover:underline transition duration-150 ease-in-out'>
                                <Link href="/contact">CONTACT US</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Contact Button - Visible only on mobile */}
                    <div className="flex items-center gap-4 mr-4">
                        {/* Desktop: Login & Sign Up */}
                        <a href="/login" className="hidden lg:inline-block px-8 py-2 bg-white text-[#9b1c20] border border-[#9b1c20] rounded-full font-semibold hover:bg-[#9b1c20] hover:text-white transition">Login</a>
                        <a href="/signup" className="hidden lg:inline-block px-8 py-2 bg-[#9b1c20] text-white rounded-full font-semibold hover:bg-white hover:text-[#9b1c20] border border-[#9b1c20] transition">Sign Up Today</a>
                        {/* Mobile: Menu Button */}
                        <button
                            onClick={toggleDrawer}
                            className="lg:hidden p-2 mr-4"
                        >
                            <PiList className="text-lg text-[#9b1c20]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}