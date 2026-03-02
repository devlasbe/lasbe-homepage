"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Explorer100 } from "@react95/icons";
import { Win95MenuBar, Win95StatusBar, Win95AddressBar, Win95Button } from "../ui";

// ── GitHub API ──
const GITHUB_USERNAME = "devlasbe";
const REPO_COUNT = 6;
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

// ── 메뉴 ──
const MENU_ITEMS = ["파일(F)", "보기(V)", "도움말(H)"] as const;

// ── 언어 색상 ──
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
};

type GithubProfileType = {
  name: string;
  login: string;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};

type GithubRepoType = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
};

type FetchStateType = "idle" | "loading" | "success" | "error";

export default function GithubWindow() {
  const [fetchState, setFetchState] = useState<FetchStateType>("idle");
  const [profile, setProfile] = useState<GithubProfileType | null>(null);
  const [repos, setRepos] = useState<GithubRepoType[]>([]);

  const fetchData = useCallback(async () => {
    setFetchState("loading");
    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`),
        fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=${REPO_COUNT}`),
      ]);

      if (!profileRes.ok || !reposRes.ok) throw new Error("API 오류");

      const [profileData, reposData] = await Promise.all([
        profileRes.json() as Promise<GithubProfileType>,
        reposRes.json() as Promise<GithubRepoType[]>,
      ]);

      setProfile(profileData);
      setRepos(reposData);
      setFetchState("success");
    } catch {
      setFetchState("error");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col h-full text-system-body">
      <Win95MenuBar items={MENU_ITEMS} />

      {/* Navigation bar */}
      <Win95AddressBar
        url={`https://github.com/${GITHUB_USERNAME}`}
        showNavButtons
        onRefresh={fetchData}
        actionHref={GITHUB_PROFILE_URL}
      />

      {/* Content area */}
      <div className="flex-1 overflow-y-auto bg-[#0d1117] win95-sunken text-white">
        {fetchState === "loading" && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-[#8b949e]">
            <Explorer100 width={32} height={32} className="animate-pulse" />
            <p className="text-system-body">GitHub에서 데이터를 불러오는 중...</p>
          </div>
        )}

        {fetchState === "error" && (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <span className="text-system-icon-lg">⚠️</span>
            <p className="text-system-body text-[#f85149]">데이터를 불러오지 못했습니다.</p>
            <Win95Button size="lg" className="text-black" onClick={fetchData}>
              다시 시도
            </Win95Button>
          </div>
        )}

        {fetchState === "success" && profile && (
          <div className="p-4 space-y-4">
            {/* Profile header */}
            <div className="border border-[#30363d] rounded p-4 flex gap-4 items-start">
              {/* Avatar */}
              <Image
                src={profile.avatar_url}
                alt={profile.login}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-2 border-[#30363d] flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-system-heading leading-tight truncate">{profile.name}</p>
                <p className="text-[#8b949e] text-system-body truncate">@{profile.login}</p>
                {profile.bio && (
                  <p className="text-[#c9d1d9] text-system-caption mt-1 leading-snug line-clamp-2">{profile.bio}</p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-system-caption text-[#8b949e]">
                  <span>
                    <span className="text-white font-bold">{profile.public_repos}</span> repos
                  </span>
                  <span>
                    <span className="text-white font-bold">{profile.followers}</span> followers
                  </span>
                  <span>
                    <span className="text-white font-bold">{profile.following}</span> following
                  </span>
                </div>
              </div>
            </div>

            {/* Recent repos */}
            <div>
              <p className="text-[#8b949e] text-system-caption mb-2 border-b border-[#30363d] pb-1">최근 저장소</p>
              <div className="space-y-2">
                {repos.map((repo) => (
                  <Link
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    className="block border border-[#30363d] rounded p-3 hover:border-[#58a6ff] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[#58a6ff] text-system-body font-bold truncate">{repo.name}</p>
                      <div className="flex items-center gap-3 text-system-caption text-[#8b949e] shrink-0">
                        {repo.stargazers_count > 0 && <span>⭐ {repo.stargazers_count}</span>}
                        {repo.forks_count > 0 && <span>🍴 {repo.forks_count}</span>}
                      </div>
                    </div>
                    {repo.description && (
                      <p className="text-[#8b949e] text-system-caption mt-0.5 leading-snug line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    {repo.language && (
                      <div className="flex items-center gap-1 mt-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                          style={{
                            backgroundColor: LANG_COLORS[repo.language] ?? "#8b949e",
                          }}
                        />
                        <span className="text-system-caption text-[#8b949e]">{repo.language}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-2 border-t border-[#30363d]">
              <Link
                href={GITHUB_PROFILE_URL}
                target="_blank"
                className="inline-block win95-raised bg-[#c0c0c0] text-black px-4 py-1 text-system-caption active:win95-sunken"
              >
                <Explorer100 width={16} height={16} className="inline mr-1" />
                GitHub에서 열기
              </Link>
            </div>
          </div>
        )}
      </div>

      <Win95StatusBar>
        <span>{fetchState === "loading" ? "연결 중..." : fetchState === "error" ? "연결 실패" : "완료"}</span>
        <span className="flex items-center gap-1">
          <Explorer100 width={16} height={16} />
          GitHub
        </span>
      </Win95StatusBar>
    </div>
  );
}
