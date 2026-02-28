"use client";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { isStartMenuOpenAtom, useWindowManager } from "@/features/win95/store/windowStore";
import { WIN95_WINDOW_CONFIGS, Win95WindowConfigType } from "@/features/win95/constants";
import NotepadWindow from "./windows/NotepadWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import CareerWindow from "./windows/CareerWindow";
import SystemWindow from "./windows/SystemWindow";
import MailWindow from "./windows/MailWindow";
import IEWindow from "./windows/IEWindow";
import GithubWindow from "./windows/GithubWindow";

const WINDOW_CONTENT_MAP: Record<string, React.ReactNode> = {
  notepad: <NotepadWindow />,
  projects: <ProjectsWindow />,
  career: <CareerWindow />,
  system: <SystemWindow />,
  mail: <MailWindow />,
  internet: <IEWindow />,
  github: <GithubWindow />,
};

export default function StartMenu() {
  const [isOpen, setIsOpen] = useAtom(isStartMenuOpenAtom);
  const { openWindow } = useWindowManager();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const handleItemClick = (cfg: Win95WindowConfigType) => {
    openWindow({ ...cfg, content: WINDOW_CONTENT_MAP[cfg.id] });
    setIsOpen(false);
  };

  const handleShutdown = () => {
    window.open("https://github.com/lasbe", "_blank");
    setIsOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className="absolute bottom-12 left-0 win95-raised bg-[#c0c0c0] flex shadow-lg"
      style={{ zIndex: 10000 }}
    >
      {/* Left sidebar - "Windows 95" vertical text */}
      <div className="w-8 bg-gradient-to-t from-[#7b7b7b] to-[#000080] flex items-end justify-center pb-2 select-none">
        <span
          className="text-white font-bold text-system-caption font-vt323 tracking-widest"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            letterSpacing: "0.15em",
          }}
        >
          LASBE OS 95
        </span>
      </div>

      {/* Menu items */}
      <div className="flex flex-col min-w-[180px]">
        {WIN95_WINDOW_CONFIGS.map((cfg) => (
          <button
            key={cfg.id}
            className="flex items-center gap-2 px-3 py-2 md:py-1.5 text-left text-system-body font-vt323 hover:bg-[#000080] hover:text-white active:bg-[#000080] active:text-white"
            onClick={() => handleItemClick(cfg)}
          >
            <span className="text-system-heading w-6 text-center">{cfg.icon}</span>
            <span>{cfg.label}</span>
          </button>
        ))}

        {/* Divider */}
        <div className="my-1 mx-2 border-t border-[#808080] border-b border-b-white" />

        {/* Shutdown */}
        <button
          className="flex items-center gap-2 px-3 py-2 md:py-1.5 text-left text-system-body font-vt323 hover:bg-[#000080] hover:text-white active:bg-[#000080] active:text-white"
          onClick={handleShutdown}
        >
          <span className="text-system-heading w-6 text-center">🖥️</span>
          <span>GitHub 방문</span>
        </button>
      </div>
    </div>
  );
}
