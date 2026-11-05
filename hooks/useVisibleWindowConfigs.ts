"use client";

import { CONFIG_GATED_WINDOWS, WINDOW_CONFIGS } from "@/constants/windowConfigs";
import { useConfigContext } from "@/components/contexts/configContext";
/** config 게이팅을 통과한 윈도우 설정만 반환 (로딩 중에는 게이팅 대상 숨김) */
export const useVisibleWindowConfigs = () => {
  const config = useConfigContext();

  return WINDOW_CONFIGS.filter((cfg) => {
    const key = CONFIG_GATED_WINDOWS[cfg.id];
    return !key || config?.[key] === true;
  });
};
