# Win95 리디자인 전체 작업 기록

## Phase 1 — 코어 시스템 ← 완료
- [x] 의존성 설치 (jotai, react-draggable, react-resizable)
- [x] Jotai 윈도우 스토어 (store/windowStore.ts)
- [x] Win95 Window 컴포넌트 (components/win95/Window.tsx)
- [x] Desktop + DesktopIcon (components/win95/Desktop.tsx, DesktopIcon.tsx)
- [x] Taskbar + StartMenu + SystemTray
- [x] 폰트/스타일 설정 (VT323, Press Start 2P, win95 CSS 변수)

## Phase 2 — 콘텐츠 윈도우 ← 완료
- [x] 자기소개.txt — NotepadWindow.tsx (메모장 UI, profileDataList 데이터)
- [x] 내 프로젝트 — ProjectsWindow.tsx (파일탐색기 2패널, 이미지 뷰어 포함)
- [x] 내 경력 — CareerWindow.tsx (아코디언 프로젝트 목록)
- [x] 기술스택.exe — SystemWindow.tsx (탭별 스킬 프로그레스바)
- [x] 메일 보내기 — MailWindow.tsx (Outlook Express 스타일, mailto:)
- [x] 인터넷 — IEWindow.tsx (IE 스타일, 즐겨찾기 링크 목록)

## Phase 3 — 모바일 대응
- [ ] 브레이크포인트별 레이아웃 전환
- [ ] 터치 인터랙션 최적화
- [ ] 하단 네비게이션 바

## Phase 4 — 부팅 시퀀스 & 폴리시
- [ ] BIOS → Windows 로딩 → 바탕화면 진입
- [ ] 성능 최적화 & 접근성
