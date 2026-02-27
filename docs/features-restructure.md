# Features 폴더 도입 및 프로젝트 전체 재배치

## Context

현재 프로젝트는 `components/`, `services/` 폴더에 글로벌 컴포넌트와 도메인 종속 컴포넌트가 혼재하고 있다.
`features/` 폴더를 도입해 도메인별로 components, types, constants, hooks를 명확하게 분리한다.

---

## 도메인 분류

### 글로벌 (이동 없음)
- `components/modal/` — 범용 모달 시스템
- `components/Provider.tsx` — 루트 Provider (import 경로만 수정)
- `components/Stack.tsx` — 재사용 UI 컴포넌트
- `components/Typing.tsx` — 재사용 애니메이션
- `utils/fetchService.ts`, `utils/date.ts`, `utils/firebase.ts`
- `app/` — Next.js App Router (변경 없음)

### 도메인 종속 → `features/`로 이동
- `components/aboutMeModal/*` → `features/about/`
- `components/main/*` → `features/home/`
- `components/SystemModal.tsx` → `features/view/`
- `services/view.tsx` → `features/view/`

---

## 새로운 구조

```
features/
├── about/
│   ├── components/
│   │   ├── AboutMeModal.tsx
│   │   ├── Layout.tsx
│   │   ├── Profile.tsx
│   │   ├── Project.tsx
│   │   └── Carrer.tsx
│   ├── constants/
│   │   └── index.ts
│   └── types.ts
│
├── home/
│   ├── components/
│   │   ├── CardContainer.tsx
│   │   └── icon/
│   │       ├── Icon.tsx
│   │       └── IconList.tsx
│   └── types.ts
│
└── view/
    ├── components/
    │   └── SystemModal.tsx
    └── hooks/
        └── useViewCount.ts
```

---

## import 경로 변경 요약

| 이동 대상 | 기존 경로 | 새 경로 |
|-----------|-----------|---------|
| AboutMeModal | `@/components/aboutMeModal/AboutMeModal` | `@/features/about/components/AboutMeModal` |
| CardContainer | `@/components/main/CardContainer` | `@/features/home/components/CardContainer` |
| IconList | `@/components/main/icon/IconList` | `@/features/home/components/icon/IconList` |
| SystemModal | `@/components/SystemModal` | `@/features/view/components/SystemModal` |
| useViewCount | `@/services/view` | `@/features/view/hooks/useViewCount` |

---

## 주의사항

- `iconDataList`는 `useMemo` 내부에서 `openModal`에 의존하고 JSX를 포함하므로 순수 상수가 아님 → `IconList.tsx` 컴포넌트 내에 유지
