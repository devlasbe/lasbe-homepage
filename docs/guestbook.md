# 방명록(Guestbook) 기능 추가 계획

## Context

포트폴리오 방문자가 메시지를 남길 수 있는 Win95 스타일 방명록 창 추가.
Firebase Firestore에 데이터 저장, 이름/비밀번호/댓글 입력, 등록 및 삭제(비밀번호 확인) 기능.

---

## 신규 파일

| 파일 | 역할 |
|------|------|
| `app/api/guestbook/route.ts` | GET (목록) / POST (등록) |
| `app/api/guestbook/[id]/route.ts` | DELETE (비밀번호 검증 후 삭제) |
| `hooks/useGuestbook.ts` | API 호출 래퍼 훅 |
| `components/windows/GuestbookWindow.tsx` | 방명록 윈도우 컴포넌트 |

## 수정 파일

| 파일 | 내용 |
|------|------|
| `constants/windowConfigs.tsx` | WINDOW_CONFIGS에 방명록 항목 추가 |

---

## Firestore 데이터 구조

컬렉션: `guestbook`

```
{
  name: string,         // 이름
  passwordHash: string, // SHA-256 해시 (Node.js crypto)
  comment: string,      // 댓글 내용
  createdAt: Timestamp  // 서버 타임스탬프
}
```

---

## 아이콘

- `Addrbook` (@react95/icons) — 주소록 = 방명록 은유

---

## 상태 정리

- [x] docs/guestbook.md 생성
- [x] app/api/guestbook/route.ts
- [x] app/api/guestbook/[id]/route.ts
- [x] hooks/useGuestbook.ts
- [x] components/windows/GuestbookWindow.tsx
- [x] constants/windowConfigs.tsx 수정
