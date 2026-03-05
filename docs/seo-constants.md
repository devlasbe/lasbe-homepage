# SEO 문자열 상수 분리

## Context
`app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` 세 파일에 SEO 관련 문자열이 하드코딩되어 있다.
동일한 URL(`https://lasbe.kr`)이 여러 파일에 중복되고, title/description도 layout.tsx 내에서 반복된다.
Single Source of Truth 원칙에 따라 `constants/seo.ts`로 분리한다.

## 대상 파일

- `constants/seo.ts` — 새로 생성
- `app/layout.tsx` — 상수 import로 교체
- `app/robots.ts` — 상수 import로 교체
- `app/sitemap.ts` — 상수 import로 교체

## 완료
- [x] `constants/seo.ts` 생성
- [x] `app/layout.tsx` 업데이트
- [x] `app/robots.ts` 업데이트
- [x] `app/sitemap.ts` 업데이트
