# Jotai → React Context 마이그레이션

## 목표
jotai 의존성을 완전히 제거하고 React 기본 Context API로 대체한다.

## 변경 파일
| 파일 | 변경 내용 |
|------|----------|
| `atoms/window.ts` | 삭제 (타입 → `contexts/modalContext.tsx`로 이동) |
| `contexts/modalContext.tsx` | 신규 생성 |
| `contexts/startMenuContext.tsx` | 신규 생성 |
| `components/Provider.tsx` | `JotaiProvider` → `ModalProvider + StartMenuProvider` |
| `hooks/useWindowManager.ts` | `useAtom(windowsAtom)` → `useModalContext()` |
| `components/desktop/Desktop.tsx` | `useAtom(isBootCompleteAtom)` → 로컬 `useState` |
| `components/desktop/Window.tsx` | `useAtomValue(windowsAtom)` → `useModalContext()` |
| `components/desktop/StartMenu.tsx` | `useAtom(isStartMenuOpenAtom)` → `useStartMenuContext()` |
| `components/desktop/Taskbar.tsx` | `useAtom(isStartMenuOpenAtom)` → `useStartMenuContext()` |
| `package.json` | jotai 제거 |

## Context 분리 이유
- `ModalContext`: modals 상태 (고빈도 변경 - 드래그/리사이즈)
- `StartMenuContext`: isStartMenuOpen (저빈도 변경)
- `isBootComplete`: Desktop.tsx 로컬 state (1회성)
