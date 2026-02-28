"use client";

import { useAtom } from "jotai";
import { useWindowManager, isBootCompleteAtom } from "@/features/win95/store/windowStore";
import BootScreen from "./BootScreen";
import { WIN95_WINDOW_CONFIGS } from "@/features/win95/constants";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import NotepadWindow from "./windows/NotepadWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import CareerWindow from "./windows/CareerWindow";
import SystemWindow from "./windows/SystemWindow";
import MailWindow from "./windows/MailWindow";
import IEWindow from "./windows/IEWindow";

const WINDOW_CONTENT_MAP: Record<string, React.ReactNode> = {
  notepad: <NotepadWindow />,
  projects: <ProjectsWindow />,
  career: <CareerWindow />,
  system: <SystemWindow />,
  mail: <MailWindow />,
  internet: <IEWindow />,
};

export default function Desktop() {
  const { windows, openWindow } = useWindowManager();
  const [isBootComplete, setIsBootComplete] = useAtom(isBootCompleteAtom);

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden">
      {/* Desktop area */}
      <div className="relative flex-1 bg-[#008080] overflow-hidden">
        {/* Desktop icons - mobile: centered grid / md+: left column */}
        <div className="absolute inset-0 md:inset-auto md:left-4 md:top-4 flex flex-wrap md:flex-col md:flex-nowrap justify-center md:justify-start content-start gap-6 pt-10 px-6 md:pt-4 md:px-0">
          {WIN95_WINDOW_CONFIGS.map((cfg) => (
            <DesktopIcon
              key={cfg.id}
              icon={cfg.icon}
              label={cfg.label}
              onDoubleClick={() =>
                openWindow({ ...cfg, content: WINDOW_CONTENT_MAP[cfg.id] })
              }
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

      {!isBootComplete && (
        <BootScreen onComplete={() => setIsBootComplete(true)} />
      )}
    </div>
  );
}
