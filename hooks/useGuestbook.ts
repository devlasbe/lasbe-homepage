"use client";

import { useCallback, useState } from "react";
import { guestbookService } from "@/services/guestbookService";
import type { GuestbookEntryType } from "@/services/guestbookService";

export type { GuestbookEntryType };

export function useGuestbook() {
  const [entries, setEntries] = useState<GuestbookEntryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await guestbookService.getEntries();
      setEntries(data.entries);
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
        await guestbookService.addEntry(name, password, comment);
        await fetchEntries();
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : "등록에 실패했습니다.";
        setError(message);
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
        await guestbookService.deleteEntry(id, password);
        setEntries((prev) => prev.filter((e) => e.id !== id));
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : "삭제에 실패했습니다.";
        return { success: false, error: message };
      }
    },
    []
  );

  return { entries, isLoading, isSubmitting, error, fetchEntries, addEntry, deleteEntry };
}
