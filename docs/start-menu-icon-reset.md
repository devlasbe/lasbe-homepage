# StartMenu 변경 + 아이콘 배치 초기화

## 작업 목표

1. StartMenu에서 "GitHub 방문" 항목 제거
2. StartMenu에 "아이콘 배치 초기화" 기능 추가

## 변경 파일

- `hooks/useIconPositions.ts` — `resetPositions` 함수 추가 (localStorage 삭제 + 페이지 리로드)
- `components/desktop/StartMenu.tsx` — "GitHub 방문" 버튼 제거, "아이콘 배치 초기화" 버튼 추가

## 상세 설계

### useIconPositions.ts

`resetPositions` 함수 추가:
- `localStorage.removeItem(LS_KEY)` 호출
- `window.location.reload()` 호출 (Draggable이 uncontrolled이므로 리마운트 필요)

### StartMenu.tsx

- `handleShutdown` 함수 및 "GitHub 방문" 버튼 제거
- `useIconPositions()` 훅에서 `resetPositions` 가져오기
- Divider 아래에 "아이콘 배치 초기화" 버튼 추가 (🗂️ 아이콘)
