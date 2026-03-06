"use client";

import { createRef, useRef, useState } from "react";
import Draggable, { type DraggableEvent, type DraggableData } from "react-draggable";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useIconPositions } from "@/hooks/useIconPositions";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import BootScreen from "./BootScreen";
import { WINDOW_CONFIGS } from "@/constants/windowConfigs";
import DesktopIcon from "./DesktopIcon";
import DesktopContextMenu from "./DesktopContextMenu";
import Window from "./Window";
import Taskbar from "./Taskbar";
import SpaceBackground from "./SpaceBackground";

// WINDOW_CONFIGS는 정적 상수이므로 모듈 스코프에서 refs 배열 생성 가능
const iconNodeRefs = WINDOW_CONFIGS.map(() => createRef<HTMLDivElement>());

export default function Desktop() {
  const { windows, openWindow } = useWindowManager();
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [liveDragPos, setLiveDragPos] = useState<{ id: string; x: number; y: number } | null>(null);
  const { isMobile } = useBreakpoint();
  const { getPosition, updatePosition, resetPositions, isReady, windowHeight } = useIconPositions();
  useKeyboardShortcuts();
  // 아이콘 id별 드래그 발생 여부 추적 (re-render 없이 관리)
  const draggedRef = useRef<Set<string>>(new Set());

  function getCurrentPos(id: string, index: number) {
    if (liveDragPos?.id === id) return { x: liveDragPos.x, y: liveDragPos.y };
    return getPosition(id, index);
  }

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden">
      {/* Desktop area */}
      <div
        className="relative flex-1 bg-black overflow-hidden"
        onContextMenu={(e) => {
          if (isMobile) return;
          e.preventDefault();
          setContextMenuPos({ x: e.clientX, y: e.clientY });
        }}
      >
        {/* 우주 배경 — 최하단 레이어 */}
        <SpaceBackground />
        {/* 모바일: 기존 중앙 그리드 레이아웃 유지 */}
        {isMobile && (
          <div className="absolute inset-0 flex flex-wrap justify-center content-start gap-6 pt-10 px-6">
            {WINDOW_CONFIGS.map((cfg) => (
              <DesktopIcon
                key={cfg.id}
                icon={cfg.icon}
                label={cfg.label}
                onDoubleClick={() => openWindow({ ...cfg, content: cfg.content })}
              />
            ))}
          </div>
        )}

        {/* 태블릿/데스크톱: 절대 좌표 + Draggable */}
        {!isMobile && isReady && (
          <>
            {WINDOW_CONFIGS.map((cfg, index) => {
              const nodeRef = iconNodeRefs[index];
              return (
                <Draggable
                  key={`${cfg.id}-${windowHeight}`}
                  nodeRef={nodeRef as React.RefObject<HTMLElement>}
                  bounds="parent"
                  position={getCurrentPos(cfg.id, index)}
                  onStart={(_e: DraggableEvent, _data: DraggableData) => {
                    draggedRef.current.delete(cfg.id);
                  }}
                  onDrag={(_e: DraggableEvent, data: DraggableData) => {
                    draggedRef.current.add(cfg.id);
                    setLiveDragPos({ id: cfg.id, x: data.x, y: data.y });
                  }}
                  onStop={(_e: DraggableEvent, data: DraggableData) => {
                    if (draggedRef.current.has(cfg.id)) {
                      updatePosition(cfg.id, { x: data.x, y: data.y });
                      draggedRef.current.delete(cfg.id);
                    }
                    setLiveDragPos(null);
                  }}
                >
                  <div ref={nodeRef} className="absolute">
                    <DesktopIcon
                      icon={cfg.icon}
                      label={cfg.label}
                      onDoubleClick={() => {
                        if (!draggedRef.current.has(cfg.id)) {
                          openWindow({ ...cfg, content: cfg.content });
                        }
                        draggedRef.current.delete(cfg.id);
                      }}
                    />
                  </div>
                </Draggable>
              );
            })}
          </>
        )}

        {/* Context menu */}
        {contextMenuPos && (
          <DesktopContextMenu
            x={contextMenuPos.x}
            y={contextMenuPos.y}
            onClose={() => setContextMenuPos(null)}
            onResetIcons={() => {
              resetPositions();
              setLiveDragPos(null);
            }}
          />
        )}

        {/* Open windows */}
        {windows
          .filter((w) => w.state !== "minimized")
          .map((w) => (
            <Window key={w.id} window={w} />
          ))}
      </div>

      {/* Taskbar */}
      <Taskbar />

      {!isBootComplete && <BootScreen onComplete={() => setIsBootComplete(true)} />}
    </div>
  );
}
