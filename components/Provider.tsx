"use client";

import { useEffect } from "react";
import { Provider as JotaiProvider } from "jotai";
import { useViewCount } from "@/hooks/useViewCount";

function ViewCountInitializer() {
  const { increaseViewCountOneTime } = useViewCount();
  useEffect(() => {
    increaseViewCountOneTime();
  }, [increaseViewCountOneTime]);
  return null;
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <>
        <ViewCountInitializer />
        {children}
      </>
    </JotaiProvider>
  );
}
