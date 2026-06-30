import type { GitHubRepo } from '../types/github.ts';

import LanguagesLine from "./LanguagesLine.tsx";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type UserRepositoryProps = {
  rep: GitHubRepo;
};

function UserRepository({rep} : UserRepositoryProps) {



  return (
    <Card 
      sx={{ 
        width: 320,
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
      }}>
      <CardContent sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}>
          <Typography variant="h5">
            {rep.name}
            
          </Typography>

          <Typography color="text.secondary">
            ID: {rep.id}
          </Typography>

          {rep.description ? 
            <Typography sx={{
              textAlign: "center",
              minHeight: 48,
            }}>
              {rep.description}
            </Typography> 
          : null}

          <Box sx={{ 
            display: "flex",
            flexDirection: "column", 
            gap: 2, 
            mt: 1 }}>
            <Typography>
              Stars: {rep.stargazers_count}
            </Typography>
            <Box>
              {rep.languages ? <LanguagesLine 
                languages={rep.languages}
              /> : null}
            </Box>
          </Box>

          <Button
            href={rep.html_url}
            target="_blank"
            variant="outlined"
            sx={{ mt: "auto" }}
          >
            Открыть GitHub
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserRepository;