"use client";

import { Win95Section, Win95StatusBar } from "../ui";

// ── 데이터 ──
const APPS = [
  { icon: "📄", name: "자기소개.txt", desc: "제 소개, 연락처, GitHub·블로그 링크를 담은 메모장 파일" },
  { icon: "📁", name: "내 프로젝트", desc: "진행한 프로젝트를 이미지 뷰어와 함께 소개" },
  { icon: "📋", name: "내 경력", desc: "경력 사항과 담당 프로젝트를 아코디언으로 펼쳐볼 수 있음" },
  { icon: "💾", name: "기술스택.exe", desc: "보유 기술과 숙련도를 탭별 게이지로 확인" },
  { icon: "📧", name: "메일 보내기", desc: "Outlook Express 스타일 메일 작성기 (전송 시 mailto: 실행)" },
  { icon: "🌐", name: "인터넷", desc: "Internet Explorer 5.0 목업 — 즐겨찾기 링크 모음" },
];

const SHORTCUTS = [
  { key: "Esc", desc: "활성 창 닫기" },
  { key: "Ctrl + Enter", desc: "활성 창 최대화 / 복원 토글 (Mac: Cmd + Enter)" },
  { key: "타이틀바 더블클릭", desc: "창 최대화 / 복원 토글" },
];

const WINDOW_OPS = [
  { action: "타이틀바 드래그", desc: "창을 원하는 위치로 이동" },
  { action: "가장자리 드래그", desc: "창 크기를 자유롭게 조절 (데스크톱 전용)" },
  { action: "_ 버튼", desc: "창을 작업 표시줄로 최소화" },
  { action: "□ 버튼", desc: "창 최대화 / 복원 토글" },
  { action: "✕ 버튼", desc: "창 닫기" },
  { action: "작업 표시줄 버튼 클릭", desc: "최소화된 창 복원 / 활성 창 최소화" },
];

const DESKTOP_OPS = [
  { action: "아이콘 더블클릭", desc: "해당 앱 창 열기" },
  { action: "아이콘 드래그", desc: "위치 자유 배치 — 새로고침 후에도 유지 (localStorage)" },
  { action: "시작 버튼", desc: "시작 메뉴 열기 — 모든 앱에 접근 가능" },
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
    desc: "모바일에서는 창이 항상 전체화면으로 열리고, 태블릿은 뷰포트의 85% 크기로 조절됩니다.",
  },
];

// ── 컴포넌트 ──
export default function ReadmeWindow() {
  return (
    <div className="flex flex-col h-full font-vt323 text-system-body">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[#c0c0c0] border-b border-[#808080] flex-shrink-0">
        {["도움말 항목(H)", "검색(S)", "이전(B)", "인쇄(P)"].map((btn) => (
          <button key={btn} className="win95-raised px-2 py-0.5 text-system-caption">
            {btn}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white p-4">
        {/* Header */}
        <div className="border-b-2 border-[#000080] pb-3 mb-4">
          <p className="font-bold text-[#000080]" style={{ fontSize: "1.1em" }}>
            🖥️ LASBE OS 95 — 사용 설명서
          </p>
          <p className="text-system-caption text-[#808080] mt-0.5">이 포트폴리오에 숨겨진 기믹들을 소개합니다</p>
        </div>

        {/* Apps */}
        <Win95Section icon="📱" title="앱 목록">
          {APPS.map(({ icon, name, desc }) => (
            <div key={name} className="flex items-start gap-2 mb-2">
              <span className="shrink-0 leading-tight">{icon}</span>
              <p className="leading-snug">
                <span className="font-bold">{name}</span>
                <span className="text-[#444]"> — {desc}</span>
              </p>
            </div>
          ))}
        </Win95Section>

        {/* Keyboard shortcuts */}
        <Win95Section icon="⌨️" title="키보드 단축키">
          <div className="win95-sunken bg-[#f8f8f8] p-2 space-y-1.5">
            {SHORTCUTS.map(({ key, desc }) => (
              <div key={key} className="flex items-center gap-3">
                <span className="win95-raised px-1.5 py-0.5 text-system-caption font-bold whitespace-nowrap shrink-0">
                  {key}
                </span>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </Win95Section>

        {/* Window operations */}
        <Win95Section icon="🪟" title="창 조작">
          {WINDOW_OPS.map(({ action, desc }) => (
            <div key={action} className="flex gap-2 mb-1">
              <span className="font-bold shrink-0 min-w-[9rem]">{action}</span>
              <span className="text-[#444]">{desc}</span>
            </div>
          ))}
        </Win95Section>

        {/* Desktop operations */}
        <Win95Section icon="🗂️" title="데스크톱 조작">
          {DESKTOP_OPS.map(({ action, desc }) => (
            <div key={action} className="flex gap-2 mb-1">
              <span className="font-bold shrink-0 min-w-[9rem]">{action}</span>
              <span className="text-[#444]">{desc}</span>
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
                <span className="text-system-caption text-[#555]">{desc}</span>
              </p>
            </div>
          ))}
        </Win95Section>
      </div>

      <Win95StatusBar><span>도움말 뷰어 1.0 — LASBE OS 95 Portfolio Edition</span></Win95StatusBar>
    </div>
  );
}
