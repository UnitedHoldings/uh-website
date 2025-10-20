import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

// Site constants
const siteName = "United Holdings";
const siteUrl = "https://www.unitedholdings.co.sz";

// Schema.org structured data
const schemaOrgSite = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    "https://www.facebook.com/unitedholdings",
    "https://www.linkedin.com/company/unitedholdings",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+26878088050",
    contactType: "customer service",
    areaServed: "SZ",
    availableLanguage: "en",
  },
};

// Fonts
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

// ✅ Metadata API
export const metadata = {
  title: {
    template: "%s | United Holdings",
    default: "United Holdings | Insurance & Financial Solutions",
  },
  description:
    "United Holdings provides trusted insurance and financial solutions tailored for Eswatini and Southern Africa. Get quotes, manage policies, and connect with our team.",
  keywords: [
    "United Holdings",
    "Insurance Eswatini",
    "Financial Services",
    "Life Cover",
    "Car Insurance",
    "Business Insurance",
    "Fintech Eswatini",
  ],
  authors: [{ name: "United Holdings", url: siteUrl }],
  creator: "Unbounded Creative Agency",
  publisher: "United Holdings",
  openGraph: {
    title: "United Holdings | Insurance & Financial Solutions",
    description:
      "Trusted insurance and financial services for individuals and businesses in Eswatini.",
    url: siteUrl,
    siteName: "United Holdings",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "United Holdings - Insurance & Financial Solutions",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@UnitedHoldings",
    title: "United Holdings | Insurance & Financial Solutions",
    description:
      "Trusted insurance and financial services for individuals and businesses in Eswatini.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* ✅ Preload critical resources */}
        <link rel="preconnect" href="https://cdn.voiceflow.com" />
        
        {/* ✅ Inject Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrgSite),
          }}
        />

        {/* ✅ Voiceflow Chatbot Styles - Moved to head as regular style tag */}
        <style>
          {`
            .vf-widget-container {
              z-index: 9999 !important;
            }
            
            .vf-chat-launcher {
              bottom: 100px !important;
              right: 24px !important;
              background-color: #9b1c20 !important;
              border: 2px solid white !important;
              box-shadow: 0 4px 12px rgba(155, 28, 32, 0.3) !important;
            }
            
            .vf-chat-launcher:hover {
              background-color: #7a1619 !important;
              transform: scale(1.05) !important;
            }
            
            @media (max-width: 768px) {
              .vf-chat-launcher {
                bottom: 90px !important;
                right: 16px !important;
              }
            }
          `}
        </style>
      </head>
      <body className={`font-outfit antialiased relative bg-white text-gray-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />

        {/* ✅ WhatsApp Floating Widget */}
        <a
          href="https://wa.me/26878088050"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed left-6 bottom-6 z-40 flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.793-2.236C13.416 27.168 15.615 28 18 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-2.09 0-4.09-.646-5.75-1.75l-.41-.26-4.59 1.32 1.32-4.59-.26-.41C5.646 19.09 5 17.09 5 15c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm5.29-7.71c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.67.85-.82 1.02-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.07-1.28-.76-.68-1.27-1.52-1.42-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.51-.43-.44-.58-.45-.15-.01-.32-.01-.5-.01-.17 0-.45.06-.68.28-.23.22-.9.88-.9 2.15s.92 2.49 1.05 2.66c.13.17 1.81 2.77 4.39 3.77.61.21 1.09.33 1.46.42.61.13 1.16.11 1.6.07.49-.05 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.11-.24-.17-.5-.3z" />
          </svg>
          <span className="font-semibold text-white text-sm whitespace-nowrap hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Chat with us
          </span>
        </a>

        {/* ✅ Voiceflow Chatbot */}
        <Script
          id="voiceflow-chatbot"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, t) {
                var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
                v.onload = function() {
                  if (window.voiceflow && window.voiceflow.chat) {
                    window.voiceflow.chat.load({
                      verify: { projectID: "68dea042360ab353c0717f93" },
                      url: "https://general-runtime.voiceflow.com",
                      versionID: "production",
                      assistant: {
                        title: "United Holdings Assistant",
                        description: "How can we help you today?",
                        image: "${siteUrl}/logo.png",
                        launcher: "icon",
                        color: "#9b1c20",
                      },
                      voice: {
                        url: "https://runtime-api.voiceflow.com",
                      },
                      styles: {
                        button: { 
                          icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>'
                        }
                      }
                    });
                  }
                };
                v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
                v.type = "text/javascript";
                s.parentNode.insertBefore(v, s);
              })(document, 'script');
            `,
          }}
        />
      </body>
    </html>
  );
}