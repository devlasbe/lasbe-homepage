"use client";

import { createRef, useRef } from "react";
import { useAtom } from "jotai";
import Draggable, { type DraggableEvent, type DraggableData } from "react-draggable";
import { useWindowManager, isBootCompleteAtom } from "@/features/win95/store/windowStore";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useIconPositions } from "@/features/win95/hooks/useIconPositions";
import { useKeyboardShortcuts } from "@/features/win95/hooks/useKeyboardShortcuts";
import BootScreen from "./BootScreen";
import { WIN95_WINDOW_CONFIGS } from "@/features/win95/constants";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import NotepadWindow from "./windows/NotepadWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import CareerWindow from "./windows/CareerWindow";
import SystemWindow from "./windows/SystemWindow";
import MailWindow from "./windows/MailWindow";
import IEWindow from "./windows/IEWindow";
import ReadmeWindow from "./windows/ReadmeWindow";
import GithubWindow from "./windows/GithubWindow";
import SpaceBackground from "./SpaceBackground";

const WINDOW_CONTENT_MAP: Record<string, React.ReactNode> = {
  notepad: <NotepadWindow />,
  projects: <ProjectsWindow />,
  career: <CareerWindow />,
  system: <SystemWindow />,
  mail: <MailWindow />,
  internet: <IEWindow />,
  readme: <ReadmeWindow />,
  github: <GithubWindow />,
};

// WIN95_WINDOW_CONFIGS는 정적 상수이므로 모듈 스코프에서 refs 배열 생성 가능
const iconNodeRefs = WIN95_WINDOW_CONFIGS.map(() => createRef<HTMLDivElement>());
const DRAG_THRESHOLD = 4; // px 미만 이동은 클릭으로 간주

export default function Desktop() {
  const { windows, openWindow } = useWindowManager();
  const [isBootComplete, setIsBootComplete] = useAtom(isBootCompleteAtom);
  const { isMobile } = useBreakpoint();
  const { getPosition, updatePosition, isReady } = useIconPositions();
  useKeyboardShortcuts();
  // 아이콘 id별 드래그 발생 여부 추적 (re-render 없이 관리)
  const draggedRef = useRef<Set<string>>(new Set());

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden">
      {/* Desktop area */}
      <div className="relative flex-1 bg-black overflow-hidden">
        {/* 우주 배경 — 최하단 레이어 */}
        <SpaceBackground />
        {/* 모바일: 기존 중앙 그리드 레이아웃 유지 */}
        {isMobile && (
          <div className="absolute inset-0 flex flex-wrap justify-center content-start gap-6 pt-10 px-6">
            {WIN95_WINDOW_CONFIGS.map((cfg) => (
              <DesktopIcon
                key={cfg.id}
                icon={cfg.icon}
                label={cfg.label}
                onDoubleClick={() =>
                  openWindow({ ...cfg, content: WINDOW_CONTENT_MAP[cfg.id] })
                }
              />
            ))}
          </div>
        )}

        {/* 태블릿/데스크톱: 절대 좌표 + Draggable */}
        {!isMobile && isReady && (
          <>
            {WIN95_WINDOW_CONFIGS.map((cfg, index) => {
              const nodeRef = iconNodeRefs[index];
              return (
                <Draggable
                  key={cfg.id}
                  nodeRef={nodeRef as React.RefObject<HTMLElement>}
                  bounds="parent"
                  defaultPosition={getPosition(cfg.id, index)}
                  onStart={() => {
                    draggedRef.current.delete(cfg.id);
                  }}
                  onDrag={(_e: DraggableEvent, data: DraggableData) => {
                    if (
                      Math.abs(data.deltaX) > DRAG_THRESHOLD ||
                      Math.abs(data.deltaY) > DRAG_THRESHOLD
                    ) {
                      draggedRef.current.add(cfg.id);
                    }
                  }}
                  onStop={(_e: DraggableEvent, data: DraggableData) => {
                    if (draggedRef.current.has(cfg.id)) {
                      updatePosition(cfg.id, { x: data.x, y: data.y });
                      draggedRef.current.delete(cfg.id);
                    }
                  }}
                >
                  <div ref={nodeRef} className="absolute">
                    <DesktopIcon
                      icon={cfg.icon}
                      label={cfg.label}
                      onDoubleClick={() => {
                        if (!draggedRef.current.has(cfg.id)) {
                          openWindow({ ...cfg, content: WINDOW_CONTENT_MAP[cfg.id] });
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

        {/* Open windows */}
        {windows
          .filter((w) => w.state !== "minimized")
          .map((w) => (
            <Window key={w.id} window={w} />
          ))}
      </div>

      {/* Taskbar */}
      <Taskbar />

      {!isBootComplete && (
        <BootScreen onComplete={() => setIsBootComplete(true)} />
      )}
    </div>
  );
}
