export const profileData = {
  name: { label: "이름", value: "장성우" },
  birthday: { label: "생년월일", value: "97.03.05" },
  location: { label: "위치", value: "서울 동작구" },
  mail: { label: "메일", value: "devlasbe@gmail.com" },
};

export const projectDataList = [
  {
    title: "오픈프차",
    period: "2024.11~",
    desc: "공정거래위원회의 가맹사업 정보공개서를 기반으로 창업 전, 프랜차이즈 본사 정보, 브랜드의 매출, 가맹점 수, 인테리어 금액, 창업 비용 정보를 편리하게 확인할 수 있습니다.",
    subDesc: [
      "일 평균 150~200명 접속",
      "NextJS와 NestJS를 이용해 풀스택 개발",
      "차트를 활용한 각종 데이터 시각화",
      "데스크톱 및 모바일 디바이스에 대응",
      "swagger-typescript-api를 이용해 백엔드 API - 프론트엔드 간 타입 동기화",
      "Playwright + Docker를 이용한 E2E 테스트 환경 구축",
      "Private Docker Repository 구축 후 Github Action으로 배포 자동화",
      "PM2를 이용해 백엔드 배포 환경을 구성하여 클러스터 모드, 분산 서비스, 모니터링 환경 구축",
    ],
    stack: [
      "NextJS",
      "tailwind",
      "shadcn/ui",
      "Recharts",
      "Playwright",
      "Vercel",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "PM2",
    ],
    link: "https://www.openfranchise.kr/",
    readme: "https://github.com/devlasbe/open-franchise-frontend",
  },
];
