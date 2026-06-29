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

export async function fetchGitRepoLanguages(names: string[]) {
  const result = await Promise.all(names.map(async name => {
    const response = await fetch(`https://api.github.com/repos/Nallbe/${name}/languages`);

    if (!response.ok) {
      throw new Error(`Ошибка поиска языков в репозитории ${name}`);
    }

    return response.json();
  }))
  // console.log(result)
  return result
}