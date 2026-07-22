export type GithubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
};

export type GithubStats = {
  user: GithubUser;
  repos: GithubRepo[];
  totalStars: number;
  topLanguages: { name: string; count: number; percent: number }[];
};
