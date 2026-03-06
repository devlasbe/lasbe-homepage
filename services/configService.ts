import type { AppConfigResponseType } from "@/app/api/config/config.types";

export const configService = {
  getConfig: async (): Promise<AppConfigResponseType> => {
    const res = await fetch("/api/config");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<AppConfigResponseType>;
  },
};
