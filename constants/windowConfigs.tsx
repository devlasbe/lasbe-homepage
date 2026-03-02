import type { ComponentType, SVGProps, ReactNode } from "react";
import { Notepad, Folder, FileText, Computer, Mail, Ie, QuestionBubble, Explorer100, Wordpad } from "@react95/icons";
import NotepadWindow from "@/components/windows/NotepadWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import CareerWindow from "@/components/windows/CareerWindow";
import SystemWindow from "@/components/windows/SystemWindow";
import MailWindow from "@/components/windows/MailWindow";
import IEWindow from "@/components/windows/IEWindow";
import ReadmeWindow from "@/components/windows/ReadmeWindow";
import GithubWindow from "@/components/windows/GithubWindow";
import ResumeWindow from "@/components/windows/ResumeWindow";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type WindowConfigType = {
  id: string;
  label: string;
  icon: IconType;
  title: string;
  defaultSize: { width: number; height: number };
  content: ReactNode;
  showInStartMenu: boolean;
  readmeDesc?: string;
};

export const WINDOW_CONFIGS: WindowConfigType[] = [
  {
    id: "notepad",
    label: "자기소개.txt",
    icon: Notepad,
    title: "자기소개.txt - 메모장",
    defaultSize: { width: 500, height: 420 },
    content: <NotepadWindow />,
    showInStartMenu: true,
    readmeDesc: "제 소개, 연락처, GitHub·블로그 링크를 담은 메모장 파일",
  },
  {
    id: "projects",
    label: "내 프로젝트",
    icon: Folder,
    title: "내 프로젝트",
    defaultSize: { width: 700, height: 520 },
    content: <ProjectsWindow />,
    showInStartMenu: true,
    readmeDesc: "진행한 프로젝트를 이미지 뷰어와 함께 소개",
  },
  {
    id: "career",
    label: "내 경력",
    icon: FileText,
    title: "내 경력",
    defaultSize: { width: 680, height: 520 },
    content: <CareerWindow />,
    showInStartMenu: true,
    readmeDesc: "경력 사항과 담당 프로젝트를 아코디언으로 펼쳐볼 수 있음",
  },
  {
    id: "system",
    label: "기술스택.exe",
    icon: Computer,
    title: "기술스택.exe - 시스템 속성",
    defaultSize: { width: 420, height: 400 },
    content: <SystemWindow />,
    showInStartMenu: true,
    readmeDesc: "보유 기술과 숙련도를 탭별 게이지로 확인",
  },
  {
    id: "mail",
    label: "메일 보내기",
    icon: Mail,
    title: "메일 보내기 - Outlook Express",
    defaultSize: { width: 520, height: 420 },
    content: <MailWindow />,
    showInStartMenu: true,
    readmeDesc: "Outlook Express 스타일 메일 작성기 (전송 시 mailto: 실행)",
  },
  {
    id: "internet",
    label: "인터넷",
    icon: Ie,
    title: "인터넷 - Internet Explorer",
    defaultSize: { width: 620, height: 480 },
    content: <IEWindow />,
    showInStartMenu: true,
    readmeDesc: "Internet Explorer 5.0 목업 — 즐겨찾기 링크 모음",
  },
  {
    id: "readme",
    label: "README.txt",
    icon: QuestionBubble,
    title: "README.txt - 도움말",
    defaultSize: { width: 520, height: 480 },
    content: <ReadmeWindow />,
    showInStartMenu: true,
  },
  {
    id: "github",
    label: "GitHub",
    icon: Explorer100,
    title: "GitHub - devlasbe",
    defaultSize: { width: 620, height: 540 },
    content: <GithubWindow />,
    showInStartMenu: true,
  },
  {
    id: "notion",
    label: "경력기술서.pdf",
    icon: Wordpad,
    title: "경력기술서.pdf - Notion Viewer",
    defaultSize: { width: 780, height: 560 },
    content: <ResumeWindow />,
    showInStartMenu: true,
  },
];
