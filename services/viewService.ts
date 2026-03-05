import type {
  TodayViewCountResponseType,
  TotalViewCountResponseType,
  IncrementResponseType,
} from "@/app/api/view/view.types";

const get = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
};

export const viewService = {
  getToday: () => get<TodayViewCountResponseType>("/api/view/today"),
  getTotal: () => get<TotalViewCountResponseType>("/api/view/total"),
  increment: async (): Promise<IncrementResponseType> => {
    const res = await fetch("/api/view/increment", { method: "POST" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<IncrementResponseType>;
  },
};
