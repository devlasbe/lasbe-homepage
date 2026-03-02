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
