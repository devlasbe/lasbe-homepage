# lasbe-homepage

장성우 프론트엔드 포트폴리오 홈페이지

## 기술 스택

| 분류            | 기술                                                               |
| --------------- | ------------------------------------------------------------------ |
| Framework       | Next.js 14 (App Router)                                            |
| Language        | TypeScript                                                         |
| Styling         | Tailwind CSS                                                       |
| Package Manager | pnpm (preinstall 훅으로 강제 적용)                                 |
| Database        | Firebase Firestore (방문자 수 카운트)                              |
| Font            | Noto Sans KR, Archivo Black (Google Fonts)                         |
| UI Libraries    | @lasbe/react-card-animation, @lasbe/react-scroll-animation, Swiper |

## 폴더 구조

```
lasbe-homepage/
├── app/                        # Next.js App Router
├── components/                 # 공통 React 컴포넌트
├── hooks/                      # 여러 도메인에서 공유하는 커스텀 훅
├── features/                   # 도메인별 components, hooks, utils, constants, types를 nested 하게 배치
├── store/                      # 전역 상태 (jotai atoms)
├── services/                   # 외부 서비스 연동
├── utils/                      # 유틸리티 함수
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
- **파일 배치 원칙**: 파일을 배치할 위치는 "현재 사용처"가 아니라 "기능의 성격"으로 판단한다.
  - **루트 배치** (`components/`, `utils/`, `services/` 등): 기능 자체가 도메인에 종속되지 않는 범용 코드. 예) HTTP 클라이언트, DB 연결 설정, 날짜 유틸, 공통 UI 컴포넌트
  - **features 배치** (`features/<domain>/`): 특정 도메인의 비즈니스 로직에 직접 속하는 코드. 예) 특정 화면의 컴포넌트/훅/상수/타입
  - 판단 기준: "이 코드를 다른 도메인에서도 그대로 쓸 수 있는가?" → 그렇다면 루트, 아니라면 features

## 코드 컨벤션

- **Type 네이밍**: 타입명은 반드시 `Type` postfix를 붙인다.
  - `type ModalPropsType = { ... }`
  - `type UserInfoType = { ... }`

- **매직 넘버 금지**: 컴포넌트 내 하드코딩된 수치(색상, 크기, 비율, 속도 등)는 파일 상단의 상수 블록으로 추출한다. 상수명은 UPPER_SNAKE_CASE로 작성하고, 관련 상수끼리 주석으로 그룹화한다.
  ```ts
  // ── 카메라 ──
  const CAMERA_FOV  = 60;
  const CAMERA_NEAR = 0.1;
  const CAMERA_FAR  = 5000;
  ```
  파생 값은 기본 상수에서 계산한다 (`const NEAR_DOT_COUNT = Math.floor(NEAR_TOTAL * NEAR_DOT_RATIO)`).

- **Font Size 토큰**: 커스텀 폰트 크기는 `text-system-*` prefix를 사용한다. (`tailwind.config.ts` `theme.extend.fontSize`에 정의)
  - OS Chrome (반응형): `text-system-ui`, `text-system-ui-md`, `text-system-ui-lg`, `text-system-desktop-icon` — desktop 기본값은 tailwind.config.ts에, 모바일 오버라이드는 `app/globals.css` `@layer utilities`에 정의
  - Window Content (고정): `text-system-caption`, `text-system-body`, `text-system-heading`, `text-system-icon-md`, `text-system-icon-lg`
  - 새 토큰 추가 시 `tailwind.config.ts` `theme.extend.fontSize`에 추가한다.

## 개발 명령어

```bash
pnpm dev      # 개발 서버 실행
pnpm build    # 프로덕션 빌드
pnpm start    # 프로덕션 서버 실행
pnpm lint     # ESLint 검사
```
