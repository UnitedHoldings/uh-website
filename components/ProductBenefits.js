// components/ProductBenefits.js
export default function ProductBenefits({ benefits }) {
    return (
        <div className='max-w-[1400px] px-4 my-8 sm:my-12 md:my-16 space-y-6 mx-auto flex flex-col lg:flex-row'>
            {/* Left Column - Title */}
            <div className='lg:min-w-3/12 w-full lg:w-auto'>
                <p className='font-semibold text-2xl sm:text-3xl lg:text-4xl text-center lg:text-left'>
                    Benefits
                </p>
                <div className="flex flex-col w-full justify-between py-4 lg:py-6"></div>
            </div>

            {/* Right Column - Benefits Grid */}
            <div className='w-full lg:border-l lg:border-gray-400 lg:pl-6'>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {benefits.map(benefit => {
                        const IconComponent = benefit.icon;
                        return (
                            <li 
                                key={benefit.text} 
                                className="flex bg-red-50 items-center flex-col p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl gap-2 sm:gap-3 lg:gap-4 text-center"
                            >
                                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#9b1c20]" />
                                <span className="text-sm sm:text-base lg:text-lg font-medium leading-tight">
                                    {benefit.text}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}