import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { login } from "./actions";

export default async function LoginPage({ searchParams }) {
  const { error, notice } = await searchParams;

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Log in
      </Typography>

      {notice === "signup-pending" && (
        <Typography color="text.secondary" gutterBottom>
          Thanks for signing up! Your account is pending admin approval.
        </Typography>
      )}

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <Box
        component="form"
        action={login}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField name="email" type="email" label="Email" required />
        <TextField name="password" type="password" label="Password" required />
        <Button type="submit" variant="contained">
          Log in
        </Button>
      </Box>

      <Typography sx={{ mt: 2 }}>
        Need an account? <Link href="/signup">Sign up</Link>
      </Typography>
    </Box>
  );
}
