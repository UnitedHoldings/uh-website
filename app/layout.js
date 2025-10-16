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
      <body className={`${outfit.variable} font-outfit  antialiased relative`}>
        <Header />
        {children}

        <Footer />

        {/* WhatsApp Floating Widget */}
        <a
          href="https://wa.me/26878088050"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed left-6 bottom-6 z-50 flex text-sm items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-full -lg transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.793-2.236C13.416 27.168 15.615 28 18 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-2.09 0-4.09-.646-5.75-1.75l-.41-.26-4.59 1.32 1.32-4.59-.26-.41C5.646 19.09 5 17.09 5 15c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm5.29-7.71c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.67.85-.82 1.02-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.07-1.28-.76-.68-1.27-1.52-1.42-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.51-.43-.44-.58-.45-.15-.01-.32-.01-.5-.01-.17 0-.45.06-.68.28-.23.22-.9.88-.9 2.15s.92 2.49 1.05 2.66c.13.17 1.81 2.77 4.39 3.77.61.21 1.09.33 1.46.42.61.13 1.16.11 1.6.07.49-.05 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.11-.24-.17-.5-.3z"/>
          </svg>
          <span className="font-semibold hidden sm:inline">Chat on WhatsApp</span>
        </a>

        {/* Voiceflow Chatbot */}
        <style>{`
          .vf-widget-container, .vf-widget-container * {
            font-size: 1.5em !important;
          }
          .vf-widget-container {
            transform: scale(2.5);
            transform-origin: bottom right;
            z-index: 9999 !important;
          }
        `}</style>
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