"use client";

import { useState } from "react";
import NotionViewer, { type FetchStateType } from "@/components/NotionViewer";
import { Win95MenuBar, Win95StatusBar } from "../ui";

// ── Notion 설정 ──
const NOTION_PAGE_ID = "28699322f59d8060911ff907842cfffc";
const NOTION_DIRECT_URL = "https://www.notion.so/devlasbe/2025-28699322f59d8060911ff907842cfffc";

// ── 메뉴 ──
const MENU_ITEMS = ["파일(F)", "보기(V)", "도움말(H)"] as const;

export default function ResumeWindow() {
  const [fetchState, setFetchState] = useState<FetchStateType>("loading");

  return (
    <div className="flex flex-col h-full font-vt323 text-system-body">
      <Win95MenuBar items={MENU_ITEMS} />

      {/* 주소 표시줄 */}
      <div className="flex items-center gap-1 px-1 py-1 border-b border-[#808080] bg-[#c0c0c0] flex-shrink-0">
        <span className="text-system-caption px-1 shrink-0">주소(D):</span>
        <div className="flex-1 win95-sunken bg-white px-1 py-0.5 text-system-caption text-[#000080] truncate">
          {NOTION_DIRECT_URL}
        </div>
        <a
          href={NOTION_DIRECT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="win95-raised bg-[#c0c0c0] px-2 py-0.5 text-system-caption shrink-0"
        >
          새창
        </a>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 overflow-y-auto bg-white win95-sunken">
        <NotionViewer
          pageId={NOTION_PAGE_ID}
          directUrl={NOTION_DIRECT_URL}
          onStateChange={setFetchState}
        />
      </div>

      <Win95StatusBar>
        <span>{fetchState === "loading" ? "연결 중..." : fetchState === "error" ? "오류" : "완료"}</span>
      </Win95StatusBar>
    </div>
  );
}
