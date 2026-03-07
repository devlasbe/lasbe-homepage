"use client";

import { useState } from "react";
import NotionViewer, { type FetchStateType } from "@/components/NotionViewer";
import { Win95StatusBar, Win95AddressBar } from "../ui";
import { useResumeVisible } from "@/hooks/useResumeVisible";
import { Icon } from "@/components/ui/icon";
import { RESUME_NOTION_URL } from "@/constants/notionPages";

function UnderConstructionView() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-system-body select-none">
      <Icon.Warning style={{ width: 48, height: 48, display: "block" }} />
      <p className="text-system-heading font-bold text-blue-900">공사 중입니다</p>
      <p className="text-system-caption text-gray-500">Under Construction</p>
    </div>
  );
}

export default function ResumeWindow() {
  const { isVisible, isLoading } = useResumeVisible();
  const [fetchState, setFetchState] = useState<FetchStateType>("loading");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-system-body text-gray-500">
        Loading...
      </div>
    );
  }

  if (!isVisible) {
    return <UnderConstructionView />;
  }

  return (
    <div className="flex flex-col h-full text-system-body">
      {/* 주소 표시줄 */}
      <Win95AddressBar url={RESUME_NOTION_URL} actionLabel="새창" actionHref={RESUME_NOTION_URL} />

      {/* 콘텐츠 영역 */}
      <div className="flex-1 overflow-y-auto bg-white win95-sunken">
        <NotionViewer
          notionUrl={RESUME_NOTION_URL}
          onStateChange={setFetchState}
        />
      </div>

      <Win95StatusBar>
        <span>{fetchState === "loading" ? "연결 중..." : fetchState === "error" ? "오류" : "완료"}</span>
      </Win95StatusBar>
    </div>
  );
}
