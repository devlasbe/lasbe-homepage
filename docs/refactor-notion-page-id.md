# Notion Page ID 파싱 리팩토링

## 배경

현재 각 Window 컴포넌트에 `NOTION_PAGE_ID`와 `NOTION_DIRECT_URL`이 하드코딩되어 있다.
노션 전체 링크만 제공하면 page ID를 자동 파싱하여 관리할 수 있도록 리팩토링한다.

## 변경 사항

### 1. Notion URL 파싱 유틸리티 생성 (`utils/notionUrl.ts`)

- `parseNotionPageId(url: string): string` — 노션 URL에서 page ID 추출
- 지원 형식:
  - `https://www.notion.so/workspace/Page-Title-{32자 hex}`
  - `https://notion.so/{32자 hex}`
  - `{32자 hex}` (ID만 전달 시)
  - `{8-4-4-4-12 UUID}` (하이픈 포함 UUID)

### 2. Notion 페이지 상수 중앙화 (`constants/notionPages.ts`)

- 각 페이지의 노션 전체 URL만 정의
- page ID는 `parseNotionPageId`로 파싱하여 export

### 3. NotionViewer 컴포넌트 리팩토링

- `pageId` + `directUrl` props → `notionUrl` 단일 prop으로 변경
- 내부에서 URL 파싱하여 page ID 추출

### 4. Window 컴포넌트 리팩토링

- `ResumeWindow`, `NotionRenderTestWindow`에서 하드코딩된 상수 제거
- `constants/notionPages.ts`에서 import하여 사용

## 영향 범위

- `utils/notionUrl.ts` (신규)
- `constants/notionPages.ts` (신규)
- `components/NotionViewer.tsx` (수정)
- `components/windows/ResumeWindow.tsx` (수정)
- `components/windows/NotionRenderTestWindow.tsx` (수정)
