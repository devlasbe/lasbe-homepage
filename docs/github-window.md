# GitHub Window (프로필 카드) 작업 계획

## 목표
Win95 데스크톱에 GitHub 프로필 카드 스타일의 새 창을 추가한다.

## 구현 방법
- GitHub iframe 불가 (X-Frame-Options: DENY)
- GitHub REST API (public, 인증 불필요) 사용
  - `GET https://api.github.com/users/devlasbe` — 프로필
  - `GET https://api.github.com/users/devlasbe/repos?sort=pushed&per_page=6` — 최근 레포 6개

## 수정 파일
1. `features/win95/constants/index.ts` — github 설정 추가
2. `features/win95/components/windows/GithubWindow.tsx` — 신규 생성
3. `features/win95/components/Desktop.tsx` — WINDOW_CONTENT_MAP 추가
4. `features/win95/components/StartMenu.tsx` — WINDOW_CONTENT_MAP 추가

## 상태
- [x] 계획 문서 생성
- [x] constants 수정
- [x] GithubWindow.tsx 생성
- [x] Desktop.tsx 수정
- [x] StartMenu.tsx 수정

## Win95 스타일 통일 (2차 작업)

### 변경 내용
- 콘텐츠 영역 배경: `bg-[#0d1117] text-white` → `bg-[#c0c0c0]`
- 로딩 텍스트: `text-[#8b949e]` → `text-[#444]`
- 에러 상태: `⚠️` 이모지 → `Icon.Warning`, `text-[#f85149]` → `text-[#800000]`
- 프로필 섹션: GitHub 테두리 → `fieldset` + `legend` (win95-raised 패턴)
- 아바타: 기존 rounded-full border → `win95-raised` 래퍼 div
- 이름/유저명: Win95 팔레트 (`#000080`, `#444`)
- 통계: `flex gap` 텍스트 → `win95-sunken bg-white` 행 레이아웃
- 레포 카드: `border border-[#30363d] rounded` → `win95-raised p-2 active:win95-sunken`
- 레포명: `text-[#58a6ff]` → `text-[#000080]`
- 설명/메타: `text-[#8b949e]` → `text-[#444]`
- ⭐🍴 이모지 → `★` / `Forks` 텍스트 레이블
- 언어 폴백 색상: `#8b949e` → `#808080`
- Footer: `border-[#30363d]` → `border-t-2 border-[#808080]`, `Win95Button` 사용
- [x] 완료
