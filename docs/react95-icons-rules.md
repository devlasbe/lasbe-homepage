# @react95/icons 사용 규칙

## 1. 사용법

### 타입
```typescript
import type { ComponentType, SVGProps } from "react";
type IconType = ComponentType<SVGProps<SVGSVGElement>>;
```

### 임포트
```typescript
import { Notepad, Folder } from "@react95/icons";
// icons.css는 임포트하지 않는다 — PostCSS 스택오버플로우 발생
```

### 렌더링
```tsx
// 변수에 담을 때
const IconComponent = icon;
<IconComponent style={{ width: 32, height: 32, display: "block" }} />

// 객체 프로퍼티에서 직접 접근할 때
<win.icon style={{ width: 16, height: 16, display: "block" }} />
<cfg.icon style={{ width: 24, height: 24, display: "block" }} />
```

### 크기 규칙
| 위치 | 크기 |
|------|------|
| 데스크톱 아이콘 | 32×32 |
| 시작 메뉴 항목 | 24×24 |
| 타이틀바 / 작업표시줄 버튼 | 16×16 |

- `variant` prop은 사용하지 않는다. 크기는 항상 `style`로 제어한다.
- `flexShrink: 0`은 flex 레이아웃에서 아이콘이 찌그러질 수 있는 곳에만 추가한다.

### 사용 가능한 아이콘 목록 확인
```
node_modules/@react95/icons/types/index.d.ts  — export 목록
node_modules/@react95/icons/svg/               — SVG 파일로 시각 확인
```

---

## 2. 아이콘 선택 기준

### 원칙: Win95 은유(metaphor)를 따른다
실제 Windows 95 UI에서 해당 기능에 사용하던 아이콘을 선택한다.
"이 창이 Win95 시절에 어떤 앱이었을까?"를 기준으로 생각한다.

### 우선순위
1. **기능명과 동일한 아이콘** — `Notepad`, `Mail`, `Ie` 등 이름이 완전히 일치하면 바로 사용
2. **Win95 앱 은유** — 파일/프로젝트 → `Folder`, 시스템 정보 → `Computer`, 도움말 → `QuestionBubble`
3. **행위/목적 은유** — 코드 브라우징 → `Explorer100` (파일 탐색기), 이력서 → `FileText`
4. **시각 확인 후 최종 결정** — `svg/` 폴더 내 동일 이름 SVG 파일을 열어 픽셀아트가 의도에 맞는지 확인

### 확인이 필요한 경우 (`svg/` 직접 열기)
- 같은 이름에 숫자 변형이 여러 개인 아이콘 (`Explorer100`, `Explorer101`, ...)
- 이름만으로 시각적 결과를 예측하기 어려운 아이콘

### 현재 매핑
| Window | 아이콘 | 이유 |
|--------|--------|------|
| notepad | `Notepad` | 메모장 그 자체 |
| projects | `Folder` | 폴더/프로젝트 |
| career | `FileText` | 문서/이력서 |
| system | `Computer` | 시스템 정보 |
| mail | `Mail` | 메일 |
| internet | `Ie` | Internet Explorer |
| readme | `QuestionBubble` | 도움말/물음표 |
| github | `Explorer100` | 파일 탐색기 = 코드 브라우징 |
| guestbook | `Addrbook` | 주소록 = 방명록 |
| settings | `User6` | ID 카드/유저 계정 문서 = 내 정보/프로필 |
