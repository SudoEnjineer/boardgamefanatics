import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { db } from "./db";

export async function getCurrentPlayer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return db.player.findUnique({ where: { id: user.id } });
}

export async function requireApproved() {
  const player = await getCurrentPlayer();

  if (!player) {
    redirect("/login");
  }

  if (player.status !== "APPROVED") {
    redirect("/");
  }

  return player;
}

export async function requireAdmin() {
  const player = await requireApproved();

  if (player.role !== "ADMIN") {
    redirect("/");
  }

  return player;
}
