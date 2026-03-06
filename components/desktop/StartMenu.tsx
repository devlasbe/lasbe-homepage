"use client";

import { useEffect, useRef } from "react";
import { useStartMenuContext } from "@/components/contexts/startMenuContext";
import { useWindowManager } from "@/hooks/useWindowManager";
import { WINDOW_CONFIGS, WindowConfigType } from "@/constants/windowConfigs";
import { APP } from "@/constants/app";

export default function StartMenu() {
  const { isStartMenuOpen: isOpen, setIsStartMenuOpen: setIsOpen } = useStartMenuContext();
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

  const handleItemClick = (cfg: WindowConfigType) => {
    openWindow({ ...cfg, content: cfg.content });
    setIsOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className="absolute bottom-12 left-0 win95-raised bg-gray-300 flex shadow-lg"
      style={{ zIndex: 10000 }}
    >
      {/* Left sidebar - "Windows 95" vertical text */}
      <div className="w-8 bg-gradient-to-t from-gray-500 to-blue-900 flex items-end justify-center pb-2 select-none">
        <span
          className="text-white font-bold text-system-caption tracking-widest"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            letterSpacing: "0.15em",
          }}
        >
          {APP.NAME} {APP.VERSION}
        </span>
      </div>

      {/* Menu items */}
      <div className="flex flex-col min-w-[180px]">
        {WINDOW_CONFIGS.map((cfg) => (
          <button
            key={cfg.id}
            className="flex items-center gap-2 px-3 py-2 md:py-1.5 text-left text-system-body hover:bg-blue-900 hover:text-white active:bg-blue-900 active:text-white"
            onClick={() => handleItemClick(cfg)}
          >
            <cfg.icon style={{ width: 24, height: 24, display: "block", flexShrink: 0 }} />
            <span>{cfg.label}</span>
          </button>
        ))}

      </div>
    </div>
  );
}
