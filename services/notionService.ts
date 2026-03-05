import type { ExtendedRecordMap } from "notion-types";

export const notionService = {
  getPage: async (pageId: string): Promise<ExtendedRecordMap> => {
    const res = await fetch(`/api/notion?pageId=${pageId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<ExtendedRecordMap>;
  },
};
