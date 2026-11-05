import type { Metadata } from 'next'
import './globals.css'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'
import { Nanum_Gothic_Coding } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import Provider from '@/components/Provider'
import { SEO, SEO_OPEN_GRAPH_BASE, SEO_TWITTER_BASE } from '@/constants/seo'
import Desktop from '@/components/desktop/Desktop'

const nanumGothicCoding = Nanum_Gothic_Coding({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-main'
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SEO.AUTHOR_NAME,
  alternateName: 'lasbe',
  url: SEO.SITE_URL,
  image: SEO.OG_IMAGE_URL,
  jobTitle: 'Frontend Developer',
  sameAs: [SEO.GITHUB_URL]
}

export const metadata: Metadata = {
  metadataBase: new URL(SEO.SITE_URL),
  title: { default: SEO.SITE_TITLE, template: SEO.TITLE_TEMPLATE },
  description: SEO.SITE_DESCRIPTION,
  keywords: SEO.SITE_KEYWORDS,
  openGraph: {
    ...SEO_OPEN_GRAPH_BASE,
    title: SEO.SITE_TITLE,
    description: SEO.SITE_DESCRIPTION,
    url: SEO.SITE_URL
  },
  twitter: {
    ...SEO_TWITTER_BASE,
    title: SEO.SITE_TITLE,
    description: SEO.SITE_DESCRIPTION
  },
  verification: {
    google: SEO.GOOGLE_VERIFICATION,
    other: {
      'naver-site-verification': [SEO.NAVER_VERIFICATION]
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${nanumGothicCoding.variable} font-main antialiased overflow-x-hidden text-neutral-900`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Provider><Desktop />{children}</Provider>
      </body>
      <GoogleAnalytics gaId={SEO.GA_MEASUREMENT_ID} />
    </html>
  )
}
