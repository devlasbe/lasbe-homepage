"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { configService } from "@/services/configService";

export type AppConfigType = {
  isVisibleResume: boolean;
  isVisibleNotionTest: boolean;
};

const DEFAULT_CONFIG: AppConfigType = {
  isVisibleResume: false,
  isVisibleNotionTest: false,
};

const ConfigContext = createContext<AppConfigType | null>(null);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfigType | null>(null);

  useEffect(() => {
    configService
      .getConfig()
      .then((data) =>
        setConfig({
          isVisibleResume: data.is_visible_resume,
          isVisibleNotionTest: data.is_visible_notion_test,
        })
      )
      .catch(() => setConfig(DEFAULT_CONFIG));
  }, []);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export function useConfigContext(): AppConfigType | null {
  return useContext(ConfigContext);
}
