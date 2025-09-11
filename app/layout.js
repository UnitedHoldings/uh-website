'use client';

import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  useEffect(() => {
    // Scroll to top on initial load and route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${outfit.variable} font-outfit antialiased relative`}>
        <div className="fixed top-[3%] lg:px-8 px-4 left-0 right-0 w-full z-50">
          <Header />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}