import "./globals.css";
import Box from "@mui/material/Box";
import ThemeRegistry from "./theme-registry";
import NavMenu from "./nav-menu";
import { getCurrentPlayer } from "../lib/auth";

export const metadata = {
  title: "BoardGameFanatics",
  description: "Track board game wins, stats, and collections.",
};

export default async function RootLayout({ children }) {
  const player = await getCurrentPlayer();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeRegistry>
          <Box sx={{ display: "flex" }}>
            <NavMenu player={player} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              {children}
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
