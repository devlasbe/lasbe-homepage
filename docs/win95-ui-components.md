# Win95 공통 UI 컴포넌트 분리 계획

## 작업 목적

win95 윈도우 컴포넌트들(NotepadWindow, IEWindow, ProjectsWindow, CareerWindow, ReadmeWindow, MailWindow)에서 동일한 마크업 구조가 중복 사용되고 있어, 공유 서브컴포넌트로 분리한다.

## 생성할 컴포넌트 (5개)

| 컴포넌트 | 사용처 |
|---|---|
| `Win95StatusBar` | NotepadWindow, IEWindow, ReadmeWindow, MailWindow |
| `Win95MenuBar` | NotepadWindow, IEWindow |
| `Win95TechBadgeList` | ProjectsWindow, CareerWindow |
| `Win95Section` | ReadmeWindow 내부 Section 승격 |
| `Win95DescriptionList` | ProjectsWindow, CareerWindow |

## 파일 구조

```
features/win95/components/
├── ui/
│   ├── index.ts
│   ├── Win95StatusBar.tsx
│   ├── Win95MenuBar.tsx
│   ├── Win95TechBadgeList.tsx
│   ├── Win95Section.tsx
│   └── Win95DescriptionList.tsx
└── windows/  (기존 파일 수정)
```

## 진행 상황

- [x] docs/win95-ui-components.md 생성
- [x] ui/ 컴포넌트 5개 생성
- [x] NotepadWindow 마이그레이션
- [x] IEWindow 마이그레이션
- [x] ReadmeWindow 마이그레이션
- [x] MailWindow 마이그레이션
- [x] ProjectsWindow 마이그레이션
- [x] CareerWindow 마이그레이션
- [x] CLAUDE.md 규칙 추가
