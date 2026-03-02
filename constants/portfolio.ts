import type { ComponentType } from "react";
import type { SVGProps } from "react";
import { Explorer100, Write1, Ie, QuestionBubble } from "@react95/icons";

export type SkillType = { name: string; level: number };
export type SkillTabType = "프론트엔드" | "백엔드·인프라" | "도구";

export const skillsData: Record<SkillTabType, SkillType[]> = {
  프론트엔드: [
    { name: "TypeScript", level: 90 },
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 80 },
    { name: "styled-components", level: 75 },
    { name: "React Query", level: 75 },
    { name: "Recoil / Jotai", level: 75 },
    { name: "Electron", level: 60 },
  ],
  "백엔드·인프라": [
    { name: "NestJS", level: 60 },
    { name: "Firebase", level: 70 },
    { name: "Docker", level: 65 },
    { name: "GitHub Actions", level: 70 },
    { name: "PM2", level: 60 },
  ],
  도구: [
    { name: "Git", level: 85 },
    { name: "Vite / Webpack", level: 75 },
    { name: "Storybook", level: 70 },
    { name: "Playwright", level: 65 },
    { name: "Nexus (NPM)", level: 65 },
  ],
};

export type FavoriteType = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  url: string;
  desc: string;
};

export const favoritesData: FavoriteType[] = [
  {
    label: "GitHub",
    icon: Explorer100,
    url: "https://github.com/devlasbe",
    desc: "소스 코드 및 프로젝트 저장소",
  },
  {
    label: "블로그",
    icon: Write1,
    url: "https://lasbe.tistory.com",
    desc: "개발 기록 및 기술 블로그",
  },
  {
    label: "오픈프차",
    icon: Ie,
    url: "https://www.openfranchise.kr/",
    desc: "프랜차이즈 창업 정보 서비스",
  },
  {
    label: "안성재 GPT",
    icon: QuestionBubble,
    url: "https://ansungjae-gpt.vercel.app/",
    desc: "안성재 쉐프 스타일 요리 평가",
  },
];

type CarrerProjectDescType = { href?: string; desc: string };

type CarrerProjectType = {
  title: string;
  period: string;
  mainDesc: string;
  stackList: string[];
  descList: CarrerProjectDescType[];
};

type CarrerType = {
  imageSrc: string;
  company: string;
  period: string;
  desc: string;
  projectList: CarrerProjectType[];
};

export const profileDataList = [
  { src: "/profile.svg", alt: "profile icon", label: "이름", value: "장성우" },
  {
    src: "/calendar.svg",
    alt: "calendar icon",
    label: "생년월일",
    value: "97.03.05",
  },
  { src: "/gps.svg", alt: "gps icon", label: "위치", value: "서울 동작구" },
  {
    src: "/mail.svg",
    alt: "mail icon",
    label: "메일",
    value: "devlasbe@gmail.com",
  },
];

export const projectDataList = [
  {
    title: "오픈프차",
    period: "2024.11~",
    desc: "공정거래위원회의 가맹사업 정보공개서를 기반으로 창업 전, 프랜차이즈 본사 정보, 브랜드의 매출, 가맹점 수, 인테리어 금액, 창업 비용 정보를 편리하게 확인할 수 있습니다.",
    subDesc: [
      "NextJS와 NestJS를 이용해 풀스택 개발",
      "차트를 활용한 각종 데이터 시각화",
      "데스크톱 및 모바일 디바이스에 대응",
      "swagger-typescript-api를 이용해 백엔드 API - 프론트엔드 간 타입 동기화",
      "Playwright + Docker를 이용한 E2E 테스트 환경 구축",
      "Private Docker Repository 구축 후 Github Action으로 배포 자동화",
      "PM2를 이용해 백엔드 배포 환경을 구성하여 클러스터 모드, 분산 서비스, 모니터링 환경 구축",
    ],
    imageList: [
      "/project_images/openfranchise1.webp",
      "/project_images/openfranchise2.webp",
      "/project_images/openfranchise3.webp",
      "/project_images/openfranchise4.webp",
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
  {
    title: "안성재 요리 평가 GPT",
    period: "2024.10",
    desc: "흑백요리사 안성재 쉐프의 말투로 음식평가 결과를 출력하는 밈 프로젝트",
    subDesc: [
      "openai gpt-4o-mini 모델을 이용하여 결과 출력",
      "많게는 하루에 400 이상의 페이지뷰 기록",
      "기획-개발-출시까지 12시간 내 완료",
    ],
    imageList: ["/project_images/ansungjae1.jpg", "/project_images/ansungjae2.jpg"],
    stack: ["TypeScript", "Nextjs", "tailwind", "shadcn/ui", "openai", "vercel"],
    link: "https://ansungjae-gpt.vercel.app/",
    readme: "https://github.com/devlasbe/ansungjae-gpt",
  },
  {
    title: "포트폴리오",
    period: "2024.10",
    desc: "포트폴리오 용도로 제작한 웹사이트",
    subDesc: [
      "github action에서 제공하는 runner로 앱, 도커 빌드 후 ssh를 통해 원격으로 물리 서버에 배포",
      "기존에 개발한 애니메이션 라이브러리 컴포넌트 적극 사용",
      "반응형 설계로 데스크톱 및 스마트폰 대응",
    ],
    imageList: ["/project_images/portfolio1.jpg", "/project_images/portfolio2.jpg"],
    stack: ["TypeScript", "Nextjs", "tailwind", "Firebase", "docker", "github-action"],
    link: "https://lasbe.kr/",
    readme: "https://github.com/devlasbe/lasbe-homepage",
  },
  {
    title: "LINGMO",
    period: "2023.06 - 2023.07",
    desc: "여러 URL 링크를 모아주는 서비스",
    subDesc: [
      "github action runner를 물리 서버에 설치 하여 배포 자동화",
      "컴포넌트 단위의 애니메이션 개발",
      "반응형 설계로 데스크톱 및 스마트폰 대응",
    ],
    imageList: ["/project_images/lingmo1.webp", "/project_images/lingmo2.webp"],
    stack: ["TypeScript", "React", "Recoil", "styled-components", "Firebase", "github-action"],
    readme: "https://lasbe.tistory.com/180",
  },
  // {
  //   title: "닥터플렉스",
  //   period: "2023.08 - 2023.11",
  //   desc: "React-Native로 개발된 앱의 신규 개발 및 최적화 업무 수행",
  //   subDesc: [
  //     "신규 이벤트 배너, Screen 개발",
  //     "질환별 자문하기 개발",
  //     "의료 정보 제공 서비스 개발",
  //     "안드로이드 ScrollView 이미지 최적화 기능 개발",
  //   ],
  //   imageList: ["/project_images/doctorflex1.jpg"],
  //   stack: ["TypeScript", "React-Native"],
  //   link: "https://doctorflex.co.kr/",
  // },
  {
    title: "Going",
    period: "2022.04 - 2022.05",
    desc: "숙박 플랫폼 프로젝트",
    subDesc: [
      "기획, 디자인, F/E, B/E, DB 설계 등 프로젝트에 전반적으로 관여",
      "유저, 사업자, 관리자로 나뉜 플랫폼 형태의 서비스",
    ],
    imageList: [
      "/project_images/going1.jpg",
      "/project_images/going2.jpg",
      "/project_images/going3.jpg",
      "/project_images/going4.jpg",
    ],
    stack: ["Java", "Spring", "MyBatis", "Oracle", "JQuery"],
    readme: "https://lasbe.tistory.com/130",
  },
  {
    title: "InstaAuto",
    period: "2021.04",
    desc: "인스타그램 계정 마케팅을 위한 자동화 프로그램",
    subDesc: [
      "파이썬과 셀레니움을 이용한 웹 데이터 크롤링",
      "PyQT를 이용해 GUI 개발",
      "3일만에 목표치인 팔로워 1,000명 달성",
    ],
    imageList: ["/project_images/InstaAuto1.jpg", "/project_images/InstaAuto2.jpg", "/project_images/InstaAuto3.jpg"],
    stack: ["Python", "PyQT"],
    readme: "https://github.com/devlasbe/InstaAuto",
  },
];

export const carrerDataList: CarrerType[] = [
  {
    imageSrc: "/nuriflex.png",
    company: "Nuriflex",
    period: "2022.08 ~ 2024.06 (1년 11개월)",
    desc: `전력 IT 기술을 기반으로 원격 검침 서비스,\n친환경 에너지 모니터링 서비스 운영`,
    projectList: [
      {
        title: "F/E 공통 업무",
        period: "2022.08 ~ 2024.06",
        mainDesc: `사내 프론트엔드 개발자들의 공통된 문제를 해결하기 위한 업무`,
        stackList: ["TypeScript", "React", "Nesus", "Storybook"],
        descList: [
          {
            href: "https://lasbe.tistory.com/194",
            desc: "Nexus Npm Repository 구축과 관리, 복잡한 컴포넌트를 사내 상황에 맞게 컴포넌트화 하여 패키지로 관리",
          },
          {
            href: "https://lasbe.tistory.com/196",
            desc: "공통 패키지에 대한 테스트 및 문서화를 위해 Storybook 서버 배포 및 관리",
          },
          {
            desc: "공통 컴포넌트 개발 및 문서화를 위한 환경을 구축 후 컴파일, 배포, 버저닝 전략에 대한 문서 작성으로 지속 가능한 환경을 조성",
          },
        ],
      },
      {
        title: "친환경 에너지 모니터링 시스템",
        period: "2022.08 ~ 2024.06",
        mainDesc: `친환경 에너지 발전-충전-방전-저장 데이터 및 장비 상태 모니터링 및 제어\n\n말레이시아 전력청, 부산 3개소, 모로코 프로젝트 개발 및 유지보수`,
        stackList: [
          "TypeScript",
          "React",
          "STOMP",
          "react-hook-form",
          "yup",
          "react-query",
          "recoil",
          "styled-components",
          "high-chart",
          "ag-grid",
          "webpack",
          "vite",
        ],
        descList: [
          { desc: "JSP 기반 레거시 프로젝트를 새롭게 개발" },
          {
            desc: "많은 장비의 실시간 상태들을 초당 한번 씩 표현하며 생기는 잦은 상태 변화를 메모이제이션과 구조적으로 최적화",
          },
          { desc: "각종 전력 데이터를 차트 및 테이블로 시각화" },
          {
            desc: "ErrorBoundary를 활용해 프로젝트에 치명적 에러를 선언적으로 처리",
            href: "https://lasbe.tistory.com/204",
          },
          {
            desc: "Webpack to Vite 마이그레이션을 통해 앱 빌드 시간 60% 단축",
            href: "https://lasbe.tistory.com/190",
          },
          {
            desc: "npm to pnpm 마이그레이션을 통해 디스크 용량 및 의존성 설치 시간 절약",
            href: "https://lasbe.tistory.com/200",
          },
        ],
      },
      {
        title: "면상발열체 모니터링 데스크톱 앱",
        period: "2024.01 ~ 2024.06",
        mainDesc: `반도체 공정에 투입되는 발열체를 모니터링하고 제어하는 데스크톱 앱`,
        stackList: [
          "electron",
          "TypeScript",
          "React",
          "react-hook-form",
          "yup",
          "react-query",
          "recoil",
          "styled-components",
          "high-chart",
          "ag-grid",
          "vite",
        ],
        descList: [
          {
            desc: "보안 상 외부 네트워크가 불가능하기 때문에 Electron+React Standalone 데스크톱 앱으로 개발",
          },
          {
            desc: "F/E, B/E, F/W, H/W 팀이 유기적으로 협업하며 기획부터 개발까지 적극적으로 참여",
          },
          {
            href: "https://lasbe.tistory.com/203",
            desc: "IPC 통신을 통해 웹에서 앱 고유 기능을 제어",
          },
        ],
      },
      {
        title: "닥터플렉스",
        period: "2023.08 ~ 2023.11",
        mainDesc: `계열사 업무 지원으로, 출시 된 의료 자문 서비스 스마트폰 앱 신규 개발 및 유지보수`,
        stackList: ["React-Native", "TypeScript"],
        descList: [
          {
            desc: "신규 이벤트 배너 및 화면 개발",
          },
          {
            desc: "질환별 자문하기 개발",
          },
          {
            desc: "의료 정보 제공 서비스 개발",
          },
          {
            href: "https://lasbe.tistory.com/185",
            desc: "안드로이드 ScrollView 이미지 최적화 기능 개발",
          },
        ],
      },
      {
        title: "호두",
        period: "2023.06 ~ 2023.08",
        mainDesc: `시니어 인공지능 비서를 목표로 개발한 스마트폰 앱 및 관리자 웹 사내 poc 프로젝트`,
        stackList: ["React-Native", "TypeScript", "styled-components"],
        descList: [
          {
            desc: "디자인부터 기획, 개발 참여 경험",
          },
          {
            desc: "React-Native를 사용해 사용자 앱 개발, React를 사용해 관리자 웹 개발",
          },
          {
            desc: "STT로 사용자 음성 인식 → 클로바 챗봇을 이용한 질문 분류 → 분류된 질문에 따른 서버 응답을 TTS로 변환",
          },
        ],
      },
    ],
  },
];
