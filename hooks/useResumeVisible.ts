"use client";

import { fetchService } from "@/services/fetchService";
import { useEffect, useState } from "react";

export const useResumeVisible = () => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchService
      .get<{ isVisible: boolean }>("/api/config/resume-visible")
      .then((data) => setIsVisible(data.isVisible))
      .catch(() => setIsVisible(false))
      .finally(() => setIsLoading(false));
  }, []);

  return { isVisible, isLoading };
};
