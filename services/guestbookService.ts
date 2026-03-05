import type {
  GuestbookGetResponseType,
  GuestbookPostResponseType,
  GuestbookDeleteResponseType,
} from "@/app/api/guestbook/guestbook.types";

export type { GuestbookEntryType } from "@/app/api/guestbook/guestbook.types";

export const guestbookService = {
  getEntries: async (): Promise<GuestbookGetResponseType> => {
    const res = await fetch("/api/guestbook");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<GuestbookGetResponseType>;
  },

  addEntry: async (name: string, password: string, comment: string): Promise<GuestbookPostResponseType> => {
    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, comment }),
    });
    const data = await res.json() as GuestbookPostResponseType | { error: string };
    if ("error" in data) throw new Error(data.error);
    return data;
  },

  deleteEntry: async (id: string, password: string): Promise<GuestbookDeleteResponseType> => {
    const res = await fetch(`/api/guestbook/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json() as GuestbookDeleteResponseType | { error: string };
    if ("error" in data) throw new Error(data.error);
    return data;
  },
};
