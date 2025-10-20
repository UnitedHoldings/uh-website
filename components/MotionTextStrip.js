'use client'
import React from 'react'

function MotionTextStrip() {
    // Repeat the text enough times to ensure seamless infinite loop on all screen sizes
    const text = 'SHARING STRENGTH • EMBRACING LIFE • SPREADING LIGHT  •';
    const repeatCount = 10; // Large enough for any screen
    
    return (
        <div className="relative bg-[#DB8DD0] text-white font-outfit text-center text-xl md:text-xl lg:text-xl font-bold py-2 shadow-md overflow-hidden">
            <div className="flex w-max animate-motion-marquee">
                {Array.from({ length: repeatCount }).map((_, i) => (
                    <span className="mx-4 whitespace-nowrap" key={i}>{text}</span>
                ))}
            </div>
        </div>
    )
}

export default MotionTextStrip