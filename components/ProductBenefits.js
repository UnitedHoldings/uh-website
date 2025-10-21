// components/ProductBenefits.js

import { getCompanyDetails, getCompanyStyles } from "./productCompany";

export default function ProductBenefits({ benefits, company, variant = 'dark' }) {
    const styles = getCompanyStyles(company);

    if (variant === 'light') {
        return <LightBenefits benefits={benefits} styles={styles} company={company} />;
    }

    return <DarkBenefits benefits={benefits} styles={styles} company={company} />;
}

// Dark variant with colored background
function DarkBenefits({ benefits, styles, company }) {
    return (
        <div className='max-w-[1400px] px-4 my-8 mt-8 sm:my-12 md:my-16 space-y-6 mx-auto flex flex-col lg:flex-row'>
            {/* Left Column - Title */}
            <div className='lg:min-w-3/12 w-full lg:w-auto'>
                <h2
                    className='font-semibold text-2xl sm:text-3xl lg:text-4xl text-center lg:text-left mb-4 lg:mb-0'
                
                >
                    Benefits
                </h2>

            </div>

            {/* Right Column - Benefits Grid */}
            <div className='w-full lg:border-l border-gray-400 lg:pl-6'  >
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {benefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;
                        return (
                            <li
                                key={index}
                                className="flex items-center flex-col p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl gap-2 sm:gap-3 lg:gap-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden"
                                style={{
                                    backgroundColor: styles.primary,
                                }}
                            >
                                <div
                                    className="p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 z-10"
                                    
                                >
                                    <IconComponent
                                        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                                        style={{ color: styles.text }}
                                    />
                                </div>
                                <span
                                    className="text-sm sm:text-base lg:text-lg font-medium leading-tight z-10"
                                    style={{ color: styles.text }}
                                >
                                    {benefit.text}
                                </span>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        boxShadow: `0 0 0 2px ${styles.secondary}40`,
                                        backgroundColor: `${styles.secondary}10`
                                    }}>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {/* Call-to-action */}

            </div>
        </div>
    );
}

// Light variant with light background
function LightBenefits({ benefits, styles, company }) {
    return (
        <div className='max-w-[1400px] px-4 my-8 sm:my-12 md:my-16 space-y-6 mx-auto'>
            {/* Header */}
            <div className='text-center mb-8'>
                <h2
                    className='font-semibold text-3xl sm:text-4xl mb-4'
                    style={{ color: styles.primary }}
                >
                    Key Benefits
                </h2>
                <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: styles.primary }}></div>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Discover the advantages of choosing our {getCompanyDetails(company).description.toLowerCase()}
                </p>
            </div>

            {/* Benefits Grid with Light Background */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                        <li
                            key={index}
                            className="flex items-center flex-col p-6 sm:p-8 rounded-2xl gap-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
                            style={{
                                backgroundColor: styles.light,
                                border: `2px solid ${styles.primary}20`
                            }}
                        >
                            <div
                                className="p-4 rounded-full transition-all duration-300 group-hover:scale-110 z-10"
                                style={{ backgroundColor: styles.primary }}
                            >
                                <IconComponent
                                    className="w-8 h-8 sm:w-10 sm:h-10"
                                    style={{ color: styles.text }}
                                />
                            </div>

                            <h3
                                className="text-xl font-semibold mb-2 z-10"
                                style={{ color: styles.primary }}
                            >
                                {benefit.title || `Benefit ${index + 1}`}
                            </h3>

                            <span
                                className="text-gray-700 leading-relaxed z-10"
                            >
                                {benefit.text}
                            </span>

                            {/* Hover effect */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    backgroundColor: `${styles.primary}05`,
                                    border: `2px solid ${styles.primary}30`
                                }}>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Light variant CTA */}
            <div className="mt-12 text-center">
                <button
                    className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform text-lg"
                    style={{
                        backgroundColor: styles.primary,
                        color: styles.text,
                        border: `2px solid ${styles.secondary}`
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = styles.secondary;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = styles.primary;
                    }}
                >
                    Get Started with {getCompanyDetails(company).name}
                </button>
            </div>
        </div>
    );
}