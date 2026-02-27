# 파일 배치 재정비 계획

## 목적

CLAUDE.md 파일 배치 원칙에 따라, 특정 도메인에서만 사용되는 파일들을 `features/<domain>/` 내부로 이동한다.

## 규칙 (CLAUDE.md)

> components, hooks, utils, constants, types는 여러 도메인에서 공통으로 사용되는 경우에만 루트에 배치.
> 특정 도메인에서만 사용되는 경우 반드시 `features/<domain>/` 내부에 배치.

## 이동 대상

### features/win95/

| 현재 경로 | 새 경로 | 이유 |
|---|---|---|
| `components/win95/**` | `features/win95/components/**` | Win95 도메인 전용 |
| `store/windowStore.ts` | `features/win95/store/windowStore.ts` | Win95 window 상태 전용 |

### features/view/

| 현재 경로 | 새 경로 | 이유 |
|---|---|---|
| `services/firebase.ts` | `features/view/services/firebase.ts` | view API route에서만 사용 |
| `services/fetchService.ts` | `features/view/services/fetchService.ts` | useViewCount에서만 사용 |
| `utils/date.ts` | `features/view/utils/date.ts` | view hook/API에서만 사용 |

## 유지 대상 (공통)

| 파일 | 이유 |
|---|---|
| `components/Provider.tsx` | 앱 루트 레벨 전역 Provider |
| `components/Typing.tsx` | 재사용 가능한 일반 컴포넌트 |

## import 업데이트 대상

- `app/page.tsx`
- `app/api/view/increment/route.ts`
- `app/api/view/today/route.ts`
- `app/api/view/total/route.ts`
- `features/view/hooks/useViewCount.ts`
- `features/win95/components/Desktop.tsx` (windowStore 경로)
- `features/win95/components/Window.tsx`
- `features/win95/components/Taskbar.tsx`
- `features/win95/components/StartMenu.tsx`

## 완료 후 폴더 구조

```
features/
├── about/
│   └── constants/index.ts
├── view/
│   ├── hooks/useViewCount.ts
│   ├── services/
│   │   ├── firebase.ts
│   │   └── fetchService.ts
│   └── utils/date.ts
└── win95/
    ├── components/
    │   ├── Desktop.tsx
    │   ├── DesktopIcon.tsx
    │   ├── Window.tsx
    │   ├── Taskbar.tsx
    │   ├── StartMenu.tsx
    │   ├── SystemTray.tsx
    │   └── windows/
    │       ├── NotepadWindow.tsx
    │       ├── ProjectsWindow.tsx
    │       ├── CareerWindow.tsx
    │       ├── SystemWindow.tsx
    │       ├── MailWindow.tsx
    │       └── IEWindow.tsx
    └── store/windowStore.ts
```
