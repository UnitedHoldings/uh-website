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

// Department Colors
const DEPARTMENT_COLORS = {
    "Life Assurance": "#3d834d",
    "General & Business Insurance": "#286278",
    "Loans & Financing": "#f79620",
};

// Icon mapping for API category icons
const ICON_MAP = {
    PiUser: PiUser,
    PiCar: PiCar,
    PiHandCoins: PiHandCoins,
    PiFlower: PiFlower,
    PiCreditCard: PiCreditCard,
    PiHouse: PiHouse,
    PiPiggyBank: PiPiggyBank,
    PiAirplaneTilt: PiAirplaneTilt,
    PiBriefcase: PiBriefcase,
    PiGraduationCap: PiGraduationCap,
    PiFirstAid: PiFirstAid,
    PiArmchair: PiArmchair,
    PiShieldCheck: PiShieldCheck,
    PiCertificate: PiCertificate,
    PiPackage: PiPackage,
    PiShield: PiShield,
    PiLockKey: PiLockKey,
    PiFlame: PiFlame,
    PiTruck: PiTruck,
};

// Static fallback structure for initial render
const STATIC_PRODUCTS_DROPDOWN = [
    {
        category: 'Life Assurance',
        icon: PiHeart,
        link: '../../companies/ULA',
        color: DEPARTMENT_COLORS["Life Assurance"],
        items: []
    },
    {
        category: 'General Personal Insurance',
        icon: PiShieldCheck,
        link: '../../companies/UGI',
        color: DEPARTMENT_COLORS["General & Business Insurance"],
        items: []
    },
    {
        category: 'General Business Insurance',
        icon: PiBriefcase,
        link: '../../companies/UGI',
        color: DEPARTMENT_COLORS["General & Business Insurance"],
        items: []
    },
    {
        category: 'Loans & Financing',
        icon: PiMoney,
        link: '../../companies/UP',
        color: DEPARTMENT_COLORS["Loans & Financing"],
        items: []
    }
];

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
    const [productCategories, setProductCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Set mounted state to handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch product categories from API - client side only
    useEffect(() => {
        if (!mounted) return;

        const fetchProductCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://website.api.united.co.sz/api/product-categories');
                if (!response.ok) {
                    throw new Error(`Failed to fetch product categories: ${response.status}`);
                }
                const data = await response.json();
                setProductCategories(data.data || []);
            } catch (err) {
                console.error('Error fetching product categories:', err);
                setProductCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProductCategories();
    }, [mounted]);

    // Transform API data into products dropdown structure
    const productsDropdown = useMemo(() => {
        // Return static structure during SSR/initial render
        if (!mounted || loading) {
            return STATIC_PRODUCTS_DROPDOWN;
        }
        
        // Return static structure if no categories loaded
        if (productCategories.length === 0) {
            return STATIC_PRODUCTS_DROPDOWN;
        }
        
        // Group categories by company
        const categoriesByCompany = {
            ULA: [],
            UGI: [],
            UP: []
        };

        // Sort and group categories
        productCategories
            .filter(cat => cat.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .forEach(category => {
                if (categoriesByCompany[category.companyCode]) {
                    categoriesByCompany[category.companyCode].push(category);
                }
            });

        // Map to the required dropdown structure
        return [
            {
                category: 'Life Assurance',
                icon: PiHeart,
                link: '../../companies/ULA',
                color: DEPARTMENT_COLORS["Life Assurance"],
                items: categoriesByCompany.ULA.map(cat => ({
                    name: cat.categoryName,
                    link: `/products/${cat.categoryName.toLowerCase().replace(/\s+/g, '-')}`,
                    icon: ICON_MAP[cat.categoryIcon] || PiUser,
                    description: `${cat.categoryName} coverage`
                }))
            },
            {
                category: 'General Personal Insurance',
                icon: PiShieldCheck,
                link: '../../companies/UGI',
                color: DEPARTMENT_COLORS["General & Business Insurance"],
                items: categoriesByCompany.UGI.filter(cat => 
                    cat.categoryName === 'Motor Insurance' ||
                    cat.categoryName === 'Home Insurance' ||
                    cat.categoryName === 'Personal Accident' ||
                    cat.categoryName === 'Travel Insurance' ||
                    cat.categoryName === 'Contents Insurance' ||
                    cat.categoryName === 'Theft Insurance' ||
                    cat.categoryName === 'Fire Insurance'
                ).map(cat => ({
                    name: cat.categoryName,
                    link: `/products/${cat.categoryName.toLowerCase().replace(/\s+/g, '-')}`,
                    icon: ICON_MAP[cat.categoryIcon] || PiShieldCheck,
                    description: `${cat.categoryName} coverage`
                }))
            },
            {
                category: 'General Business Insurance',
                icon: PiBriefcase,
                link: '../../companies/UGI',
                color: DEPARTMENT_COLORS["General & Business Insurance"],
                items: categoriesByCompany.UGI.filter(cat => 
                    cat.categoryName === 'Business Insurance' ||
                    cat.categoryName === 'Public Liability' ||
                    cat.categoryName === 'Professional Indemnity' ||
                    cat.categoryName === 'All Risks' ||
                    cat.categoryName === 'Goods in Transit'
                ).map(cat => ({
                    name: cat.categoryName,
                    link: `/products/${cat.categoryName.toLowerCase().replace(/\s+/g, '-')}`,
                    icon: ICON_MAP[cat.categoryIcon] || PiBriefcase,
                    description: `${cat.categoryName} coverage`
                }))
            },
            {
                category: 'Loans & Financing',
                icon: PiMoney,
                link: '../../companies/UP',
                color: DEPARTMENT_COLORS["Loans & Financing"],
                items: categoriesByCompany.UP.map(cat => ({
                    name: cat.categoryName,
                    link: cat.categoryName === 'Personal Loans' || cat.categoryName === 'Salary Advances' 
                        ? 'https://uploans.united.co.sz/' 
                        : `/products/${cat.categoryName.toLowerCase().replace(/\s+/g, '-')}`,
                    icon: ICON_MAP[cat.categoryIcon] || PiMoney,
                    description: `${cat.categoryName} services`
                }))
            }
        ];
    }, [productCategories, loading, mounted]);

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
    const mainNavItems = useMemo(() => [
        { name: "HOME", link: "/" },
        { name: "ABOUT US", link: "/about", dropdown: aboutDropdown },
        { name: "PRODUCTS", dropdown: productsDropdown },
        { name: "UNITED LIFE ASSURANCE", link: "../../companies/ULA" },
        { name: "UNITED GENERAL INSURANCE", link: "../../companies/UGI" },
        { name: "UNITED PAY", link: "../../companies/UP" },
        { name: "RESOURCES", dropdown: resourcesDropdown },
        { name: "CONTACT US", link: "/contact" },
    ], [aboutDropdown, productsDropdown, resourcesDropdown]);

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