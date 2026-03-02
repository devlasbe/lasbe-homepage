"use client";

import { useState } from "react";
import { Win95MenuBar, Win95StatusBar, Win95AddressBar } from "../ui";

// ── 블로그 설정 ──
const BLOG_URL = "https://lasbe.tistory.com";

// ── 메뉴 ──
const MENU_ITEMS = ["파일(F)", "보기(V)", "도움말(H)"] as const;

type LoadStateType = "loading" | "loaded" | "error";

export default function BlogWindow() {
  const [iframeKey, setIframeKey] = useState(0);
  const [loadState, setLoadState] = useState<LoadStateType>("loading");

  const handleRefresh = () => {
    setLoadState("loading");
    setIframeKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col h-full font-vt323 text-system-body">
      <Win95MenuBar items={MENU_ITEMS} />

      {/* 주소 표시줄 */}
      <Win95AddressBar
        url={BLOG_URL}
        showNavButtons
        onRefresh={handleRefresh}
        actionLabel="새창"
        actionHref={BLOG_URL}
      />

      {/* iframe 콘텐츠 영역 */}
      <div className="flex-1 relative bg-white win95-sunken overflow-hidden">
        {loadState === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <span className="text-system-body">연결 중...</span>
          </div>
        )}
        {loadState === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 gap-3 p-4 text-center">
            <span className="text-system-icon-lg">🌐</span>
            <p className="text-system-body">페이지를 표시할 수 없습니다.</p>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="win95-raised bg-[#c0c0c0] px-4 py-1 text-system-body"
            >
              새창으로 열기
            </a>
          </div>
        )}
        <iframe
          key={iframeKey}
          src={BLOG_URL}
          className="w-full h-full border-none"
          onLoad={() => setLoadState("loaded")}
          onError={() => setLoadState("error")}
          title="lasbe 블로그"
        />
      </div>

      <Win95StatusBar>
        <span>
          {loadState === "loading" ? "연결 중..." : loadState === "error" ? "오류" : "완료"}
        </span>
      </Win95StatusBar>
    </div>
  );
}
