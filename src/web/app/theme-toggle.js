"use client";

import { useColorScheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const resolvedMode = mode === "system" ? systemMode : mode;

  return (
    <IconButton
      onClick={() => setMode(resolvedMode === "dark" ? "light" : "dark")}
      sx={{ color: "inherit" }}
      aria-label="Toggle light/dark theme"
    >
      {resolvedMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
