"use client";

import { useEffect } from "react";
import { useWindowManager } from "@/features/win95/store/windowStore";

export function useKeyboardShortcuts() {
  const { windows, closeWindow, maximizeWindow } = useWindowManager();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 입력 필드 안에서는 단축키 비활성화
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (isTyping) return;

      // 활성 창 (최상단 비최소화 창)
      const activeWindow =
        windows.length > 0
          ? windows
              .filter((w) => w.state !== "minimized")
              .reduce(
                (top, w) => (!top || w.zIndex > top.zIndex ? w : top),
                null as (typeof windows)[0] | null
              )
          : null;

      if (!activeWindow) return;

      // Escape — 창 닫기 (플랫폼/브라우저 무관)
      if (e.key === "Escape") {
        e.preventDefault();
        closeWindow(activeWindow.id);
        return;
      }

      // Ctrl+Enter / Cmd+Enter — 최대화/복원 토글
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        maximizeWindow(activeWindow.id);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [windows, closeWindow, maximizeWindow]);
}
