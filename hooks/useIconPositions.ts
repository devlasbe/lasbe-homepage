"use client";

import { useState, useEffect, useCallback } from "react";

const LS_KEY = "win95-icon-positions";
const ICON_START_X = 16;
const ICON_START_Y = 16;
const ICON_CELL_HEIGHT = 104; // 아이콘(~56px) + 라벨(~32px) + 간격(16px)

type PositionType = { x: number; y: number };
type IconPositionMapType = Record<string, PositionType>;

function getDefaultPosition(index: number): PositionType {
  return { x: ICON_START_X, y: ICON_START_Y + index * ICON_CELL_HEIGHT };
}

function loadPositions(): IconPositionMapType {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || Array.isArray(parsed) || !parsed) return {};
    return parsed as IconPositionMapType;
  } catch {
    return {};
  }
}

function savePositions(positions: IconPositionMapType): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(positions));
  } catch {}
}

export function useIconPositions() {
  const [positions, setPositions] = useState<IconPositionMapType>({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setPositions(loadPositions());
    setIsReady(true);
  }, []);

  // 저장된 위치가 없으면 index 기반 기본값 반환 (신규 아이콘 추가 대응)
  const getPosition = useCallback(
    (id: string, index: number): PositionType =>
      positions[id] ?? getDefaultPosition(index),
    [positions]
  );

  const updatePosition = useCallback((id: string, pos: PositionType) => {
    setPositions((prev) => {
      const next = { ...prev, [id]: pos };
      savePositions(next);
      return next;
    });
  }, []);

  return { getPosition, updatePosition, isReady };
}
