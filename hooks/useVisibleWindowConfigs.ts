"use client";

import { WINDOW_CONFIGS } from "@/constants/windowConfigs";
import { useConfigContext } from "@/components/contexts/configContext";
import type { AppConfigType } from "@/components/contexts/configContext";

// config 플래그로 노출 여부를 제어하는 윈도우 id 매핑
const CONFIG_GATED_WINDOWS: Partial<Record<string, keyof AppConfigType>> = {
  notion: "isVisibleResume",
  "notion-render-test": "isVisibleNotionTest",
};

/** config 게이팅을 통과한 윈도우 설정만 반환 (로딩 중에는 게이팅 대상 숨김) */
export const useVisibleWindowConfigs = () => {
  const config = useConfigContext();

  return WINDOW_CONFIGS.filter((cfg) => {
    const key = CONFIG_GATED_WINDOWS[cfg.id];
    return !key || config?.[key] === true;
  });
};
