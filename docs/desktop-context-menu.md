# 데스크톱 우클릭 컨텍스트 메뉴

## Context
Win95 스타일 데스크톱에 우클릭 시 나타나는 컨텍스트 메뉴를 추가한다.
현재 StartMenu에 있는 "아이콘 정렬" 기능을 이 컨텍스트 메뉴로 이동시킨다.

## 수정 파일 목록
- `components/desktop/DesktopContextMenu.tsx` — 신규
- `components/desktop/Desktop.tsx` — onContextMenu 추가, DesktopContextMenu 렌더링
- `components/desktop/StartMenu.tsx` — 아이콘 정렬 버튼/divider 제거
