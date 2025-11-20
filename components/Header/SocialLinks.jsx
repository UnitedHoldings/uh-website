// components/Header/SocialLinks.jsx
import React from 'react';
import { trackEvent } from '@/lib/posthog';
import {
    PiInstagramLogo,
    PiFacebookLogo,
    PiLinkedinLogo,
    PiYoutubeLogo,
} from 'react-icons/pi';

const socialLinks = [
    { 
        name: 'Instagram', 
        url: 'https://www.instagram.com/unitedholdingseswatini', 
        icon: PiInstagramLogo 
    },
    { 
        name: 'Facebook', 
        url: 'https://www.facebook.com/UnitedHoldingsEswatini/', 
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

export const SocialLinks = ({ location = 'top_nav' }) => {
    return (
        <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
                const SocialIcon = social.icon;
                return (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#666666] hover:text-[#7a1619] transition duration-150 ease-in-out"
                        aria-label={social.name}
                        onClick={() => trackEvent('social_media_clicked', {
                            social_media_chosen: social.name,
                            location: location,
                            page_section: 'header'
                        })}
                    >
                        <SocialIcon className="w-5 h-5" />
                    </a>
                );
            })}
        </div>
    );
};