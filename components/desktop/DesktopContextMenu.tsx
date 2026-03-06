"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/constants/profile";
import { project } from "@/constants/project";

// ── 메뉴 항목 ──
const LINK_ITEMS = [
  { label: "블로그 이동", href: profile.blog.url },
  { label: "깃허브 이동", href: profile.github.url },
  { label: "오픈프차 이동", href: project.OPEN_FRANCHISE.link },
];

type DesktopContextMenuPropsType = {
  x: number;
  y: number;
  onClose: () => void;
  onResetIcons: () => void;
};

export default function DesktopContextMenu({
  x,
  y,
  onClose,
  onResetIcons,
}: DesktopContextMenuPropsType) {
  const menuRef = useRef<HTMLDivElement>(null);

  // 화면 경계 보정
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const { offsetWidth: w, offsetHeight: h } = menu;
    let left = x;
    let top = y;
    if (left + w > window.innerWidth) left = window.innerWidth - w - 4;
    if (top + h > window.innerHeight) top = window.innerHeight - h - 4;
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }, [x, y]);

  // 외부 클릭 시 닫힘
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed win95-raised bg-[#c0c0c0] min-w-[140px] shadow-lg"
      style={{ left: x, top: y, zIndex: 10000 }}
    >
      {LINK_ITEMS.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-3 py-1 text-left text-system-caption hover:bg-[#000080] hover:text-white"
          onClick={onClose}
        >
          {label}
        </a>
      ))}

      {/* Divider */}
      <div className="my-1 mx-2 border-t border-[#808080] border-b border-b-white" />

      <button
        className="flex items-center w-full px-3 py-1 text-left text-system-caption hover:bg-[#000080] hover:text-white"
        onClick={() => {
          onClose();
          onResetIcons();
        }}
      >
        아이콘 정렬
      </button>
    </div>
  );
}
