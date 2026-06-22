import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { db } from "../../../../lib/db";
import { getCurrentPlayer } from "../../../../lib/auth";
import { searchGames } from "../../../../lib/bgg";
import { addGameToCollection, removeGameFromCollection } from "./actions";

export const dynamic = "force-dynamic";

export default async function CollectionPage({ params, searchParams }) {
  const { playerId } = await params;
  const { q } = await searchParams;

  const [player, currentPlayer] = await Promise.all([
    db.player.findUnique({ where: { id: playerId } }),
    getCurrentPlayer(),
  ]);

  if (!player) {
    return <Typography>Player not found.</Typography>;
  }

  const collectionEntries = await db.collectionEntry.findMany({
    where: { playerId },
    include: { game: true },
    orderBy: { game: { name: "asc" } },
  });

  const ownedBggIds = new Set(collectionEntries.map((entry) => entry.gameId));
  const canEdit =
    currentPlayer?.id === playerId && currentPlayer.status === "APPROVED";

  const searchResults = canEdit && q ? await searchGames(q) : [];

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        {player.displayName}&apos;s Bookshelf
      </Typography>

      {collectionEntries.length === 0 ? (
        <Typography>No games yet.</Typography>
      ) : (
        <List>
          {collectionEntries.map((entry) => (
            <ListItem
              key={entry.id}
              secondaryAction={
                canEdit ? (
                  <form
                    action={removeGameFromCollection.bind(
                      null,
                      playerId,
                      entry.id,
                    )}
                  >
                    <Button type="submit" size="small" color="error">
                      Remove
                    </Button>
                  </form>
                ) : undefined
              }
            >
              <ListItemText
                primary={entry.game.name}
                secondary={entry.game.yearPublished ?? undefined}
              />
            </ListItem>
          ))}
        </List>
      )}

      {canEdit && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Add a game
          </Typography>

          <Box component="form" sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              name="q"
              label="Search BoardGameGeek"
              defaultValue={q ?? ""}
              size="small"
              fullWidth
            />
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Box>

          {q && searchResults.length === 0 && (
            <Typography>No results found.</Typography>
          )}

          <List>
            {searchResults.map((result) => (
              <ListItem
                key={result.bggId}
                secondaryAction={
                  ownedBggIds.has(result.bggId) ? (
                    <Typography variant="body2" color="text.secondary">
                      Already added
                    </Typography>
                  ) : (
                    <form
                      action={addGameToCollection.bind(
                        null,
                        playerId,
                        result.bggId,
                      )}
                    >
                      <Button type="submit" size="small" variant="outlined">
                        Add
                      </Button>
                    </form>
                  )
                }
              >
                <ListItemText
                  primary={result.name}
                  secondary={result.yearPublished ?? undefined}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
}
