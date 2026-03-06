# lasbe-homepage

장성우 프론트엔드 포트폴리오 홈페이지

## 기술 스택

| 분류            | 기술                                                             |
| --------------- | ---------------------------------------------------------------- |
| Framework       | Next.js 14 (App Router)                                          |
| Language        | TypeScript                                                       |
| Styling         | Tailwind CSS                                                     |
| Package Manager | pnpm (preinstall 훅으로 강제 적용)                               |
| Database        | Firebase Firestore (방문자 수 카운트)                            |
| Font            | 나눔고딕코딩 (Nanum Gothic Coding, next/font/google)             |
| UI Libraries    | @react95/icons, react-draggable, react-resizable, react-notion-x |

## 폴더 구조

```
lasbe-homepage/
├── app/                        # Next.js App Router
│   └── api/                    # Route Handlers (도메인별 폴더로 구성)
├── components/                 # 컴포넌트
│   ├── contexts/               # React Context
│   ├── desktop/                # Win95 OS 셸 컴포넌트
│   ├── windows/                # Window 컨텐츠 컴포넌트
│   └── ui/                     # 공유 Win95 UI 서브컴포넌트
├── constants/                  # 정적 상수 데이터
├── hooks/                      # 커스텀 훅
├── services/                   # 도메인 API wrapper
├── utils/                      # 범용 유틸리티
├── docs/                       # 작업 계획 문서
└── public/                     # 정적 에셋
```

## 환경 변수

Firebase 연동에 필요한 환경 변수 (`.env.local`):

```
NEXT_PUBLIC_FIREBASE_KEY
NEXT_PUBLIC_FIREBASE_PROJECT
NEXT_PUBLIC_FIREBASE_MESSAGING
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

## 작업 규칙

- **작업 전 계획 저장 필수**: 모든 작업을 시작하기 전에 반드시 `docs/` 폴더 아래에 작업 계획을 md 파일로 저장해야 한다. 해당 파일이 이미 존재한다면 새로 생성하지 않고 기존 파일을 수정한다.
- **반응형 디자인 필수**: 모든 UI 작업은 반드시 반응형 디자인을 고려해야 한다. Tailwind CSS의 반응형 접두사(`sm:`, `md:`, `lg:` 등)를 활용하여 모바일부터 데스크톱까지 모든 화면 크기에서 올바르게 표시되어야 한다.
- **Single Source of Truth**: 데이터와 상수는 단 한 곳에만 정의한다. 동일한 데이터를 여러 파일에 중복 정의하지 않는다. 컴포넌트에서 사용하는 정적 데이터(리스트, 설정 값 등)는 해당 도메인의 `constants/` 파일에 정의하고 import하여 사용한다.
- **파일 배치 원칙**: win95가 프로젝트 전체의 단일 도메인이므로 루트 폴더에 직접 배치한다.
  - `components/` — 범용 컴포넌트만
  - `components/desktop/` — Win95 OS 셸 컴포넌트
  - `components/windows/` — Window 컨텐츠 컴포넌트
  - `components/ui/` — 공유 Win95 UI 서브컴포넌트 (2개 이상 사용처 확인 후 추출)
  - `constants/` — 정적 상수 데이터
  - `hooks/` — 커스텀 훅 (범용 + Win95 훅 모두 포함)
  - `services/` — 도메인별 API wrapper. 내부 Next.js API와 외부 API 호출을 캡슐화. 직접 `fetch`를 사용한다.
  - `utils/` — 범용 유틸리티. 도메인에 종속되지 않는 순수 함수와 외부 SDK 초기화

## API / Service 흐름

```
app/api/[도메인]/route.ts          — Next.js Route Handler (HTTP 엔드포인트 정의)
app/api/[도메인]/[도메인].types.ts — 해당 도메인의 요청/응답 타입 (route.ts와 co-locate)
services/[도메인]Service.ts        — 클라이언트 API wrapper
```

- 타입 파일은 관련 `route.ts`와 같은 폴더에 위치한다
- `services/`는 내부 API(`/api/*`)와 외부 API 모두 캡슐화한다
- `services/`에서 직접 `fetch`를 사용한다

## 코드 컨벤션

- **Type 네이밍**: 타입명은 반드시 `Type` postfix를 붙인다.
  - `type ModalPropsType = { ... }`
  - `type UserInfoType = { ... }`

- **매직 넘버 금지**: 컴포넌트 내 하드코딩된 수치(색상, 크기, 비율, 속도 등)는 파일 상단의 상수 블록으로 추출한다. 상수명은 UPPER_SNAKE_CASE로 작성하고, 관련 상수끼리 주석으로 그룹화한다.

  ```ts
  // ── 카메라 ──
  const CAMERA_FOV = 60;
  const CAMERA_NEAR = 0.1;
  const CAMERA_FAR = 5000;
  ```

  파생 값은 기본 상수에서 계산한다 (`const NEAR_DOT_COUNT = Math.floor(NEAR_TOTAL * NEAR_DOT_RATIO)`).

- **디자인 토큰**: 폰트 크기와 색상은 `tailwind.config.ts`에 정의된 토큰을 사용한다. 필요한 토큰이 없으면 `tailwind.config.ts`에 먼저 정의한 후 사용한다.
  - Font Size: `theme.extend.fontSize` — `text-system-*` prefix (예: `text-system-body`, `text-system-heading`)
  - Color: `theme.extend.colors` — Tailwind 팔레트 스케일 방식 (예: `blue-900`, `gray-300`, `teal-500`)

## 공유 UI 서브컴포넌트 분리 원칙

도메인 내 여러 컴포넌트에서 동일한 마크업 구조가 반복될 때 `ui/` 폴더에 공유 서브컴포넌트로 분리한다.

### `ui/`에 배치하는 기준

- **2개 이상**의 컴포넌트에서 동일한 마크업 구조가 반복될 때
- 도메인 데이터에 의존하지 않는 순수 표현(props → JSX) 컴포넌트

### 상위 컴포넌트에 유지하는 기준

- 해당 컴포넌트에서만 1회 사용되는 복잡한 UI
- 로컬 `useState`를 직접 포함하는 인터랙티브 조각
- 특정 도메인 데이터 타입에 강하게 결합된 렌더링 로직

### 규칙

- `ui/` 컴포넌트는 `"use client"` 없는 순수 표현 컴포넌트로 유지한다. (이벤트/상태가 필요하면 핸들러를 props로 받기)
- 단일 사용처에서의 조기 추출 금지. 2개 이상 사용처 확인 후 추출한다.

## 개발 명령어

```bash
pnpm dev      # 개발 서버 실행
pnpm build    # 프로덕션 빌드
pnpm start    # 프로덕션 서버 실행
pnpm lint     # ESLint 검사
```
