import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
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
            <ListItemButton
              key={player.id}
              component={Link}
              href={`/players/${player.id}/collection`}
              disableGutters
            >
              <ListItemText primary={player.displayName} />
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
}
