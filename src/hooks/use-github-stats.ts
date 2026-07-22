"use client";

import * as React from "react";
import type { GithubRepo, GithubStats, GithubUser } from "@/types/github";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3b82f6",
  JavaScript: "#eab308",
  Python: "#06b6d4",
  HTML: "#f97316",
  CSS: "#8b5cf6",
  "Jupyter Notebook": "#f97316",
  Java: "#f97316",
  Shell: "#94a3b8",
};

export function languageColor(language: string) {
  return LANGUAGE_COLORS[language] ?? "#8b93ad";
}

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: GithubStats };

export function useGithubStats(username: string) {
  const [state, setState] = React.useState<State>({ status: "loading" });

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API request failed");

        const user = (await userRes.json()) as GithubUser;
        const allRepos = (await reposRes.json()) as GithubRepo[];

        const repos = allRepos.filter((r) => !r.fork);
        const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

        const languageCounts = new Map<string, number>();
        for (const repo of repos) {
          if (!repo.language) continue;
          languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
        }
        const totalCounted = Array.from(languageCounts.values()).reduce((a, b) => a + b, 0) || 1;
        const topLanguages = Array.from(languageCounts.entries())
          .map(([name, count]) => ({ name, count, percent: Math.round((count / totalCounted) * 100) }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        if (!cancelled) {
          setState({
            status: "ready",
            data: { user, repos, totalStars, topLanguages },
          });
        }
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
