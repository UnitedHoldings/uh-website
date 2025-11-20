// components/Header/NavigationMenu.jsx
import React from 'react';
import Link from 'next/link';
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';

// Department Colors
const DEPARTMENT_COLORS = {
    "Life Assurance": "#3d834d",
    "General & Business Insurance": "#286278",
    "Loans & Financing": "#f79620",
};

export const NavigationMenu = ({ 
    items, 
    variant = 'desktop', 
    activeDropdown, 
    onToggleDropdown, 
    onItemClick 
}) => {
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
                                style={{ backgroundColor: category.color }}
                            >
                                <div className="p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CategoryIcon className="w-4 h-4 text-white" />
                                        <Link 
                                            href={category.link || '#'}
                                            onClick={onItemClick}
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
                                                        onClick={onItemClick}
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
            return (
                <ul className="ml-4 space-y-2">
                    {item.dropdown.map((subItem, subIndex) => {
                        const SubItemIcon = subItem.icon;
                        return (
                            <li key={subIndex}>
                                <Link
                                    href={subItem.link}
                                    onClick={onItemClick}
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

    const renderDesktopDropdown = (item) => {
        if (item.name === "PRODUCTS") {
            return (
                <div className="absolute w-screen mx-auto -translate-x-[35%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="">
                        <div className="grid grid-cols-4 rounded-b-xl px-8 max-w-[1200px] 2xl:max-w-[1400px]">
                            {item.dropdown.map((category, categoryIndex) => {
                                const CategoryIcon = category.icon;
                                return (
                                    <div 
                                        key={categoryIndex} 
                                        className={`${categoryIndex === 0 ? "rounded-bl-2xl" : ""} ${categoryIndex === 3 ? "rounded-br-2xl" : ""} overflow-hidden py-6 transition-all duration-300 hover:shadow-xl`}
                                        style={{ backgroundColor: category.color }}
                                    >
                                        <div className="">
                                            <div className="flex items-center space-x-2 mb-4">
                                                <Link 
                                                    href={category.link || '#'}
                                                    className="font-bold text-white px-6 text-lg hover:text-gray-100 border-b border-white/20 border-opacity-30 pb-1"
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
                                                                className="flex items-center space-x-2 text-white transition duration-150 ease-in-out py-2 px-6 hover:bg-white/10 hover:bg-opacity-10 group"
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
            return (
                <div className="absolute left-0 top-[94%] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white shadow-lg rounded-b-2xl py-3 border border-gray-200 min-w-72">
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

    if (variant === 'mobile') {
        return (
            <ul className="space-y-1">
                {items.map((item, index) => (
                    <li key={index} className="border-b border-gray-100 last:border-b-0">
                        {item.dropdown ? (
                            <div>
                                <button
                                    className="w-full flex justify-between items-center font-semibold py-3 hover:text-[#9b1c20] transition duration-150 ease-in-out text-left"
                                    onClick={() => onToggleDropdown(item.name)}
                                >
                                    <span>{item.name}</span>
                                    {activeDropdown === item.name ? 
                                        <PiCaretUp className="text-gray-400" /> : 
                                        <PiCaretDown className="text-gray-400" />
                                    }
                                </button>
                                {activeDropdown === item.name && (
                                    <div className="pb-3">
                                        {renderMobileDropdown(item)}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href={item.link}
                                onClick={onItemClick}
                                className="block font-semibold py-3 hover:text-[#9b1c20] transition duration-150 ease-in-out"
                            >
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        );
    }

    // Desktop variant
    return (
        <ul className="flex items-center justify-end space-x-4 xl:space-x-6 text-sm font-semibold">
            {items.map((item, index) => (
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
    );
};