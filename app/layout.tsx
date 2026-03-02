import type { Metadata } from "next";
import "./globals.css";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import { Nanum_Gothic_Coding } from "next/font/google";
import Provider from "@/components/Provider";

const nanumGothicCoding = Nanum_Gothic_Coding({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: "장성우 포트폴리오 - 프론트엔드",
  description: "프론트엔드 개발자 장성우 포트폴리오",
  keywords: "프론트엔드, frontend, 개발자, 포트폴리오",
  openGraph: {
    title: "장성우 포트폴리오 - 프론트엔드",
    description: "프론트엔드 개발자 장성우 포트폴리오",
    siteName: "장성우 포트폴리오 - 프론트엔드",
    locale: "ko_KR",
    type: "website",
    url: "https://lasbe.kr",
  },
  verification: {
    google: "V-Js1CpUphzCpgx5C1w-VJvL0m2f4hAkTCZFgGNQxro",
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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
