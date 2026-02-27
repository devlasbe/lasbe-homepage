# lasbe-homepage

장성우 프론트엔드 포트폴리오 홈페이지

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Package Manager | pnpm (preinstall 훅으로 강제 적용) |
| Database | Firebase Firestore (방문자 수 카운트) |
| Font | Noto Sans KR, Archivo Black (Google Fonts) |
| UI Libraries | @lasbe/react-card-animation, @lasbe/react-scroll-animation, Swiper |

## 폴더 구조

```
lasbe-homepage/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # 루트 레이아웃 (폰트, 메타데이터, Provider 설정)
│   ├── page.tsx                # 메인 페이지
│   ├── globals.css             # 전역 스타일
│   ├── robots.ts               # SEO robots 설정
│   └── sitemap.ts              # SEO sitemap 설정
│
├── components/                 # React 컴포넌트
│   ├── aboutMeModal/           # About Me 모달 (이력서 상세 정보)
│   │   ├── Layout.tsx          # 모달 레이아웃
│   │   ├── Profile.tsx         # 프로필 섹션
│   │   ├── Carrer.tsx          # 경력 섹션
│   │   └── Project.tsx         # 프로젝트 섹션
│   ├── main/                   # 메인 페이지 컴포넌트
│   │   ├── CardContainer.tsx   # 카드 컨테이너
│   │   └── icon/               # 아이콘 컴포넌트
│   │       ├── Icon.tsx
│   │       └── IconList.tsx
│   ├── modal/                  # 범용 모달 시스템
│   │   ├── Modal.tsx
│   │   ├── ModalDimmer.tsx
│   │   ├── ModalMessage.tsx
│   │   ├── ModalProvider.tsx
│   │   ├── ModalTopBar.tsx
│   │   ├── useModal.tsx        # 모달 열기/닫기 훅
│   │   ├── useModalValue.tsx
│   │   ├── types.ts
│   │   ├── modal.css
│   │   └── index.ts
│   ├── Provider.tsx            # 앱 전역 Provider 래퍼
│   ├── Stack.tsx               # 기술 스택 표시 컴포넌트
│   ├── SystemModal.tsx         # 시스템 모달
│   └── Typing.tsx              # 타이핑 애니메이션 컴포넌트
│
├── services/                   # 외부 서비스 연동
│   └── view.tsx                # Firebase 방문자 수 조회/갱신
│
├── utils/                      # 유틸리티 함수
│   ├── date.ts                 # 날짜 계산 함수
│   └── firebase.ts             # Firebase 초기화 및 db export
│
└── public/                     # 정적 에셋
    ├── project_images/         # 프로젝트 스크린샷
    └── *.svg, *.jpg, *.png     # 로고, 아이콘, 배경 이미지
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

## 코드 컨벤션

- **Type 네이밍**: 타입명은 반드시 `Type` postfix를 붙인다.
  - `type ModalPropsType = { ... }`
  - `type UserInfoType = { ... }`

## 개발 명령어

```bash
pnpm dev      # 개발 서버 실행
pnpm build    # 프로덕션 빌드
pnpm start    # 프로덕션 서버 실행
pnpm lint     # ESLint 검사
```
