"use client";

import { useEffect, useRef } from "react";
import { useWindowContext } from "@/components/contexts/windowContext";
import type { WindowType } from "@/components/contexts/windowContext";
import { PUBLIC_WINDOW_CONFIGS } from "@/constants/windowConfigs";
import { SEO } from "@/constants/seo";
import { createWindow, getHistoryEntry, getMaxZIndex, getTopWindow, getViewport } from "@/hooks/useWindowManager";

/** 주소를 최상단 창(없으면 `/`)에 맞춘다. history 칸은 늘리지 않는다 */
function replaceUrlWithTopWindow(windows: WindowType[]) {
  const topWindow = getTopWindow(windows);
  const path = topWindow ? `/${topWindow.id}` : "/";
  if (window.location.pathname === path) return;
  window.history.replaceState({ ...window.history.state }, "", path);
}

export function useWindowHistory() {
  const { windows, setWindows } = useWindowContext();
  const windowsRef = useRef(windows);
  windowsRef.current = windows;
  // 뒤로 가기로 닫은 창 id. 마지막 원소가 앞으로 가기 때 먼저 다시 열 창이다
  const closedByBackRef = useRef<string[]>([]);
  // 빈 칸을 건너뛰려고 history.back()을 부른 상태. 다음 popstate는 칸 번호와 상관없이 뒤로 가기다
  const isSkippingRef = useRef(false);
  const topWindow = getTopWindow(windows);
  const topWindowId = topWindow?.id;
  const topWindowTitle = topWindow?.title;

  useEffect(function syncInitialHistoryIndex() {
    const historyIdx = getHistoryEntry().winIdx;
    if (historyIdx <= 0) return;
    setWindows((previous) => {
      const updated = previous.map((win) => win.historyIdx === 0 ? { ...win, historyIdx } : win);
      return updated;
    });
  }, [setWindows]);

  useEffect(function listenForWindowHistory() {
    const applyWindows = (nextWindows: WindowType[]) => {
      windowsRef.current = nextWindows;
      setWindows(nextWindows);
    };

    // 칸 번호 fromIdx+1 ~ toIdx 를 채울 창을 다시 연다. 뒤로 가기로 닫은 창을 우선, 없으면 칸에 적힌 창
    const reopenWindows = (current: WindowType[], fromIdx: number, toIdx: number, entryWinId: string | null) => {
      let reopened = current;
      for (let historyIdx = fromIdx + 1; historyIdx <= toIdx; historyIdx++) {
        const isEntrySlot = historyIdx === toIdx;
        const closedId = closedByBackRef.current.pop();
        const id = closedId ?? (isEntrySlot ? entryWinId : null);
        const config = PUBLIC_WINDOW_CONFIGS.find((item) => item.id === id);
        const alreadyOpen = reopened.some((win) => win.id === id);
        if (!config || alreadyOpen) continue;
        const win = createWindow(config, {
          openCount: reopened.length,
          zIndex: getMaxZIndex(reopened) + 1,
          historyIdx,
          viewport: getViewport(),
        });
        reopened = [...reopened, win];
      }
      return reopened;
    };

    const handlePopState = () => {
      const { winIdx, winId } = getHistoryEntry();
      const current = windowsRef.current;
      const maxHistoryIdx = current.reduce((max, win) => Math.max(max, win.historyIdx), 0);
      const isSkipping = isSkippingRef.current;
      isSkippingRef.current = false;

      if (winIdx < maxHistoryIdx || isSkipping) {
        // historyIdx는 화면 순서대로 매겨져 있으므로(rankHistoryIdx) 번호가 큰 창 = 위에 있는 창부터 닫힌다
        const closing = current.filter((win) => win.historyIdx > winIdx);
        const remaining = current.filter((win) => win.historyIdx <= winIdx);
        const closingTopFirst = [...closing].sort((left, right) => right.historyIdx - left.historyIdx);
        const closingIds = closingTopFirst.map((win) => win.id);
        closedByBackRef.current.push(...closingIds);
        applyWindows(remaining);
        const hasEntry = remaining.some((win) => win.historyIdx === winIdx);
        if (winIdx > 0 && !hasEntry) {
          isSkippingRef.current = true;
          window.history.back();
          return;
        }
        replaceUrlWithTopWindow(remaining);
        return;
      }

      if (winIdx > maxHistoryIdx) {
        const reopened = reopenWindows(current, maxHistoryIdx, winIdx, winId);
        applyWindows(reopened);
        replaceUrlWithTopWindow(reopened);
        return;
      }

      replaceUrlWithTopWindow(current);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [setWindows]);

  useEffect(function syncUrlWithTopWindow() {
    replaceUrlWithTopWindow(windowsRef.current);
  }, [topWindowId]);

  useEffect(function syncDocumentTitleWithTopWindow() {
    const title = topWindowTitle ? SEO.TITLE_TEMPLATE.replace("%s", topWindowTitle) : SEO.SITE_TITLE;
    document.title = title;
  }, [topWindowTitle]);
}
