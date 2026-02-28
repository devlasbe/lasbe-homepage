"use client";

import { useState } from "react";

type DesktopIconPropsType = {
  icon: string;
  label: string;
  onDoubleClick: () => void;
};

export default function DesktopIcon({ icon, label, onDoubleClick }: DesktopIconPropsType) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(true);
  };

  const handleDoubleClick = () => {
    setSelected(false);
    onDoubleClick();
  };

  const handleBlur = () => {
    setSelected(false);
  };

  // 모바일: 단일 탭으로 바로 열기 (더블탭 불필요)
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    onDoubleClick();
  };

  return (
    <div
      className="flex flex-col items-center gap-0.5 w-20 md:w-24 cursor-pointer select-none"
      tabIndex={0}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={handleTouchEnd}
      onBlur={handleBlur}
    >
      <div
        className={`text-system-desktop-icon leading-none p-1 ${selected ? "bg-[#000080] opacity-80" : ""}`}
        style={{ filter: selected ? "brightness(0.7) sepia(1) hue-rotate(180deg)" : "none" }}
      >
        {icon}
      </div>
      <span
        className={`text-center text-white text-system-ui leading-tight font-vt323 break-words w-full px-0.5 ${
          selected ? "bg-[#000080]" : "bg-transparent"
        }`}
        style={{
          textShadow: selected ? "none" : "1px 1px 0 #000000",
        }}
      >
        {label}
      </span>
    </div>
  );
}
