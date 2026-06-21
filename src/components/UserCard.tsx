import type { GitHubUser } from '../types/github.ts';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type UserCardProps = {
  user: GitHubUser;
};

function UserCard({ user }: UserCardProps) {
  return (
    <Card sx={{ mt: 4, maxWidth: 420, width: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            src={user.avatar_url}
            alt={"avatar: " + user.login}
            sx={{ width: 120, height: 120 }}
          />

          <Typography variant="h5">
            {user.name ?? user.login}
          </Typography>

          <Typography color="text.secondary">
            @{user.login}
          </Typography>

          {user.bio && (
            <Typography sx={{ textAlign: "center" }}>
              {user.bio}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Typography>Repos: {user.public_repos}</Typography>
            <Typography>Followers: {user.followers}</Typography>
            <Typography>Following: {user.following}</Typography>
          </Box>

          <Button
            href={user.html_url}
            target="_blank"
            variant="outlined"
            sx={{ mt: 1 }}
          >
            Открыть GitHub
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserCard;