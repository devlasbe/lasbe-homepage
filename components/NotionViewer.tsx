"use client";

// react-notion-x 관련 CSS — NotionViewer에서만 필요하므로 여기서 import (전역 preload 방지)
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

import React, { useState, useEffect } from "react";
import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

export type FetchStateType = "loading" | "success" | "error";

type NotionViewerPropsType = {
  pageId: string;
  directUrl?: string;
  onStateChange?: (state: FetchStateType) => void;
};

const Collection = dynamic(() => import("react-notion-x/build/third-party/collection").then((m) => m.Collection));
const Code = dynamic(() => import("react-notion-x/build/third-party/code").then((m) => m.Code));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation").then((m) => m.Equation));

export default function NotionViewer({ pageId, directUrl, onStateChange }: NotionViewerPropsType) {
  const [fetchState, setFetchState] = useState<FetchStateType>("loading");
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);

  useEffect(() => {
    setFetchState("loading");
    onStateChange?.("loading");

    fetch(`/api/notion?pageId=${pageId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json() as Promise<ExtendedRecordMap>;
      })
      .then((data) => {
        setRecordMap(data);
        setFetchState("success");
        onStateChange?.("success");
      })
      .catch(() => {
        setFetchState("error");
        onStateChange?.("error");
      });
  }, [pageId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (fetchState === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-system-body">로딩 중...</span>
      </div>
    );
  }

  if (fetchState === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <span className="text-system-body">페이지를 불러올 수 없습니다.</span>
        {directUrl && (
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="win95-raised bg-[#c0c0c0] px-3 py-1 text-system-body"
          >
            Notion에서 열기
          </a>
        )}
      </div>
    );
  }

  if (!recordMap) return null;

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={false}
      darkMode={false}
      components={{
        nextImage: Image,
        nextLink: Link,
        Link: Link,
        Collection,
        Code,
        Equation,
      }}
    />
  );
}
