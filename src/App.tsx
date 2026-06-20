import { useState, useEffect } from 'react';

import type { GitHubUser } from './types/github.ts';

import Header from './components/Header.tsx';
import SearchForm from './components/SearchForm';

import Box from "@mui/material/Box";


function App() {

  const [username, setUsername] = useState("");

  const [user, setUser] = useState <GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // useEffect(() => {
  //   console.log(username);
  // }, [username])


  async function handleSearch() {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username.trim()}`
      )
      
      const data: GitHubUser = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка при запуске пользователя");
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
      {user && (
        <div>
          <img src={user.avatar_url} width={120} />
          <h2>{user.login}</h2>
          <p>Name: {user.name}</p>
          <p>Bio: {user.bio}</p>
          <p>Repos: {user.public_repos}</p>
          <p>Followers: {user.followers}</p>
        </div>
      )}
    </Box>
  )
}

export default App
