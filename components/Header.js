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
    PiFolderOpen,
    PiNewspaper,
    PiFile,
    PiInfo,
    PiUsersThree,
    PiBriefcaseMetal,
    PiCalendarCheck,
    PiShieldStar,
    PiImages,
} from 'react-icons/pi';

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

    // Social media links
    const socialLinks = [
        { 
            name: 'Instagram', 
            url: 'https://www.instagram.com/unitedholdingseswatini', 
            icon: PiInstagramLogo 
        },
        { 
            name: 'Facebook', 
            url: 'https://www.facebook.com/UnitedHSD/', 
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
            items: [
                { name: 'Family Funeral Plan', link: '/products/family-funeral-plan', icon: PiUsers },
                { name: 'Individual Funeral Plan', link: '/products/individual-funeral-plan', icon: PiUser },
                { name: 'Tinkhundla Funeral Cover', link: '/products/tinkhundla-funeral-cover', icon: PiCalendar },
                { name: 'Group Life', link: '/products/group-life', icon: PiUsers },
                { name: 'Credit Life', link: '/products/credit-life', icon: PiMoney },
            ]
        },
        {
            category: 'General Insurance',
            icon: PiShieldCheck,
            link: '/united-general-insurance',
            items: [
                { name: 'Motor Insurance', link: '/products/motor-insurance', icon: PiCar },
                { name: 'Home Contents Insurance', link: '/products/home-contents-insurance', icon: PiHouse },
                { name: 'Home Warranty Insurance', link: '/products/home-warranty-insurance', icon: PiHouse },
                { name: 'Legal Insurance', link: '/products/legal-insurance', icon: PiScales },
                { name: 'Personal Accident Insurance', link: '/products/personal-accident-insurance', icon: PiWarningCircle },
            ]
        },
        {
            category: 'Business Insurance',
            icon: PiBriefcase,
            items: [
                { name: 'Multimark Policy', link: '/products/multimark-policy', icon: PiBuildingOffice },
                { name: 'Medical Malpractice', link: '/products/medical-malpractice', icon: PiUser },
                { name: 'Professional Indemnity', link: '/products/professional-indemnity', icon: PiFileText },
                { name: 'Bonds and Guarantee', link: '/products/bonds-guarantee', icon: PiFileText },
                { name: 'Engineering Policies', link: '/products/engineering-policies', icon: PiBuildingOffice },
                { name: 'Fidelity Guarantee', link: '/products/fidelity-guarantee', icon: PiLock },
                { name: 'Political Violence and Terrorism', link: '/products/political-violence-and-terrorism', icon: PiWarningCircle },
            ]
        },
        {
            category: 'Loans & Financing',
            icon: PiMoney,
            items: [
                { name: 'Micro Loans', link: '/products/micro-loans', icon: PiMoney },
                { name: 'Umlamleli Loan (Salary Advance)', link: '/products/umlamleli-loan', icon: PiTrendUp },
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
            icon: PiBriefcaseMetal,
            description: "Join our growing team"
        },
        { 
            name: "Upcoming Events", 
            link: "/about/events", 
            icon: PiCalendarCheck,
            description: "Company events and activities"
        },
        { 
            name: "Know your Insurer", 
            link: "/about/insurer", 
            icon: PiShieldStar,
            description: "Learn about our insurance expertise"
        },
        { 
            name: "Gallery", 
            link: "/about/gallery", 
            icon: PiImages,
            description: "Photos from our events"
        },
        { 
            name: "In the news", 
            link: "/news", 
            icon: PiNewspaper,
            description: "Latest company news"
        }
    ], []);

    // Resources dropdown data
    const resourcesDropdown = useMemo(() => [
        { 
            name: "Documents", 
            link: "/documents", 
            icon: PiFolderOpen,
            description: "Important forms and documents"
        },
        { 
            name: "Policies", 
            link: "/policies", 
            icon: PiFile,
            description: "Company policies and procedures"
        },
        { 
            name: "News & Reports", 
            link: "/news", 
            icon: PiNewspaper,
            description: "Latest news and financial reports"
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
                <div className="space-y-6">
                    {item.dropdown.map((category, categoryIndex) => {
                        const CategoryIcon = category.icon;
                        return (
                            <div key={categoryIndex} className="ml-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <CategoryIcon className="w-4 h-4 text-[#9b1c20]" />
                                    <Link 
                                        href={category.link || '#'}
                                        onClick={closeDrawer}
                                        className="font-semibold text-sm text-gray-800 hover:text-[#9b1c20]"
                                    >
                                        {category.category}
                                    </Link>
                                </div>
                                <ul className="space-y-2 mb-4 ml-6">
                                    {category.items.map((subItem, itemIndex) => {
                                        const ItemIcon = subItem.icon;
                                        return (
                                            <li key={itemIndex}>
                                                <Link
                                                    href={subItem.link}
                                                    onClick={closeDrawer}
                                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#9b1c20] transition duration-150 ease-in-out py-1"
                                                >
                                                    <ItemIcon className="w-3 h-3 text-gray-500" />
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
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
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-screen max-w-4xl">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-6">
                        <div className="grid grid-cols-4 gap-8 px-8">
                            {item.dropdown.map((category, categoryIndex) => {
                                const CategoryIcon = category.icon;
                                return (
                                    <div key={categoryIndex} className="space-y-3">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <CategoryIcon className="w-5 h-5 text-[#9b1c20]" />
                                            <Link 
                                                href={category.link || '#'}
                                                className="font-bold text-gray-800 hover:text-[#9b1c20] border-b pb-1"
                                            >
                                                {category.category}
                                            </Link>
                                        </div>
                                        <ul className="space-y-2">
                                            {category.items.map((subItem, itemIndex) => {
                                                const ItemIcon = subItem.icon;
                                                return (
                                                    <li key={itemIndex}>
                                                        <Link
                                                            href={subItem.link}
                                                            className="flex items-center space-x-2 text-gray-600 hover:text-[#9b1c20] hover:underline transition duration-150 ease-in-out py-1 group"
                                                        >
                                                            <ItemIcon className="w-4 h-4 text-gray-400 group-hover:text-[#9b1c20] transition-colors" />
                                                            <span className="text-sm">{subItem.name}</span>
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
            );
        } else {
            // Uniform dropdown for About and Resources
            return (
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-md shadow-lg py-3 border border-gray-200 min-w-64">
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
        <div className="w-full sticky top-0 z-50 bg-white ">
            {/* Mobile Drawer Overlay */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
                    onClick={closeDrawer}
                />
            )}

            {/* Mobile Drawer */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-white  z-60 transform transition-transform duration-300 ease-in-out lg:hidden ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <Link href="/" onClick={closeDrawer}>
                            <Image 
                                src="/logo.svg" 
                                alt="United Holdings Logo" 
                                width={110} 
                                height={100} 
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
                                <a href="tel:8001010" className="font-semibold text-[#F7941D] hover:underline">
                                    800 1010
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <PiPhone className="text-gray-500" />
                                <a href="tel:+26825086000" className="font-semibold text-[#F7941D] hover:underline">
                                    (+268) 2508 6000
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <PiEnvelope className="text-gray-500" />
                                <a href="mailto:info@united.co.sz" className="font-semibold text-[#F7941D] hover:underline">
                                    info@united.co.sz
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Bar */}
            <div className="bg-[#9b1c20] text-white">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                    <div className="hidden lg:flex items-center justify-between py-2">
                        {/* Social Icons */}
                        <div className="flex items-center space-x-4">
                            {socialLinks.map((social) => {
                                const SocialIcon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-gray-200 transition duration-150 ease-in-out"
                                        aria-label={social.name}
                                    >
                                        <SocialIcon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Contact Info */}
                        <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2">
                                <PiMapPin className="w-4 h-4" />
                                <span className="font-semibold">Address</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <a href="tel:8001010" className="hover:underline transition duration-150 ease-in-out">
                                    800 1010
                                </a>
                                <span>|</span>
                                <a href="tel:+26825086000" className="hover:underline transition duration-150 ease-in-out">
                                    (+268) 2508 6000
                                </a>
                                <span>|</span>
                                <a href="mailto:info@united.co.sz" className="hover:underline transition duration-150 ease-in-out">
                                    info@united.co.sz
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="bg-white border-b-4 border-[#9b1c20]">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src="/logo.svg"
                                alt="United Holdings Logo"
                                width={110}
                                height={100}
                                priority
                                className="hover:opacity-90 transition-opacity"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:block">
                            <ul className="flex items-center space-x-8 text-sm font-semibold">
                                {mainNavItems.map((item, index) => (
                                    <li key={index} className="relative group">
                                        {item.dropdown ? (
                                            <div>
                                                <button className="flex items-center space-x-1 py-2 hover:text-[#9b1c20] transition duration-150 ease-in-out">
                                                    <span>{item.name}</span>
                                                    <PiCaretDown className="w-3 h-3 text-gray-500" />
                                                </button>
                                                {renderDesktopDropdown(item)}
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.link}
                                                className="block py-2 hover:text-[#9b1c20] transition duration-150 ease-in-out"
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleDrawer}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Open menu"
                        >
                            <PiList className="w-6 h-6 text-[#9b1c20]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}