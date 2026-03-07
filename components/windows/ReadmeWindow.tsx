"use client";

import { Win95Section, Win95StatusBar } from "../ui";
import { WINDOW_CONFIGS } from "@/constants/windowConfigs";
import { APP } from "@/constants/app";

const SHORTCUTS = [
  { icon: "⌨️", key: "Esc", desc: "활성 창 닫기" },
  { icon: "⌨️", key: "Ctrl + Enter", desc: "활성 창 최대화 / 복원 토글 (Mac: Cmd + Enter)" },
  { icon: "🖱️", key: "타이틀바 더블클릭", desc: "창 최대화 / 복원 토글" },
];

const WINDOW_OPS = [
  { icon: "🖱️", action: "타이틀바 드래그", desc: "창을 원하는 위치로 이동" },
  { icon: "↔️", action: "가장자리 드래그", desc: "창 크기를 자유롭게 조절 (데스크톱 전용)" },
  { icon: "➖", action: "_ 버튼", desc: "창을 작업 표시줄로 최소화" },
  { icon: "⬜", action: "□ 버튼", desc: "창 최대화 / 복원 토글" },
  { icon: "✖️", action: "✕ 버튼", desc: "창 닫기" },
  { icon: "🖱️", action: "작업 표시줄 버튼 클릭", desc: "최소화된 창 복원 / 활성 창 최소화" },
];

const DESKTOP_OPS = [
  { icon: "🖱️", action: "아이콘 더블클릭", desc: "해당 앱 창 열기" },
  { icon: "✋", action: "아이콘 드래그", desc: "위치 자유 배치 — 새로고침 후에도 유지 (localStorage)" },
  { icon: "🪟", action: "시작 버튼", desc: "시작 메뉴 열기 — 모든 앱에 접근 가능" },
  { icon: "🖱️", action: "배경 우클릭", desc: "컨텍스트 메뉴 열기 — 블로그/깃허브 바로가기 및 아이콘 정렬" },
];

const GIMMICKS = [
  {
    icon: "🚀",
    title: "부팅 화면",
    desc: "최초 진입 시 Windows 95 스타일 부팅 애니메이션이 재생됩니다. 화면을 클릭하면 스킵할 수 있어요.",
  },
  {
    icon: "🌌",
    title: "시차 우주 배경",
    desc: "Three.js로 구현한 4단계 시차 별자리 배경입니다. 마우스를 움직이면 별들이 시차 효과로 따라와요. 모바일에서는 기기 기울기로 동작합니다.",
  },
  {
    icon: "👁️",
    title: "방문자 수 카운터",
    desc: "우측 하단 시스템 트레이에서 오늘의 방문자 수와 누적 방문자 수를 확인할 수 있습니다. Firebase Firestore로 집계합니다.",
  },
  {
    icon: "💾",
    title: "아이콘 위치 저장",
    desc: "데스크톱 아이콘을 드래그하면 위치가 localStorage에 저장됩니다. 새로고침해도 배치가 그대로 유지돼요.",
  },
  {
    icon: "🪟",
    title: "창 계단식 배치",
    desc: "앱을 여러 개 열면 창이 20px씩 오프셋되어 쌓입니다. Windows 95의 캐스케이드(cascade) 동작을 재현했어요.",
  },
  {
    icon: "📐",
    title: "반응형 레이아웃",
    desc: "모바일에서는 창이 항상 전체화면으로 열립니다.",
  },
];

// ── 컴포넌트 ──
export default function ReadmeWindow() {
  return (
    <div className="flex flex-col h-full text-system-body">
      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white p-4">
        {/* Header */}
        <div className="border-b-2 border-blue-900 pb-3 mb-4">
          <p className="font-bold text-blue-900" style={{ fontSize: "1.1em" }}>
            🖥️ {APP.NAME} {APP.VERSION} — 사용 설명서
          </p>
          <p className="text-system-caption text-gray-500 mt-0.5">이 포트폴리오에 숨겨진 기믹들을 소개합니다</p>
        </div>

        {/* Desktop operations */}
        <Win95Section icon="🗂️" title="데스크톱 조작">
          {DESKTOP_OPS.map(({ icon, action, desc }) => (
            <div key={action} className="flex items-start gap-2 mb-3">
              <span className="shrink-0 leading-tight">{icon}</span>
              <p className="leading-snug">
                <span className="font-bold">{action}</span>
                <br />
                <span className="text-system-caption text-gray-700">{desc}</span>
              </p>
            </div>
          ))}
        </Win95Section>

        {/* Keyboard shortcuts */}
        <Win95Section icon="⌨️" title="키보드 단축키">
          {SHORTCUTS.map(({ icon, key, desc }) => (
            <div key={key} className="flex items-start gap-2 mb-3">
              <span className="shrink-0 leading-tight">{icon}</span>
              <p className="leading-snug">
                <span className="font-bold">{key}</span>
                <br />
                <span className="text-system-caption text-gray-700">{desc}</span>
              </p>
            </div>
          ))}
        </Win95Section>

        {/* Window operations */}
        <Win95Section icon="🪟" title="창 조작">
          {WINDOW_OPS.map(({ icon, action, desc }) => (
            <div key={action} className="flex items-start gap-2 mb-3">
              <span className="shrink-0 leading-tight">{icon}</span>
              <p className="leading-snug">
                <span className="font-bold">{action}</span>
                <br />
                <span className="text-system-caption text-gray-700">{desc}</span>
              </p>
            </div>
          ))}
        </Win95Section>

        {/* Hidden gimmicks */}
        <Win95Section icon="✨" title="기타">
          {GIMMICKS.map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-2 mb-3">
              <span className="shrink-0 leading-tight">{icon}</span>
              <p className="leading-snug">
                <span className="font-bold">{title}</span>
                <br />
                <span className="text-system-caption text-gray-700">{desc}</span>
              </p>
            </div>
          ))}
        </Win95Section>

        {/* Apps */}
        <Win95Section icon="📱" title="앱 목록">
          {WINDOW_CONFIGS.filter((c) => c.readmeDesc !== undefined).map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.id} className="flex items-start gap-2 mb-3">
                <Icon className="shrink-0 w-4 h-4 mt-0.5" />
                <p className="leading-snug">
                  <span className="font-bold">{c.label}</span>
                  <br />
                  <span className="text-system-caption text-gray-700">{c.readmeDesc}</span>
                </p>
              </div>
            );
          })}
        </Win95Section>
      </div>

      <Win95StatusBar>
        <span>도움말 뷰어 1.0 — {APP.NAME} {APP.VERSION}</span>
      </Win95StatusBar>
    </div>
  );
}
