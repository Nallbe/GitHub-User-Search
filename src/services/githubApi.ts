import type { GitHubUser, GitHubRepo } from "../types/github";

// Запрос с поиском пользователя по логину
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


// Запрос с поиском репозиториев пользователя
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );

  if (!response.ok) {
    throw new Error("Ошибка при загрузке репозиториев");
  }

  let dataRepos: GitHubRepo[] = await response.json();
  

  // Добавление в объект репозитория информации о используемых языках
  const result = await Promise.all(dataRepos.map(async rep => {

    const response = await fetch(`https://api.github.com/repos/${username}/${rep.name}/languages`);


    const data = await response.json();

    return {
      ...rep,
      languages: data
    }

  }))

  console.log(result);
  
  return result;
}