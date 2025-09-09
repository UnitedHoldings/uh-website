import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

function Footer() {
    const companyLinks = [
        { title: 'Home', path: '/' },
        { title: 'About Us', path: '/about' },
        { title: 'United General Insurance', path: '/programs' },
        { title: 'United Pay', path: '/blog' },
        { title: 'United Life Assurance', path: '/contact' },
        { title: 'Documents', path: '/document' },

    ];
    const helpLinks = [
        { title: 'Contact Us', path: '/contact' },
        { title: 'Consult', path: '/psychosocial' },
        { title: 'Proof Insurance', path: '/screening' },
        { title: 'FAQ’s', path: '/faq' },
        { title: 'Vancancies', path: '/programs/advocacy' },
    ];
    const socialLinks = [
        { name: 'Instagram', url: 'https://www.instagram.com/breastandcervicalcancernetwork/', icon: <FaInstagram className="inline-block mr-2 text-xl align-middle" aria-label="Instagram" /> },
        { name: 'Facebook', url: 'https://www.facebook.com/swazilandbreastandcervicalcancernetwork/', icon: <FaFacebookF className="inline-block mr-2 text-xl align-middle" aria-label="Facebook" /> },
        { name: 'WhatsApp', url: 'https://wa.me/26879021071', icon: <FaWhatsapp className="inline-block mr-2 text-xl align-middle" aria-label="WhatsApp" /> },
    ];
    return (
        <footer className="bg-tertiary border-t-8 border-[#D72423]">
            <div className=" mx-auto px-16    py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                    {/* Logo Section */}
                    <div className="flex flex-col items-start ">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/Logo.svg" alt="Logo" width={300} height={50} />
                        </Link>
                    </div>
                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-lg text-primary mb-4 font-outfit">Company</h3>
                        <ul className="font-outfit font-light space-y-2 text-gray-700">
                            {companyLinks.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className="hover:text-secondary transition-colors"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Help Links */}
                    <div>
                        <h3 className="font-bold text-lg text-primary mb-4 font-outfit">Help</h3>
                        <ul className="font-outfit font-light space-y-2 text-gray-700">
                            {helpLinks.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className="hover:text-secondary transition-colors"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Social Links */}
                    <div>
                        <h3 className="font-bold text-lg text-primary mb-4 font-outfit">Social</h3>
                        <ul className="font-outfit font-light space-y-2 text-gray-700">
                            {socialLinks.map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-secondary transition-colors flex items-center"
                                    >
                                        {social.icon}
                                        <span>{social.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="text-center text-sm mt-8 border-t border-gray-200 pt-2 text-gray-700 space-y-2 flex flex-col lg:flex-row w-full lg:justify-between">
                    <p>© {new Date().getFullYear()} United Holdings Eswatini. All rights reserved.</p>
                    <p>
                        Developed by{' '}
                        <a
                            href="tel:+26878608308"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-secondary transition-colors"
                        >
                            Unbounded Creative Agency
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer