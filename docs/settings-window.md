# Settings Window 작업 계획

## 목표

캐릭터 이미지 + 포트폴리오 간단 소개 + 방문자 수 카운트를 표시하는 "내 정보" 창 추가

## 구성 요소

1. **캐릭터 이미지** — `/lasbe_character.jpg`
2. **간단한 자기소개** — 이름, 생년월일, 위치, 메일 (profileDataList 활용)
3. **방문자 수** — 오늘 방문자 / 누적 방문자 (useViewCount 훅 활용)

## Win95 스타일 참고

- Windows 95 "시스템 속성" 다이얼로그 스타일
- 상단에 캐릭터 이미지 + 이름/소개 한 줄
- 구분선 이후 상세 정보 + 방문자 카운터

## 아이콘

- `User1` — 사용자 프로필 아이콘

## 파일 변경 목록

1. `components/windows/SettingsWindow.tsx` — 신규 생성
2. `constants/windowConfigs.tsx` — SettingsWindow 항목 추가
3. `docs/react95-icons-rules.md` — User1 매핑 추가

## 기본 크기

- width: 480, height: 520
