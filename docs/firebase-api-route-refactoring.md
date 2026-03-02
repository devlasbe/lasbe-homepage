# Firebase 로직 API Route 분리 계획

## Context

현재 Firebase Firestore 연동이 클라이언트 사이드에서 직접 이루어지고 있어 두 가지 문제가 있다.

1. **보안**: `NEXT_PUBLIC_*` 환경변수가 클라이언트 번들에 포함되어 Firebase 설정값이 브라우저에 노출됨
2. **아키텍처**: Firebase SDK 전체가 클라이언트 번들에 포함되어 번들 크기 증가

이를 해결하기 위해 Firebase 관련 로직을 Next.js API Route로 이전하고, 클라이언트는 fetch()로 API를 호출하도록 변경한다.

---

## 변경 파일 목록

### 수정 대상
- `utils/firebase.ts` - 서버 전용 전환, compat → modular SDK, 환경변수 키 변경
- `utils/date.ts` - `getDateString()` 함수 추가 (API Route용 날짜 계산)
- `services/view.tsx` - ViewService 제거, fetch 호출로 전환
- `.env.local` - 환경변수 키에서 `NEXT_PUBLIC_` 접두사 제거

### 신규 생성 대상
- `app/api/view/increment/route.ts` - POST: 방문자 수 증가
- `app/api/view/today/route.ts` - GET: 오늘 방문자 수 조회
- `app/api/view/total/route.ts` - GET: 전체 방문자 수 조회

---

## 환경변수 변경

```
NEXT_PUBLIC_FIREBASE_KEY          →  FIREBASE_KEY
NEXT_PUBLIC_FIREBASE_PROJECT      →  FIREBASE_PROJECT
NEXT_PUBLIC_FIREBASE_MESSAGING    →  FIREBASE_MESSAGING
NEXT_PUBLIC_FIREBASE_APP_ID       →  FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID → FIREBASE_MEASUREMENT_ID
```

---

## API Route 명세

### `POST /api/view/increment`
- 오늘 날짜 문서 없으면 생성 (`count: 0`)
- `increment(1)`로 카운트 증가
- Response: `{ success: boolean }`

### `GET /api/view/today`
- 오늘 날짜 문서 조회
- Response: `{ count: number }`

### `GET /api/view/total`
- `view` collection 전체 문서 조회 후 count 합산
- Response: `{ total: number }`

---

## fetchService 유틸리티 (`utils/fetchService.ts`)

클라이언트에서 반복되는 `fetch → response.json()` 패턴을 추상화한 유틸리티.

```typescript
export const fetchService = {
  get: async <T>(url: string): Promise<T> => { ... },
  post: async <T>(url: string): Promise<T> => { ... },
};
```

`services/view.tsx`의 3개 API 호출이 이 유틸리티를 통해 처리된다.
