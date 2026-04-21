import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://logicalminds.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Logical Minds — We ship products that scale.",
    template: "%s — Logical Minds",
  },
  description:
    "Product agency that partners with companies to build and ship technology products. A hybrid team of engineers, designers, and AI agents — based in Buenos Aires, serving LATAM & globally.",
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
    "product design",
    "software consulting",
    "Buenos Aires tech",
    "LATAM software",
    "intelligent automation",
    "MVP development",
    "MVP in 12 weeks",
    "staff augmentation Argentina",
    "QA testing",
    "product discovery",
    "startup MVP",
    "React development",
    "Node.js development",
    "cloud DevOps",
    "AI agents",
    "recruitment tech talent",
    "software outsourcing LATAM",
    "agencia de software Buenos Aires",
    "desarrollo de software Argentina",
    "diseño UX UI",
    "fábrica de software",
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
    title: "Logical Minds — We ship products that scale.",
    description:
      "Product agency that partners with companies to build and ship technology products. A hybrid team of engineers, designers, and AI agents — based in Buenos Aires.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Logical Minds — We ship products that scale.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logical Minds — We ship products that scale.",
    description:
      "Product agency that partners with companies to build and ship technology products. A hybrid team of engineers, designers, and AI agents.",
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
    "Product agency that partners with companies to build and ship technology products. A hybrid team of engineers, designers, and AI agents — based in Buenos Aires, Argentina.",
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
    "https://www.instagram.com/logicalminds.co/",
    "https://www.linkedin.com/company/logicalminds-co/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="min-h-screen bg-[#f8f9fc] text-gray-900 font-[family-name:var(--font-poppins)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
