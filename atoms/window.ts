import { atom } from "jotai";
import React from "react";
import type { ComponentType, SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type WindowStateType = "normal" | "minimized" | "maximized";

export type Win95WindowType = {
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

export const windowsAtom = atom<Win95WindowType[]>([]);
export const isStartMenuOpenAtom = atom<boolean>(false);
export const isBootCompleteAtom = atom<boolean>(false);
