// components/Header/DesktopHeader.jsx
import React from 'react';
import { Logo } from './Logo';
import { ContactInfo } from './ContactInfo';
import { SocialLinks } from './SocialLinks';
import { NavigationMenu } from './NavigationMenu';

export const DesktopHeader = ({ mainNavItems }) => {
    return (
        <div className="hidden lg:block border-b-4 border-[#9b1c20]">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                {/* Single row containing logo spanning full height and right content */}
                <div className="flex items-stretch min-h-[100px]">
                    {/* Logo - Spans full height of both header sections */}
                    <div className="flex items-center justify-center py-1 pr-8">
                        <Logo variant="desktop" />
                    </div>

                    {/* Right side content - Stacked vertically */}
                    <div className="flex-1 flex flex-col gap-1">
                        {/* Top section - Contact info and social icons */}
                        <div className="flex-1 flex items-end justify-end gap-8 px-6">
                            <ContactInfo variant="desktop" location="top_nav" />
                            <SocialLinks location="top_nav" />
                        </div>

                        {/* Bottom section - Main navigation */}
                        <div className="flex-1 flex items-center justify-end px-6">
                            <nav className="flex-1">
                                <NavigationMenu items={mainNavItems} variant="desktop" />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};