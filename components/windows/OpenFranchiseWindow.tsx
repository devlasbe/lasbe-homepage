"use client";

import Link from "next/link";
import { projectDataList } from "@/constants/portfolio";
import { Win95MenuBar, Win95StatusBar, Win95TechBadgeList } from "../ui";
import Win95Button from "../ui/Win95Button";

// ── 메뉴 ──
const MENU_ITEMS = ["파일(F)", "편집(E)", "보기(V)", "도움말(H)"] as const;

export default function OpenFranchiseWindow() {
  const data = projectDataList.find((p) => p.title === "오픈프차")!;

  return (
    <div className="flex flex-col h-full font-vt323 text-system-body">
      <Win95MenuBar items={MENU_ITEMS} />

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white win95-sunken">
        {/* Header */}
        <div className="bg-[#000080] text-white px-4 py-3 flex items-center gap-3">
          <span className="text-system-icon-lg">🏪</span>
          <div>
            <p className="font-bold text-system-heading">{data.title}</p>
            <p className="text-system-caption opacity-75">{data.period} · 프랜차이즈 창업 정보 서비스</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* 소개 */}
          <section>
            <p className="font-bold text-system-body border-b border-[#808080] pb-0.5 mb-2">■ 서비스 소개</p>
            <p className="text-system-body leading-relaxed text-[#222]">{data.desc}</p>
          </section>

          {/* 주요 기능 */}
          <section>
            <p className="font-bold text-system-body border-b border-[#808080] pb-0.5 mb-2">■ 주요 특징</p>
            <ul className="space-y-1">
              {data.subDesc.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-system-body text-[#222]">
                  <span className="shrink-0 text-[#000080]">▶</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 기술 스택 */}
          <section>
            <p className="font-bold text-system-body border-b border-[#808080] pb-0.5 mb-2">■ 기술 스택</p>
            <Win95TechBadgeList items={data.stack} />
          </section>

          {/* 바로가기 링크 */}
          <section>
            <p className="font-bold text-system-body border-b border-[#808080] pb-0.5 mb-2">■ 바로가기</p>
            <div className="flex flex-wrap gap-2">
              <Link href={data.link!} target="_blank">
                <Win95Button size="lg" weight="bold">
                  🌐 서비스 방문하기
                </Win95Button>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Win95StatusBar>
        <span>오픈프차</span>
        <span>🏪 openfranchise.kr</span>
      </Win95StatusBar>
    </div>
  );
}
