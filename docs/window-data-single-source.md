# Window 데이터 단일 관리 계획

## Context

현재 `Desktop.tsx`와 `StartMenu.tsx` 두 파일이 각각 `WINDOW_CONTENT_MAP`을 독립적으로 정의하고 있어 Single Source of Truth 원칙에 위배된다.

- `Desktop.tsx` — 8개 window content 포함
- `StartMenu.tsx` — 7개 window content 포함 (readme 누락)
- 버그: StartMenu에서 readme 메뉴 아이템이 렌더되지만 content가 `undefined`로 전달됨

**목표**: 하나의 데이터 소스(`constants/win95.ts`)에서 데스크톱 아이콘과 시작 메뉴 프로그램 목록이 모두 렌더되도록 리팩터링.

## 변경 파일 목록

1. `constants/win95.ts` — `Win95WindowConfigType`에 `content`, `showInStartMenu` 필드 추가
2. `components/desktop/Desktop.tsx` — 로컬 `WINDOW_CONTENT_MAP` 제거, `cfg.content` 사용
3. `components/desktop/StartMenu.tsx` — 로컬 `WINDOW_CONTENT_MAP` 제거, `showInStartMenu` 필터 적용

## 상태

- [x] 계획 저장
- [x] Step 1: `constants/win95.ts` 확장
- [x] Step 2: `components/desktop/Desktop.tsx` 수정
- [x] Step 3: `components/desktop/StartMenu.tsx` 수정
