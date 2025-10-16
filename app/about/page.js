import Agent from '@/components/Agent';
import Products from '@/components/Products';
import Image from 'next/image';
import Link from 'next/link';
import { 
    PiShieldCheck, 
    PiUsers, 
    PiHandshake, 
    PiRocketLaunch,
    PiTarget,
    PiEye,
    PiChartLineUp,
    PiBuildings,
    PiCar,
    PiHouse,
    PiGavel,
    PiBriefcase,
    PiHeart,
    PiMoney
} from 'react-icons/pi';

export default function About() {
    const values = [
        {
            icon: PiShieldCheck,
            title: 'Trust & Integrity',
            description: 'We build lasting relationships through transparency, honesty, and reliable service delivery.'
        },
        {
            icon: PiUsers,
            title: 'Customer First',
            description: 'Our clients are at the heart of everything we do. We listen, understand, and deliver solutions that matter.'
        },
        {
            icon: PiHandshake,
            title: 'Partnership',
            description: 'We work collaboratively with our clients and communities to achieve shared success.'
        },
        {
            icon: PiRocketLaunch,
            title: 'Innovation',
            description: 'Continuously evolving to meet the changing needs of Eswatini with modern financial solutions.'
        }
    ];

    const milestones = [
        { year: '2016', event: 'Founded with operating license acquisition' },
        { year: '2017', event: 'Launched United Life Assurance' },
        { year: '2018', event: 'Expanded to United General Insurance' },
        { year: '2020', event: 'Introduced United Pay financial services' },
        { year: '2022', event: 'Reached 50,000+ happy clients' },
        { year: '2024', event: 'Became leading Swazi-owned financial group' }
    ];

    return (
        <div className="min-h-screen font-outfit mx-auto">
            {/* Header Section */}
            <div className='bg-[#881a1e] h-6 sm:h-8 w-full' />
            <div className='bg-[#9b1c20] py-8 sm:py-12'>
                <header className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        About United Holdings
                    </h1>
                    <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Building a financially secure future for Eswatini through trusted insurance and innovative financial solutions.
                    </p>
                </header>
            </div>

            {/* Hero Image */}
            <div className='relative'>
                <Image
                    src={'/loan-2.png'}
                    alt="United Holdings - Building Financial Security"
                    width={1920}
                    height={360}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#9b1c20]/40 to-transparent flex items-center">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 w-full">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                                Proudly Serving Eswatini
                            </h2>
                            <p className="text-white text-lg sm:text-xl leading-relaxed">
                                100% Swazi-owned financial services group dedicated to empowering individuals, families, and businesses.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold text-[#9b1c20]">80+</div>
                            <div className="text-gray-600 text-sm">Years Combined Experience</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold text-[#9b1c20]">50K+</div>
                            <div className="text-gray-600 text-sm">Happy Clients</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold text-[#9b1c20]">3</div>
                            <div className="text-gray-600 text-sm">Group Companies</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold text-[#9b1c20]">98%</div>
                            <div className="text-gray-600 text-sm">Claim Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <div className="bg-white py-12 sm:py-16">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                                Our Journey
                            </h2>
                            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                                <p>
                                    <strong>United Holdings Ltd – Live With Purpose.</strong> United Holdings is a proudly Eswatini‑owned financial services group that has steadily grown into one of the Kingdom&apos;s most trusted providers of insurance and financial solutions.
                                </p>
                                <p>
                                    Since acquiring our operating license in 2016, we have been on a mission to transform the way individuals, families, and businesses access financial protection in Eswatini.
                                </p>
                                <p>
                                    Our story is one of resilience, innovation, and deep commitment to the people of Eswatini. We were founded on the belief that financial services should not be a privilege for the few, but a right for all.
                                </p>
                                <p>
                                    Today, we stand as a diversified group under the Dups Group of Companies, offering a comprehensive range of products that address both short‑term and long‑term financial needs.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Milestones</h3>
                            <div className="space-y-4">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="bg-[#9b1c20] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold">
                                            {milestone.year}
                                        </div>
                                        <p className="text-gray-700 pt-2">{milestone.event}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vision & Mission Section */}
            <div className="bg-gray-50 py-12 sm:py-16">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Our Vision & Mission
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Guiding principles that drive our commitment to Eswatini&apos;s financial future
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-[#9b1c20] text-white rounded-xl w-16 h-16 flex items-center justify-center">
                                    <PiEye className="text-2xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                To be the leading customer‑centric financial services provider in Eswatini and beyond, 
                                setting the standard for trust, innovation, and inclusivity while empowering every 
                                individual and business to achieve financial security and prosperity.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-[#9b1c20] text-white rounded-xl w-16 h-16 flex items-center justify-center">
                                    <PiTarget className="text-2xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                We exist to uplift lives by delivering affordable, accessible, and innovative financial 
                                services. By being an employer of choice and a partner to communities, we ensure that 
                                our growth is shared with the people and places we serve, creating lasting positive impact.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="bg-white py-12 sm:py-16">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The principles that guide every decision and action we take
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center group hover:bg-[#9b1c20] hover:text-white transition-all duration-300">
                                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors">
                                    <value.icon className="text-2xl text-[#9b1c20] group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white">{value.title}</h3>
                                <p className="text-gray-600 group-hover:text-white/90 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Group of Companies Section */}
            <div className="bg-[#9b1c20] py-12 sm:py-16">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Our Group of Companies
                        </h2>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto">
                            Three specialized companies working together to provide comprehensive financial solutions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* United Life Assurance */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <div className="h-48 bg-gradient-to-br from-[#3d834d] to-[#2a6b3a] relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <PiHeart className="text-white text-6xl opacity-20" />
                                    <div className="absolute bottom-6 left-6">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                            <span className="text-white font-semibold text-sm">ULA</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    United Life Assurance
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Providing long‑term insurance solutions including funeral plans, credit life, and group life cover. 
                                    We ensure families have dignity, security, and peace of mind during life&apos;s most challenging moments.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <PiHeart className="text-[#3d834d]" />
                                    <span>Life Assurance & Funeral Cover</span>
                                </div>
                                <Link href="/united-life-assurance" className="inline-flex items-center gap-2 text-[#3d834d] font-semibold hover:gap-3 transition-all">
                                    Explore ULA <PiChartLineUp />
                                </Link>
                            </div>
                        </div>

                        {/* United General Insurance */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <div className="h-48 bg-gradient-to-br from-[#9b1c20] to-[#881a1e] relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <PiShieldCheck className="text-white text-6xl opacity-20" />
                                    <div className="absolute bottom-6 left-6">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                            <span className="text-white font-semibold text-sm">UGI</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    United General Insurance
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Offering comprehensive short-term insurance for motor, home, legal, and business protection. 
                                    We safeguard assets and livelihoods, ensuring quick recovery from unexpected events.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <PiShieldCheck className="text-[#9b1c20]" />
                                    <span>General & Business Insurance</span>
                                </div>
                                <Link href="/united-general-insurance" className="inline-flex items-center gap-2 text-[#9b1c20] font-semibold hover:gap-3 transition-all">
                                    Explore UGI <PiChartLineUp />
                                </Link>
                            </div>
                        </div>

                        {/* United Pay */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <div className="h-48 bg-gradient-to-br from-[#f79620] to-[#e08515] relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <PiMoney className="text-white text-6xl opacity-20" />
                                    <div className="absolute bottom-6 left-6">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                            <span className="text-white font-semibold text-sm">UP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    United Pay
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Delivering fast, reliable cash loans with flexible repayment options. 
                                    We empower individuals and small businesses to access credit when they need it most, 
                                    supporting financial growth and opportunity.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <PiMoney className="text-[#f79620]" />
                                    <span>Loans & Financing</span>
                                </div>
                                <Link href="/united-pay" className="inline-flex items-center gap-2 text-[#f79620] font-semibold hover:gap-3 transition-all">
                                    Explore UP <PiChartLineUp />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-white/80 text-lg max-w-2xl mx-auto">
                            Together, these subsidiaries make United Holdings a one‑stop partner for financial security, 
                            ensuring that our clients can plan, protect, and prosper throughout their lives.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#9b1c20] to-[#881a1e] py-12 sm:py-16">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Ready to Secure Your Future?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied clients who trust United Holdings with their financial security and growth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products" className="bg-white text-[#9b1c20] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                            Explore Our Products
                        </Link>
                        <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#9b1c20] transition-colors">
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </div>

            {/* Products Component */}
            <Products />
            
            {/* Agent Component */}
            <Agent />
        </div>
    );
}