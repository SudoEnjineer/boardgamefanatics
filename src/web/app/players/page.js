import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { db } from "../../lib/db";

export const dynamic = "force-dynamic";

export default async function PlayersPage() {
  const players = await db.player.findMany({
    where: { status: "APPROVED" },
    orderBy: { displayName: "asc" },
  });

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Players
      </Typography>

      {players.length === 0 ? (
        <Typography>No approved players yet.</Typography>
      ) : (
        <List>
          {players.map((player) => (
            <ListItem key={player.id} disableGutters>
              <ListItemText primary={player.displayName} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
