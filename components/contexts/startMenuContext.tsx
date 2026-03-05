"use client";

import { createContext, useContext, useState } from "react";

type StartMenuContextType = {
  isStartMenuOpen: boolean;
  setIsStartMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const StartMenuContext = createContext<StartMenuContextType | null>(null);

export function useStartMenuContext() {
  const ctx = useContext(StartMenuContext);
  if (!ctx) throw new Error("useStartMenuContext must be used within StartMenuProvider");
  return ctx;
}

export function StartMenuProvider({ children }: { children: React.ReactNode }) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  return (
    <StartMenuContext.Provider value={{ isStartMenuOpen, setIsStartMenuOpen }}>
      {children}
    </StartMenuContext.Provider>
  );
}
