"use client";

import { useAtom } from "jotai";
import { isStartMenuOpenAtom, useWindowManager } from "@/features/win95/store/windowStore";
import SystemTray from "./SystemTray";
import StartMenu from "./StartMenu";

export default function Taskbar() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useAtom(isStartMenuOpenAtom);
  const { windows, focusWindow, minimizeWindow, restoreWindow } = useWindowManager();

  const activeWindowId =
    windows.length > 0
      ? windows
          .filter((w) => w.state !== "minimized")
          .reduce(
            (top, w) => (w.zIndex > (top?.zIndex ?? -1) ? w : top),
            null as (typeof windows)[0] | null
          )?.id ?? null
      : null;

  const handleTaskbarButtonClick = (id: string) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;
    if (win.state === "minimized") {
      restoreWindow(id);
    } else if (win.id === activeWindowId) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 win95-raised bg-[#c0c0c0] flex items-center px-1 gap-1 z-[9999]">
      {/* Start Button */}
      <div className="relative flex-shrink-0">
        <button
          className={`flex items-center gap-1 px-2 h-10 sm:h-8 font-bold text-system-ui-md font-vt323 min-w-[80px] ${
            isStartMenuOpen ? "win95-sunken" : "win95-raised"
          } bg-[#c0c0c0]`}
          onClick={() => setIsStartMenuOpen((prev) => !prev)}
        >
          <span className="text-system-ui-lg">🪟</span>
          <span>시작</span>
        </button>
        <StartMenu />
      </div>

      {/* Separator */}
      <div className="w-px h-8 bg-[#808080] mx-1 flex-shrink-0" />

      {/* Window buttons */}
      <div className="flex gap-1 flex-1 overflow-hidden">
        {windows.map((win) => {
          const isActive = win.id === activeWindowId;
          return (
            <button
              key={win.id}
              className={`flex items-center gap-1 px-2 h-10 sm:h-8 text-system-ui font-vt323 max-w-[140px] min-w-[80px] truncate flex-shrink-0 ${
                isActive ? "win95-sunken" : "win95-raised"
              } bg-[#c0c0c0]`}
              onClick={() => handleTaskbarButtonClick(win.id)}
            >
              <span className="text-system-ui-md flex-shrink-0">{win.icon}</span>
              <span className="truncate">{win.title}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <SystemTray />
    </div>
  );
}
