"use client";

import React, { useState, useEffect } from "react";
import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";
import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import { Equation } from "react-notion-x/build/third-party/equation";
import { Modal } from "react-notion-x/build/third-party/modal";
import { Pdf } from "react-notion-x/build/third-party/pdf";

import Link from "next/link";
import Image from "next/image";
import { notionService } from "@/services/notionService";

export type FetchStateType = "loading" | "success" | "error";

type NotionViewerPropsType = {
  pageId: string;
  directUrl?: string;
  onStateChange?: (state: FetchStateType) => void;
};

export default function NotionViewer({ pageId, directUrl, onStateChange }: NotionViewerPropsType) {
  const [fetchState, setFetchState] = useState<FetchStateType>("loading");
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);

  useEffect(() => {
    setFetchState("loading");
    onStateChange?.("loading");

    notionService
      .getPage(pageId)
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
            className="win95-raised bg-gray-300 px-3 py-1 text-system-body"
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
        Modal,
        Pdf,
      }}
    />
  );
}
