"use client";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { isStartMenuOpenAtom, useWindowManager, OpenWindowConfigType } from "@/features/win95/store/windowStore";

type StartMenuItemType = {
  icon: string;
  label: string;
  config: OpenWindowConfigType;
};

const MENU_ITEMS: StartMenuItemType[] = [
  {
    icon: "📄",
    label: "자기소개.txt",
    config: {
      id: "notepad",
      title: "자기소개.txt",
      icon: "📄",
      content: null,
      defaultSize: { width: 500, height: 400 },
    },
  },
  {
    icon: "📁",
    label: "내 프로젝트",
    config: {
      id: "projects",
      title: "내 프로젝트",
      icon: "📁",
      content: null,
      defaultSize: { width: 700, height: 500 },
    },
  },
  {
    icon: "📋",
    label: "내 경력",
    config: {
      id: "career",
      title: "내 경력",
      icon: "📋",
      content: null,
      defaultSize: { width: 700, height: 500 },
    },
  },
  {
    icon: "💾",
    label: "기술스택.exe",
    config: {
      id: "system",
      title: "기술스택.exe",
      icon: "💾",
      content: null,
      defaultSize: { width: 400, height: 350 },
    },
  },
  {
    icon: "📧",
    label: "메일 보내기",
    config: {
      id: "mail",
      title: "메일 보내기",
      icon: "📧",
      content: null,
      defaultSize: { width: 500, height: 400 },
    },
  },
  {
    icon: "🌐",
    label: "인터넷",
    config: {
      id: "internet",
      title: "인터넷",
      icon: "🌐",
      content: null,
      defaultSize: { width: 600, height: 450 },
    },
  },
];

export default function StartMenu() {
  const [isOpen, setIsOpen] = useAtom(isStartMenuOpenAtom);
  const { openWindow } = useWindowManager();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const handleItemClick = (item: StartMenuItemType) => {
    openWindow(item.config);
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
          Windows 95
        </span>
      </div>

      {/* Menu items */}
      <div className="flex flex-col min-w-[180px]">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.config.id}
            className="flex items-center gap-2 px-3 py-1.5 text-left text-system-body font-vt323 hover:bg-[#000080] hover:text-white"
            onClick={() => handleItemClick(item)}
          >
            <span className="text-system-heading w-6 text-center">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        {/* Divider */}
        <div className="my-1 mx-2 border-t border-[#808080] border-b border-b-white" />

        {/* Shutdown */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-left text-system-body font-vt323 hover:bg-[#000080] hover:text-white"
          onClick={handleShutdown}
        >
          <span className="text-system-heading w-6 text-center">🖥️</span>
          <span>GitHub 방문</span>
        </button>
      </div>
    </div>
  );
}
