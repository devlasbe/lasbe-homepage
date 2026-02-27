"use client";

import Link from "next/link";

type FavoriteType = {
  label: string;
  icon: string;
  url: string;
  desc: string;
};

const FAVORITES: FavoriteType[] = [
  {
    label: "GitHub",
    icon: "🐙",
    url: "https://github.com/devlasbe",
    desc: "소스 코드 및 프로젝트 저장소",
  },
  {
    label: "블로그",
    icon: "📝",
    url: "https://lasbe.tistory.com",
    desc: "개발 기록 및 기술 블로그",
  },
  {
    label: "오픈프차",
    icon: "🏪",
    url: "https://www.openfranchise.kr/",
    desc: "프랜차이즈 창업 정보 서비스",
  },
  {
    label: "안성재 GPT",
    icon: "🍳",
    url: "https://ansungjae-gpt.vercel.app/",
    desc: "안성재 쉐프 스타일 요리 평가",
  },
];

export default function IEWindow() {
  return (
    <div className="flex flex-col h-full font-vt323 text-system-body">
      {/* Menu bar */}
      <div className="flex gap-4 px-2 py-0.5 text-system-caption border-b border-[#808080] bg-[#c0c0c0] flex-shrink-0">
        {["파일(F)", "편집(E)", "보기(V)", "즐겨찾기(A)", "도움말(H)"].map(
          (m) => (
            <button
              key={m}
              className="hover:bg-[#000080] hover:text-white px-1"
            >
              {m}
            </button>
          )
        )}
      </div>

      {/* Navigation bar */}
      <div className="flex items-center gap-1 px-1 py-1 border-b border-[#808080] bg-[#c0c0c0] flex-shrink-0">
        <button className="win95-raised bg-[#c0c0c0] px-2 py-0.5 text-system-caption opacity-50" disabled>
          ◀
        </button>
        <button className="win95-raised bg-[#c0c0c0] px-2 py-0.5 text-system-caption opacity-50" disabled>
          ▶
        </button>
        <button className="win95-raised bg-[#c0c0c0] px-2 py-0.5 text-system-caption opacity-50" disabled>
          🔄
        </button>
        <span className="text-system-caption px-1 shrink-0">주소(D):</span>
        <div className="flex-1 win95-sunken bg-white px-1 py-0.5 text-system-caption text-[#000080]">
          http://lasbe.kr/favorites
        </div>
        <button className="win95-raised bg-[#c0c0c0] px-2 py-0.5 text-system-caption">
          이동
        </button>
      </div>

      {/* Favorites toolbar */}
      <div className="flex items-center gap-1 px-2 py-0.5 border-b border-[#808080] bg-[#c0c0c0] text-system-caption flex-shrink-0 overflow-x-auto">
        <span className="text-[#808080] shrink-0">즐겨찾기:</span>
        {FAVORITES.map((fav) => (
          <Link
            key={fav.label}
            href={fav.url}
            target="_blank"
            className="win95-raised bg-[#c0c0c0] px-2 py-0.5 flex items-center gap-1 shrink-0"
          >
            <span>{fav.icon}</span>
            <span>{fav.label}</span>
          </Link>
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto bg-white win95-sunken">
        {/* IE-style page header */}
        <div className="bg-[#000080] text-white px-4 py-3 flex items-center gap-2">
          <span className="text-system-icon-md">🌐</span>
          <div>
            <p className="font-bold">장성우의 즐겨찾기</p>
            <p className="text-system-caption opacity-75">Lasbe - Internet Explorer 5.0</p>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {FAVORITES.map((fav) => (
            <Link
              key={fav.label}
              href={fav.url}
              target="_blank"
              className="flex items-center gap-3 p-2 win95-raised bg-[#c0c0c0] hover:bg-[#d0d0d0] block"
            >
              <span className="text-system-icon-md">{fav.icon}</span>
              <div>
                <p className="font-bold text-system-body">{fav.label}</p>
                <p className="text-system-caption text-[#808080]">{fav.desc}</p>
                <p className="text-system-caption text-[#000080] underline">{fav.url}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="px-4 pb-4 text-system-caption text-[#808080] text-center">
          <p>이 페이지는 Windows 95 Internet Explorer에 최적화되어 있습니다.</p>
          <p>© 1995 Lasbe. All rights reserved.</p>
        </div>
      </div>

      {/* Status bar */}
      <div className="h-5 flex items-center px-2 text-system-caption border-t border-[#808080] win95-sunken flex-shrink-0 gap-4">
        <span>완료</span>
        <span>🌐 인터넷</span>
      </div>
    </div>
  );
}
