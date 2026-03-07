"use client";

import { useState } from "react";
import NotionViewer, { type FetchStateType } from "@/components/NotionViewer";
import { Win95StatusBar, Win95AddressBar } from "../ui";
import { NOTION_PAGES } from "@/constants/notionPages";

export default function NotionRenderTestWindow() {
  const [fetchState, setFetchState] = useState<FetchStateType>("loading");

  return (
    <div className="flex flex-col h-full text-system-body">
      <Win95AddressBar
        url={NOTION_PAGES.renderTest.url}
        actionLabel="새창"
        actionHref={NOTION_PAGES.renderTest.url}
      />

      <div className="flex-1 overflow-y-auto bg-white win95-sunken">
        <NotionViewer
          notionUrl={NOTION_PAGES.renderTest.url}
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
