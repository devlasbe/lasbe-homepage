import type { ComponentType, SVGProps, ReactNode } from "react";
import { Notepad, Folder, FileText, Computer, Mail, Ie, QuestionBubble, Explorer100 } from "@react95/icons";
import NotepadWindow from "@/components/windows/NotepadWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import CareerWindow from "@/components/windows/CareerWindow";
import SystemWindow from "@/components/windows/SystemWindow";
import MailWindow from "@/components/windows/MailWindow";
import IEWindow from "@/components/windows/IEWindow";
import ReadmeWindow from "@/components/windows/ReadmeWindow";
import GithubWindow from "@/components/windows/GithubWindow";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type WindowConfigType = {
  id: string;
  label: string;
  icon: IconType;
  title: string;
  defaultSize: { width: number; height: number };
  content: ReactNode;
  showInStartMenu: boolean;
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
  },
  {
    id: "projects",
    label: "내 프로젝트",
    icon: Folder,
    title: "내 프로젝트",
    defaultSize: { width: 700, height: 520 },
    content: <ProjectsWindow />,
    showInStartMenu: true,
  },
  {
    id: "career",
    label: "내 경력",
    icon: FileText,
    title: "내 경력",
    defaultSize: { width: 680, height: 520 },
    content: <CareerWindow />,
    showInStartMenu: true,
  },
  {
    id: "system",
    label: "기술스택.exe",
    icon: Computer,
    title: "기술스택.exe - 시스템 속성",
    defaultSize: { width: 420, height: 400 },
    content: <SystemWindow />,
    showInStartMenu: true,
  },
  {
    id: "mail",
    label: "메일 보내기",
    icon: Mail,
    title: "메일 보내기 - Outlook Express",
    defaultSize: { width: 520, height: 420 },
    content: <MailWindow />,
    showInStartMenu: true,
  },
  {
    id: "internet",
    label: "인터넷",
    icon: Ie,
    title: "인터넷 - Internet Explorer",
    defaultSize: { width: 620, height: 480 },
    content: <IEWindow />,
    showInStartMenu: true,
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
];
