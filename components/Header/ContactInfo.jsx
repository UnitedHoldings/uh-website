// components/Header/ContactInfo.jsx
import React from 'react';
import { trackEvent } from '@/lib/posthog';
import { PiMapPin, PiPhone, PiEnvelope } from 'react-icons/pi';
import Link from 'next/link';

export const ContactInfo = ({ variant = 'desktop', location = 'top_nav' }) => {
    const contactItems = [
        {
            type: 'address',
            icon: PiMapPin,
            content: 'Address',
            href: '/contact',
            clickData: { contact_info_chosen: 'Address', contact_type: 'address' }
        },
        {
            type: 'phone',
            icon: PiPhone,
            content: 'Toll Free: 800 1010',
            href: 'tel:8001010',
            clickData: { contact_info_chosen: 'Toll Free: 800 1010', contact_type: 'phone' }
        },
        {
            type: 'phone',
            icon: PiPhone,
            content: '(+268) 2508 6000',
            href: 'tel:+26825086000',
            clickData: { contact_info_chosen: '(+268) 2508 6000', contact_type: 'phone' }
        },
        {
            type: 'email',
            icon: PiEnvelope,
            content: 'info@united.co.sz',
            href: 'mailto:info@united.co.sz',
            clickData: { contact_info_chosen: 'info@united.co.sz', contact_type: 'email' }
        }
    ];

    if (variant === 'mobile-quick') {
        return (
            <div className="flex items-center space-x-4 text-xs">
                {contactItems
                    .filter(item => item.type === 'phone')
                    .map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={index}
                                href={item.href}
                                className="hover:underline transition duration-150 ease-in-out font-medium"
                                onClick={() => trackEvent('contact_info_clicked', {
                                    ...item.clickData,
                                    location: location
                                })}
                            >
                                {item.content}
                            </a>
                        );
                    })}
            </div>
        );
    }

    if (variant === 'mobile-drawer') {
        return (
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col space-y-4">
                    {contactItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex items-center space-x-2">
                                <Icon className="text-gray-500" />
                                {item.type === 'address' ? (
                                    <Link 
                                        href={item.href}
                                        className="font-semibold text-[#9b1c20] hover:underline"
                                    >
                                        {item.content}
                                    </Link>
                                ) : (
                                    <a 
                                        href={item.href}
                                        className="font-semibold text-[#9b1c20] hover:underline"
                                        onClick={() => trackEvent('contact_info_clicked', {
                                            ...item.clickData,
                                            location: 'mobile_drawer'
                                        })}
                                    >
                                        {item.content}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Desktop variant
    return (
        <div className="flex items-center space-x-6 text-sm text-[#666666]">
            {contactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                    <React.Fragment key={index}>
                        {item.type === 'address' ? (
                            <div className="flex items-center space-x-2">
                                <Icon className="w-4 h-4" />
                                <Link 
                                    href={item.href}
                                    className="font-semibold"
                                >
                                    {item.content}
                                </Link>
                            </div>
                        ) : (
                            <a
                                href={item.href}
                                className="hover:underline transition duration-150 ease-in-out font-medium"
                                onClick={() => trackEvent('contact_info_clicked', {
                                    ...item.clickData,
                                    location: location
                                })}
                            >
                                {item.content}
                            </a>
                        )}
                        {index < contactItems.length - 1 && item.type !== 'address' && (
                            <span className="text-gray-300">|</span>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};