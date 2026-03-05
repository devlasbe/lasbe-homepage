import type { ResumeVisibleResponseType } from "@/app/api/config/config.types";

export const configService = {
  getResumeVisible: async (): Promise<ResumeVisibleResponseType> => {
    const res = await fetch("/api/config");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<ResumeVisibleResponseType>;
  },
};
