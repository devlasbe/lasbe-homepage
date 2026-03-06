"use client";

import { useConfigContext } from "@/components/contexts/configContext";

export const useResumeVisible = () => {
  const config = useConfigContext();

  return {
    isVisible: config?.isVisibleResume ?? null,
    isLoading: config === null,
  };
};
