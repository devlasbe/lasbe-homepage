# services/ 폴더 도입

## Context

CLAUDE.md에 `services/` 폴더(외부 서비스 연동)가 명시돼 있으나 실제 폴더가 없고,
해당 역할의 파일들이 `utils/`에 혼재해 있다.

---

## 이동 대상

| 기존 경로 | 새 경로 | 이유 |
|-----------|---------|------|
| `utils/firebase.ts` | `services/firebase.ts` | Firebase SDK 초기화 — 외부 서비스 연동 |
| `utils/fetchService.ts` | `services/fetchService.ts` | HTTP 요청 레이어 — 외부 서비스 연동 |

`utils/date.ts`는 순수 유틸리티 함수이므로 `utils/`에 유지.

---

## import 경로 변경 요약

| 파일 | 기존 | 새 경로 |
|------|------|---------|
| `features/view/hooks/useViewCount.ts` | `@/utils/fetchService` | `@/services/fetchService` |
| `app/api/view/today/route.ts` | `@/utils/firebase` | `@/services/firebase` |
| `app/api/view/total/route.ts` | `@/utils/firebase` | `@/services/firebase` |
| `app/api/view/increment/route.ts` | `@/utils/firebase` | `@/services/firebase` |
