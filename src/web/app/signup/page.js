import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { signup } from "./actions";

export default async function SignupPage({ searchParams }) {
  const { error } = await searchParams;

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign up
      </Typography>

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <Box
        component="form"
        action={signup}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField name="displayName" label="Display name" required />
        <TextField name="email" type="email" label="Email" required />
        <TextField name="password" type="password" label="Password" required />
        <Button type="submit" variant="contained">
          Sign up
        </Button>
      </Box>

      <Typography sx={{ mt: 2 }}>
        Already have an account? <Link href="/login">Log in</Link>
      </Typography>
    </Box>
  );
}
