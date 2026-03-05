export type GithubProfileType = {
  name: string;
  login: string;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};

export type GithubRepoType = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
};

const GITHUB_API_BASE = "https://api.github.com";

const get = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
};

export const githubService = {
  getProfile: (username: string) =>
    get<GithubProfileType>(`${GITHUB_API_BASE}/users/${username}`),

  getRepos: (username: string, count: number) =>
    get<GithubRepoType[]>(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=pushed&per_page=${count}`
    ),
};
