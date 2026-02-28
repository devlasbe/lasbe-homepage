"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectDataList } from "@/constants/portfolio";
import { Win95TechBadgeList, Win95DescriptionList } from "../ui";

export default function ProjectsWindow() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);

  const project = projectDataList[selectedIdx];

  const handleSelect = (i: number) => {
    setSelectedIdx(i);
    setImgIdx(0);
  };

  return (
    <div className="flex h-full font-vt323 text-system-body">
      {/* Left panel - project list */}
      <div className="w-36 flex-shrink-0 border-r-2 border-[#808080] overflow-y-auto bg-white win95-sunken">
        {projectDataList.map((p, i) => (
          <button
            key={p.title}
            className={`w-full text-left px-2 py-1 flex items-center gap-1 text-system-caption ${
              i === selectedIdx
                ? "bg-[#000080] text-white"
                : "hover:bg-[#c0c0c0] text-black"
            }`}
            onClick={() => handleSelect(i)}
          >
            <span className="flex-shrink-0">📁</span>
            <span className="truncate">{p.title}</span>
          </button>
        ))}
      </div>

      {/* Right panel - project details */}
      <div className="flex-1 overflow-y-auto bg-white p-3 win95-sunken">
        <h2 className="font-bold text-system-heading">{project.title}</h2>
        <p className="text-system-caption text-[#808080] mb-2">{project.period}</p>

        {/* Image viewer */}
        {project.imageList.length > 0 && (
          <div className="relative mb-2 h-32 bg-black flex items-center justify-center win95-sunken">
            <Image
              src={project.imageList[imgIdx]}
              alt={`${project.title} screenshot`}
              fill
              className="object-contain"
              unoptimized={project.imageList[imgIdx].includes("webp")}
            />
            {project.imageList.length > 1 && (
              <div className="absolute bottom-1 right-1 flex items-center gap-1 z-10">
                <button
                  className="win95-raised bg-[#c0c0c0] px-1 text-system-caption disabled:opacity-50"
                  onClick={() => setImgIdx((i) => Math.max(0, i - 1))}
                  disabled={imgIdx === 0}
                >
                  ◀
                </button>
                <span className="text-system-caption text-white bg-black/50 px-1">
                  {imgIdx + 1}/{project.imageList.length}
                </span>
                <button
                  className="win95-raised bg-[#c0c0c0] px-1 text-system-caption disabled:opacity-50"
                  onClick={() =>
                    setImgIdx((i) =>
                      Math.min(project.imageList.length - 1, i + 1)
                    )
                  }
                  disabled={imgIdx === project.imageList.length - 1}
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        )}

        <p className="text-system-caption leading-relaxed mb-2">{project.desc}</p>

        <Win95DescriptionList items={project.subDesc} className="mb-2" />

        <Win95TechBadgeList items={project.stack} className="mb-2" />

        <div className="flex gap-2">
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              className="win95-raised bg-[#c0c0c0] px-2 py-0.5 text-system-caption flex items-center gap-1"
            >
              <span>🌐</span>
              <span>열기</span>
            </Link>
          )}
          {project.readme && (
            <Link
              href={project.readme}
              target="_blank"
              className="win95-raised bg-[#c0c0c0] px-2 py-0.5 text-system-caption flex items-center gap-1"
            >
              <span>📄</span>
              <span>README</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
