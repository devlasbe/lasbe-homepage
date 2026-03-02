"use client";

import { useCallback, useState } from "react";

export type GuestbookEntryType = {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
};

export function useGuestbook() {
  const [entries, setEntries] = useState<GuestbookEntryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/guestbook");
      const data = (await res.json()) as { entries: GuestbookEntryType[] } | { error: string };
      if ("error" in data) {
        setError(data.error);
      } else {
        setEntries(data.entries);
      }
    } catch {
      setError("목록을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addEntry = useCallback(
    async (name: string, password: string, comment: string): Promise<boolean> => {
      setIsSubmitting(true);
      setError(null);
      try {
        const res = await fetch("/api/guestbook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password, comment }),
        });
        const data = (await res.json()) as { id: string; success: boolean } | { error: string };
        if ("error" in data) {
          setError(data.error);
          return false;
        }
        await fetchEntries();
        return true;
      } catch {
        setError("등록에 실패했습니다.");
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [fetchEntries]
  );

  const deleteEntry = useCallback(
    async (id: string, password: string): Promise<{ success: boolean; error?: string }> => {
      try {
        const res = await fetch(`/api/guestbook/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        const data = (await res.json()) as { success: boolean } | { error: string };
        if ("error" in data) {
          return { success: false, error: data.error };
        }
        setEntries((prev) => prev.filter((e) => e.id !== id));
        return { success: true };
      } catch {
        return { success: false, error: "삭제에 실패했습니다." };
      }
    },
    []
  );

  return { entries, isLoading, isSubmitting, error, fetchEntries, addEntry, deleteEntry };
}
