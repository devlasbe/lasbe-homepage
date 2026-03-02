# 데스크톱 아이콘 → @react95/icons 교체 계획

## 작업 목표
유니코드 이모지 아이콘을 Win95 픽셀아트 SVG 아이콘(`@react95/icons`)으로 교체한다.

## 아이콘 매핑

| Window ID | 레이블 | React95 아이콘 |
|-----------|--------|----------------|
| notepad   | 자기소개.txt | `Notepad` |
| projects  | 내 프로젝트  | `Folder` |
| career    | 내 경력      | `FileText` |
| system    | 기술스택.exe | `Computer` |
| mail      | 메일 보내기  | `Mail` |
| internet  | 인터넷       | `Ie` |
| readme    | README.txt   | `QuestionBubble` |
| github    | GitHub       | `Explorer` |

## 수정 파일

- `package.json` — pnpm add @react95/icons
- `app/layout.tsx` — CSS 임포트
- `constants/win95.ts` — icon 타입 + 값 변경
- `store/windowStore.ts` — icon 타입 변경
- `components/desktop/DesktopIcon.tsx` — SVG 렌더링
- `components/desktop/StartMenu.tsx` — SVG 렌더링
- `components/desktop/Taskbar.tsx` — SVG 렌더링

## 진행 상황

- [ ] Step 1: 패키지 설치
- [ ] Step 2: CSS 임포트
- [ ] Step 3: 타입 및 상수 변경
- [ ] Step 4: DesktopIcon 변경
- [ ] Step 5: StartMenu 변경
- [ ] Step 6: Taskbar 변경
