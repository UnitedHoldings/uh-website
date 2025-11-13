"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { trackEvent } from '@/lib/posthog';
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
    PiFolderOpen,
    PiNewspaper,
    PiFile,
    PiInfo,
    PiUsersThree,
    PiBriefcaseMetal,
    PiCalendarCheck,
    PiShieldStar,
    PiImages,
    PiImage,
} from 'react-icons/pi';

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

    // Department Colors
    const DEPARTMENT_COLORS = {
        "Life Assurance": "#3d834d", // Green
        "General & Business Insurance": "#286278", // Blue
        "Loans & Financing": "#f79620", // Orange
    };

    // Social media links
    const socialLinks = [
        { 
            name: 'Instagram', 
            url: 'https://www.instagram.com/unitedholdingseswatini', 
            icon: PiInstagramLogo 
        },
        { 
            name: 'Facebook', 
            url: 'https://www.facebook.com/UnitedHoldingsEswatini/', 
            icon: PiFacebookLogo 
        },
        { 
            name: 'LinkedIn', 
            url: 'https://www.linkedin.com/company/united-holdings-limited-swaziland', 
            icon: PiLinkedinLogo 
        },
        { 
            name: 'YouTube', 
            url: 'https://www.youtube.com/channel/UCpNKo7EddA4KhBenXb2X1fA', 
            icon: PiYoutubeLogo 
        },
    ];

    // Products dropdown data
    const productsDropdown = useMemo(() => [
        {
            category: 'Life Assurance',
            icon: PiHeart,
            link: '/united-life-assurance',
            color: DEPARTMENT_COLORS["Life Assurance"],
            items: [
                { name: 'Dignified Homelink Cover', link: '/products/dignified-homelink-cover', icon: PiUsers },
                { name: 'Dignified Tribute Cover', link: '/products/dignified-tribute-cover', icon: PiUser },
                { name: 'Dignified Family Support Cover', link: '/products/dignified-family-support-cover', icon: PiCalendar },
                { name: 'Dignified Senior Citizen Cover', link: '/products/dignified-senior-citizen-cover', icon: PiUsers },
                { name: 'Credit Life', link: '/products/credit-life', icon: PiMoney },
                { name: 'Dignified Funeral Plan Cover', link: '/products/dignified-funeral-plan-cover', icon: PiCalendar },
                { name: 'Tinkhundla Funeral Cover', link: '/products/tinkhundla-funeral-cover', icon: PiCalendar },


            ]
        },
        {
            category: 'General Personal Insurance',
            icon: PiShieldCheck,
            link: '/united-general-insurance',
            color: DEPARTMENT_COLORS["General & Business Insurance"],
            items: [
                { name: 'Motor Insurance', link: '/products/motor-insurance', icon: PiCar },
                { name: 'Home Contents Insurance', link: '/products/home-contents-insurance', icon: PiHouse },
                { name: 'Legal Insurance', link: '/products/legal-insurance', icon: PiScales },
                { name: 'Personal Accident Insurance', link: '/products/personal-accident-insurance', icon: PiWarningCircle },
            ]
        },
        {
            category: 'General Business Insurance',
            icon: PiBriefcase,
            color: DEPARTMENT_COLORS["General & Business Insurance"],
            items: [
                { name: 'Multimark Policy', link: '/products/multimark-policy', icon: PiBuildingOffice },
                { name: 'Medical Malpractice', link: '/products/medical-malpractice', icon: PiUser },
                { name: 'Professional Indemnity', link: '/products/professional-indemnity', icon: PiFileText },
                { name: 'Bonds and Guarantees', link: '/products/bonds-and-guarantees', icon: PiFileText },
                { name: 'Engineering Policies', link: '/products/engineering-policies', icon: PiBuildingOffice },
                { name: 'Fidelity Guarantee', link: '/products/fidelity-guarantee', icon: PiLock },
                { name: 'Political Violence and Terrorism', link: '/products/political-violence-and-terrorism', icon: PiWarningCircle },
            ]
        },
        {
            category: 'Loans & Financing',
            icon: PiMoney,
            color: DEPARTMENT_COLORS["Loans & Financing"],
            items: [
                { name: 'Micro Loans', link: 'https://uploans.united.co.sz/', icon: PiMoney },
                { name: 'Umlamleli Loan (Salary Advance)', link: 'https://uploans.united.co.sz/', icon: PiTrendUp },
            ]
        }
    ], []);

    // About dropdown data with icons
    const aboutDropdown = useMemo(() => [
        { 
            name: "Our Journey", 
            link: "/about", 
            icon: PiHouse,
            description: "Our story and mission"
        },
        { 
            name: "Our Team", 
            link: "/about/our-team", 
            icon: PiUsersThree,
            description: "Meet our dedicated team"
        },
        {
            name: "Careers", 
            link: "/about/careers", 
            icon: PiUsersThree,
            description: "Join our team and make a difference"
        },
        {
            name: "Gallery",
            link: "/about/gallery",
            icon: PiImage,
            description: "Take a look at our work"
        }
       
    ], []);

    // Resources dropdown data
    const resourcesDropdown = useMemo(() => [
     
        { 
            name: "Policies", 
            link: "/policies", 
            icon: PiFile,
            description: "Company policies and procedures"
        },
    
    ], []);

    // Main navigation items
    const mainNavItems = [
        { name: "HOME", link: "/" },
        { name: "ABOUT US", link: "/about", dropdown: aboutDropdown },
        { name: "PRODUCTS", dropdown: productsDropdown },
        { name: "UNITED LIFE ASSURANCE", link: "/united-life-assurance" },
        { name: "UNITED GENERAL INSURANCE", link: "/united-general-insurance" },
        { name: "UNITED PAY", link: "/united-pay" },
        { name: "RESOURCES", dropdown: resourcesDropdown },
        { name: "CONTACT US", link: "/contact" },
    ];

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
        setMobileActiveDropdown(null);
    };

    const toggleMobileDropdown = (item) => {
        setMobileActiveDropdown(mobileActiveDropdown === item ? null : item);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setMobileActiveDropdown(null);
    };

    // Render mobile dropdown content
    const renderMobileDropdown = (item) => {
        if (item.name === "PRODUCTS") {
            return (
                <div className="space-y-4">
                    {item.dropdown.map((category, categoryIndex) => {
                        const CategoryIcon = category.icon;
                        return (
                            <div 
                                key={categoryIndex} 
                                className="ml-4 py-6 rounded-lg overflow-hidden shadow-sm"
                                style={{ 
                                    backgroundColor: category.color,
                                }}
                            >
                                <div className="p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CategoryIcon className="w-4 h-4 text-white" />
                                        <Link 
                                            href={category.link || '#'}
                                            onClick={closeDrawer}
                                            className="font-bold text-sm text-white hover:text-gray-100"
                                        >
                                            {category.category}
                                        </Link>
                                    </div>
                                    <ul className="space-y-1 ml-6">
                                        {category.items.map((subItem, itemIndex) => {
                                            const ItemIcon = subItem.icon;
                                            return (
                                                <li key={itemIndex}>
                                                    <Link
                                                        href={subItem.link}
                                                        onClick={closeDrawer}
                                                        className="flex items-center gap-2 text-sm text-white hover:text-gray-200 transition duration-150 ease-in-out py-1 group"
                                                    >
                                                        <ItemIcon className="w-3 h-3 text-white opacity-80 group-hover:opacity-100" />
                                                        {subItem.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        } else {
            // Uniform dropdown for About and Resources
            return (
                <ul className="ml-4 space-y-2">
                    {item.dropdown.map((subItem, subIndex) => {
                        const SubItemIcon = subItem.icon;
                        return (
                            <li key={subIndex}>
                                <Link
                                    href={subItem.link}
                                    onClick={closeDrawer}
                                    className="flex items-center gap-3 text-sm py-2 hover:text-[#9b1c20] transition duration-150 ease-in-out group"
                                >
                                    <SubItemIcon className="w-4 h-4 text-gray-500 group-hover:text-[#9b1c20] transition-colors" />
                                    <div>
                                        <div className="font-medium">{subItem.name}</div>
                                        {subItem.description && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {subItem.description}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            );
        }
    };

    // Render desktop dropdown content
    const renderDesktopDropdown = (item) => {
        if (item.name === "PRODUCTS") {
            return (
                <div className="absolute w-screen bg-black mx-auto -translate-x-[35%] xl:">
                    <div className="">
                        <div className="grid grid-cols-4 rounded-b-xl px-8 max-w-[1200px] mx-auto">
                            {item.dropdown.map((category, categoryIndex) => {
                                const CategoryIcon = category.icon;
                                return (
                                    <div 
                                        key={categoryIndex} 
                                        className={` ${categoryIndex === 0 ? "rounded-bl-2xl" : ""} ${categoryIndex === 3 ? "rounded-br-2xl" : ""} overflow-hidden py-6  transition-all duration-300 hover:shadow-xl`}
                                        style={{ 
                                            backgroundColor: category.color,
                                        }}
                                    >
                                        <div className="">
                                            <div className="flex items-center space-x-2 mb-4">
                                                <Link 
                                                    href={category.link || '#'}
                                                    className="font-bold text-white px-6 text-xl hover:text-gray-100 border-b border-white border-opacity-30 pb-1"
                                                >
                                                    {category.category}
                                                </Link>
                                            </div>
                                            <ul className="space-y-1">
                                                {category.items.map((subItem, itemIndex) => {
                                                    const ItemIcon = subItem.icon;
                                                    return (
                                                        <li key={itemIndex}>
                                                            <Link
                                                                href={subItem.link}
                                                                className="flex items-center space-x-2 text-white  transition duration-150 ease-in-out py-2 px-6  hover:bg-white/10 hover:bg-opacity-10 group"
                                                            >
                                                                <span className="text-sm font-light">{subItem.name}</span>
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        } else {
            // Uniform dropdown for About and Resources
            return (
                <div className="absolute left-0 top-[94%] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white shadow-lg rounded-b-2xl py-3 border border-gray-200 min-w-72 ">
                        {item.dropdown.map((subItem, subIndex) => {
                            const SubItemIcon = subItem.icon;
                            return (
                                <Link
                                    key={subIndex}
                                    href={subItem.link}
                                    className="flex items-start space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#9b1c20] transition duration-150 ease-in-out group"
                                >
                                    <SubItemIcon className="w-5 h-5 text-gray-400 group-hover:text-[#9b1c20] transition-colors mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium">{subItem.name}</div>
                                        {subItem.description && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {subItem.description}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="w-full sticky top-0 z-40 bg-white shadow-sm">
            {/* Mobile Drawer Overlay */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
                    onClick={closeDrawer}
                />
            )}

            {/* Mobile Drawer */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-60 transform transition-transform duration-300 ease-in-out lg:hidden ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <Link href="/" onClick={() => {
                            trackEvent('uh_logo_clicked', {
                                location: 'mobile_drawer',
                                page_section: 'header'
                            });
                            closeDrawer();
                        }}>
                            <Image
                                src="/logo.svg"
                                alt="United Holdings Logo"
                                width={180}
                                height={80}
                                priority
                                className="hover:opacity-90 transition-opacity"
                            />
                        </Link>
                        <button 
                            onClick={closeDrawer} 
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Close menu"
                        >
                            <PiX className="text-2xl text-gray-600" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto">
                        <ul className="space-y-1">
                            {mainNavItems.map((item, index) => (
                                <li key={index} className="border-b border-gray-100 last:border-b-0">
                                    {item.dropdown ? (
                                        <div>
                                            <button
                                                className="w-full flex justify-between items-center font-semibold py-3 hover:text-[#9b1c20] transition duration-150 ease-in-out text-left"
                                                onClick={() => toggleMobileDropdown(item.name)}
                                            >
                                                <span>{item.name}</span>
                                                {mobileActiveDropdown === item.name ? 
                                                    <PiCaretUp className="text-gray-400" /> : 
                                                    <PiCaretDown className="text-gray-400" />
                                                }
                                            </button>
                                            {mobileActiveDropdown === item.name && (
                                                <div className="pb-3">
                                                    {renderMobileDropdown(item)}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.link}
                                            onClick={closeDrawer}
                                            className="block font-semibold py-3 hover:text-[#9b1c20] transition duration-150 ease-in-out"
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact Info */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2 text-gray-800">
                                <PiMapPin className="text-gray-500" />
                                <span className="font-semibold">Address</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <PiPhone className="text-gray-500" />
                                <a href="tel:8001010" className="font-semibold text-[#9b1c20] hover:underline">
                                    800 1010
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <PiPhone className="text-gray-500" />
                                <a href="tel:+26825086000" className="font-semibold text-[#9b1c20] hover:underline">
                                    (+268) 2508 6000
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <PiEnvelope className="text-gray-500" />
                                <a href="mailto:info@united.co.sz" className="font-semibold text-[#9b1c20] hover:underline">
                                    info@united.co.sz
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Header - Merged Layout */}
            <div className="hidden lg:block border-b-4 border-[#9b1c20]">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                    {/* Single row containing logo spanning full height and right content */}
                    <div className="flex items-stretch min-h-[100px]">
                        {/* Logo - Spans full height of both header sections */}
                        <div className="flex items-center justify-center py-1  pr-8">
                            <Link href="/" className="flex items-center h-full" onClick={() => trackEvent('uh_logo_clicked', {
                                location: 'desktop_header',
                                page_section: 'header'
                            })}>
                                <Image
                                    src="/logo.svg"
                                    alt="United Holdings Logo"
                                    width={280}
                                    height={100}
                                    priority
                                    className="hover:opacity-90 transition-opacity object-contain"
                                    style={{ height: '80px', width: 'auto' }}
                                />
                            </Link>
                        </div>

                        {/* Right side content - Stacked vertically */}
                        <div className="flex-1 flex flex-col gap-1">
                            {/* Top section - Contact info and social icons */}
                            <div className="flex-1 flex items-end justify-end gap-8  px-6">
                                {/* Contact Info */}
                                <div className="flex items-center space-x-6 text-sm text-[#666666]">
                                    <div className="flex items-center space-x-2">
                                        <PiMapPin className="w-4 h-4" />
                                        <Link href={'/contact'} className="font-semibold">Address</Link>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <a href="tel:8001010" className="hover:underline transition duration-150 ease-in-out font-medium"
                                           onClick={() => trackEvent('contact_info_clicked', {
                                               contact_info_chosen: 'Toll Free: 800 1010',
                                               location: 'top_nav',
                                               contact_type: 'phone'
                                           })}
                                        >
                                           Toll Free: 800 1010
                                        </a>
                                        <span className="text-gray-300">|</span>
                                        <a href="tel:+26825086000" className="hover:underline transition duration-150 ease-in-out font-medium"
                                           onClick={() => trackEvent('contact_info_clicked', {
                                               contact_info_chosen: '(+268) 2508 6000',
                                               location: 'top_nav',
                                               contact_type: 'phone'
                                           })}
                                        >
                                            (+268) 2508 6000
                                        </a>
                                        <span className="text-gray-300">|</span>
                                        <a href="mailto:info@united.co.sz" className="hover:underline transition duration-150 ease-in-out font-medium"
                                           onClick={() => trackEvent('contact_info_clicked', {
                                               contact_info_chosen: 'info@united.co.sz',
                                               location: 'top_nav',
                                               contact_type: 'email'
                                           })}
                                        >
                                            info@united.co.sz
                                        </a>
                                    </div>
                                </div>

                                {/* Social Media Icons */}
                                <div className="flex items-center space-x-4">
                                    {socialLinks.map((social) => {
                                        const SocialIcon = social.icon;
                                        return (
                                            <a
                                                key={social.name}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#666666] hover:text-[#7a1619] transition duration-150 ease-in-out"
                                                aria-label={social.name}
                                                onClick={() => trackEvent('social_media_clicked', {
                                                    social_media_chosen: social.name,
                                                    location: 'top_nav',
                                                    page_section: 'header'
                                                })}
                                            >
                                                <SocialIcon className="w-5 h-5" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bottom section - Main navigation */}
                            <div className="flex-1 flex items-center justify-end px-6">
                                <nav className="flex-1">
                                    <ul className="flex items-center justify-end space-x-4 xl:space-x-6 text-sm font-semibold">
                                        {mainNavItems.map((item, index) => (
                                            <li key={index} className="relative group">
                                                {item.dropdown ? (
                                                    <div>
                                                        <button className="flex items-center space-x-1 py-4 text-[#9b1c20] hover:text-[#7a1619] transition duration-150 ease-in-out">
                                                            <span>{item.name}</span>
                                                            <PiCaretDown className="w-3 h-3" />
                                                        </button>
                                                        {renderDesktopDropdown(item)}
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={item.link}
                                                        className="block py-4 text-[#9b1c20] hover:text-[#7a1619] transition duration-150 ease-in-out"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden">
                {/* Quick Nav CTA Bar */}
                <div className="bg-white text-[#9b1c20] border-b border-gray-200">
                    <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                        <div className="flex items-center justify-between py-2">
                            {/* Contact Info */}
                            <div className="flex items-center space-x-4 text-xs">
                                <a href="tel:8001010" className="hover:underline transition duration-150 ease-in-out font-medium"
                                   onClick={() => trackEvent('contact_info_clicked', {
                                       contact_info_chosen: '800 1010',
                                       location: 'mobile_quick_nav',
                                       contact_type: 'phone'
                                   })}
                                >
                                   800 1010
                                </a>
                                <a href="tel:+26825086000" className="hover:underline transition duration-150 ease-in-out font-medium"
                                   onClick={() => trackEvent('contact_info_clicked', {
                                       contact_info_chosen: '(+268) 2508 6000',
                                       location: 'mobile_quick_nav',
                                       contact_type: 'phone'
                                   })}
                                >
                                    (+268) 2508 6000
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="border-b-4 border-[#9b1c20]">
                    <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                        <div className="flex items-center justify-between py-3">
                            {/* Logo */}
                            <Link href="/" className="flex-shrink-0" onClick={() => trackEvent('uh_logo_clicked', {
                                location: 'mobile_header',
                                page_section: 'header'
                            })}>
                                <Image
                                    src="/logo.svg"
                                    alt="United Holdings Logo"
                                    width={180}
                                    height={70}
                                    priority
                                    className="hover:opacity-90 transition-opacity"
                                />
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleDrawer}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Open menu"
                            >
                                <PiList className="w-6 h-6 text-[#9b1c20]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
