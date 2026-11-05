"use client";

import { useEffect } from "react";
import { useViewCount } from "@/hooks/useViewCount";
import { StartMenuProvider } from "@/components/contexts/startMenuContext";
import { ConfigProvider } from "@/components/contexts/configContext";

function ViewCountInitializer() {
  const { increaseViewCountOneTime } = useViewCount();
  useEffect(() => {
    increaseViewCountOneTime();
  }, [increaseViewCountOneTime]);
  return null;
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <StartMenuProvider>
        <ViewCountInitializer />
        {children}
      </StartMenuProvider>
    </ConfigProvider>
  );
}
