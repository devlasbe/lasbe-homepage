# profile 상수 분리 작업 계획

## 목적
- `constants/portfolio.ts`에서 프로필 관련 상수를 `constants/profile.ts`로 분리
- GitHub 및 블로그 정보를 프로필 상수에 추가

## 작업 내용

### 1. `constants/profile.ts` 생성
- `profileData` (기존) — 기본 정보 (이름, 생년월일, 위치, 메일)
- `githubData` — username: "devlasbe", profileUrl
- `blogData` — label, url: "https://lasbe.tistory.com"

### 2. `constants/portfolio.ts` 수정
- `profileData` export 제거

### 3. import 경로 수정
- `components/windows/MyProfileWindow.tsx` — `@/constants/profile`로 변경
- `components/windows/MailWindow.tsx` — `@/constants/profile`로 변경
- `components/windows/GithubWindow.tsx` — GITHUB_USERNAME 하드코딩 제거, `githubData` import
