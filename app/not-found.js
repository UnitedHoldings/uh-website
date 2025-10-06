import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center bg-[#FDF2F2] p-8">
      <div className="max-w-2xl w-full flex flex-col items-center">
        <div className="w-full flex justify-center mb-8">
          {/* SVG Illustration */}
          <div className="w-full max-w-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/under.gif" alt="Under Construction" width={100} height={100} className="w-full h-auto" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-[#9b1c20] mb-4 text-center">Page Under Construction</h1>
        <p className="text-lg text-gray-700 text-center mb-8">Sorry, the page you are looking for is currently under construction or does not exist. Please check back soon!</p>
        <Link href="/" className="px-6 py-3 bg-[#9b1c20] text-white rounded font-semibold hover:bg-[#7a1518] transition">Go Home</Link>
      </div>
    </div>
  );
}
