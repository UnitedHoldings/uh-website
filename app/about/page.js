import Agent from '@/components/Agent';
import Products from '@/components/Products';
import Image from 'next/image';

export default function About() {
    return (
        <div className="min-h-screen font-outfit mx-auto">
            <div className='bg-[#881a1e] h-8 w-full' />
            <div className='bg-[#9b1c20] py-4'>
                <header className=" max-w-[1400px] mx-auto px-4">
                    <h1 className="text-2xl md:text-4xl font-semibold text-white">About United Holdings</h1>
                    <p className="text-sm text-white">Learn about our purpose, values and commitment to Eswatini.</p>
                </header>
            </div>

            <div className='relative'>
                <Image src={'/loan-2.png'} alt="About hero" width={1920} height={360} className="w-full h-[320px] object-cover" />

            </div>
            <div className='max-w-[1400px] px-4 mt-8 mb-16 space-y-6 mx-auto'>
                <div className="flex  justify-between items-center md:flex-row md:items-center gap-4 md:gap-8">
                    <p className='max-w-[800px] text-2xl'>Most claims, including home, life, funeral, vehicles can be taken care of in <span className="text-[#9b1c20] font-semibold">My Account</span> . Check out the information below for other claims that are handled a little differently.</p>
                    <div>
                        <button className='border-[#9b1c20] border  text-[#9b1c20] py-2 px-8 rounded-full' >
                            Client Area
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white  overflow-hidden">
                <div className='max-w-[1400px] px-4 mt-8 mb-16 space-y-6 mx-auto flex'>
                    <div className='min-w-3/12'>
                        <p className='font-semibold text-3xl'>About Us</p>
                        <div className="flex flex-col  w-full justify-between py-6 ">


                        </div>
                    </div>

                    <div className='w-full border-l border-gray-400 pl-6'>
                        <h2 className="text-2xl font-semibold ">Our Journey</h2>
                        <div className="grid grid-row-1 grid-flow-row md:grid-cols-2 gap-6 py-4">
                            <p className="text-gray-700 max-w-4xl leading-relaxed">United Holdings Ltd – Live With Purpose.
                                United Holdings is a proudly Eswatini‑owned financial services group that has steadily grown into one of the Kingdom’s most trusted providers of insurance and financial solutions. Since acquiring our operating license in 2016, we have been on a mission to transform the way individuals, families, and businesses access financial protection.</p>
                            <p className="text-gray-700 max-w-4xl leading-relaxed ">Our story is one of resilience, innovation, and deep commitment to the people of Eswatini. We were founded on the belief that financial services should not be a privilege for the few, but a right for all. Today, we stand as a diversified group under the Dups Group of Companies, offering a wide range of products that address both short‑term and long‑term financial needs.</p>
                        </div>
                    </div>
                </div>


            </div>
            <div className="bg-white  overflow-hidden">
                <div className='max-w-[1400px] px-4  mb-16 space-y-6 mx-auto flex'>
                    <div className='min-w-3/12'>
                        <p className='font-semibold text-3xl'>Our Vision & Mission</p>
                        <div className="flex flex-col  w-full justify-between py-6 ">


                        </div>
                    </div>

                    <div className='w-full border-l border-gray-400 pl-6'>
                        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
                                <p className="text-gray-700 max-w-4xl">To be the leading customer‑centric financial services provider in Eswatini and beyond, setting the standard for trust, innovation, and inclusivity.</p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                                <p className="text-gray-700 max-w-4xl">We exist to uplift lives by delivering affordable, accessible, and innovative financial services. By being an employer of choice and a partner to communities, we ensure that our growth is shared with the people and places we serve.</p>
                            </div>
                        </section>
                    </div>
                </div>


            </div>
            <main className=" px-4 py-12 bg-[#740e12]">




                <section className="  max-w-[1400px] mx-auto  rounded-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Our Group of Companies</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-[#9b1c20]         shadow-sm overflow-hidden">
                            <div className="h-60 w-full relative bg-white flex items-center justify-center px-16">
                                <Image src="/life2.jpg" alt="United Life Assurance" width={500} height={500} className="object-fit  " />
                            </div>
                            <div className="p-4">
                                <h3 className=" text-white font-semibold text-xl">United Life Assurance</h3>
                                <p className="line-clamp-2 mt-2 text-white text-sm">Offering long‑term insurance solutions such as funeral plans, credit life, and group life cover. These products provide families with dignity, security, and peace of mind during life’s most challenging moments.</p>
                            </div>
                        </div>

                        <div className="bg-[#9b1c20]      shadow-sm overflow-hidden">
                            <div className="h-60 w-full relative bg-white flex items-center justify-center px-16">
                                <Image src="/general.jpg" alt="United General Insurance" width={500} height={500} />
                            </div>
                            <div className="p-4">
                                <h3 className=" text-white font-semibold text-xl">United General Insurance</h3>
                                <p className="line-clamp-2 mt-2 text-white text-sm">Providing short‑term insurance for motor, home, legal, and business protection. We safeguard the assets and livelihoods of our clients, ensuring they can recover quickly from unexpected events.</p>
                            </div>
                        </div>
                        

                        <div className="bg-[#9b1c20]   shadow-sm overflow-hidden">
                            <div className="h-60 w-full relative bg-white flex items-center justify-center px-16">
                                <Image src="/pay.jpg" alt="United Pay" width={500} height={500} />
                            </div>
                            <div className="p-4">
                                <h3 className=" text-white font-semibold text-xl">United Pay</h3>
                                <p className="line-clamp-2 mt-2 text-white text-sm">Delivering fast, reliable cash loans with flexible repayment options. This service empowers individuals and small businesses to access credit when they need it most.</p>
                            </div>
                        </div>
                    </div>

                    <p className=" mt-4 text-white">Together, these subsidiaries make United Holdings a one‑stop partner for financial security, ensuring that our clients can plan, protect, and prosper.</p>
                </section>



            </main>
            <div className="bg-white  overflow-hidden">
                <div className='max-w-[1400px] px-4 mt-8 mb-16 space-y-6 mx-auto flex'>
                    <div className='min-w-3/12'>
                        <p className='font-semibold text-3xl'>Our Values</p>
                        <div className="flex flex-col  w-full justify-between py-6 ">


                        </div>
                    </div>

                    <div className='w-full border-l border-gray-400 pl-6'>
                        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-3">Core Values</h2>
                                <p className="text-gray-700 max-w-4xl">Integrity, empathy, and accountability guide everything we do. We put customers first, treat colleagues with respect, and deliver on our promises.</p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-3">How we work</h2>
                                <p className="text-gray-700 max-w-4xl">We focus on simple, transparent products and clear customer communication. Our teams work collaboratively to design solutions that meet real needs.</p>
                            </div>
                        </section>
                    </div>
                </div>


            </div>
            <Products />

            <div className="bg-white  overflow-hidden">
                <div className='max-w-[1400px] px-4 mt-8 mb-16 space-y-6 mx-auto flex'>
                    <div className='min-w-3/12'>
                        <p className='font-semibold text-3xl'>Commitment to Sustainability</p>
                        <div className="flex flex-col  w-full justify-between py-6 ">


                        </div>
                    </div>

                    <div className='w-full border-l border-gray-400 pl-6'>
                        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-3">Environmental Stewardship</h2>
                                <p className="text-gray-700 max-w-4xl">We are committed to reducing our environmental footprint by operating efficiently and supporting initiatives that protect natural resources.</p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-3">Sustainable Finance</h2>
                                <p className="text-gray-700 max-w-4xl">Our products and investments consider long‑term social and environmental impacts, supporting resilient growth for our clients and communities.</p>
                            </div>
                        </section>
                    </div>
                </div>


            </div>



        </div>
    );
}
