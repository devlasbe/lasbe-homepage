"use client";

import { useWindowContext } from "@/components/contexts/windowContext";
import { useWindowManager } from "@/hooks/useWindowManager";
import { WINDOW_CONFIGS } from "@/constants/windowConfigs";
import { Icon } from "@/components/ui/icon";

// 기본 variant가 32x32인 아이콘은 16x16 컨텍스트에서 명시적으로 지정
const TOOLBAR_ICON_VARIANT: Map<unknown, string> = new Map([
  [Icon.Wordpad, "16x16_4"],
  [Icon.Mail, "16x16_4"],
  [Icon.Explorer100, "16x16_4"],
  [Icon.Write1, "16x16_4"],
]);

export function Win95WindowToolbar() {
  const { windows } = useWindowContext();
  const { openWindow } = useWindowManager();
  const openIds = new Set(windows.filter((w) => w.state !== "minimized").map((w) => w.id));

  return (
    <div className="flex items-center gap-px px-1 py-0.5 border-b-2 border-[#808080] bg-[#c0c0c0] flex-shrink-0 flex-wrap">
      {WINDOW_CONFIGS.map((cfg) => {
        const IconComponent = cfg.icon;
        const isActive = openIds.has(cfg.id);
        return (
          <button
            key={cfg.id}
            title={cfg.label}
            aria-label={cfg.label}
            onClick={() =>
              openWindow({
                id: cfg.id,
                title: cfg.title,
                icon: cfg.icon,
                content: cfg.content,
                defaultSize: cfg.defaultSize,
              })
            }
            className={`py-1.5 px-2.5 cursor-pointer outline-none ${
              isActive ? "bg-[#a8a4a0]" : "hover:bg-[#d0ccc8]"
            }`}
          >
            <IconComponent style={{ width: 16, height: 16, display: "block" }} variant={TOOLBAR_ICON_VARIANT.get(cfg.icon)} />
          </button>
        );
      })}
    </div>
  );
}
