"use client";

import { useEffect } from "react";
import { ModalProvider } from "./modal";
import { useViewCount } from "@/features/view/hooks/useViewCount";

export default function Provider({ children }: { children: React.ReactNode }) {
  const { increaseViewCountOneTime } = useViewCount();
  useEffect(() => {
    increaseViewCountOneTime();
  }, [increaseViewCountOneTime]);
  return (
    <ModalProvider>
      <>{children}</>
    </ModalProvider>
  );
}
