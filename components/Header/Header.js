// components/Header/index.jsx
"use client"
import React, { useState, useMemo, useEffect } from 'react';
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
    PiFlower,
    PiPiggyBank,
    PiAirplaneTilt,
    PiGraduationCap,
    PiFirstAid,
    PiArmchair,
    PiShield,
    PiPackage,
    PiFlame,
    PiTruck,
    PiCertificate,
    PiHandCoins,
    PiCreditCard,
    PiLockKey,
} from 'react-icons/pi';

// Components
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileDrawer } from './MobileDrawer';

// Icon mapping for API category icons
const ICON_MAP = {
    PiHeart: PiHeart,
    PiShieldCheck: PiShieldCheck,
    PiBriefcase: PiBriefcase,
    PiMoney: PiMoney,
    PiUsers: PiUsers,
    PiUser: PiUser,
    PiCalendar: PiCalendar,
    PiCar: PiCar,
    PiHouse: PiHouse,
    PiScales: PiScales,
    PiWarningCircle: PiWarningCircle,
    PiBuildingOffice: PiBuildingOffice,
    PiFileText: PiFileText,
    PiLock: PiLock,
    PiTrendUp: PiTrendUp,
    PiHouseIcon: PiHouseIcon,
    PiUsersThree: PiUsersThree,
    PiImage: PiImage,
    PiFile: PiFile,
    PiNewspaper: PiNewspaper,
    PiFlower: PiFlower,
    PiPiggyBank: PiPiggyBank,
    PiAirplaneTilt: PiAirplaneTilt,
    PiGraduationCap: PiGraduationCap,
    PiFirstAid: PiFirstAid,
    PiArmchair: PiArmchair,
    PiShield: PiShield,
    PiPackage: PiPackage,
    PiFlame: PiFlame,
    PiTruck: PiTruck,
    PiCertificate: PiCertificate,
    PiHandCoins: PiHandCoins,
    PiCreditCard: PiCreditCard,
    PiLockKey: PiLockKey,
};

// Static fallback structure for initial render
const STATIC_PRODUCTS_DROPDOWN = [
    {
        category: 'Life Assurance',
        icon: PiHeart,
        link: '/united-life-assurance',
        color: '#3d834d',
        items: [
            { name: 'Dignified Homelink Cover', link: '/products/dignified-homelink-cover', icon: PiUsers, description: 'Dignified Homelink Cover' },
            { name: 'Dignified Tribute Cover', link: '/products/dignified-tribute-cover', icon: PiUser, description: 'Dignified Tribute Cover' },
            { name: 'Dignified Tribute Plus Cover', link: '/products/dignified-tribute-plus-cover', icon: PiUser, description: 'Dignified Tribute Plus Cover' },
            { name: 'Funeral Plan', link: '/products/funeral-plan', icon: PiCalendar, description: 'Funeral Plan' },
            { name: 'Life Cover', link: '/products/life-cover', icon: PiShieldCheck, description: 'Life Cover' },
            { name: 'Family Funeral Cover', link: '/products/family-funeral-cover', icon: PiUsers, description: 'Family Funeral Cover' },
            { name: 'Credit Life Cover', link: '/products/credit-life-cover', icon: PiShieldCheck, description: 'Credit Life Cover' }
        ]
    },
    {
        category: 'General Personal Insurance',
        icon: PiShieldCheck,
        link: '/united-general-insurance',
        color: '#286278',
        items: [
            { name: 'Motor Insurance', link: '/products/motor-insurance', icon: PiCar, description: 'Motor Insurance' },
            { name: 'Home Insurance', link: '/products/home-insurance', icon: PiHouse, description: 'Home Insurance' },
            { name: 'Personal Accident Cover', link: '/products/personal-accident-cover', icon: PiUser, description: 'Personal Accident Cover' },
            { name: 'Travel Insurance', link: '/products/travel-insurance', icon: PiCar, description: 'Travel Insurance' }
        ]
    },
    {
        category: 'General Business Insurance',
        icon: PiBriefcase,
        link: '/united-general-insurance',
        color: '#286278',
        items: [
            { name: 'Multimark Policy', link: '/products/multimark-policy', icon: PiBuildingOffice, description: 'Multimark Policy' },
            { name: 'Public Liability', link: '/products/public-liability', icon: PiScales, description: 'Public Liability' },
            { name: 'Professional Indemnity', link: '/products/professional-indemnity', icon: PiFileText, description: 'Professional Indemnity' },
            { name: 'Business Interruption', link: '/products/business-interruption', icon: PiWarningCircle, description: 'Business Interruption' }
        ]
    },
    {
        category: 'Loans & Financing',
        icon: PiMoney,
        link: '/united-pay',
        color: '#f79620',
        items: [
            { name: 'Micro Loans', link: 'https://uploans.united.co.sz/', icon: PiMoney, description: 'Micro Loans', isExternal: true },
            { name: 'Umlamleli Loan (Salary Advance)', link: 'https://uploans.united.co.sz/', icon: PiTrendUp, description: 'Umlamleli Loan (Salary Advance)', isExternal: true }
        ]
    }
];

const STATIC_ABOUT_DROPDOWN = [
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
];

const STATIC_RESOURCES_DROPDOWN = [
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
];

const STATIC_MAIN_NAV_ITEMS = [
    { name: "HOME", link: "/" },
    { name: "ABOUT US", link: "/about", dropdown: STATIC_ABOUT_DROPDOWN },
    { name: "PRODUCTS", dropdown: STATIC_PRODUCTS_DROPDOWN },
    { name: "UNITED LIFE ASSURANCE", link: "../../companies/ULA" },
    { name: "UNITED GENERAL INSURANCE", link: "../../companies/UGI" },
    { name: "UNITED PAY", link: "../../companies/UP" },
    { name: "RESOURCES", dropdown: STATIC_RESOURCES_DROPDOWN },
    { name: "CONTACT US", link: "/contact" },
];

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
    const [headerData, setHeaderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Set mounted state to handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch header data from API - client side only
    useEffect(() => {
        if (!mounted) return;

        const fetchHeaderData = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://website.api.united.co.sz/api/header');
                if (!response.ok) {
                    throw new Error(`Failed to fetch header data: ${response.status}`);
                }
                const data = await response.json();
                setHeaderData(data.data || null);
            } catch (err) {
                console.error('Error fetching header data:', err);
                setHeaderData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchHeaderData();
    }, [mounted]);

    // Transform API data into products dropdown structure
    const productsDropdown = useMemo(() => {
        // Return static structure during SSR/initial render
        if (!mounted || loading || !headerData) {
            return STATIC_PRODUCTS_DROPDOWN;
        }
        
        const { productsDropdown: apiProducts, departmentColors } = headerData;
        
        if (!apiProducts?.categories) {
            return STATIC_PRODUCTS_DROPDOWN;
        }
        
        // Map API categories to the required dropdown structure
        return apiProducts.categories
            .sort((a, b) => a.order - b.order)
            .map(category => ({
                category: category.name,
                icon: ICON_MAP[category.icon] || PiUser,
                link: category.link || '#',
                color: category.color,
                items: (category.products || [])
                    .sort((a, b) => a.order - b.order)
                    .map(product => ({
                        name: product.name,
                        link: product.link,
                        icon: ICON_MAP[product.icon] || PiUser,
                        description: product.name,
                        isExternal: product.isExternal || false
                    }))
            }));
    }, [headerData, loading, mounted]);

    // Transform API data into about dropdown structure
    const aboutDropdown = useMemo(() => {
        if (!mounted || loading || !headerData?.aboutDropdown?.items) {
            return STATIC_ABOUT_DROPDOWN;
        }
        
        return headerData.aboutDropdown.items
            .sort((a, b) => a.order - b.order)
            .map(item => ({
                name: item.name,
                link: item.link,
                icon: ICON_MAP[item.icon] || PiUser,
                description: item.description
            }));
    }, [headerData, loading, mounted]);

    // Transform API data into resources dropdown structure
    const resourcesDropdown = useMemo(() => {
        if (!mounted || loading || !headerData?.resourcesDropdown?.items) {
            return STATIC_RESOURCES_DROPDOWN;
        }
        
        return headerData.resourcesDropdown.items
            .sort((a, b) => a.order - b.order)
            .map(item => ({
                name: item.name,
                link: item.link,
                icon: ICON_MAP[item.icon] || PiUser,
                description: item.description
            }));
    }, [headerData, loading, mounted]);

    // Transform API data into main navigation items
    const mainNavItems = useMemo(() => {
        if (!mounted || loading || !headerData?.mainNavigation?.items) {
            return STATIC_MAIN_NAV_ITEMS;
        }

        const dropdownMap = {
            about_dropdown: aboutDropdown,
            products_dropdown: productsDropdown,
            resources_dropdown: resourcesDropdown
        };

        return headerData.mainNavigation.items
            .filter(item => item.isActive)
            .sort((a, b) => a.order - b.order)
            .map(item => {
                const navItem = { name: item.name };
                
                if (item.link) {
                    navItem.link = item.link;
                }
                
                if (item.type === 'dropdown' && item.dropdownRef) {
                    navItem.dropdown = dropdownMap[item.dropdownRef];
                }
                
                return navItem;
            });
    }, [headerData, aboutDropdown, productsDropdown, resourcesDropdown, loading, mounted]);

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