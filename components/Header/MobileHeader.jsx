// components/Header/MobileHeader.jsx
import React from 'react';
import { PiList } from 'react-icons/pi';
import { Logo } from './Logo';
import { ContactInfo } from './ContactInfo';

export const MobileHeader = ({ onMenuClick }) => {
    return (
        <div className="lg:hidden">
            {/* Quick Nav CTA Bar */}
            <div className="bg-white text-[#9b1c20] border-b border-gray-200">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between py-2">
                        <ContactInfo variant="mobile-quick" location="mobile_quick_nav" />
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="border-b-4 border-[#9b1c20]">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between py-3">
                        {/* Logo */}
                        <Logo variant="mobile" />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={onMenuClick}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Open menu"
                        >
                            <PiList className="w-6 h-6 text-[#9b1c20]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};