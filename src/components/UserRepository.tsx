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

          <Box sx={{display: "flex", gap: 2}}>
            <Typography color="text.secondary">
              ID: {rep.id}
            </Typography>
            <Typography sx={{display: "flex", alignItems: "center", gap: 1}}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fill="#eac54f"
                  d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.969.719 4.193a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
                />
              </svg> {rep.stargazers_count}
            </Typography>
          </Box>

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