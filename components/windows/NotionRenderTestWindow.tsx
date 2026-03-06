"use client";

import { useState } from "react";
import NotionViewer, { type FetchStateType } from "@/components/NotionViewer";
import { Win95StatusBar, Win95AddressBar } from "../ui";

// ── Notion 설정 ──
const NOTION_PAGE_ID = "31b99322f59d803ea7acf61175e33b6b";
const NOTION_DIRECT_URL =
  "https://www.notion.so/devlasbe/Notion-Render-Test-Page-31b99322f59d803ea7acf61175e33b6b";

export default function NotionRenderTestWindow() {
  const [fetchState, setFetchState] = useState<FetchStateType>("loading");

  return (
    <div className="flex flex-col h-full text-system-body">
      <Win95AddressBar
        url={NOTION_DIRECT_URL}
        actionLabel="새창"
        actionHref={NOTION_DIRECT_URL}
      />

      <div className="flex-1 overflow-y-auto bg-white win95-sunken">
        <NotionViewer
          pageId={NOTION_PAGE_ID}
          directUrl={NOTION_DIRECT_URL}
          onStateChange={setFetchState}
        />
      </div>

      <Win95StatusBar>
        <span>
          {fetchState === "loading"
            ? "연결 중..."
            : fetchState === "error"
              ? "오류"
              : "완료"}
        </span>
      </Win95StatusBar>
    </div>
  );
}
