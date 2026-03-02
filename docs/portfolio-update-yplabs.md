# 포트폴리오 업데이트 - YPLABS 경력 추가

## 목적

노션 경력기술서를 기반으로 `constants/portfolio.ts`의 내용을 최신화한다.

## 변경 사항

### 1. `carrerDataList` - YPLABS 경력 추가

현재: 누리플렉스(Nuriflex)만 존재
변경: YPLABS를 맨 앞에 추가 (최신 경력 우선)

YPLABS 정보:
- company: "YPLABS"
- period: "2024.12 ~ 재직 중"
- imageSrc: "/yplabs.png" (이미지 파일 별도 추가 필요)
- desc: 글로벌 소셜 대화 플랫폼 "커넥팅" 앱-웹 개발 및 운영
- 2개의 projectList 엔트리:
  1. 프로덕트 기여 (AI 기능, 통화 경험 개선, 구독 모델 등)
  2. 기술/개발 기여 (CodePush, RN 업그레이드, 성능 개선, 모니터링 등)

### 2. `skillsData` - React Native 추가

- 프론트엔드 탭에 `React Native` 추가 (level: 85)
- `Expo` 추가 고려 (level: 70)
- 기존 스킬 레벨 미조정 (현재 수준 유지)

## 파일

- `constants/portfolio.ts` — carrerDataList, skillsData 수정
