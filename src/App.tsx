import { useState, useEffect } from 'react'

import Header from './components/Header.tsx'
import SearchForm from './components/SearchForm';

import Box from "@mui/material/Box";


function App() {

  const [username, setUsername] = useState("");


  useEffect(() => {
    console.log(username);
  }, [username])


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
      ></SearchForm>
      <section>
        <h2>Tasks</h2>
      </section>
    </Box>
  )
}

export default App
