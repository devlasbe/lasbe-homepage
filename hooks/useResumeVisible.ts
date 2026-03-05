"use client";

import { configService } from "@/services/configService";
import { useEffect, useState } from "react";

export const useResumeVisible = () => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    configService
      .getResumeVisible()
      .then((data) => setIsVisible(data.is_visible_resume))
      .catch(() => setIsVisible(false))
      .finally(() => setIsLoading(false));
  }, []);

  return { isVisible, isLoading };
};
