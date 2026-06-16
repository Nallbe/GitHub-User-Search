

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


type SearchFormProps = {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

function SearchForm(props: SearchFormProps) {



  const {
    username,
    setUsername
  } = props


  function inputHandleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 5,
        gap: 1
      }}>
      <TextField
        size="small"
        label="Имя пользователя"
        value={username}
        onChange={inputHandleChange}
      >
      </TextField>
      <Button 
        size="medium"
        variant="contained"
        >
        Искать
      </Button>
    </Box>
  )
}

export default SearchForm;