import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#C1622D" },
        secondary: { main: "#2F5D50" },
        background: { default: "#F7F3EC", paper: "#FFFDF8" },
        text: { primary: "#2B231C", secondary: "#6B5D52" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#E0954C" },
        secondary: { main: "#5FA98C" },
        background: { default: "#1C1714", paper: "#251F1A" },
        text: { primary: "#F2EAE1", secondary: "#B8A99C" },
      },
    },
  },
  shape: { borderRadius: 8 },
});

export default theme;
