"use client";

import { useCallback } from "react";
import { useWindowContext } from "@/components/contexts/windowContext";
import type { WindowStateType, OpenWindowConfigType, WindowType } from "@/components/contexts/windowContext";
import { analytics } from "@/utils/analytics";

// ── 창 레이아웃 ──
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;
const TABLET_SIZE_RATIO = 0.85;
const TASKBAR_HEIGHT = 48;
const CASCADE_OFFSET = 20;
const DEFAULT_POSITION = 50;
export const DEFAULT_Z_INDEX = 99;
export const DEFAULT_VIEWPORT = { width: 1280, height: 900 };

type SizeType = { width: number; height: number };
type HistoryEntryType = { winIdx: number; winId: string | null };
type CreateWindowOptionsType = { openCount: number; zIndex: number; historyIdx: number; viewport: SizeType };

export function getResponsiveLayout(defaultSize: SizeType, viewport: SizeType) {
  let size = defaultSize;
  if (viewport.width >= MOBILE_BREAKPOINT && viewport.width < TABLET_BREAKPOINT) {
    size = {
      width: Math.min(defaultSize.width, Math.round(viewport.width * TABLET_SIZE_RATIO)),
      height: Math.min(defaultSize.height, Math.round((viewport.height - TASKBAR_HEIGHT) * TABLET_SIZE_RATIO)),
    };
  }
  const state: WindowStateType = viewport.width < MOBILE_BREAKPOINT ? "maximized" : "normal";
  return { size, state };
}

export function createWindow(config: OpenWindowConfigType, options: CreateWindowOptionsType): WindowType {
  const cascade = options.openCount * CASCADE_OFFSET;
  const layout = getResponsiveLayout(config.defaultSize, options.viewport);
  const win: WindowType = {
    id: config.id,
    title: config.title,
    icon: config.icon,
    content: config.content,
    position: { x: DEFAULT_POSITION + cascade, y: DEFAULT_POSITION + cascade },
    size: layout.size,
    state: layout.state,
    zIndex: options.zIndex,
    historyIdx: options.historyIdx,
  };
  return win;
}

export function getTopWindow(windows: WindowType[]): WindowType | null {
  const visibleWindows = windows.filter((win) => win.state !== "minimized");
  const topWindow = visibleWindows.reduce<WindowType | null>(
    (top, win) => (!top || win.zIndex > top.zIndex ? win : top), null
  );
  return topWindow;
}

// 화면에서 아래에 있는 창이 앞으로 온다: 최소화된 창이 먼저, 같은 상태끼리는 zIndex가 낮은 창이 먼저
function compareStacking(left: WindowType, right: WindowType) {
  const leftVisible = left.state === "minimized" ? 0 : 1;
  const rightVisible = right.state === "minimized" ? 0 : 1;
  if (leftVisible !== rightVisible) return leftVisible - rightVisible;
  return left.zIndex - right.zIndex;
}

/**
 * history로 연 창들의 historyIdx를 화면 순서대로 다시 매긴다.
 * 뒤로 가기는 historyIdx가 큰 창부터 닫으므로, 맨 위 창이 가장 큰 번호를 가져야 맨 위부터 닫힌다.
 * 번호 집합은 그대로 두고 주인만 바꾸므로 "지금 칸 번호 = 열린 창의 최대 historyIdx" 규칙은 유지된다.
 */
export function rankHistoryIdx(windows: WindowType[]): WindowType[] {
  const historyWindows = windows.filter((win) => win.historyIdx > 0);
  const historyIdxList = historyWindows.map((win) => win.historyIdx).sort((left, right) => left - right);
  const stackedWindows = [...historyWindows].sort(compareStacking);
  const historyIdxById = new Map(stackedWindows.map((win, i) => [win.id, historyIdxList[i]]));
  const ranked = windows.map((win) => {
    const historyIdx = historyIdxById.get(win.id);
    if (historyIdx === undefined || historyIdx === win.historyIdx) return win;
    return { ...win, historyIdx };
  });
  return ranked;
}

export function getMaxZIndex(windows: WindowType[]) {
  const maxZIndex = windows.reduce((max, win) => Math.max(max, win.zIndex), DEFAULT_Z_INDEX);
  return maxZIndex;
}

export function getHistoryEntry(): HistoryEntryType {
  const state = window.history.state;
  const entry = { winIdx: state?.winIdx ?? 0, winId: state?.winId ?? null };
  return entry;
}

export function getViewport(): SizeType {
  const viewport = { width: window.innerWidth, height: window.innerHeight };
  return viewport;
}

export const useWindowManager = () => {
  const { windows, setWindows } = useWindowContext();

  const focusWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const maxZ = prev.reduce((max, w) => Math.max(max, w.zIndex), 99);
        const focused = prev.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1 } : w));
        return rankHistoryIdx(focused);
      });
    },
    [setWindows]
  );

  const openWindow = useCallback(
    (config: OpenWindowConfigType) => {
      analytics.track("window_open", { window_id: config.id, window_name: config.title });
      const existing = windows.find((win) => win.id === config.id);
      if (existing) {
        setWindows((prev) => {
          const maxZ = getMaxZIndex(prev);
          const updated = prev.map((win) => {
            if (win.id !== config.id) return win;
            const state: WindowStateType = win.state === "minimized" ? "normal" : win.state;
            return { ...win, state, zIndex: maxZ + 1 };
          });
          return rankHistoryIdx(updated);
        });
        return;
      }
      const historyIdx = getHistoryEntry().winIdx + 1;
      window.history.pushState({ winIdx: historyIdx, winId: config.id }, "", `/${config.id}`);
      const viewport = getViewport();
      setWindows((prev) => {
        const win = createWindow(config, { openCount: prev.length, zIndex: getMaxZIndex(prev) + 1, historyIdx, viewport });
        const updated = [...prev, win];
        return updated;
      });
    },
    [windows, setWindows]
  );

  const closeWindow = useCallback(
    (id: string) => {
      const win = windows.find((item) => item.id === id);
      if (win && win.historyIdx > 0 && win.historyIdx === getHistoryEntry().winIdx) {
        window.history.back();
        return;
      }
      setWindows((prev) => prev.filter((item) => item.id !== id));
    },
    [windows, setWindows]
  );

  const minimizeWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const minimized = prev.map((w) => (w.id === id ? { ...w, state: "minimized" as WindowStateType } : w));
        return rankHistoryIdx(minimized);
      });
    },
    [setWindows]
  );

  const restoreWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const maxZ = prev.reduce((max, w) => Math.max(max, w.zIndex), 99);
        const restored = prev.map((w) =>
          w.id === id ? { ...w, state: "normal" as WindowStateType, zIndex: maxZ + 1 } : w
        );
        return rankHistoryIdx(restored);
      });
    },
    [setWindows]
  );

  const maximizeWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id !== id) return w;
          if (w.state === "maximized") {
            return {
              ...w,
              state: "normal" as WindowStateType,
              position: w.prevPosition || w.position,
              size: w.prevSize || w.size,
            };
          }
          return {
            ...w,
            state: "maximized" as WindowStateType,
            prevPosition: w.position,
            prevSize: w.size,
          };
        })
      );
    },
    [setWindows]
  );

  const updatePosition = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position } : w)));
    },
    [setWindows]
  );

  const updateSize = useCallback(
    (id: string, size: { width: number; height: number }) => {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)));
    },
    [setWindows]
  );

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
    updateSize,
  };
};
