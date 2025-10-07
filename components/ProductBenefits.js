// components/ProductBenefits.js
export default function ProductBenefits({ benefits }) {
    return (

        <div className='max-w-[1400px] px-4   my-16 space-y-6 mx-auto flex'>
            <div className='min-w-3/12'>
                <p className='font-semibold text-3xl'>Benefits</p>
                <div className="flex flex-col  w-full justify-between py-6 ">


                </div>
            </div>

            <div className='w-full border-l border-gray-400 pl-6'>
                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {benefits.map(benefit => {
                        const IconComponent = benefit.icon;
                        return (
                            <li key={benefit.text} className="flex bg-red-50 items-center flex-col py-8 rounded-2xl gap-2">
                                <IconComponent className="w-10 h-10 text-[#9b1c20]" />
                                {benefit.text}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>


    );
}