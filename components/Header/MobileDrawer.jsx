// components/Header/MobileDrawer.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PiX } from 'react-icons/pi';
import { ContactInfo } from './ContactInfo';
import { NavigationMenu } from './NavigationMenu';
import { Logo } from './Logo';

export const MobileDrawer = ({ 
    isOpen, 
    onClose, 
    mainNavItems, 
    mobileActiveDropdown, 
    onToggleDropdown 
}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-60 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <Logo variant="mobile" onClick={onClose} />
                        <button 
                            onClick={onClose} 
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Close menu"
                        >
                            <PiX className="text-2xl text-gray-600" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto">
                        <NavigationMenu
                            items={mainNavItems}
                            variant="mobile"
                            activeDropdown={mobileActiveDropdown}
                            onToggleDropdown={onToggleDropdown}
                            onItemClick={onClose}
                        />
                    </nav>

                    {/* Contact Info */}
                    <ContactInfo variant="mobile-drawer" location="mobile_drawer" />
                </div>
            </div>
        </>
    );
};