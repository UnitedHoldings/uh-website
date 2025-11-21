// components/Header/index.jsx
"use client"
import React, { useState, useMemo } from 'react';
import {
    PiHeart,
    PiShieldCheck,
    PiBriefcase,
    PiMoney,
    PiUsers,
    PiUser,
    PiCalendar,
    PiCar,
    PiHouse,
    PiScales,
    PiWarningCircle,
    PiBuildingOffice,
    PiFileText,
    PiLock,
    PiTrendUp,
    PiHouse as PiHouseIcon,
    PiUsersThree,
    PiImage,
    PiFile,
    PiNewspaper,
} from 'react-icons/pi';

// Components
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileDrawer } from './MobileDrawer';

// Department Colors
const DEPARTMENT_COLORS = {
    "Life Assurance": "#3d834d",
    "General & Business Insurance": "#286278",
    "Loans & Financing": "#f79620",
};

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

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

    // About dropdown data
    const aboutDropdown = useMemo(() => [
        { 
            name: "Our Journey", 
            link: "/about", 
            icon: PiHouseIcon,
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
        { 
            name: "News Blog", 
            link: "/news", 
            icon: PiNewspaper,
            description: "Latest news and updates"
        },
    ], []);

    // Main navigation items
    const mainNavItems = [
        { name: "HOME", link: "/" },
        { name: "ABOUT US", link: "/about", dropdown: aboutDropdown },
        { name: "PRODUCTS", dropdown: productsDropdown },
        { name: "UNITED LIFE ASSURANCE", link: "../../companies/ULA" },
        { name: "UNITED GENERAL INSURANCE", link: "../../companies/UGI" },
        { name: "UNITED PAY", link: "../../companies/UP" },
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

    return (
        <div className="w-full sticky top-0 z-40 bg-white shadow-sm">
            <DesktopHeader mainNavItems={mainNavItems} />
            <MobileHeader onMenuClick={toggleDrawer} />
            <MobileDrawer
                isOpen={isDrawerOpen}
                onClose={closeDrawer}
                mainNavItems={mainNavItems}
                mobileActiveDropdown={mobileActiveDropdown}
                onToggleDropdown={toggleMobileDropdown}
            />
        </div>
    );
}