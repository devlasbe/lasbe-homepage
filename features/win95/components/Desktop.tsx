"use client";

import { useWindowManager, OpenWindowConfigType } from "@/features/win95/store/windowStore";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import NotepadWindow from "./windows/NotepadWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import CareerWindow from "./windows/CareerWindow";
import SystemWindow from "./windows/SystemWindow";
import MailWindow from "./windows/MailWindow";
import IEWindow from "./windows/IEWindow";

type DesktopIconConfigType = {
  icon: string;
  label: string;
  config: OpenWindowConfigType;
};

const DESKTOP_ICONS: DesktopIconConfigType[] = [
  {
    icon: "📄",
    label: "자기소개.txt",
    config: {
      id: "notepad",
      title: "자기소개.txt - 메모장",
      icon: "📄",
      content: <NotepadWindow />,
      defaultSize: { width: 500, height: 420 },
    },
  },
  {
    icon: "📁",
    label: "내 프로젝트",
    config: {
      id: "projects",
      title: "내 프로젝트",
      icon: "📁",
      content: <ProjectsWindow />,
      defaultSize: { width: 700, height: 520 },
    },
  },
  {
    icon: "📋",
    label: "내 경력",
    config: {
      id: "career",
      title: "내 경력",
      icon: "📋",
      content: <CareerWindow />,
      defaultSize: { width: 680, height: 520 },
    },
  },
  {
    icon: "💾",
    label: "기술스택.exe",
    config: {
      id: "system",
      title: "기술스택.exe - 시스템 속성",
      icon: "💾",
      content: <SystemWindow />,
      defaultSize: { width: 420, height: 400 },
    },
  },
  {
    icon: "📧",
    label: "메일 보내기",
    config: {
      id: "mail",
      title: "메일 보내기 - Outlook Express",
      icon: "📧",
      content: <MailWindow />,
      defaultSize: { width: 520, height: 420 },
    },
  },
  {
    icon: "🌐",
    label: "인터넷",
    config: {
      id: "internet",
      title: "인터넷 - Internet Explorer",
      icon: "🌐",
      content: <IEWindow />,
      defaultSize: { width: 620, height: 480 },
    },
  },
];

export default function Desktop() {
  const { windows, openWindow } = useWindowManager();

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden">
      {/* Desktop area */}
      <div className="relative flex-1 bg-[#008080] overflow-hidden">
        {/* Desktop icons - left column */}
        <div className="absolute left-4 top-4 flex flex-col gap-6 sm:gap-4">
          {DESKTOP_ICONS.map((item) => (
            <DesktopIcon
              key={item.config.id}
              icon={item.icon}
              label={item.label}
              onDoubleClick={() => openWindow(item.config)}
            />
          ))}
        </div>

        {/* Open windows */}
        {windows
          .filter((w) => w.state !== "minimized")
          .map((w) => (
            <Window key={w.id} window={w} />
          ))}
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
