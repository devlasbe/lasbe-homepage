"use client";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { isStartMenuOpenAtom } from "@/atoms/window";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useIconPositions } from "@/hooks/useIconPositions";
import { WINDOW_CONFIGS, WindowConfigType } from "@/constants/windowConfigs";

export default function StartMenu() {
  const [isOpen, setIsOpen] = useAtom(isStartMenuOpenAtom);
  const { openWindow } = useWindowManager();
  const { resetPositions } = useIconPositions();
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

  const handleItemClick = (cfg: WindowConfigType) => {
    openWindow({ ...cfg, content: cfg.content });
    setIsOpen(false);
  };

  const handleResetIcons = () => {
    setIsOpen(false);
    resetPositions();
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
          className="text-white font-bold text-system-caption tracking-widest"
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
        {WINDOW_CONFIGS.map((cfg) => (
          <button
            key={cfg.id}
            className="flex items-center gap-2 px-3 py-2 md:py-1.5 text-left text-system-body hover:bg-[#000080] hover:text-white active:bg-[#000080] active:text-white"
            onClick={() => handleItemClick(cfg)}
          >
            <cfg.icon style={{ width: 24, height: 24, display: "block", flexShrink: 0 }} />
            <span>{cfg.label}</span>
          </button>
        ))}

        {/* Divider */}
        <div className="my-1 mx-2 border-t border-[#808080] border-b border-b-white" />

        {/* Reset icon positions */}
        <button
          className="flex items-center gap-2 px-3 py-2 md:py-1.5 text-left text-system-body hover:bg-[#000080] hover:text-white active:bg-[#000080] active:text-white"
          onClick={handleResetIcons}
        >
          <span className="text-system-heading w-6 text-center">🗂️</span>
          <span>아이콘 정렬</span>
        </button>
      </div>
    </div>
  );
}
