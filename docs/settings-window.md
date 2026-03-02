# Settings Window → MyProfileWindow 리네임 + 자기소개 문구 개선

## 최초 목표 (완료)

캐릭터 이미지 + 포트폴리오 간단 소개 + 방문자 수 카운트를 표시하는 "내 정보" 창 추가

## 리네임 작업 (완료)

- `SettingsWindow`라는 이름이 컴포넌트의 역할(프로필/자기소개 창)을 잘 표현하지 못함 → `MyProfileWindow`로 변경
- 기존 자기소개 문구가 평범함 → 개발 철학이 담긴 임팩트 있는 문구로 교체

### 변경 파일

1. `components/windows/SettingsWindow.tsx` → `MyProfileWindow.tsx`
   - 함수명 변경: `SettingsWindow` → `MyProfileWindow`
   - 자기소개 문구 변경:
     - 전: `React · React Native를 주력으로 사용자 경험을 고민하는 프론트엔드 개발자입니다.`
     - 후: `좋은 UI는 존재감이 없다고 믿습니다. React · React Native로 눈에 띄지 않는 경험을 만드는 프론트엔드 개발자입니다.`
2. `constants/windowConfigs.tsx` — import/JSX 참조 변경
