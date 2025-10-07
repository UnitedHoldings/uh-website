"use client"
import Link from 'next/link';
import React, { useState } from 'react';

export default function ProductEligibility({ eligibility }) {
    const [tab, setTab] = useState('file');

    if (!eligibility || eligibility.length === 0) return null;
    return (
        <section className="">

            <div className="bg-white  overflow-hidden">
                <div className='max-w-[1400px] px-4 mt-8 mb-16 space-y-6 mx-auto flex'>
                    <div className='min-w-3/12 '>
                        <p className='font-semibold text-3xl'>Eligibility & Requirements</p>
                        <div className="flex flex-col  w-full justify-between py-6 ">

                            <div className="text-sm text-gray-600  md:mt-0">
                                <span className="font-semibold">Need help?</span> Call 800 1010 or email <a href="mailto:info@united.co.sz" className="text-[#9b1c20] underline">info@united.co.sz</a>
                            </div>
                        </div>
                    </div>

                    <div className='w-full border-l border-gray-400 pl-6'>
                        <div className="grid grid-row-1 grid-flow-col md:grid-cols-2 gap-6 py-4">

                            <div className="p-6  ">
                                <ul className="list-disc pl-5">
                                    {eligibility.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}
