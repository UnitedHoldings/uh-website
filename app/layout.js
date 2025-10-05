'use client';

import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from "next/script";

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
      <body className={`${outfit.variable} font-outfit bg-[#FDF2F2] antialiased relative`}>
        <Header />
        {children}
        <Footer />

        {/* Voiceflow Chatbot */}
        <Script
          src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
          type="text/javascript"
          strategy="afterInteractive"
          onLoad={() => {
            if (window?.voiceflow?.chat) {
              window.voiceflow.chat.load({
                verify: { projectID: "68dea042360ab353c0717f93" },
                url: "https://general-runtime.voiceflow.com",
                versionID: "production",
                assistant: {
                  title: "United Holdings Assistant",
                  description: "How can we help you today?",
                  image: "/logo.png",
                },
                voice: {
                  url: "https://runtime-api.voiceflow.com"
                }
              });
            }
          }}
        />
      </body>
    </html>
  );
}