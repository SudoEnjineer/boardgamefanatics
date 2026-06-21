import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import { requireAdmin } from "../../../lib/auth";
import { db } from "../../../lib/db";
import { approvePlayer } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPlayersPage() {
  await requireAdmin();

  const pendingPlayers = await db.player.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Pending players
      </Typography>

      {pendingPlayers.length === 0 ? (
        <Typography>No pending players.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Display name</TableCell>
              <TableCell>Signed up</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingPlayers.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.displayName}</TableCell>
                <TableCell>{player.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <form action={approvePlayer.bind(null, player.id)}>
                    <Button type="submit" variant="contained" size="small">
                      Approve
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
