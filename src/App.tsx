import { useState } from 'react';

import type { GitHubUser, GitHubRepo } from './types/github.ts';

import Header from './components/Header.tsx';
import SearchForm from './components/SearchForm';
import UserCard from './components/UserCard.tsx';
import UserRepository from './components/UserRepository.tsx';

import { fetchGitHubUser, fetchGitHubRepos } from "./services/githubApi";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


function App() {

  const [username, setUsername] = useState("");

  const [user, setUser] = useState <GitHubUser | null>(null);
  const [repos, setRepos] = useState <GitHubRepo[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



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
      }}
    >
      <Header></Header>
      <SearchForm
        username={username}
        setUsername={setUsername}
        handleSearch={handleSearch}
        
      >
      </SearchForm>
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {user && <UserCard user={user} />}

      {repos.length > 0 ? <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          mt: 4,
          width: "100%",
          maxWidth: "1400px"
        }}>

        {repos.map(rep => (
          <UserRepository
            key={rep.id} 
            rep={rep}
          />
          ))}
      </Box> : null}

      {user && repos.length === 0 && !loading ? <Typography sx={{
         mt: 5,
       }}>
          У пользователя нет репозиториев
        </Typography> : null}
       
    </Box>
  )
}

export default App
