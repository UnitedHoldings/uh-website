// components/Header/Logo.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/lib/posthog';

export const Logo = ({ variant = 'desktop', onClick }) => {
    const sizes = {
        desktop: { width: 280, height: 100, className: "h-20 w-auto" },
        mobile: { width: 180, height: 70, className: "hover:opacity-90 transition-opacity" }
    };

    const { width, height, className } = sizes[variant];

    return (
        <Link 
            href="/" 
            className={variant === 'desktop' ? "flex items-center h-full" : "flex-shrink-0"}
            onClick={(e) => {
                trackEvent('uh_logo_clicked', {
                    location: `${variant}_header`,
                    page_section: 'header'
                });
                onClick?.(e);
            }}
        >
            <Image
                src="/logo.svg"
                alt="United Holdings Logo"
                width={width}
                height={height}
                priority
                className={`hover:opacity-90 transition-opacity object-contain ${className}`}
                style={variant === 'desktop' ? { height: '80px', width: 'auto' } : {}}
            />
        </Link>
    );
};