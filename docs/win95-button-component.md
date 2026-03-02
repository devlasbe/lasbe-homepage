# Win95Button 공통 컴포넌트 추출

## 목표
프로젝트 전반에 걸쳐 반복되는 `win95-raised bg-[#c0c0c0] px-N py-0.5 text-system-*` 패턴을
`components/ui/Win95Button.tsx` 공통 컴포넌트로 추출한다.

## 변경 파일 목록

### 1. `app/globals.css`
- `.win95-btn`에서 border 4줄 + `background: #c0c0c0` 제거 (순수 sizing 유틸리티로)
- `.win95-btn:active` 블록 전체 제거
- `button.win95-raised:active` 통합 :active 규칙 추가

### 2. `components/ui/Win95Button.tsx` (신규 생성)
- Props: `size?: "lg"|"md"|"sm"`, `weight?: "medium"|"bold"`, `className?`, `children`, `...ButtonHTMLAttributes`
- SIZE_CLASS: lg=`px-3 py-0.5 text-system-body`, md=`px-2 py-0.5 text-system-caption`, sm=`win95-btn`
- Base: `win95-raised bg-[#c0c0c0] cursor-pointer disabled:opacity-50`

### 3. 교체 대상
- `components/desktop/Window.tsx` — 최소화/최대화/닫기 버튼
- `components/desktop/BootScreen.tsx` — 타이틀바 장식 버튼 3개, 건너뛰기 버튼
- `components/ui/Win95AddressBar.tsx` — 이전/다음/새로고침/액션 버튼
- `components/windows/ProjectsWindow.tsx` — ◀/▶ 이미지 네비
- `components/windows/CareerWindow.tsx` — 프로젝트 토글 버튼
- `components/windows/MailWindow.tsx` — 보내기, B/I/U 서식 버튼
- `components/windows/GithubWindow.tsx` — 다시 시도 버튼
- `components/windows/GuestbookWindow.tsx` — 새로고침/등록/삭제/확인/취소 버튼
- `components/windows/ReadmeWindow.tsx` — 도구모음 버튼, 키 표시 버튼

### 4. 교체 제외 대상
- `Taskbar.tsx`, `StartMenu.tsx`, `Win95MenuBar.tsx` — 레이아웃 강결합
- `SystemWindow.tsx` 탭 버튼 — 복잡한 탭-보더 스타일, 단일 사용처
- `ProjectsWindow.tsx` 목록 선택 버튼 — 리스트 아이템 선택 UX
- `GithubWindow.tsx` "GitHub에서 열기" `<Link>` — Link 요소
- `Win95AddressBar.tsx` 액션 `<Link>` 분기 — Link 요소
