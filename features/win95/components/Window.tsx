"use client";

import { useRef, useState, useEffect } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import { Win95WindowType, useWindowManager } from "@/features/win95/store/windowStore";

type WindowPropsType = {
  window: Win95WindowType;
};

export default function Window({ window: win }: WindowPropsType) {
  const { focusWindow, updatePosition, updateSize, closeWindow, minimizeWindow, maximizeWindow } =
    useWindowManager();
  const nodeRef = useRef<HTMLDivElement>(null);

  const [localPos, setLocalPos] = useState({ x: win.position.x, y: win.position.y });

  // Sync local position when restored from maximized state
  useEffect(() => {
    if (win.state === "normal") {
      setLocalPos({ x: win.position.x, y: win.position.y });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.state]);

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    setLocalPos({ x: data.x, y: data.y });
  };

  const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
    updatePosition(win.id, { x: data.x, y: data.y });
  };

  const handleResizeStop = (_e: React.SyntheticEvent, data: ResizeCallbackData) => {
    updateSize(win.id, { width: data.size.width, height: data.size.height });
  };

  const handleTitlebarDoubleClick = () => {
    maximizeWindow(win.id);
  };

  const titleBarBg =
    win.state === "maximized"
      ? "bg-gradient-to-r from-[#000080] to-[#1084d0]"
      : "bg-gradient-to-r from-[#000080] to-[#1084d0]";

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
        <span className="text-system-ui mr-1">{win.icon}</span>
        <span className="text-white text-system-ui font-bold truncate flex-1 font-vt323 tracking-wide">
          {win.title}
        </span>
        <div className="flex gap-0.5 ml-auto flex-shrink-0">
          <button
            className="win95-btn"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => minimizeWindow(win.id)}
            title="최소화"
          >
            _
          </button>
          <button
            className="win95-btn"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => maximizeWindow(win.id)}
            title="최대화/복원"
          >
            {win.state === "maximized" ? "❐" : "□"}
          </button>
          <button
            className="win95-btn font-bold"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => closeWindow(win.id)}
            title="닫기"
          >
            ✕
          </button>
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
      onDrag={handleDrag}
      onStop={handleDragStop}
    >
      <div
        ref={nodeRef}
        className="absolute"
        style={{ zIndex: win.zIndex }}
        onMouseDown={() => focusWindow(win.id)}
      >
        <ResizableBox
          width={win.size.width}
          height={win.size.height}
          minConstraints={[280, 200]}
          resizeHandles={["se", "e", "s", "sw", "w"]}
          onResizeStop={handleResizeStop}
        >
          {windowContent}
        </ResizableBox>
      </div>
    </Draggable>
  );
}
