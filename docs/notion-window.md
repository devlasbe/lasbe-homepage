# react-notion-x 기반 NotionWindow 구현 계획

## Context

Notion `frame-ancestors` CSP 정책으로 iframe 임베드가 차단됨.
`react-notion-x` 라이브러리를 사용해 Notion 페이지를 네이티브 React 컴포넌트로 렌더링한다.

- **Notion 원본 URL**: `https://www.notion.so/devlasbe/2025-28699322f59d8060911ff907842cfffc`
- **Page ID**: `28699322f59d8060911ff907842cfffc`

### 동작 방식
1. Next.js API Route (서버)가 `notion-client`로 Notion 비공식 API 호출 → `recordMap` 반환
2. `NotionWindow` (클라이언트)가 `/api/notion`을 fetch → `NotionRenderer`로 렌더링
3. iframe 없이 Notion 블록을 직접 React 컴포넌트로 표시

---

## 수정/신규 파일

| 파일 | 작업 |
|------|------|
| `app/api/notion/route.ts` | **신규** — 서버사이드 Notion 페이지 fetch |
| `components/windows/NotionWindow.tsx` | iframe → NotionRenderer로 교체 |
| `app/layout.tsx` | `react-notion-x` CSS import 추가 |

---

## 패키지

```bash
pnpm add react-notion-x notion-client notion-types
```
