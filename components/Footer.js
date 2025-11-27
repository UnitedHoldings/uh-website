"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { trackEvent } from '@/lib/posthog'
import { 
    PiInstagramLogo,
    PiFacebookLogo,
    PiLinkedinLogo,
    PiYoutubeLogo,
    PiMapPin,
    PiPhone,
    PiEnvelope,
    PiHeart,
    PiShieldCheck,
    PiBriefcase,
    PiMoney,
    PiHouse,
    PiUsersThree,
    PiBriefcaseMetal,
    PiImages,
    PiFolderOpen,
    PiFile,
    PiNewspaper,
    PiCar,
    PiUsers,
    PiUser,
    PiScales,
} from 'react-icons/pi'

function Footer() {
    // Social media links (same as header)
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
    ]

    // Company links
    const companyLinks = [
        { 
            title: 'Our Journey', 
            path: '/about',
            icon: PiHouse
        },
        { 
            title: 'Our Team', 
            path: '/about/our-team',
            icon: PiUsersThree
        },
        { 
            title: 'Careers', 
            path: '/about/careers',
            icon: PiBriefcaseMetal
        },
        { 
            title: 'Gallery', 
            path: '/about/gallery',
            icon: PiImages
        },
       
    ]

    // Products links
    const productsLinks = [
        { 
            title: 'Family Funeral Plan', 
            path: '/products/family-funeral-plan',
            icon: PiUsers
        },
        { 
            title: 'Individual Funeral Plan', 
            path: '/products/individual-funeral-plan',
            icon: PiUser
        },
        { 
            title: 'Motor Insurance', 
            path: '/products/motor-insurance',
            icon: PiCar
        },
        { 
            title: 'Home Contents Insurance', 
            path: '/products/home-contents-insurance',
            icon: PiHouse
        },
        { 
            title: 'Legal Insurance', 
            path: '/products/legal-insurance',
            icon: PiScales
        },
        { 
            title: 'Micro Loans', 
            path: '/products/micro-loan',
            icon: PiMoney
        },
    ]

    // Resources links
    const resourcesLinks = [
        { 
            title: 'Policies', 
            path: '/policies',
            icon: PiFile
        },
        { 
            title: 'News Blog', 
            path: '/news',
            icon: PiNewspaper
        },
    ]

    return (
        <footer className="bg-[#9b1c20] text-white">
            <div className="mx-auto px-4 sm:px-6 max-w-[1800px] py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Logo and Contact Section */}
                    <div className="flex flex-col items-start space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Image 
                                src="/Logo-white.svg" 
                                alt="United Holdings Logo" 
                                width={300} 
                                height={50}  
                                className="hidden lg:block"
                            />
                            <Image 
                                src="/Logo-white.svg" 
                                alt="United Holdings Logo" 
                                width={150} 
                                height={50} 
                                className="lg:hidden"
                            />
                        </Link>
                        
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <PiMapPin className="w-5 h-5 text-gray-200" />
                                <span className="font-semibold text-gray-100">Address</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <PiPhone className="w-5 h-5 text-gray-200" />
                                <a 
                                    href="tel:8001010" 
                                    className="font-semibold text-[#F7941D] hover:underline transition duration-150"
                                >
                                    800 1010
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <PiPhone className="w-5 h-5 text-gray-200" />
                                <a 
                                    href="tel:+26825086000" 
                                    className="font-semibold text-[#F7941D] hover:underline transition duration-150"
                                >
                                    (+268) 2508 6000
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <PiEnvelope className="w-5 h-5 text-gray-200" />
                                <a 
                                    href="mailto:info@united.co.sz" 
                                    className="font-semibold text-[#F7941D] hover:underline transition duration-150"
                                >
                                    info@united.co.sz
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-4 pt-4">
                            {socialLinks.map((social) => {
                                const SocialIcon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition duration-150 ease-in-out"
                                        aria-label={social.name}
                                        onClick={() => trackEvent('social_media_clicked', {
                                            social_media_chosen: social.name,
                                            location: 'footer',
                                            page_section: 'footer'
                                        })}
                                    >
                                        <SocialIcon className="w-5 h-5 text-white" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-lg text-white mb-6 font-outfit border-b border-white/20 pb-2">
                            Company
                        </h3>
                        <ul className="font-outfit font-light space-y-3">
                            {companyLinks.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className="flex items-center space-x-3 hover:text-[#F7941D] transition-colors duration-150 group"
                                            onClick={() => trackEvent('footer_link_clicked', {
                                                link_clicked: item.title,
                                                link_category: 'Company',
                                                destination_path: item.path,
                                                page_section: 'footer'
                                            })}
                                        >
                                            <ItemIcon className="w-4 h-4 text-gray-200 group-hover:text-[#F7941D] transition-colors" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Products Links */}
                    <div>
                        <h3 className="font-bold text-lg text-white mb-6 font-outfit border-b border-white/20 pb-2">
                            Our Products
                        </h3>
                        <ul className="font-outfit font-light space-y-3">
                            {productsLinks.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className="flex items-center space-x-3 hover:text-[#F7941D] transition-colors duration-150 group"
                                            onClick={() => trackEvent('footer_link_clicked', {
                                                link_clicked: item.title,
                                                link_category: 'Products',
                                                destination_path: item.path,
                                                page_section: 'footer'
                                            })}
                                        >
                                            <ItemIcon className="w-4 h-4 text-gray-200 group-hover:text-[#F7941D] transition-colors" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="font-bold text-lg text-white mb-6 font-outfit border-b border-white/20 pb-2">
                            Resources
                        </h3>
                        <ul className="font-outfit font-light space-y-3">
                            {resourcesLinks.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className="flex items-center space-x-3 hover:text-[#F7941D] transition-colors duration-150 group"
                                            onClick={() => trackEvent('footer_link_clicked', {
                                                link_clicked: item.title,
                                                link_category: 'Resources',
                                                destination_path: item.path,
                                                page_section: 'footer'
                                            })}
                                        >
                                            <ItemIcon className="w-4 h-4 text-gray-200 group-hover:text-[#F7941D] transition-colors" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 my-8 pt-6">
                    <div className="flex mb-16  flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                        <p className="text-sm text-gray-200 text-center lg:text-left">
                            © {new Date().getFullYear()} United Holdings Eswatini. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-200 text-center lg:text-right">
                          Toll Free: 800 1010
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer