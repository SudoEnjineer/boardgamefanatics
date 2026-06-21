"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { logout } from "./login/actions";

export const drawerWidth = 250;

const navItems = [
  { label: "Home", href: "/" },
  { label: "Players", href: "/players" },
];

export default function NavMenu({ player }) {
  const pathname = usePathname();

  const items = player?.role === "ADMIN"
    ? [...navItems, { label: "Admin: Pending Players", href: "/admin/players" }]
    : navItems;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "grey.900",
          color: "common.white",
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          href="/"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          BoardGameFanatics
        </Typography>
      </Toolbar>
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            selected={pathname === item.href}
            sx={{ color: "inherit" }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        {player ? (
          <>
            <Typography variant="body2" noWrap>
              {player.displayName}
              {player.status === "PENDING" && " (pending approval)"}
            </Typography>
            <form action={logout}>
              <Button type="submit" size="small" sx={{ color: "inherit", mt: 1 }}>
                Log out
              </Button>
            </form>
          </>
        ) : (
          <>
            <Button component={Link} href="/login" size="small" sx={{ color: "inherit" }}>
              Log in
            </Button>
            <Button component={Link} href="/signup" size="small" sx={{ color: "inherit" }}>
              Sign up
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
}
