import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://logicalminds.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Logical Minds — Award-Winning AI-First Software Factory | Buenos Aires & LATAM",
    template: "%s — Logical Minds",
  },
  description:
    "Award-winning AI-first software factory based in Buenos Aires, serving LATAM & globally. We craft intelligent digital products — from product discovery & UX/UI design to full-stack development, cloud infrastructure, and AI integration. Recognized for design excellence.",
  keywords: [
    "software factory Buenos Aires",
    "AI software development",
    "product development LATAM",
    "UX UI design Argentina",
    "AI-first development",
    "digital product studio",
    "software factory Argentina",
    "full-stack development",
    "AI integration",
    "machine learning",
    "cloud infrastructure",
    "award-winning software",
    "Awwwards",
    "product design",
    "software consulting",
    "Buenos Aires tech",
    "LATAM software",
    "intelligent automation",
  ],
  authors: [{ name: "Logical Minds", url: siteUrl }],
  creator: "Logical Minds",
  publisher: "Logical Minds",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_AR",
    url: siteUrl,
    siteName: "Logical Minds",
    title: "Logical Minds — Award-Winning AI-First Software Factory",
    description:
      "Award-winning AI-first software factory based in Buenos Aires. Product discovery, UX/UI design, full-stack development, and AI integration for companies worldwide.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Logical Minds — AI-First Software Factory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logical Minds — Award-Winning AI-First Software Factory",
    description:
      "Award-winning AI-first software factory from Buenos Aires. We build intelligent digital products for companies across LATAM & globally.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Logical Minds",
  url: siteUrl,
  logo: `${siteUrl}/logo-logical-minds.svg`,
  description:
    "Award-winning AI-first software factory based in Buenos Aires, Argentina. Specializing in product discovery, UX/UI design, full-stack development, cloud infrastructure, and AI integration.",
  foundingLocation: {
    "@type": "Place",
    name: "Buenos Aires, Argentina",
  },
  areaServed: ["Latin America", "United States", "Global"],
  knowsAbout: [
    "Artificial Intelligence",
    "Software Development",
    "Product Design",
    "UX/UI Design",
    "Cloud Infrastructure",
    "Machine Learning",
    "Full-Stack Development",
  ],
  sameAs: [
    "https://linkedin.com/company/logicalminds",
    "https://github.com/logicalminds",
    "https://twitter.com/logicalminds",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="min-h-screen bg-[#0a0a0f] text-white font-[family-name:var(--font-poppins)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
