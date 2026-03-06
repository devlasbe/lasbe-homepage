"use client";

import { useState } from "react";
import type { ComponentType, SVGProps } from "react";

type DesktopIconPropsType = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  onDoubleClick: () => void;
};

export default function DesktopIcon({ icon: IconComponent, label, onDoubleClick }: DesktopIconPropsType) {
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
      <div className={`p-1 ${selected ? "bg-blue-900 opacity-80" : ""}`}>
        <IconComponent style={{ width: 32, height: 32, display: "block" }} />
      </div>
      <span
        className={`text-center text-white text-system-ui leading-tight break-words w-full px-0.5 ${
          selected ? "bg-blue-900" : "bg-transparent"
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
