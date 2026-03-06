# 텍스트 컬러 토큰 중앙 관리

## 목표
프로젝트 전체에서 Tailwind arbitrary value로 하드코딩된 색상을 숫자 스케일 토큰으로 중앙화.

## 색상 토큰 (tailwind.config.ts)

```typescript
colors: {
  background: "var(--background)",
  foreground: "var(--foreground)",
  blue: {
    500: "#1084d0",  // 타이틀바 그라디언트 끝
    900: "#000080",  // 타이틀바, 강조, 링크
  },
  teal: {
    500: "#008080",  // 데스크톱 배경
  },
  gray: {
    200: "#d0d0d0",  // 경량 구분선 / 툴바 호버 (#d0ccc8 병합)
    300: "#c0c0c0",  // 기본 UI 배경 (silver)
    400: "#a8a4a0",  // 툴바 활성
    500: "#808080",  // 보더 / 구분선 / 비활성 (#7b7b7b 병합)
    700: "#444444",  // 바디 텍스트 (#444 + #555 + #222 병합)
  },
  green: {
    500: "#008000",  // 성공 상태
  },
  red: {
    500: "#ff0000",  // 오류 상태
    900: "#800000",  // 심각 오류
  },
}
```

## 치환 매핑

| 변경 전 | 변경 후 |
|---|---|
| `[#000080]` | `blue-900` |
| `[#1084d0]` | `blue-500` |
| `[#008080]` | `teal-500` |
| `[#d0d0d0]`, `[#d0ccc8]` | `gray-200` |
| `[#c0c0c0]` | `gray-300` |
| `[#a8a4a0]` | `gray-400` |
| `[#808080]`, `[#7b7b7b]` | `gray-500` |
| `[#444]`, `[#555]`, `[#222]` | `gray-700` |
| `[#008000]` | `green-500` |
| `[#ff0000]` | `red-500` |
| `[#800000]` | `red-900` |

## 상태
- [x] tailwind.config.ts
- [x] components/desktop/Window.tsx
- [x] components/desktop/BootScreen.tsx
- [x] components/desktop/StartMenu.tsx
- [x] components/desktop/Taskbar.tsx
- [x] components/desktop/SystemTray.tsx
- [x] components/desktop/DesktopIcon.tsx
- [x] components/desktop/DesktopContextMenu.tsx
- [x] components/ui/Win95WindowToolbar.tsx
- [x] components/ui/Win95Section.tsx
- [x] components/ui/Win95DescriptionList.tsx
- [x] components/ui/Win95AddressBar.tsx
- [x] components/ui/Win95StatusBar.tsx
- [x] components/ui/Win95TechBadgeList.tsx
- [x] components/ui/Win95Button.tsx
- [x] components/windows/MyProfileWindow.tsx
- [x] components/windows/ReadmeWindow.tsx
- [x] components/windows/GithubWindow.tsx
- [x] components/windows/GuestbookWindow.tsx
- [x] components/windows/MailWindow.tsx
- [x] components/windows/ResumeWindow.tsx
- [x] components/windows/OpenFranchiseWindow.tsx
- [x] components/windows/BlogWindow.tsx
- [x] components/NotionViewer.tsx
