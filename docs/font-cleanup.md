# Font Cleanup: 나눔고딕코딩 단일 폰트로 통합

## Context
VT323, Noto Sans KR, Archivo Black, Press Start 2P 4개 폰트를 전부 제거하고, 한국어·영문·숫자를 모두 지원하는 **나눔고딕코딩** 하나만 남겨 전역 기본 폰트로 설정한다.

## 변경 파일 목록 (21개)

### 설정 파일 (2개)
- `app/layout.tsx` — 4개 폰트 → Nanum_Gothic_Coding 단일 폰트
- `tailwind.config.ts` — fontFamily: noto/archivo/vt323/press-start → main

### 컴포넌트 — font 클래스명 제거 (19개)
- `components/Typing.tsx` — `font-archivo` 제거
- `components/desktop/BootScreen.tsx` — `font-vt323` 8곳 제거
- `components/desktop/DesktopIcon.tsx` — `font-vt323` 제거
- `components/desktop/Window.tsx` — `font-vt323` 제거
- `components/desktop/Taskbar.tsx` — `font-vt323` 4곳 제거
- `components/desktop/StartMenu.tsx` — `font-vt323` 3곳 제거
- `components/desktop/SystemTray.tsx` — `font-vt323` 제거
- `components/windows/MailWindow.tsx` — `font-vt323` 5곳 제거
- `components/windows/GuestbookWindow.tsx` — `font-vt323` 5곳 제거
- `components/windows/ResumeWindow.tsx` — `font-vt323` 3곳 제거
- `components/windows/ReadmeWindow.tsx` — `font-vt323` 제거
- `components/windows/SystemWindow.tsx` — `font-vt323` 제거
- `components/windows/BlogWindow.tsx` — `font-vt323` 제거
- `components/windows/GithubWindow.tsx` — `font-vt323` 제거
- `components/windows/ProjectsWindow.tsx` — `font-vt323` 제거
- `components/windows/IEWindow.tsx` — `font-vt323` 제거
- `components/windows/OpenFranchiseWindow.tsx` — `font-vt323` 제거
- `components/windows/SettingsWindow.tsx` — `font-vt323` 제거
- `components/windows/NotepadWindow.tsx` — `font-vt323` 2곳 제거
- `components/windows/CareerWindow.tsx` — `font-vt323` 제거

## 상태
- [ ] app/layout.tsx
- [ ] tailwind.config.ts
- [ ] 컴포넌트 font 클래스 제거 (19개)
