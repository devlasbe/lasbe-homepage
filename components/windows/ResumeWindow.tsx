"use client";

import { useState } from "react";
import NotionViewer, { type FetchStateType } from "@/components/NotionViewer";
import { Win95MenuBar, Win95StatusBar, Win95AddressBar } from "../ui";
import { useResumeVisible } from "@/hooks/useResumeVisible";
import { Warning } from "@react95/icons";

// ── Notion 설정 ──
const NOTION_PAGE_ID = "28699322f59d8060911ff907842cfffc";
const NOTION_DIRECT_URL = "https://www.notion.so/devlasbe/2025-28699322f59d8060911ff907842cfffc";

// ── 메뉴 ──
const MENU_ITEMS = ["파일(F)", "보기(V)", "도움말(H)"] as const;

function UnderConstructionView() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 font-vt323 text-system-body select-none">
      <Warning style={{ width: 48, height: 48, display: "block" }} />
      <p className="text-system-heading font-bold text-[#000080]">공사 중입니다</p>
      <p className="text-system-caption text-[#808080]">Under Construction</p>
    </div>
  );
}

export default function ResumeWindow() {
  const { isVisible, isLoading } = useResumeVisible();
  const [fetchState, setFetchState] = useState<FetchStateType>("loading");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full font-vt323 text-system-body text-[#808080]">
        Loading...
      </div>
    );
  }

  if (!isVisible) {
    return <UnderConstructionView />;
  }

  return (
    <div className="flex flex-col h-full font-vt323 text-system-body">
      <Win95MenuBar items={MENU_ITEMS} />

      {/* 주소 표시줄 */}
      <Win95AddressBar url={NOTION_DIRECT_URL} actionLabel="새창" actionHref={NOTION_DIRECT_URL} />

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
