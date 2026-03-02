"use client";

import { date } from "@/utils/date";
import { fetchService } from "@/services/fetchService";
import { useCallback } from "react";

const countHistory = {
  get: () => localStorage.getItem("viewCount"),
  set: () => localStorage.setItem("viewCount", date.todayDate),
};

export const useViewCount = () => {
  const increaseViewCount = useCallback(async () => {
    await fetchService.post<{ success: boolean }>("/api/view/increment");
  }, []);

  // 마지막 방문 시간에서 정각을 넘어가지 않으면 집계하지 않음
  const increaseViewCountOneTime = useCallback(async () => {
    const history = countHistory.get();
    if (history) {
      const diff = date.calcBetweenDate(history, date.todayDate);
      if (!diff) return;
    }
    await increaseViewCount();
    countHistory.set();
  }, [increaseViewCount]);

  const getTodayViewCount = useCallback(async () => {
    const data = await fetchService.get<{ count: number }>("/api/view/today");
    return data.count;
  }, []);

  const getAllViewCount = useCallback(async () => {
    const data = await fetchService.get<{ total: number }>("/api/view/total");
    return data.total;
  }, []);

  return {
    increaseViewCount,
    increaseViewCountOneTime,
    getTodayViewCount,
    getAllViewCount,
  };
};
