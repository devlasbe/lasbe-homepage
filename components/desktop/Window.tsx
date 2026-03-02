"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import { useAtomValue } from "jotai";
import { Win95WindowType, windowsAtom } from "@/atoms/window";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Win95Button from "@/components/ui/Win95Button";

type WindowPropsType = {
  window: Win95WindowType;
};

export default function Window({ window: win }: WindowPropsType) {
  const { focusWindow, updatePosition, updateSize, closeWindow, minimizeWindow, maximizeWindow } =
    useWindowManager();
  const windows = useAtomValue(windowsAtom);
  const { isMobile, isTablet } = useBreakpoint();
  const nodeRef = useRef<HTMLDivElement>(null);
  const resizeOriginRef = useRef<{ x: number; width: number } | null>(null);

  const [localPos, setLocalPos] = useState({ x: win.position.x, y: win.position.y });

  // Sync local position when restored from maximized state
  useEffect(() => {
    if (win.state === "normal") {
      setLocalPos({ x: win.position.x, y: win.position.y });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.state]);

  const handleDragStart = () => {
    focusWindow(win.id);
  };

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    setLocalPos({ x: data.x, y: data.y });
  };

  const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
    updatePosition(win.id, { x: data.x, y: data.y });
  };

  const handleResizeStart = (_e: React.SyntheticEvent, data: ResizeCallbackData) => {
    focusWindow(win.id);
    if (data.handle === "w" || data.handle === "sw") {
      resizeOriginRef.current = { x: localPos.x, width: win.size.width };
    }
  };

  const handleResize = useCallback((_e: React.SyntheticEvent, data: ResizeCallbackData) => {
    if ((data.handle === "w" || data.handle === "sw") && resizeOriginRef.current) {
      const deltaW = data.size.width - resizeOriginRef.current.width;
      setLocalPos((prev) => ({ ...prev, x: resizeOriginRef.current!.x - deltaW }));
    }
  }, []);

  const handleResizeStop = (_e: React.SyntheticEvent, data: ResizeCallbackData) => {
    if ((data.handle === "w" || data.handle === "sw") && resizeOriginRef.current) {
      const deltaW = data.size.width - resizeOriginRef.current.width;
      const newX = resizeOriginRef.current.x - deltaW;
      updatePosition(win.id, { x: newX, y: localPos.y });
      resizeOriginRef.current = null;
    }
    updateSize(win.id, { width: data.size.width, height: data.size.height });
  };

  const handleTitlebarDoubleClick = () => {
    maximizeWindow(win.id);
  };

  const isFocused = win.zIndex === Math.max(...windows.map((w) => w.zIndex));
  const titleBarBg = isFocused
    ? "bg-gradient-to-r from-[#000080] to-[#1084d0]"
    : "bg-[#7b7b7b]";
  const titleBarText = isFocused ? "text-white" : "text-[#c0c0c0]";

  const windowContent = (
    <div
      className="win95-window-border win95-raised bg-[#c0c0c0] flex flex-col"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Title bar */}
      <div
        className={`win95-titlebar flex items-center px-1 py-0.5 gap-1 select-none cursor-default flex-shrink-0 ${titleBarBg}`}
        onDoubleClick={handleTitlebarDoubleClick}
      >
        <win.icon style={{ width: 16, height: 16, display: "block", flexShrink: 0 }} />
        <span className={`${titleBarText} text-system-ui font-bold truncate flex-1 font-vt323 tracking-wide`}>
          {win.title}
        </span>
        <div className="flex gap-0.5 ml-auto flex-shrink-0">
          {!isMobile && (
            <Win95Button
              size="sm"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => minimizeWindow(win.id)}
              title="최소화"
            >
              _
            </Win95Button>
          )}
          {!isMobile && (
            <Win95Button
              size="sm"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => maximizeWindow(win.id)}
              title="최대화/복원"
            >
              {win.state === "maximized" ? "❐" : "□"}
            </Win95Button>
          )}
          <Win95Button
            size="sm"
            weight="bold"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => closeWindow(win.id)}
            title="닫기"
          >
            ✕
          </Win95Button>
        </div>
      </div>
      {/* Content area */}
      <div className="flex-1 overflow-auto p-1 bg-[#c0c0c0]">{win.content}</div>
    </div>
  );

  if (win.state === "maximized") {
    return (
      <div
        className="absolute top-0 left-0 right-0 bottom-12"
        style={{ zIndex: win.zIndex }}
        onMouseDown={() => focusWindow(win.id)}
      >
        {windowContent}
      </div>
    );
  }

  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLElement>}
      handle=".win95-titlebar"
      bounds="parent"
      position={localPos}
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
      disabled={isMobile}
    >
      <div
        ref={nodeRef}
        className="absolute"
        style={{ zIndex: win.zIndex }}
        onMouseDown={() => focusWindow(win.id)}
      >
        {isTablet ? (
          <div style={{ width: win.size.width, height: win.size.height }}>{windowContent}</div>
        ) : (
          <ResizableBox
            width={win.size.width}
            height={win.size.height}
            minConstraints={[280, 200]}
            resizeHandles={["se", "e", "s", "sw", "w"]}
            onResizeStart={handleResizeStart}
            onResize={handleResize}
            onResizeStop={handleResizeStop}
          >
            {windowContent}
          </ResizableBox>
        )}
      </div>
    </Draggable>
  );
}
