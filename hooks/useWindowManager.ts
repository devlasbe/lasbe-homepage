"use client";

import { useAtom } from "jotai";
import { useCallback } from "react";
import { windowsAtom } from "@/atoms/window";
import type { WindowStateType, OpenWindowConfigType } from "@/atoms/window";

export const useWindowManager = () => {
  const [windows, setWindows] = useAtom(windowsAtom);

  const focusWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const maxZ = prev.reduce((max, w) => Math.max(max, w.zIndex), 99);
        return prev.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1 } : w));
      });
    },
    [setWindows]
  );

  const openWindow = useCallback(
    (config: OpenWindowConfigType) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === config.id);
        const maxZ = prev.reduce((max, w) => Math.max(max, w.zIndex), 99);

        if (existing) {
          return prev.map((w) => {
            if (w.id !== config.id) return w;
            return {
              ...w,
              state: w.state === "minimized" ? ("normal" as WindowStateType) : w.state,
              zIndex: maxZ + 1,
            };
          });
        }

        const cascade = prev.length * 20;
        const viewW = typeof window !== "undefined" ? window.innerWidth : 1280;
        const viewH = typeof window !== "undefined" ? window.innerHeight : 900;
        const isMobile = viewW < 768;
        const isTablet = viewW >= 768 && viewW < 1024;

        let initialSize = config.defaultSize;
        if (isTablet) {
          initialSize = {
            width: Math.min(config.defaultSize.width, Math.round(viewW * 0.85)),
            height: Math.min(config.defaultSize.height, Math.round((viewH - 48) * 0.85)),
          };
        }

        return [
          ...prev,
          {
            id: config.id,
            title: config.title,
            icon: config.icon,
            content: config.content,
            position: { x: 50 + cascade, y: 50 + cascade },
            size: initialSize,
            zIndex: maxZ + 1,
            state: isMobile ? ("maximized" as WindowStateType) : ("normal" as WindowStateType),
          },
        ];
      });
    },
    [setWindows]
  );

  const closeWindow = useCallback(
    (id: string) => {
      setWindows((prev) => prev.filter((w) => w.id !== id));
    },
    [setWindows]
  );

  const minimizeWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, state: "minimized" as WindowStateType } : w))
      );
    },
    [setWindows]
  );

  const restoreWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const maxZ = prev.reduce((max, w) => Math.max(max, w.zIndex), 99);
        return prev.map((w) =>
          w.id === id ? { ...w, state: "normal" as WindowStateType, zIndex: maxZ + 1 } : w
        );
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
