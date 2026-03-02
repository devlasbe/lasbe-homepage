# GitHub 이모지 → react95 아이콘 통일

## 목표
🐙 문어 이모지를 포함한 favoritesData 이모지 아이콘을 모두 react95 아이콘 컴포넌트로 교체

## 변경 대상

### 1. `constants/portfolio.ts`
- `FavoriteType.icon: string` → `icon: ComponentType<SVGProps<SVGSVGElement>>`
- 각 항목 icon 매핑:
  - GitHub → `Explorer100`
  - 블로그 → `Write1`
  - 오픈프차 → `Ie`
  - 안성재 GPT → `QuestionBubble`

### 2. `components/windows/IEWindow.tsx`
- `{fav.icon}` 렌더링을 `<Icon />` 방식으로 변경

### 3. `components/windows/GithubWindow.tsx`
- 로딩 스피너 🐙 → `<Explorer100 />`
- 하단 링크 버튼 "🐙 GitHub에서 열기" → `<Explorer100 /> GitHub에서 열기`
- 상태바 "🐙 GitHub" → `<Explorer100 /> GitHub`
