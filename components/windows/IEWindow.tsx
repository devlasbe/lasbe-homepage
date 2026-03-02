"use client";

import Link from "next/link";
import { favoritesData } from "@/constants/portfolio";
import { Win95MenuBar, Win95StatusBar, Win95AddressBar } from "../ui";

// ── 메뉴 ──
const MENU_ITEMS = ["파일(F)", "편집(E)", "보기(V)", "즐겨찾기(A)", "도움말(H)"] as const;

export default function IEWindow() {
  return (
    <div className="flex flex-col h-full font-vt323 text-system-body">
      <Win95MenuBar items={MENU_ITEMS} />

      {/* Navigation bar */}
      <Win95AddressBar url="http://lasbe.kr/favorites" showNavButtons />

      {/* Favorites toolbar */}
      <div className="flex items-center gap-1 px-2 py-0.5 border-b border-[#808080] bg-[#c0c0c0] text-system-caption flex-shrink-0 overflow-x-auto">
        <span className="text-[#808080] shrink-0">즐겨찾기:</span>
        {favoritesData.map((fav) => (
          <Link
            key={fav.label}
            href={fav.url}
            target="_blank"
            className="win95-raised bg-[#c0c0c0] px-2 py-0.5 flex items-center gap-1 shrink-0"
          >
            <span>{fav.icon}</span>
            <span>{fav.label}</span>
          </Link>
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto bg-white win95-sunken">
        {/* IE-style page header */}
        <div className="bg-[#000080] text-white px-4 py-3 flex items-center gap-2">
          <span className="text-system-icon-md">🌐</span>
          <div>
            <p className="font-bold">장성우의 즐겨찾기</p>
            <p className="text-system-caption opacity-75">Lasbe - Internet Explorer 5.0</p>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {favoritesData.map((fav) => (
            <Link
              key={fav.label}
              href={fav.url}
              target="_blank"
              className="items-center gap-3 p-2 win95-raised bg-[#c0c0c0] hover:bg-[#d0d0d0] block"
            >
              <span className="text-system-icon-md">{fav.icon}</span>
              <div>
                <p className="font-bold text-system-body">{fav.label}</p>
                <p className="text-system-caption text-[#808080]">{fav.desc}</p>
                <p className="text-system-caption text-[#000080] underline">{fav.url}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="px-4 pb-4 text-system-caption text-[#808080] text-center">
          <p>이 페이지는 LASBE OS 95 Internet Explorer에 최적화되어 있습니다.</p>
          <p>© 1995 Lasbe. All rights reserved.</p>
        </div>
      </div>

      <Win95StatusBar><span>완료</span><span>🌐 인터넷</span></Win95StatusBar>
    </div>
  );
}
