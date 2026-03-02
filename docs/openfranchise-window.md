# 오픈프차 Window 작업 계획

## 목표
오픈프차 서비스 소개 및 바로가기 링크를 제공하는 Win95 스타일 Window 컴포넌트 추가

## 작업 내용

### 1. `components/windows/OpenFranchiseWindow.tsx` 생성
- Win95 스타일 레이아웃 (MenuBar → Content → StatusBar)
- 소개글: `projectDataList`의 오픈프차 항목 `desc`, `subDesc` 활용
- 기술 스택: `Win95TechBadgeList` 컴포넌트 활용
- 바로가기 링크 버튼: 서비스 사이트, GitHub 두 가지

### 2. `constants/windowConfigs.tsx` 수정
- `OpenFranchiseWindow` import 추가
- `WINDOW_CONFIGS` 배열에 오픈프차 항목 추가
  - id: `"openfranchise"`
  - label: `"오픈프차.exe"`
  - icon: `Ie`
  - defaultSize: `{ width: 540, height: 500 }`

## 데이터 소스
- `constants/portfolio.ts` → `projectDataList[0]` (오픈프차)
  - `desc`: 서비스 소개글
  - `subDesc`: 주요 기능 목록
  - `stack`: 기술 스택
  - `link`: 서비스 URL (https://www.openfranchise.kr/)
  - `readme`: GitHub URL
