import type { ComponentType, SVGProps, ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import MailWindow from "@/components/windows/MailWindow";
import ReadmeWindow from "@/components/windows/ReadmeWindow";
import GithubWindow from "@/components/windows/GithubWindow";
import ResumeWindow from "@/components/windows/ResumeWindow";
import GuestbookWindow from "@/components/windows/GuestbookWindow";
import BlogWindow from "@/components/windows/BlogWindow";
import OpenFranchiseWindow from "@/components/windows/OpenFranchiseWindow";
import MyProfileWindow from "@/components/windows/MyProfileWindow";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type WindowConfigType = {
  id: string;
  label: string;
  icon: IconType;
  title: string;
  defaultSize: { width: number; height: number };
  content: ReactNode;
  readmeDesc: string;
};

export const WINDOW_CONFIGS: WindowConfigType[] = [
  {
    id: "readme",
    label: "README",
    icon: Icon.QuestionBubble,
    title: "README - 도움말",
    defaultSize: { width: 520, height: 480 },
    content: <ReadmeWindow />,
    readmeDesc: "이 포트폴리오 사이트의 구성과 사용 방법을 안내하는 도움말",
  },
  {
    id: "notion",
    label: "경력기술서",
    icon: Icon.Wordpad,
    title: "경력기술서 - Notion",
    defaultSize: { width: 780, height: 560 },
    content: <ResumeWindow />,
    readmeDesc: "Notion으로 작성한 경력기술서를 react-notion-x를 이용하여 파싱 후 렌더",
  },
  {
    id: "settings",
    label: "내 정보",
    icon: Icon.Notepad,
    title: "내 정보 — 장성우",
    defaultSize: { width: 480, height: 520 },
    content: <MyProfileWindow />,
    readmeDesc: "캐릭터 이미지, 자기소개, 방문자 수를 확인하는 프로필 창",
  },
  {
    id: "mail",
    label: "메일",
    icon: Icon.Mail,
    title: "메일 - Outlook Express",
    defaultSize: { width: 520, height: 420 },
    content: <MailWindow />,
    readmeDesc: "Outlook Express 스타일 메일 작성기 (전송 시 mailto: 실행)",
  },
  {
    id: "github",
    label: "GitHub",
    icon: Icon.Explorer100,
    title: "GitHub - devlasbe",
    defaultSize: { width: 620, height: 540 },
    content: <GithubWindow />,
    readmeDesc: "GitHub 프로필 및 오픈소스 활동을 확인하는 탐색기",
  },
  {
    id: "blog",
    label: "블로그",
    icon: Icon.Write1,
    title: "블로그 - lasbe.tistory.com",
    defaultSize: { width: 780, height: 560 },
    content: <BlogWindow />,
    readmeDesc: "개발 블로그 (Tistory)",
  },
  {
    id: "guestbook",
    label: "방명록",
    icon: Icon.Addrbook,
    title: "방명록 - Guestbook",
    defaultSize: { width: 480, height: 500 },
    content: <GuestbookWindow />,
    readmeDesc: "방문자가 이름과 댓글을 남길 수 있는 방명록",
  },
  {
    id: "openfranchise",
    label: "오픈프차",
    icon: Icon.Ie,
    title: "오픈프차 - 프랜차이즈 창업 정보 서비스",
    defaultSize: { width: 540, height: 500 },
    content: <OpenFranchiseWindow />,
    readmeDesc: "프랜차이즈 창업 정보를 한 눈에 확인하는 풀스택 사이드 프로젝트",
  },
];
