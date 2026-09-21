import type { Metadata } from "next";
import { inter, jetbrainsMono, spaceGrotesk, yellowtail } from "./fonts";
import { personalInfo, siteUrl } from "@/lib/constants";
import Providers from "./providers";
import "./globals.css";

const SITE_URL = siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${personalInfo.name} | ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description:
    "Software Engineer specializing in AI/ML and backend systems, building production applications across LLMs, RAG, agentic workflows, and real-time APIs.",
  keywords: [
    "portfolio",
    "software engineer",
    "AI",
    "machine learning",
    "FastAPI",
    "Next.js",
    "Python",
    "TypeScript",
  ],
  authors: [{ name: personalInfo.name, url: SITE_URL }],
  creator: personalInfo.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.subtitle,
    type: "website",
    locale: "en_US",
    siteName: personalInfo.name,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.subtitle,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    google: "notranslate",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: personalInfo.name,
      url: SITE_URL,
      jobTitle: personalInfo.title,
      email: personalInfo.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: personalInfo.location,
      },
      sameAs: personalInfo.socials
        .filter((s) => !s.url.startsWith("mailto:"))
        .map((s) => s.url),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${personalInfo.name} — Portfolio`,
      description: personalInfo.subtitle,
      author: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${yellowtail.variable}`}>
      <head>
        <meta name="theme-color" content="#8154ff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#hero" className="skip-to-main">Skip to main content</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
