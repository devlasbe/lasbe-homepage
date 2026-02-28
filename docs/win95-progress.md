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

## Phase 3 — 모바일 대응 ← 완료
- [x] hooks/useBreakpoint.ts — isMobile(<768), isTablet(768~1023)
- [x] windowStore: 모바일 브레이크포인트 768 적용, 태블릿 85% 초기 크기
- [x] Desktop: 모바일 flex-wrap 중앙 그리드 / md+ 좌측 컬럼
- [x] DesktopIcon: onTouchEnd → 단일 탭으로 바로 열기
- [x] Window: 모바일 최소화·최대화 버튼 숨김, 태블릿 리사이즈 비활성화
- [x] Taskbar: 모바일 하단 네비게이션 (← 뒤로 버튼 + 활성 윈도우 제목)
- [x] StartMenu: touchstart 외부 클릭 닫기, 모바일 터치 타겟 확대

## SSOT 정리 ← 완료
- [x] CLAUDE.md에 Single Source of Truth 규칙 추가
- [x] `features/win95/constants/index.ts` 신규 생성 — WIN95_WINDOW_CONFIGS (id, label, icon, title, defaultSize)
- [x] `features/about/constants/index.ts`에 skillsData, favoritesData 추가
- [x] Desktop.tsx — DESKTOP_ICONS 제거, WIN95_WINDOW_CONFIGS + WINDOW_CONTENT_MAP 패턴으로 교체
- [x] StartMenu.tsx — MENU_ITEMS 제거, WIN95_WINDOW_CONFIGS 사용 + content:null 버그 수정
- [x] SystemWindow.tsx — 인라인 SKILLS 상수 제거, skillsData import
- [x] IEWindow.tsx — 인라인 FAVORITES 상수 제거, favoritesData import
- [x] NotepadWindow.tsx — 하드코딩 텍스트 제거, profileDataList + favoritesData 동적 구성
- [x] MailWindow.tsx — 하드코딩 이메일 제거, profileDataList에서 추출

## Phase 4 — 부팅 시퀀스 & 폴리시
- [ ] BIOS → Windows 로딩 → 바탕화면 진입
- [ ] 성능 최적화 & 접근성
