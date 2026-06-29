import type { GitHubUser, GitHubRepo } from "../types/github";

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(
    `https://api.github.com/users/${username}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка при загрузке пользователя");
  }

  return data;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка при загрузке репозиториев");
  }

  return data;
}

export async function fetchGitRepoLanguages(name: string) {
  const response = await fetch(
    `https://api.github.com/repos/Nallbe/${name}/languages`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка при загрузке языков репозитория");
  }

  return data;
}