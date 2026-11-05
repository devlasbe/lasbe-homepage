const SITE_URL = "https://lasbe.kr";

export const SEO = {
  SITE_URL,
  TITLE_TEMPLATE: "%s | 장성우 포트폴리오",
  SITE_TITLE: "장성우 - 프론트엔드 개발자 포트폴리오",
  SITE_DESCRIPTION: "프론트엔드 개발자 장성우(lasbe) 포트폴리오",
  SITE_KEYWORDS: "프론트엔드, frontend, 개발자, 포트폴리오",
  SITE_LOCALE: "ko_KR",
  GOOGLE_VERIFICATION: "V-Js1CpUphzCpgx5C1w-VJvL0m2f4hAkTCZFgGNQxro",
  GA_MEASUREMENT_ID: "G-44WTGLNWZJ",
  NAVER_VERIFICATION: "7b30b3889eed5b950eb1b64e6eedac3e6fcde8d3",
  SITEMAP_URL: `${SITE_URL}/sitemap.xml`,
  OG_IMAGE_URL: `${SITE_URL}/lasbe_character.jpg`,
  AUTHOR_NAME: "장성우",
  GITHUB_URL: "https://github.com/devlasbe",
};

// ── 공유 메타데이터 ──
const OG_IMAGE_SIZE = 808;

export const SEO_OPEN_GRAPH_BASE = {
  siteName: SEO.SITE_TITLE,
  locale: SEO.SITE_LOCALE,
  type: "website" as const,
  images: [{ url: SEO.OG_IMAGE_URL, width: OG_IMAGE_SIZE, height: OG_IMAGE_SIZE, alt: SEO.SITE_TITLE }],
};

export const SEO_TWITTER_BASE = {
  card: "summary" as const,
  images: [SEO.OG_IMAGE_URL],
};
