# components/desktop/ 폴더 생성 — OS 셸 컴포넌트 그룹화

## Context

현재 `components/`에 Win95 OS 셸 컴포넌트 8개(Desktop, Window, Taskbar, StartMenu, DesktopIcon, SystemTray, BootScreen, SpaceBackground)와 범용 컴포넌트 2개(Provider, Typing)가 혼재되어 있다. `components/windows/`, `components/ui/`처럼 역할 기반 폴더가 이미 있으므로, OS 셸 컴포넌트도 `components/desktop/`으로 묶어 구조를 일관성 있게 만든다.

## 이동 맵

| 현재 경로 | 변경 후 경로 |
|---|---|
| `components/Desktop.tsx` | `components/desktop/Desktop.tsx` |
| `components/Window.tsx` | `components/desktop/Window.tsx` |
| `components/DesktopIcon.tsx` | `components/desktop/DesktopIcon.tsx` |
| `components/Taskbar.tsx` | `components/desktop/Taskbar.tsx` |
| `components/StartMenu.tsx` | `components/desktop/StartMenu.tsx` |
| `components/SystemTray.tsx` | `components/desktop/SystemTray.tsx` |
| `components/BootScreen.tsx` | `components/desktop/BootScreen.tsx` |
| `components/SpaceBackground.tsx` | `components/desktop/SpaceBackground.tsx` |

**유지:** `components/Provider.tsx`, `components/Typing.tsx` (범용, win95 무관)

## Import 변경 목록

### `app/page.tsx`
```ts
// 변경 전
import Desktop from "@/components/Desktop";
// 변경 후
import Desktop from "@/components/desktop/Desktop";
```

### `components/desktop/Desktop.tsx` — 윈도우 컨텐츠 경로 업데이트
```ts
// 변경 전: ./windows/NotepadWindow 등 8개
// 변경 후: ../windows/NotepadWindow 등 8개
```
그 외 `./BootScreen`, `./DesktopIcon`, `./Window`, `./Taskbar`, `./SpaceBackground` → 동일 폴더 내이므로 **유지**

### `components/desktop/StartMenu.tsx` — 윈도우 컨텐츠 경로 업데이트
```ts
// 변경 전: ./windows/NotepadWindow 등 7개
// 변경 후: ../windows/NotepadWindow 등 7개
```

### 변경 불필요한 파일 (이동 후에도 동일)
| 파일 | 이유 |
|---|---|
| `Window.tsx` | `@/...` 절대 경로만 사용 |
| `Taskbar.tsx` | `./SystemTray`, `./StartMenu` → 같은 desktop/ 폴더 내 유효 |
| `DesktopIcon.tsx` | 컴포넌트 import 없음 |
| `SystemTray.tsx` | `@/...` 절대 경로만 사용 |
| `BootScreen.tsx` | 컴포넌트 import 없음 |
| `SpaceBackground.tsx` | 컴포넌트 import 없음 |

## 새로운 폴더 구조

```
components/
├── Provider.tsx         # 범용 — 그대로
├── Typing.tsx           # 범용 — 그대로
├── desktop/             # Win95 OS 셸 컴포넌트 (신규)
│   ├── Desktop.tsx
│   ├── Window.tsx
│   ├── DesktopIcon.tsx
│   ├── Taskbar.tsx
│   ├── StartMenu.tsx
│   ├── SystemTray.tsx
│   ├── BootScreen.tsx
│   └── SpaceBackground.tsx
├── windows/             # 윈도우 컨텐츠 컴포넌트 (기존)
└── ui/                  # 공유 UI 서브컴포넌트 (기존)
```

## 검증

- `pnpm build` 타입/import 오류 없이 통과 확인
- `pnpm dev` 후 브라우저에서 데스크탑 정상 렌더링, 윈도우 열기/닫기 동작 확인
