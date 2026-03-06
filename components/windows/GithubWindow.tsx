"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { Win95StatusBar, Win95AddressBar, Win95Button } from "../ui";
import { githubService } from "@/services/githubService";
import type { GithubProfileType, GithubRepoType } from "@/services/githubService";
import { profile } from "@/constants/profile";

// ── GitHub API ──
const GITHUB_USERNAME = profile.github.username;
const REPO_COUNT = 6;
const GITHUB_PROFILE_URL = profile.github.url;

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

type FetchStateType = "idle" | "loading" | "success" | "error";

export default function GithubWindow() {
  const [fetchState, setFetchState] = useState<FetchStateType>("idle");
  const [profile, setProfile] = useState<GithubProfileType | null>(null);
  const [repos, setRepos] = useState<GithubRepoType[]>([]);

  const fetchData = useCallback(async () => {
    setFetchState("loading");
    try {
      const [profileData, reposData] = await Promise.all([
        githubService.getProfile(GITHUB_USERNAME),
        githubService.getRepos(GITHUB_USERNAME, REPO_COUNT),
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
      {/* Navigation bar */}
      <Win95AddressBar
        url={`https://github.com/${GITHUB_USERNAME}`}
        showNavButtons
        onRefresh={fetchData}
        actionHref={GITHUB_PROFILE_URL}
      />

      {/* Content area */}
      <div className="flex-1 overflow-y-auto bg-[#c0c0c0] win95-sunken">
        {fetchState === "loading" && (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Icon.Explorer100 width={32} height={32} className="animate-pulse" />
            <p className="text-system-body text-[#444]">GitHub에서 데이터를 불러오는 중...</p>
          </div>
        )}

        {fetchState === "error" && (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Icon.Warning width={32} height={32} />
            <p className="text-system-body text-[#800000]">데이터를 불러오지 못했습니다.</p>
            <Win95Button size="lg" onClick={fetchData}>
              다시 시도
            </Win95Button>
          </div>
        )}

        {fetchState === "success" && profile && (
          <div className="p-3 space-y-3">
            {/* Profile section */}
            <fieldset className="win95-raised p-2">
              <legend className="px-1 text-system-caption font-bold">프로필</legend>
              <div className="flex gap-2 items-center">
                {/* Avatar */}
                <div className="win95-raised shrink-0 overflow-hidden bg-[#808080]" style={{ width: 48, height: 48 }}>
                  <Image
                    src={profile.avatar_url}
                    alt={profile.login}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-system-body leading-tight truncate">{profile.name}</p>
                  <p className="text-system-caption text-[#000080] font-bold truncate">@{profile.login}</p>
                  {profile.bio && (
                    <p className="text-system-caption text-[#444] leading-snug line-clamp-1">{profile.bio}</p>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-1 mt-1">
                {[
                  { label: "Repos", value: profile.public_repos },
                  { label: "Followers", value: profile.followers },
                  { label: "Following", value: profile.following },
                ].map(({ label, value }) => (
                  <div key={label} className="flex-1 win95-sunken bg-white px-1.5 py-0.5 text-system-caption text-center">
                    <span className="font-bold">{value}</span> {label}
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Recent repos */}
            <div>
              <p className="text-system-caption font-bold text-[#000080] border-b-2 border-[#000080] pb-0.5 mb-2">
                최근 저장소
              </p>
              <div className="space-y-2">
                {repos.map((repo) => (
                  <Link
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    className="block win95-raised p-2 active:win95-sunken"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[#000080] text-system-body font-bold truncate">{repo.name}</p>
                      <div className="flex items-center gap-2 text-system-caption text-[#444] shrink-0">
                        {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
                        {repo.forks_count > 0 && <span>Forks {repo.forks_count}</span>}
                      </div>
                    </div>
                    {repo.description && (
                      <p className="text-system-caption text-[#444] mt-0.5 leading-snug line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    {repo.language && (
                      <div className="flex items-center gap-1 mt-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                          style={{
                            backgroundColor: LANG_COLORS[repo.language] ?? "#808080",
                          }}
                        />
                        <span className="text-system-caption text-[#444]">{repo.language}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-2 border-t-2 border-[#808080]">
              <Link href={GITHUB_PROFILE_URL} target="_blank">
                <Win95Button size="lg">
                  <Icon.Explorer100 width={16} height={16} className="inline mr-1" />
                  GitHub에서 열기
                </Win95Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Win95StatusBar>
        <span>{fetchState === "loading" ? "연결 중..." : fetchState === "error" ? "연결 실패" : "완료"}</span>
        <span className="flex items-center gap-1">
          <Icon.Explorer100 width={16} height={16} />
          GitHub
        </span>
      </Win95StatusBar>
    </div>
  );
}
