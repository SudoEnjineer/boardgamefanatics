"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export async function signup(formData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get("email"),
    password: formData.get("password"),
    options: {
      data: {
        display_name: formData.get("displayName"),
      },
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/login?notice=signup-pending");
}
