"use client";

import { useEffect } from "react";
import { useViewCount } from "@/hooks/useViewCount";
import { WindowProvider } from "@/components/contexts/windowContext";
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
      <WindowProvider>
        <StartMenuProvider>
          <ViewCountInitializer />
          {children}
        </StartMenuProvider>
      </WindowProvider>
    </ConfigProvider>
  );
}
