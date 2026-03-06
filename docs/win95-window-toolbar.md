# Win95 윈도우 툴바 교체

## 요약

각 윈도우 컨텐츠 컴포넌트의 클릭 불가 목업 메뉴바(`Win95MenuBar`)를 제거하고,
`Window.tsx` 컨테이너에 `Win95WindowToolbar`를 삽입하여 모든 윈도우에서
다른 윈도우를 바로 열 수 있는 아이콘 전용 툴바를 공통 적용.

## 변경 내역

| 파일 | 변경 유형 |
|------|----------|
| `components/ui/Win95WindowToolbar.tsx` | 생성 |
| `components/ui/Win95Button.tsx` | `active` prop 추가 |
| `components/ui/Win95MenuBar.tsx` | 삭제 |
| `components/desktop/Window.tsx` | 툴바 삽입 |
| `components/windows/GithubWindow.tsx` | 메뉴바 제거 |
| `components/windows/BlogWindow.tsx` | 메뉴바 제거 |
| `components/windows/ResumeWindow.tsx` | 메뉴바 제거 |
| `components/windows/OpenFranchiseWindow.tsx` | 메뉴바 제거 |

## 구조

```
┌─ [아이콘] 타이틀바 ──── [_][□][✕] ─┐
│ [📄][📝][✉][🐙][📝][📖][🌐][📘]   │  ← Win95WindowToolbar
│─────────────────────────────────────│
│              (win.content)           │
└─────────────────────────────────────┘
```

## Win95WindowToolbar 동작

- `WINDOW_CONFIGS`의 8개 윈도우 아이콘 버튼 렌더
- 현재 열려있는(minimized 제외) 윈도우는 `win95-sunken` 상태로 표시
- 버튼 클릭 시 `openWindow` 호출 (이미 열린 경우 포커스/복원)
- `title` 속성으로 hover tooltip 제공
