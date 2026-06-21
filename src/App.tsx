import { useState, useEffect } from 'react';

import type { GitHubUser } from './types/github.ts';

import Header from './components/Header.tsx';
import SearchForm from './components/SearchForm';
import UserCard from './components/UserCard.tsx';

import Box from "@mui/material/Box";


function App() {

  const [username, setUsername] = useState("");

  const [user, setUser] = useState <GitHubUser | null>(null);
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  async function handleSearch() {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);
    setRepos(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username.trim()}`
      )
      
      const data: GitHubUser = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка при загрузке пользователя");
      }

      setUser(data);
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
    </Box>
  )
}

export default App
