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
        url: `${siteUrl}/logo.png`,
        width: 800,
        height: 600,
        alt: "United Holdings Logo",
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
    images: [`${siteUrl}/logo.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <head>
        {/* ✅ Inject Schema.org JSON-LD */}
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrgSite),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-outfit antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}