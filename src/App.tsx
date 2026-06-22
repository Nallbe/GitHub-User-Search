import { useState } from 'react';

import type { GitHubUser, GitHubRepo } from './types/github.ts';

import Header from './components/Header.tsx';
import SearchForm from './components/SearchForm';
import UserCard from './components/UserCard.tsx';
import UserRepository from './components/UserRepository.tsx';

import Box from "@mui/material/Box";


function App() {

  const [username, setUsername] = useState("");

  const [user, setUser] = useState <GitHubUser | null>(null);
  const [repos, setRepos] = useState <GitHubRepo[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  async function handleSearch() {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username.trim()}`
      );
      
      const data: GitHubUser = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка при загрузке пользователя");
      }



      const responseRepos = await fetch(
        `https://api.github.com/users/${username.trim()}/repos`
      );
      const dataResponse: GitHubRepo[] = await responseRepos.json();

      if (!responseRepos.ok) {
        throw new Error("Ошибка при загрузке репозиториев");
      }

      setUser(data);
      setRepos(dataResponse);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      else {
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
    </Box>
  )
}

export default App
