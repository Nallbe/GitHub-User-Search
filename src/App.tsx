import { useState, useEffect } from 'react';

import type { GitHubUser, GitHubRepo } from './types/github.ts';
import { fetchGitHubUser, fetchGitHubRepos } from "./services/githubApi";

import Header from './components/Header.tsx';
import SearchForm from './components/SearchForm.tsx';
import UserCard from './components/UserCard.tsx';

import RepoList from './components/RepoList.tsx';

import Box from "@mui/material/Box";


function App() {

  const [username, setUsername] = useState("");

  const [user, setUser] = useState <GitHubUser | null>(null);
  const [repos, setRepos] = useState <GitHubRepo[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  useEffect(() => {
    console.log(repos);
  }, [repos])


  async function handleSearch() {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) return;

    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);
    
    
    try {
      const userData = await fetchGitHubUser(trimmedUsername);
      const reposData = await fetchGitHubRepos(trimmedUsername);


      

      setUser(userData);
      setRepos(reposData);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  }


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
      }}>
      <Header/>
      <SearchForm
        username={username}
        setUsername={setUsername}
        handleSearch={handleSearch}
      />
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {user && <UserCard user={user} />}
      {user && <RepoList repos={repos}/>}
    </Box>
  )
}

export default App

