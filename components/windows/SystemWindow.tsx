"use client";

import { useState } from "react";
import { skillsData, SkillTabType } from "@/constants/portfolio";

export default function SystemWindow() {
  const [activeTab, setActiveTab] = useState<SkillTabType>("프론트엔드");

  return (
    <div className="flex flex-col h-full font-vt323 text-system-body">
      {/* System header */}
      <div className="flex items-center gap-3 p-3 border-b-2 border-[#808080] bg-[#c0c0c0] flex-shrink-0">
        <div className="text-system-icon-lg">💻</div>
        <div>
          <p className="font-bold text-system-heading">장성우의 포트폴리오 시스템</p>
          <p className="text-system-caption text-[#808080]">LASBE OS 95 Portfolio Edition</p>
          <p className="text-system-caption mt-1">
            프로세서: React 18 @ TypeScript 5.x
          </p>
          <p className="text-system-caption">메모리: 2년 실무 경험 RAM</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-shrink-0 px-2 pt-2 gap-1 border-b border-[#808080]">
        {(Object.keys(skillsData) as SkillTabType[]).map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 text-system-caption border-t-2 border-l-2 border-r-2 border-[#808080] ${
              activeTab === tab
                ? "bg-[#c0c0c0] border-b-[#c0c0c0] font-bold -mb-px z-10 relative"
                : "bg-[#a0a0a0] hover:bg-[#b0b0b0]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-3 bg-[#c0c0c0]">
        <div className="space-y-3">
          {skillsData[activeTab].map((skill) => (
            <div key={skill.name} className="flex items-center gap-2">
              <span className="w-36 text-system-caption text-right shrink-0">
                {skill.name}:
              </span>
              <div className="flex-1 win95-sunken bg-white h-4 relative overflow-hidden">
                <div
                  className="h-full bg-[#000080] transition-none"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="text-system-caption w-8 shrink-0">{skill.level}%</span>
            </div>
          ))}
        </div>

        <div className="mt-4 win95-sunken bg-white p-2 text-system-caption">
          <p className="font-bold mb-1">📋 시스템 정보</p>
          <p>개발 경력: 2년 (2022.08 ~ 현재)</p>
          <p>주력 분야: 프론트엔드 (React, Next.js)</p>
          <p>현재 상태: 새로운 기회 탐색 중</p>
        </div>
      </div>
    </div>
  );
}
