"use client";

import React, { createContext, useContext, useState } from "react";
import type { ComponentType, SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type WindowStateType = "normal" | "minimized" | "maximized";

export type WindowType = {
  id: string;
  title: string;
  icon: IconType;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  state: WindowStateType;
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
};

export type OpenWindowConfigType = {
  id: string;
  title: string;
  icon: IconType;
  content: React.ReactNode;
  defaultSize: { width: number; height: number };
};

type WindowContextType = {
  windows: WindowType[];
  setWindows: React.Dispatch<React.SetStateAction<WindowType[]>>;
};

export const WindowContext = createContext<WindowContextType | null>(null);

export function useWindowContext() {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error("useWindowContext must be used within WindowProvider");
  return ctx;
}

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowType[]>([]);
  return <WindowContext.Provider value={{ windows, setWindows }}>{children}</WindowContext.Provider>;
}
