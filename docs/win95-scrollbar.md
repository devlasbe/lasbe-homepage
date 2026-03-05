# Win95 스크롤바 스타일링

## 목표
- 숨겨져 있던 스크롤바를 표시
- Win95 테마에 맞는 베벨 스타일 스크롤바 적용

## 변경 파일
- `app/globals.css`

## 작업 내용
1. `*::-webkit-scrollbar { display: none; }` 제거
2. Win95 스크롤바 CSS 추가
   - Track: `#c0c0c0` + `#ffffff` 체커보드 패턴
   - Thumb: raised bevel (win95-raised 스타일)
   - Button: raised bevel
   - Firefox용 `scrollbar-color` / `scrollbar-width` 폴백

## Win95 스크롤바 색상 규칙
- 배경(track): 체커보드 `#c0c0c0` / `#ffffff`
- 썸(thumb) + 버튼: `#c0c0c0` 배경, 위/좌 `#ffffff` 하이라이트, 아래/우 `#808080` 섀도
- active: 반전 (sunken 효과)
