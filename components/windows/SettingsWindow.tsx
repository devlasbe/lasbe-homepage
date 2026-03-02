"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useViewCount } from "@/hooks/useViewCount";
import { profileDataList } from "@/constants/portfolio";
import { Win95StatusBar } from "../ui";

// ── 레이아웃 ──
const CHARACTER_SIZE = 120;

export default function SettingsWindow() {
  const { getTodayViewCount, getAllViewCount } = useViewCount();
  const [todayCount, setTodayCount] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    getTodayViewCount().then(setTodayCount);
    getAllViewCount().then(setTotalCount);
  }, [getTodayViewCount, getAllViewCount]);

  return (
    <div className="flex flex-col h-full text-system-body">
      {/* Profile header */}
      <div className="flex items-center gap-4 p-4 border-b-2 border-[#808080] bg-[#c0c0c0] flex-shrink-0">
        <div
          className="win95-raised shrink-0 overflow-hidden bg-[#808080]"
          style={{ width: CHARACTER_SIZE, height: CHARACTER_SIZE }}
        >
          <Image
            src="/lasbe_character.jpg"
            alt="lasbe character"
            width={CHARACTER_SIZE}
            height={CHARACTER_SIZE}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div>
          <p className="font-bold text-system-heading leading-tight">장성우</p>
          <p className="text-system-caption text-[#000080] font-bold mt-0.5">
            Frontend Developer
          </p>
          <p className="text-system-caption text-[#444] mt-1 leading-snug">
            React · Next.js · TypeScript를 주력으로
            <br />
            사용자 경험을 고민하는 프론트엔드 개발자입니다.
          </p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto bg-[#c0c0c0] p-3 space-y-3">
        {/* Profile info */}
        <fieldset className="win95-raised p-2">
          <legend className="px-1 text-system-caption font-bold">기본 정보</legend>
          <div className="space-y-1.5 pt-1">
            {profileDataList.map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2 text-system-caption">
                <span className="w-20 text-right shrink-0 text-[#444]">{label}:</span>
                <div className="flex-1 win95-sunken bg-white px-2 py-0.5">
                  <span>{value}</span>
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Career summary */}
        <fieldset className="win95-raised p-2">
          <legend className="px-1 text-system-caption font-bold">경력 요약</legend>
          <div className="space-y-1.5 pt-1">
            {[
              { label: "총 경력", value: "2년 (2022.08 ~ 2024.06)" },
              { label: "주력 분야", value: "프론트엔드 (React, Next.js)" },
              { label: "현재 상태", value: "새로운 기회 탐색 중 👀" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2 text-system-caption">
                <span className="w-20 text-right shrink-0 text-[#444]">{label}:</span>
                <div className="flex-1 win95-sunken bg-white px-2 py-0.5">
                  <span>{value}</span>
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Visitor counter */}
        <fieldset className="win95-raised p-2">
          <legend className="px-1 text-system-caption font-bold">방문자 카운터</legend>
          <div className="flex gap-3 pt-1">
            <div className="flex-1 win95-sunken bg-[#000080] p-2 text-center">
              <p className="text-[#c0c0c0] text-system-caption">오늘 방문자</p>
              <p className="text-white font-bold text-system-heading tabular-nums mt-1">
                {todayCount === null ? "···" : todayCount.toLocaleString()}
              </p>
            </div>
            <div className="flex-1 win95-sunken bg-[#000080] p-2 text-center">
              <p className="text-[#c0c0c0] text-system-caption">누적 방문자</p>
              <p className="text-white font-bold text-system-heading tabular-nums mt-1">
                {totalCount === null ? "···" : totalCount.toLocaleString()}
              </p>
            </div>
          </div>
        </fieldset>
      </div>

      <Win95StatusBar>
        <span>사용자 속성 — LASBE OS 95</span>
      </Win95StatusBar>
    </div>
  );
}
