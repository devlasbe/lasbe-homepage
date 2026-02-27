"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { carrerDataList } from "@/features/about/constants";

export default function CareerWindow() {
  const [openProject, setOpenProject] = useState<string | null>(
    carrerDataList[0]?.projectList[0]?.title ?? null
  );

  const career = carrerDataList[0];

  return (
    <div className="flex flex-col h-full font-vt323 text-system-body overflow-y-auto bg-white win95-sunken p-3">
      {/* Company header */}
      <div className="flex items-start gap-3 mb-3 pb-2 border-b-2 border-[#808080]">
        <div className="win95-sunken bg-white p-2 flex-shrink-0">
          <Image
            src={career.imageSrc}
            alt={career.company}
            width={40}
            height={40}
          />
        </div>
        <div>
          <p className="font-bold text-system-heading">{career.company}</p>
          <p className="text-system-caption text-[#808080]">{career.period}</p>
          <p className="text-system-caption mt-1 whitespace-pre-wrap leading-relaxed">
            {career.desc}
          </p>
        </div>
      </div>

      {/* Project list */}
      <div className="space-y-1">
        {career.projectList.map((project) => {
          const isOpen = openProject === project.title;
          return (
            <div key={project.title}>
              <button
                className={`w-full text-left px-2 py-1 flex items-center gap-2 text-system-caption win95-raised bg-[#c0c0c0] ${
                  isOpen ? "font-bold" : ""
                }`}
                onClick={() =>
                  setOpenProject(isOpen ? null : project.title)
                }
              >
                <span>{isOpen ? "📂" : "📁"}</span>
                <span className="flex-1">{project.title}</span>
                <span className="text-[#808080] text-system-caption shrink-0">
                  {project.period}
                </span>
              </button>

              {isOpen && (
                <div className="px-3 pb-2 pt-1 text-system-caption space-y-1 bg-white win95-sunken mx-1 mb-1">
                  <p className="mt-1 font-bold text-[#000080] leading-relaxed whitespace-pre-wrap">
                    {project.mainDesc}
                  </p>
                  <ul className="pl-4 space-y-0.5 mt-1">
                    {project.descList.map((d, i) => (
                      <li key={i} className="list-disc leading-relaxed">
                        {d.href ? (
                          <Link
                            href={d.href}
                            target="_blank"
                            className="text-[#000080] underline"
                          >
                            {d.desc}
                          </Link>
                        ) : (
                          d.desc
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-0.5 mt-1">
                    {project.stackList.map((s) => (
                      <span
                        key={s}
                        className="win95-raised bg-[#c0c0c0] px-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
