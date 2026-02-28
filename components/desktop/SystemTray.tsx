"use client";

import { useState, useEffect } from "react";
import { useViewCount } from "@/hooks/useViewCount";

export default function SystemTray() {
  const [time, setTime] = useState("");
  const [counts, setCounts] = useState<{ today?: number; total?: number }>({});
  const { getTodayViewCount, getAllViewCount } = useViewCount();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getTodayViewCount().then((today) => setCounts((prev) => ({ ...prev, today })));
    getAllViewCount().then((total) => setCounts((prev) => ({ ...prev, total })));
  }, [getTodayViewCount, getAllViewCount]);

  return (
    <div className="win95-sunken flex items-center gap-2 px-2 h-8 ml-auto text-system-caption font-vt323">
      <span className="hidden sm:flex items-center gap-1">
        <span>👁</span>
        <span>
          {counts.today ?? "-"} / {counts.total ?? "-"}
        </span>
      </span>
      <span className="hidden sm:block w-px h-4 bg-[#808080]" />
      <span className="text-system-body">{time}</span>
    </div>
  );
}
