

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


type SearchFormProps = {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

function SearchForm(props: SearchFormProps) {



  const {
    username,
    setUsername,
    handleSearch
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
        mb: 5,
        gap: 1
      }}>
      <TextField
        size="small"
        label="Имя пользователя"
        value={username}
        onChange={inputHandleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      >
      </TextField>
      <Button
        onClick={handleSearch}
        size="medium"
        variant="contained"
        >
        Искать
      </Button>
    </Box>
  )
}

export default SearchForm;