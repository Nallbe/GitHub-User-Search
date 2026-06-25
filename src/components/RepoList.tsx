import type { GitHubRepo } from '../types/github.ts';

import UserRepository from './UserRepository.tsx';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type RepoListProps = {
  repos: GitHubRepo[];
};

function RepoList({repos} : RepoListProps) {

   if (repos.length === 0) {
    return (
      <Typography sx={{ mt: 5 }}>
        У пользователя нет репозиториев
      </Typography>
    );
  }

  return (
    <Box
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
    </Box>
  )
}

export default RepoList;

