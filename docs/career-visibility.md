# 경력기술서 가시성 제어 기능

## 목표

Firebase Firestore `config` 컬렉션의 `is_visible_resume` 필드 값에 따라 CareerWindow 컨텐츠를 조건부 표시한다.

- `true` → 기존 경력기술서 내용 표시
- `false` (또는 문서 없음) → SVG + "공사 중입니다" 메시지 표시

## 구현 계획

### 1. API 라우트 추가
- `app/api/config/resume-visible/route.ts`
- Firestore `config` 컬렉션의 `resume` 문서(또는 단일 config 문서)에서 `is_visible_resume` 필드 읽기
- `{ isVisible: boolean }` 반환

### 2. 서비스 훅 추가
- `hooks/useResumeVisible.ts`
- `/api/config/resume-visible` GET 호출
- `{ isVisible: boolean | null, isLoading: boolean }` 반환

### 3. CareerWindow 업데이트
- `useResumeVisible` 훅 사용
- 로딩 중: 로딩 인디케이터
- `isVisible === false`: SVG + "공사 중입니다" 표시
- `isVisible === true`: 기존 경력기술서 렌더링

## Firestore 구조

```
config (collection)
  └── resume (document)
        └── is_visible_resume: boolean
```
