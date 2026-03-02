"use client";

import { useEffect, useState } from "react";
import { useGuestbook } from "@/hooks/useGuestbook";
import { Win95StatusBar, Win95Button } from "../ui";

// ── 입력 최대 길이 ──
const MAX_NAME_LENGTH = 20;
const MAX_COMMENT_LENGTH = 200;
const MAX_PASSWORD_LENGTH = 20;

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function GuestbookWindow() {
  const { entries, isLoading, isSubmitting, error, fetchEntries, addEntry, deleteEntry } =
    useGuestbook();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // 삭제 플로우 상태
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteErrors, setDeleteErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSubmit = async () => {
    setFormError(null);
    if (!name.trim() || !password.trim() || !comment.trim()) {
      setFormError("이름, 비밀번호, 댓글을 모두 입력해주세요.");
      return;
    }
    const ok = await addEntry(name.trim(), password, comment.trim());
    if (ok) {
      setName("");
      setPassword("");
      setComment("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setDeletePassword("");
    setDeleteErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleDeleteCancel = () => {
    setDeletingId(null);
    setDeletePassword("");
  };

  const handleDeleteConfirm = async (id: string) => {
    const result = await deleteEntry(id, deletePassword);
    if (result.success) {
      setDeletingId(null);
      setDeletePassword("");
    } else {
      setDeleteErrors((prev) => ({ ...prev, [id]: result.error ?? "삭제 실패" }));
    }
  };

  return (
    <div className="flex flex-col h-full font-vt323">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b-2 border-[#808080] bg-[#c0c0c0] flex-shrink-0">
        <Win95Button size="lg" className="flex items-center gap-1" onClick={fetchEntries} disabled={isLoading}>
          <span>🔄</span>
          <span>새로고침(R)</span>
        </Win95Button>
        {submitted && (
          <span className="text-system-body text-[#008000]">✓ 등록되었습니다!</span>
        )}
      </div>

      {/* Form */}
      <div className="border-b-2 border-[#808080] px-2 py-2 flex-shrink-0 bg-[#c0c0c0]">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mb-1">
          <div className="flex items-center gap-1 flex-1">
            <label className="text-system-body w-14 shrink-0">이름:</label>
            <input
              type="text"
              className="flex-1 text-system-body bg-white win95-sunken px-1 py-0.5 outline-none font-vt323"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
              placeholder="이름"
              maxLength={MAX_NAME_LENGTH}
            />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <label className="text-system-body w-20 shrink-0">비밀번호:</label>
            <input
              type="password"
              className="flex-1 text-system-body bg-white win95-sunken px-1 py-0.5 outline-none font-vt323"
              value={password}
              onChange={(e) => setPassword(e.target.value.slice(0, MAX_PASSWORD_LENGTH))}
              placeholder="비밀번호"
              maxLength={MAX_PASSWORD_LENGTH}
            />
          </div>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <label className="text-system-body w-14 shrink-0">댓글:</label>
          <input
            type="text"
            className="flex-1 text-system-body bg-white win95-sunken px-1 py-0.5 outline-none font-vt323"
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))}
            placeholder="방명록을 남겨주세요!"
            maxLength={MAX_COMMENT_LENGTH}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>
        <div className="flex items-center justify-between">
          {(formError || error) && (
            <span className="text-system-body text-[#ff0000]">{formError ?? error}</span>
          )}
          <div className="ml-auto">
            <Win95Button size="lg" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "등록 중..." : "등록(A)"}
            </Win95Button>
          </div>
        </div>
      </div>

      {/* Entry list */}
      <div className="flex-1 overflow-y-auto bg-white win95-sunken">
        {isLoading && (
          <div className="flex items-center justify-center h-full text-system-body text-[#808080]">
            불러오는 중...
          </div>
        )}
        {!isLoading && entries.length === 0 && (
          <div className="flex items-center justify-center h-full text-system-body text-[#808080]">
            아직 방명록이 없습니다. 첫 번째로 남겨보세요!
          </div>
        )}
        {!isLoading &&
          entries.map((entry) => (
            <div key={entry.id} className="border-b border-[#d0d0d0] px-3 py-2">
              {/* Entry header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-system-body font-bold truncate">▌ {entry.name}</span>
                  <span className="text-system-caption text-[#808080] shrink-0">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                {deletingId !== entry.id && (
                  <Win95Button className="shrink-0" onClick={() => handleDeleteClick(entry.id)}>
                    삭제
                  </Win95Button>
                )}
              </div>

              {/* Comment */}
              <p className="text-system-body mt-0.5 break-words whitespace-pre-wrap pl-3">
                {entry.comment}
              </p>

              {/* Delete flow */}
              {deletingId === entry.id && (
                <div className="mt-1 flex flex-col sm:flex-row items-start sm:items-center gap-1">
                  <input
                    type="password"
                    className="text-system-body bg-white win95-sunken px-1 py-0.5 outline-none font-vt323 w-32"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="비밀번호"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleDeleteConfirm(entry.id);
                      if (e.key === "Escape") handleDeleteCancel();
                    }}
                  />
                  <div className="flex gap-1">
                    <Win95Button onClick={() => handleDeleteConfirm(entry.id)}>
                      확인
                    </Win95Button>
                    <Win95Button onClick={handleDeleteCancel}>
                      취소
                    </Win95Button>
                  </div>
                  {deleteErrors[entry.id] && (
                    <span className="text-system-caption text-[#ff0000]">
                      {deleteErrors[entry.id]}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>

      <Win95StatusBar>
        <span>{entries.length}개의 방명록</span>
      </Win95StatusBar>
    </div>
  );
}
