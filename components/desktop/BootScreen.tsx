"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Win95Button from "@/components/ui/Win95Button";

type BootPhaseType = "booting" | "fading";

type BootScreenPropsType = {
  onComplete: () => void;
};

const TOTAL_SEGMENTS = 12;
const INTERVAL_MS = 250;

export default function BootScreen({ onComplete }: BootScreenPropsType) {
  const [phase, setPhase] = useState<BootPhaseType>("booting");
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (phase !== "booting") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= TOTAL_SEGMENTS) {
          clearInterval(interval);
          setPhase("fading");
        }
        return next;
      });
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "fading") return;
    const timer = setTimeout(() => {
      onCompleteRef.current();
    }, 500);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleSkip = () => {
    if (phase === "booting") {
      setPhase("fading");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#008080] flex items-center justify-center cursor-pointer transition-opacity duration-500 ${phase === "fading" ? "opacity-0" : "opacity-100"}`}
      onClick={handleSkip}
    >
      <div
        className="win95-raised bg-[#c0c0c0] w-[320px] md:w-[360px] select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 타이틀바 */}
        <div className="bg-[#000080] flex items-center justify-between px-2 py-1">
          <span className="text-white text-system-body">LASBE OS 95</span>
          <div className="flex gap-1">
            <Win95Button size="sm" className="w-5 h-5 leading-none text-black">
              ─
            </Win95Button>
            <Win95Button size="sm" className="w-5 h-5 leading-none text-black">
              □
            </Win95Button>
            <Win95Button size="sm" className="w-5 h-5 leading-none text-black">
              ✕
            </Win95Button>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="p-4 flex flex-col gap-3">
          {/* 프로필 영역 */}
          <div className="flex items-center gap-4">
            <div className="win95-sunken w-20 h-20 flex-shrink-0 overflow-hidden">
              <Image
                src="/lasbe_character.jpg"
                alt="LASBE"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-system-heading text-black leading-tight">LASBE</p>
              <p className="text-system-body text-black leading-tight">장성우 포트폴리오</p>
            </div>
          </div>

          {/* 구분선 */}
          <div className="win95-sunken h-[2px]" />

          {/* 상태 텍스트 */}
          <p className="text-system-body text-black">로그인 중...</p>

          {/* 프로그레스바 */}
          <div className="win95-sunken p-1 flex gap-0.5">
            {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-4 ${i < progress ? "bg-[#000080]" : "bg-[#c0c0c0]"}`}
              />
            ))}
          </div>

          {/* 건너뛰기 버튼 */}
          <div className="flex justify-end">
            <Win95Button size="lg" className="text-black" onClick={handleSkip}>
              건너뛰기
            </Win95Button>
          </div>
        </div>
      </div>
    </div>
  );
}
