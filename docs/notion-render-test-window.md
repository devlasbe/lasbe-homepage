# Notion Render Test Window

## 목적

Notion 렌더러 테스트 페이지를 표시하는 Win95 윈도우 컴포넌트 추가

## 대상 페이지

- URL: `https://www.notion.so/devlasbe/Notion-Render-Test-Page-31b99322f59d803ea7acf61175e33b6b`
- Page ID: `31b99322f59d803ea7acf61175e33b6b`

## 작업 목록

1. `components/windows/NotionRenderTestWindow.tsx` 생성
2. `constants/windowConfigs.tsx`에 window config 추가

## 구현 방식

- `ResumeWindow`와 동일한 구조 (NotionViewer + Win95AddressBar + Win95StatusBar)
- `useResumeVisible` 같은 visibility 가드 없이 항상 렌더
- 아이콘: `Icon.Mspaint` (실험/테스트 목적)
