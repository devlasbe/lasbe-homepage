"use client";

import { useState } from "react";
import { profileDataList } from "@/constants/portfolio";
import { Win95StatusBar, Win95Button } from "../ui";

const email = profileDataList.find((p) => p.label === "메일")?.value ?? "";

export default function MailWindow() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailto);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="flex flex-col h-full font-vt323">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b-2 border-[#808080] bg-[#c0c0c0] flex-shrink-0">
        <Win95Button size="lg" weight="bold" className="flex items-center gap-1" onClick={handleSend}>
          <span>📤</span>
          <span>보내기(S)</span>
        </Win95Button>
        {sent && (
          <span className="text-system-body text-[#008000]">
            ✓ 메일 앱이 열렸습니다!
          </span>
        )}
      </div>

      {/* Header fields */}
      <div className="border-b-2 border-[#808080] flex-shrink-0">
        <div className="flex items-center px-2 py-1 border-b border-[#d0d0d0]">
          <span className="text-system-body w-20 shrink-0">받는사람:</span>
          <span className="text-system-body text-[#000080]">{email}</span>
        </div>
        <div className="flex items-center px-2 py-1 border-b border-[#d0d0d0]">
          <span className="text-system-body w-20 shrink-0">참조(C):</span>
          <span className="text-system-body text-[#808080]"></span>
        </div>
        <div className="flex items-center px-2 py-1">
          <span className="text-system-body w-20 shrink-0">제목(U):</span>
          <input
            type="text"
            className="flex-1 text-system-body bg-white win95-sunken px-1 py-0.5 outline-none font-vt323"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>
      </div>

      {/* Format toolbar */}
      <div className="flex items-center gap-1 px-2 py-0.5 border-b border-[#808080] bg-[#c0c0c0] text-system-caption flex-shrink-0">
        <select className="win95-sunken bg-white text-system-caption px-1 font-vt323">
          <option>굴림체</option>
        </select>
        <select className="win95-sunken bg-white text-system-caption px-1 font-vt323 w-12">
          <option>10</option>
        </select>
        <div className="w-px h-4 bg-[#808080] mx-1" />
        <Win95Button weight="bold">B</Win95Button>
        <Win95Button className="italic">I</Win95Button>
        <Win95Button className="underline">U</Win95Button>
      </div>

      {/* Body */}
      <textarea
        className="flex-1 text-system-body bg-white win95-sunken p-2 outline-none resize-none font-vt323"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="메시지를 입력하세요..."
      />

      <Win95StatusBar><span>준비</span></Win95StatusBar>
    </div>
  );
}
