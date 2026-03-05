"use client";

import { date } from "@/utils/date";
import { viewService } from "@/services/viewService";
import { useCallback } from "react";

const countHistory = {
  get: () => localStorage.getItem("viewCount"),
  set: () => localStorage.setItem("viewCount", date.todayDate),
};

export const useViewCount = () => {
  const increaseViewCount = useCallback(async () => {
    await viewService.increment();
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
    try {
      const data = await viewService.getToday();
      return data.count;
    } catch {
      return null;
    }
  }, []);

  const getAllViewCount = useCallback(async () => {
    try {
      const data = await viewService.getTotal();
      return data.total;
    } catch {
      return null;
    }
  }, []);

  return {
    increaseViewCount,
    increaseViewCountOneTime,
    getTodayViewCount,
    getAllViewCount,
  };
};
