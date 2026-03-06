import type { Metadata } from "next";
import "./globals.css";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import { Nanum_Gothic_Coding } from "next/font/google";
import Provider from "@/components/Provider";
import { SEO } from "@/constants/seo";

const nanumGothicCoding = Nanum_Gothic_Coding({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-main",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SEO.AUTHOR_NAME,
  alternateName: "lasbe",
  url: SEO.SITE_URL,
  image: SEO.OG_IMAGE_URL,
  jobTitle: "Frontend Developer",
  sameAs: [SEO.GITHUB_URL],
};

export const metadata: Metadata = {
  title: SEO.SITE_TITLE,
  description: SEO.SITE_DESCRIPTION,
  keywords: SEO.SITE_KEYWORDS,
  alternates: { canonical: SEO.SITE_URL },
  openGraph: {
    title: SEO.SITE_TITLE,
    description: SEO.SITE_DESCRIPTION,
    siteName: SEO.SITE_TITLE,
    locale: SEO.SITE_LOCALE,
    type: "website",
    url: SEO.SITE_URL,
    images: [{ url: SEO.OG_IMAGE_URL, width: 808, height: 808, alt: SEO.SITE_TITLE }],
  },
  twitter: {
    card: "summary",
    title: SEO.SITE_TITLE,
    description: SEO.SITE_DESCRIPTION,
    images: [SEO.OG_IMAGE_URL],
  },
  verification: {
    google: SEO.GOOGLE_VERIFICATION,
    other: {
      "naver-site-verification": [SEO.NAVER_VERIFICATION],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nanumGothicCoding.variable} font-main antialiased overflow-x-hidden text-neutral-900`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
