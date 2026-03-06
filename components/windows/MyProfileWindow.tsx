"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useViewCount } from "@/hooks/useViewCount";
import { profile } from "@/constants/profile";

// ── 프로필 표시 데이터 ──
const PROFILE = [
  { label: "이름", value: profile.name },
  { label: "생년월일", value: profile.birthday },
  { label: "위치", value: profile.location },
  { label: "메일", value: profile.mail },
];
import { Win95StatusBar } from "../ui";

// ── 레이아웃 ──
const CHARACTER_SIZE = 120;

export default function MyProfileWindow() {
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
      <div className="flex items-center gap-4 p-4 border-b-2 border-gray-500 bg-gray-300 flex-shrink-0">
        <div
          className="win95-raised shrink-0 overflow-hidden bg-gray-500"
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
          <p className="text-system-caption text-blue-900 font-bold mt-0.5">Frontend Developer</p>
          <p className="text-system-caption text-gray-700 mt-1 leading-snug">
            React · React Native를 이용해 웹, 앱 개발을 합니다.
          </p>
          <p className="text-system-caption text-gray-700 mt-1 leading-snug">
            서버 개발과 인프라에도 관심이 많으며, 경계 없는 개발자를 지향합니다.
          </p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto bg-gray-300 p-3 space-y-3">
        {/* Profile info */}
        <fieldset className="win95-raised p-2">
          <legend className="px-1 text-system-caption font-bold">기본 정보</legend>
          <div className="space-y-1.5 pt-1">
            {PROFILE.map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2 text-system-caption">
                <span className="w-20 text-right shrink-0 text-gray-700">{label}:</span>
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
              { label: "총 경력", value: "3년+ (2022.08 ~ 재직 중)" },
              { label: "주력 분야", value: "프론트엔드 (React, React Native)" },
              { label: "현재 상태", value: "YPLABS 재직 중" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2 text-system-caption">
                <span className="w-20 text-right shrink-0 text-gray-700">{label}:</span>
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
            <div className="flex-1 win95-sunken bg-blue-900 p-2 text-center">
              <p className="text-gray-300 text-system-caption">오늘 방문자</p>
              <p className="text-white font-bold text-system-heading tabular-nums mt-1">
                {todayCount === null ? "···" : todayCount.toLocaleString()}
              </p>
            </div>
            <div className="flex-1 win95-sunken bg-blue-900 p-2 text-center">
              <p className="text-gray-300 text-system-caption">누적 방문자</p>
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
