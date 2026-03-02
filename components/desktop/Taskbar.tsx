"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { isStartMenuOpenAtom } from "@/atoms/window";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import SystemTray from "./SystemTray";
import StartMenu from "./StartMenu";

export default function Taskbar() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useAtom(isStartMenuOpenAtom);
  const { windows, focusWindow, minimizeWindow, restoreWindow, closeWindow } = useWindowManager();
  const { isMobile } = useBreakpoint();

  const activeWindow =
    windows.length > 0
      ? windows
          .filter((w) => w.state !== "minimized")
          .reduce(
            (top, w) => (!top || w.zIndex > top.zIndex ? w : top),
            null as (typeof windows)[0] | null
          )
      : null;
  const activeWindowId = activeWindow?.id ?? null;

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
          className={`flex items-center gap-1 px-2 h-10 font-bold text-system-ui-md min-w-[70px] ${
            isStartMenuOpen ? "win95-sunken" : "win95-raised"
          } bg-[#c0c0c0]`}
          onClick={() => setIsStartMenuOpen((prev) => !prev)}
        >
          <Image src="/lasbe_character.jpg" alt="시작" width={20} height={20} className="rounded-sm object-cover flex-shrink-0" />
          <span>시작</span>
        </button>
        <StartMenu />
      </div>

      {/* Separator */}
      <div className="w-px h-8 bg-[#808080] mx-1 flex-shrink-0" />

      {isMobile ? (
        /* 모바일: 뒤로가기 버튼 + 활성 윈도우 제목 */
        <div className="flex items-center flex-1 gap-2 overflow-hidden">
          {activeWindow && (
            <>
              <button
                className="win95-raised bg-[#c0c0c0] px-3 h-8 text-system-ui-md flex-shrink-0"
                onClick={() => closeWindow(activeWindow.id)}
              >
                ← 뒤로
              </button>
              <span className="flex items-center gap-1 flex-1 truncate text-system-ui text-center">
                <activeWindow.icon style={{ width: 16, height: 16, display: "block", flexShrink: 0 }} />
                {activeWindow.title}
              </span>
            </>
          )}
        </div>
      ) : (
        /* 데스크톱/태블릿: 열린 윈도우 버튼 목록 */
        <div className="flex gap-1 flex-1 overflow-hidden">
          {windows.map((win) => {
            const isActive = win.id === activeWindowId;
            return (
              <button
                key={win.id}
                className={`flex items-center gap-1 px-2 h-8 text-system-ui max-w-[140px] min-w-[80px] truncate flex-shrink-0 ${
                  isActive ? "win95-sunken" : "win95-raised"
                } bg-[#c0c0c0]`}
                onClick={() => handleTaskbarButtonClick(win.id)}
              >
                <win.icon style={{ width: 16, height: 16, display: "block", flexShrink: 0 }} />
                <span className="truncate">{win.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* System Tray */}
      <SystemTray />
    </div>
  );
}
