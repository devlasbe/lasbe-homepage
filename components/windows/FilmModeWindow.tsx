"use client";

import Image from "next/image";
import Link from "next/link";
import { project } from "@/constants/project";
import { Win95StatusBar, Win95TechBadgeList } from "../ui";
import Win95Button from "../ui/Win95Button";

// ── 이미지 크기 ──
const APP_ICON_SIZE = 40;
const QR_SIZE = 140;

export default function FilmModeWindow() {
  const data = project.FILM_MODE;

  return (
    <div className="flex flex-col h-full text-system-body">
      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white win95-sunken">
        {/* Header */}
        <div className="bg-blue-900 text-white px-4 py-3 flex items-center gap-3">
          <Image src={data.icon} alt="Film Mode 앱 아이콘" width={APP_ICON_SIZE} height={APP_ICON_SIZE} className="rounded-sm" />
          <div>
            <p className="font-bold text-system-heading">{data.title}</p>
            <p className="text-system-caption opacity-75">{data.period} · 필름 카메라 앱</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* 소개 */}
          <section>
            <p className="font-bold text-system-body border-b border-gray-500 pb-0.5 mb-2">■ 서비스 소개</p>
            <p className="text-system-body leading-relaxed text-gray-700">{data.desc}</p>
          </section>

          {/* 다운로드 */}
          <section>
            <p className="font-bold text-system-body border-b border-gray-500 pb-0.5 mb-2">■ 다운로드</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {data.stores.map((store) => (
                <div key={store.platform} className="flex flex-col items-center gap-2">
                  <p className="font-bold text-system-body">{store.platform}</p>
                  <Image src={store.qr} alt={`${store.name} QR 코드`} width={QR_SIZE} height={QR_SIZE} className="hidden md:block" />
                  <Link href={store.url} target="_blank">
                    <Win95Button size="lg" weight="bold">{store.name}에서 보기</Win95Button>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* 주요 기능 */}
          <section>
            <p className="font-bold text-system-body border-b border-gray-500 pb-0.5 mb-2">■ 주요 특징</p>
            <ul className="space-y-1">
              {data.subDesc.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-system-body text-gray-700">
                  <span className="shrink-0 text-blue-900">▶</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 기술 스택 */}
          <section>
            <p className="font-bold text-system-body border-b border-gray-500 pb-0.5 mb-2">■ 기술 스택</p>
            <Win95TechBadgeList items={data.stack} />
          </section>
        </div>
      </div>

      <Win95StatusBar>
        <span>Film Mode</span>
        <span>📷 iOS · Android</span>
      </Win95StatusBar>
    </div>
  );
}
