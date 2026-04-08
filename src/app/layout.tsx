import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";

import { TopLoader } from "@/components/motion";
import { env } from "@/lib/server";

import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const headlineFont = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-headline",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_URL),
  title: {
    default: "Vishnu N Raj | Full Stack Software Developer",
    template: "%s | Vishnu N Raj",
  },
  description:
    "Portfolio of Vishnu N Raj, a full stack software developer building scalable Next.js, Node.js, NestJS, realtime, streaming, and product systems.",
  applicationName: "Vishnu N Raj Portfolio",
  keywords: [
    "Vishnu N Raj",
    "Full Stack Developer",
    "Next.js developer",
    "Node.js developer",
    "NestJS developer",
    "Realtime systems engineer",
    "Streaming platform developer",
    "Portfolio",
  ],
  authors: [{ name: "Vishnu N Raj" }],
  creator: "Vishnu N Raj",
  publisher: "Vishnu N Raj",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vishnu N Raj | Full Stack Software Developer",
    description:
      "Scalable backend systems, high-performance frontends, realtime products, and production-ready delivery.",
    url: env.APP_URL,
    siteName: "Vishnu N Raj Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishnu N Raj | Full Stack Software Developer",
    description:
      "Full stack software developer focused on APIs, realtime systems, and production-ready product engineering.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vishnu N Raj",
    jobTitle: "Full Stack Software Developer",
    url: env.APP_URL,
    email: "mailto:vishnu8240.achu@gmail.com",
    sameAs: [
      "https://github.com/VishnuNRaj",
      "https://www.linkedin.com/in/vishnunjraj/",
    ],
    knowsAbout: [
      "Next.js",
      "Node.js",
      "NestJS",
      "Realtime systems",
      "WebRTC",
      "Streaming platforms",
      "API design",
    ],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${headlineFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <TopLoader />
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
